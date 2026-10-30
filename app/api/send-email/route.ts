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
  return typeof value === "string" && value.trim().length >= minLength && value.length <= maxLength;
}

function isEmail(value: unknown): value is string {
  return (
    isText(value, 3, 254) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

function responseError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function cleanHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 160);
}

function isSubmission(value: Record<string, unknown>): value is Record<string, unknown> & Submission {
  if (value.formType === "contact") {
    return (
      isText(value.name, 1, 120) &&
      isEmail(value.email) &&
      typeof value.subject === "string" &&
      value.subject.length <= 160 &&
      isText(value.message, 1, 5000)
    );
  }

  if (value.formType === "admissions") {
    return (
      isText(value.guardianName, 1, 120) &&
      isEmail(value.email) &&
      typeof value.phone === "string" &&
      value.phone.length <= 30 &&
      (!value.phone.trim() || /^[+()\d\s.-]{7,20}$/.test(value.phone.trim())) &&
      typeof value.relationship === "string" &&
      relationships.includes(value.relationship) &&
      isText(value.studentName, 1, 120) &&
      typeof value.grade === "string" &&
      grades.includes(value.grade) &&
      typeof value.startTerm === "string" &&
      startTerms.includes(value.startTerm) &&
      typeof value.message === "string" &&
      value.message.length <= 5000
    );
  }

  return false;
}

function formatEmail(submission: Submission) {
  if (submission.formType === "contact") {
    return {
      subject: `Contact form: ${cleanHeaderValue(submission.subject) || "Website inquiry"}`,
      replyTo: submission.email.trim(),
      text: [
        "New contact form submission",
        "",
        `Name: ${submission.name.trim()}`,
        `Email: ${submission.email.trim()}`,
        `Subject: ${submission.subject.trim() || "Not provided"}`,
        "",
        "Message:",
        submission.message.trim(),
      ].join("\n"),
    };
  }

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
      submission.message.trim() || "Please contact me with next steps.",
    ].join("\n"),
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
    });
  } catch (error) {
    console.error("Failed to send website form email:", error);
    return responseError("We couldn't send your message. Please try again later.", 502);
  }

  return Response.json({ success: true });
}
