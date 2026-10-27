"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type Inquiry = {
  guardianName: string;
  email: string;
  phone: string;
  relationship: string;
  studentName: string;
  grade: string;
  startTerm: string;
  message: string;
};

type InquiryField = keyof Inquiry;
type InquiryErrors = Partial<Record<InquiryField, string>>;

const emptyInquiry: Inquiry = {
  guardianName: "",
  email: "",
  phone: "",
  relationship: "",
  studentName: "",
  grade: "",
  startTerm: "Fall 2026",
  message: "",
};

const faqs = [
  {
    question: "How do we begin the application process?",
    answer:
      "Start by sending an inquiry or contacting the admissions office. A member of the team can explain the application steps, share current requirements, and help arrange a campus visit.",
  },
  {
    question: "Which grades can apply for 2026–2027?",
    answer:
      "Availability can vary by grade and changes as applications are reviewed. Share the student’s intended grade in the inquiry form and our admissions team can confirm current availability.",
  },
  {
    question: "Can we visit the school before applying?",
    answer:
      "Yes. Families are encouraged to get in touch to ask about a campus tour or an upcoming school visit. We can help you find a time that works.",
  },
  {
    question: "What documents should we prepare?",
    answer:
      "The documents required depend on the student’s grade and application. The admissions team will provide the current checklist directly so you can prepare the right records.",
  },
  {
    question: "When will we hear back after sending an inquiry?",
    answer:
      "This page prepares an email to the school; it does not send or store your information automatically. Once you send the email, the admissions office can follow up using the contact details you provide.",
  },
];

function validateField(field: InquiryField, value: string) {
  const trimmed = value.trim();

  if (field === "guardianName" && !trimmed) return "Please enter your name.";
  if (field === "email") {
    if (!trimmed) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address.";
  }
  if (field === "relationship" && !trimmed) return "Please choose your relationship to the student.";
  if (field === "studentName" && !trimmed) return "Please enter the student’s name.";
  if (field === "grade" && !trimmed) return "Please choose an intended grade.";
  if (field === "phone" && trimmed && !/^[+()\d\s.-]{7,20}$/.test(trimmed)) {
    return "Enter a valid phone number, or leave this field blank.";
  }
  return "";
}

function validateStep(fields: InquiryField[], inquiry: Inquiry) {
  return fields.reduce<InquiryErrors>((result, field) => {
    const error = validateField(field, inquiry[field]);
    if (error) result[field] = error;
    return result;
  }, {});
}

function buildInquiryMailto(inquiry: Inquiry) {
  const subject = `Admissions inquiry for ${inquiry.studentName || "ABC School"}`;
  const body = [
    "Hello ABC School Admissions,",
    "",
    "I would like to learn more about applying.",
    "",
    `Parent / guardian: ${inquiry.guardianName}`,
    `Relationship: ${inquiry.relationship}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Student: ${inquiry.studentName}`,
    `Intended grade: ${inquiry.grade}`,
    `Preferred start: ${inquiry.startTerm}`,
    "",
    `Message: ${inquiry.message || "Please contact me with next steps."}`,
  ].join("\n");
  return `mailto:hello@abcschool.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

export default function AdmissionsPageContent() {
  const [step, setStep] = useState<1 | 2>(1);
  const [inquiry, setInquiry] = useState<Inquiry>(emptyInquiry);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: InquiryField, value: string) {
    setInquiry((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
    }
  }

  function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateStep(["guardianName", "email", "phone", "relationship"], inquiry);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStep(2);
  }

  function handleInquirySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateStep(["studentName", "grade"], inquiry);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  function renderError(field: InquiryField) {
    return errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="ABC School home">
            <span className="brand-mark" aria-hidden="true">A</span>
            <span>ABC School</span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/academics">Academics</Link>
            <Link href="/#classes">Classes</Link>
            <Link href="/#events">Events</Link>
            <Link className="nav-home" href="/admissions" aria-current="page">Admissions</Link>
          </nav>
          <Link className="header-cta" href="/contact">
            Contact <ArrowIcon />
          </Link>
        </div>
      </header>

      <main className="admissions-page">
        <section className="admissions-hero" aria-labelledby="admissions-title">
          <div className="admissions-hero-image" />
          <div className="admissions-hero-shade" />
          <div className="admissions-hero-content">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Admissions</span>
            </nav>
            <p className="eyebrow">Your next chapter starts here</p>
            <h1 id="admissions-title">Make room for<br /><em>what’s possible.</em></h1>
            <p>
              Find a school where your child can feel known, follow their
              curiosity, and grow into their next big idea.
            </p>
            <a className="button button-light" href="#inquiry">
              Start an inquiry <ArrowIcon />
            </a>
          </div>
          <div className="deadline-pill">
            <span className="deadline-pulse" aria-hidden="true" />
            <span>Applications Open for Academic Year 2026–2027 — Round 1 Closes Soon</span>
          </div>
        </section>

        <section className="admissions-process">
          <div className="admissions-process-inner">
            <p className="eyebrow">A thoughtful first step</p>
            <h2>Start with a <em>conversation.</em></h2>
            <p>
              Tell us a little about your family. Our admissions team can
              follow up with the right next steps and current application details.
            </p>
            <div className="process-steps">
              <div><span>01</span><strong>Share your details</strong><small>Tell us how to reach you.</small></div>
              <div><span>02</span><strong>Tell us about your student</strong><small>Choose a grade and start term.</small></div>
              <div><span>03</span><strong>Send your inquiry</strong><small>Your email app prepares the message.</small></div>
            </div>
          </div>
        </section>

        <section className="inquiry-section" id="inquiry">
          <div className="inquiry-layout">
            <div className="inquiry-sidebar">
              <p className="eyebrow">We’re here to help</p>
              <h2>Let’s find the<br /><em>right next step.</em></h2>
              <p>
                A few details will help us point you in the right direction.
                This takes about a minute.
              </p>
              <div className="inquiry-note">
                <span className="inquiry-note-mark" aria-hidden="true">✳</span>
                <p>Every great journey starts with a question. We’d love to hear yours.</p>
              </div>
              <a className="inquiry-phone" href="tel:+15551234567">
                Prefer to call? <strong>(555) 123-4567</strong>
              </a>
            </div>

            <div className="inquiry-card">
              <div className="inquiry-progress">
                <div className="inquiry-step-label">
                  <span>STEP {submitted ? "02" : `0${step}`} <i>/ 02</i></span>
                  <span>{submitted ? "Ready to send" : step === 1 ? "Your contact details" : "Student information"}</span>
                </div>
                <div className="inquiry-progress-track" aria-label={`Step ${step} of 2`}>
                  <span className={step === 1 && !submitted ? "is-current" : "is-complete"} />
                  <span className={step === 2 || submitted ? "is-current" : ""} />
                </div>
              </div>

              {submitted ? (
                <div className="inquiry-success" aria-live="polite">
                  <span className="success-mark" aria-hidden="true">✓</span>
                  <p className="eyebrow">Inquiry ready</p>
                  <h3>One last little step.</h3>
                  <p>
                    Your details are ready to send. Choose the button below
                    to open your email app with your inquiry pre-filled.
                    Nothing is sent until you press send in your email app.
                  </p>
                  <a className="button button-dark" href={buildInquiryMailto(inquiry)}>
                    Open email to send inquiry <ArrowIcon />
                  </a>
                  <button
                    className="edit-inquiry"
                    type="button"
                    onClick={() => setSubmitted(false)}
                  >
                    Review my information
                  </button>
                </div>
              ) : step === 1 ? (
                <form className="inquiry-form" onSubmit={handleContinue} noValidate>
                  <h3>First, how can we reach you?</h3>
                  <p className="form-intro">We’ll use these details to respond to your inquiry.</p>
                  <div className="form-field">
                    <label htmlFor="guardianName">Parent or guardian name <span>*</span></label>
                    <input
                      id="guardianName"
                      name="guardianName"
                      autoComplete="name"
                      value={inquiry.guardianName}
                      onChange={(event) => updateField("guardianName", event.target.value)}
                      onBlur={(event) => setErrors((current) => ({ ...current, guardianName: validateField("guardianName", event.target.value) }))}
                      aria-invalid={Boolean(errors.guardianName)}
                      aria-describedby={errors.guardianName ? "guardianName-error" : undefined}
                      placeholder="Your full name"
                      required
                    />
                    {renderError("guardianName")}
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="email">Email address <span>*</span></label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={inquiry.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        onBlur={(event) => setErrors((current) => ({ ...current, email: validateField("email", event.target.value) }))}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        placeholder="you@example.com"
                        required
                      />
                      {renderError("email")}
                    </div>
                    <div className="form-field">
                      <label htmlFor="phone">Phone number <small>Optional</small></label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={inquiry.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        onBlur={(event) => setErrors((current) => ({ ...current, phone: validateField("phone", event.target.value) }))}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        placeholder="(555) 123-4567"
                      />
                      {renderError("phone")}
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="relationship">I am the student’s <span>*</span></label>
                    <select
                      id="relationship"
                      name="relationship"
                      value={inquiry.relationship}
                      onChange={(event) => updateField("relationship", event.target.value)}
                      onBlur={(event) => setErrors((current) => ({ ...current, relationship: validateField("relationship", event.target.value) }))}
                      aria-invalid={Boolean(errors.relationship)}
                      aria-describedby={errors.relationship ? "relationship-error" : undefined}
                      required
                    >
                      <option value="">Choose one</option>
                      <option>Parent</option>
                      <option>Guardian</option>
                      <option>Student</option>
                      <option>Other family member</option>
                    </select>
                    {renderError("relationship")}
                  </div>
                  <button className="button button-dark form-next" type="submit">
                    Continue to student details <ArrowIcon />
                  </button>
                  <p className="form-privacy">Your information is used to prepare an email inquiry and is not stored by this demo form.</p>
                </form>
              ) : (
                <form className="inquiry-form" onSubmit={handleInquirySubmit} noValidate>
                  <h3>Tell us about your student.</h3>
                  <p className="form-intro">This helps our team share relevant information.</p>
                  <div className="form-field">
                    <label htmlFor="studentName">Student’s name <span>*</span></label>
                    <input
                      id="studentName"
                      name="studentName"
                      autoComplete="off"
                      value={inquiry.studentName}
                      onChange={(event) => updateField("studentName", event.target.value)}
                      onBlur={(event) => setErrors((current) => ({ ...current, studentName: validateField("studentName", event.target.value) }))}
                      aria-invalid={Boolean(errors.studentName)}
                      aria-describedby={errors.studentName ? "studentName-error" : undefined}
                      placeholder="Student’s full name"
                      required
                    />
                    {renderError("studentName")}
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="grade">Intended grade <span>*</span></label>
                      <select
                        id="grade"
                        name="grade"
                        value={inquiry.grade}
                        onChange={(event) => updateField("grade", event.target.value)}
                        onBlur={(event) => setErrors((current) => ({ ...current, grade: validateField("grade", event.target.value) }))}
                        aria-invalid={Boolean(errors.grade)}
                        aria-describedby={errors.grade ? "grade-error" : undefined}
                        required
                      >
                        <option value="">Choose a grade</option>
                        <option>Kindergarten</option>
                        <option>Grade 1</option>
                        <option>Grade 2</option>
                        <option>Grade 3</option>
                        <option>Grade 4</option>
                        <option>Grade 5</option>
                        <option>Grade 6</option>
                        <option>Grade 7</option>
                        <option>Grade 8</option>
                        <option>Grade 9</option>
                        <option>Grade 10</option>
                        <option>Grade 11</option>
                        <option>Grade 12</option>
                      </select>
                      {renderError("grade")}
                    </div>
                    <div className="form-field">
                      <label htmlFor="startTerm">Preferred start</label>
                      <select
                        id="startTerm"
                        name="startTerm"
                        value={inquiry.startTerm}
                        onChange={(event) => updateField("startTerm", event.target.value)}
                      >
                        <option>Fall 2026</option>
                        <option>Spring 2027</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="message">What would you like to know? <small>Optional</small></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={inquiry.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      placeholder="Ask us about visits, the application, or anything else."
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      className="form-back"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </button>
                    <button className="button button-dark" type="submit">
                      Review inquiry <ArrowIcon />
                    </button>
                  </div>
                  <p className="form-privacy">No account needed. You’ll review your message before sending it from your email app.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="faq-section" id="admissions-faq">
          <div className="faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">Good questions to start with</p>
              <h2>Wondering <em>about something?</em></h2>
              <p>Here are a few answers families often look for first.</p>
              <Link href="/contact" className="text-link">
                Still have a question? Get in touch <ArrowIcon />
              </Link>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item" key={faq.question}>
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{faq.question}</strong>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand-column">
            <Link className="brand footer-brand" href="/">
              <span className="brand-mark" aria-hidden="true">A</span>
              <span>ABC School</span>
            </Link>
            <p>A place to learn, belong,<br />and grow into what’s next.</p>
            <a className="footer-email" href="mailto:hello@abcschool.edu">hello@abcschool.edu</a>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <Link href="/about">About</Link>
            <Link href="/admissions">Admissions</Link>
            <Link href="/academics">Academics</Link>
            <Link href="/#classes">Classes</Link>
          </div>
          <div className="footer-column">
            <h2>Stay connected</h2>
            <Link href="/#events">Events</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
          <div className="footer-column footer-contact">
            <h2>Come say hello</h2>
            <address>123 Learning Lane<br />Your City, ST 00000</address>
            <a href="tel:+15551234567">(555) 123-4567</a>
            <span>Monday–Friday, 8:00 am–4:00 pm</span>
          </div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>© 2026 ABC School. All rights reserved.</span>
          <div className="footer-policies">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
          <Link href="#admissions-title">Back to top ↑</Link>
        </div>
      </footer>
    </>
  );
}
