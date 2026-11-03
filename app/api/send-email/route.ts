import escapeHtml from "escape-html";
import nodemailer from "nodemailer";

type ContactSubmission = {
  formType: "contact";
  name: string;
  email: string;
  subject: string;
  message: string;
};

type AdmissionsSubmission = {
  formType: "admissions";
  guardianName: string;
  email: string;
  phone: string;
  relationship: string;
  studentName: string;
  grade: string;
  startTerm: string;
  message: string;
};

type Submission = ContactSubmission | AdmissionsSubmission;

const relationships = ["Parent", "Guardian", "Student", "Other family member"];
const grades = ["Kindergarten", ...Array.from({ length: 12 }, (_, index) => `Grade ${index + 1}`)];
const startTerms = ["Fall 2026", "Spring 2027", "Not sure yet"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value: unknown, minLength: number, maxLength: number): value is string {
  return (
    typeof value === "string" &&
    value.trim().length >= minLength &&
    value.length <= maxLength &&
    !/[\u0000-\u001F\u007F]/.test(value)
  );
}

function isEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const email = value.trim();

  return (
    email.length >= 3 &&
    email.length <= 254 &&
    /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i.test(
      email,
    )
  );
}

function isMessage(value: unknown, required: boolean): value is string {
  return (
    typeof value === "string" &&
    value.length <= 5000 &&
    !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value) &&
    (!required || value.trim().length > 0)
  );
}

function responseError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function cleanHeaderValue(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").trim().slice(0, 160);
}

function htmlField(label: string, value: string) {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

function htmlMessage(value: string) {
  return `<p><strong>Message:</strong><br>${escapeHtml(value).replace(/\r\n?|\n/g, "<br>")}</p>`;
}

function isSubmission(value: Record<string, unknown>): value is Record<string, unknown> & Submission {
  if (value.formType === "contact") {
    return (
      isText(value.name, 1, 120) &&
      isEmail(value.email) &&
      typeof value.subject === "string" &&
      value.subject.length <= 160 &&
      !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value.subject) &&
      isMessage(value.message, true)
    );
  }

  if (value.formType === "admissions") {
    return (
      isText(value.guardianName, 1, 120) &&
      isEmail(value.email) &&
      typeof value.phone === "string" &&
      value.phone.length <= 30 &&
      !/[\u0000-\u001F\u007F]/.test(value.phone) &&
      (!value.phone.trim() || /^[+()\d\s.-]{7,20}$/.test(value.phone.trim())) &&
      typeof value.relationship === "string" &&
      relationships.includes(value.relationship) &&
      isText(value.studentName, 1, 120) &&
      typeof value.grade === "string" &&
      grades.includes(value.grade) &&
      typeof value.startTerm === "string" &&
      startTerms.includes(value.startTerm) &&
      isMessage(value.message, false)
    );
  }

  return false;
}

function formatEmail(submission: Submission) {
  if (submission.formType === "contact") {
    const subject = cleanHeaderValue(submission.subject);

    return {
      subject: `Contact form: ${subject || "Website inquiry"}`,
      replyTo: submission.email.trim(),
      text: [
        "New contact form submission",
        "",
        `Name: ${submission.name.trim()}`,
        `Email: ${submission.email.trim()}`,
        `Subject: ${subject || "Not provided"}`,
        "",
        "Message:",
        submission.message.trim(),
      ].join("\n"),
      html: [
        "<h1>New contact form submission</h1>",
        htmlField("Name", submission.name.trim()),
        htmlField("Email", submission.email.trim()),
        htmlField("Subject", subject || "Not provided"),
        htmlMessage(submission.message.trim()),
      ].join(""),
    };
  }

  const message = submission.message.trim() || "Please contact me with next steps.";
  return {
    subject: `Admissions inquiry: ${cleanHeaderValue(submission.studentName)}`,
    replyTo: submission.email.trim(),
    text: [
      "New admissions inquiry",
      "",
      `Parent / guardian: ${submission.guardianName.trim()}`,
      `Relationship: ${submission.relationship}`,
      `Email: ${submission.email.trim()}`,
      `Phone: ${submission.phone.trim() || "Not provided"}`,
      `Student: ${submission.studentName.trim()}`,
      `Intended grade: ${submission.grade}`,
      `Preferred start: ${submission.startTerm}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: [
      "<h1>New admissions inquiry</h1>",
      htmlField("Parent / guardian", submission.guardianName.trim()),
      htmlField("Relationship", submission.relationship),
      htmlField("Email", submission.email.trim()),
      htmlField("Phone", submission.phone.trim() || "Not provided"),
      htmlField("Student", submission.studentName.trim()),
      htmlField("Intended grade", submission.grade),
      htmlField("Preferred start", submission.startTerm),
      htmlMessage(message),
    ].join(""),
  };
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return responseError("Request body must be valid JSON.", 400);
  }

  if (!isRecord(payload) || !isSubmission(payload)) {
    return responseError("Please check the form details and try again.", 400);
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.GMAIL_TO || "yjiya473@gmail.com";

  if (!user || !pass || !recipient) {
    console.error("Email sending is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
    return responseError("Email is temporarily unavailable. Please try again later.", 500);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  const email = formatEmail(payload);

  try {
    await transporter.sendMail({
      from: { name: "ABC School Website", address: user },
      to: recipient,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  } catch (error) {
    console.error("Failed to send website form email:", error);
    return responseError("We couldn't send your message. Please try again later.", 502);
  }

  return Response.json({ success: true });
}
