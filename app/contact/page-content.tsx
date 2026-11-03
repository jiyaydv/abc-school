"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emptyMessage: ContactMessage = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

export default function ContactPageContent() {
  const [message, setMessage] = useState<ContactMessage>(emptyMessage);
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | "">("");
  const [submissionError, setSubmissionError] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setSubmissionStatus("");
    setSubmissionError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact", ...message }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(
          typeof result?.error === "string" ? result.error : "Unable to send message.",
        );
      }
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionError(
        error instanceof Error ? error.message : "We couldn't send your message. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <main className="contact-page contact-short-page">
        <section className="contact-short-heading" aria-labelledby="contact-title">
          <h1 id="contact-title">Contact</h1>
          <p>
            We’d love to hear from you. Get in touch with any questions about
            ABC School, admissions, or visiting our campus.
          </p>
        </section>

        <nav className="contact-breadcrumb-band" aria-label="Breadcrumb">
          <div className="section-wrap">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </div>
        </nav>

        <section className="contact-short-content">
          <div className="contact-info-grid">
            <article className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <h2>Our Address</h2>
              <address>123 Learning Lane, Your City, ST 00000</address>
            </article>

            <article className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 3h3l2 5-2.2 1.8a15 15 0 0 0 4.4 4.4L16 12l5 2v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 6c0-1.7.9-3 2-3Z" />
                </svg>
              </span>
              <h2>Contact Number</h2>
              <p><span>Phone: </span><a href="tel:+15551234567">+1 (555) 123-4567</a></p>
              <p><span>Email: </span><a href="mailto:hello@abcschool.edu">hello@abcschool.edu</a></p>
            </article>

            <article className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 6.5v6l4 2" />
                </svg>
              </span>
              <h2>Opening Hours</h2>
              <p>Monday – Friday: 8:00 – 16:00</p>
              <p>Saturday – Sunday: Closed</p>
            </article>
          </div>

          <section className="contact-message-section" aria-labelledby="message-title">
            <div className="contact-message-heading">
              <p className="eyebrow">Send us a message</p>
              <h2 id="message-title">How can we <em>help?</em></h2>
            </div>
            <form className="contact-message-form" onSubmit={handleSubmit}>
              <div className="contact-form-field">
                <label htmlFor="contact-name">Your name <span>*</span></label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={message.name}
                  onChange={(event) => {
                    setMessage({ ...message, name: event.target.value });
                    setSubmissionStatus("");
                  }}
                  required
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor="contact-email">Email address <span>*</span></label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={message.email}
                  onChange={(event) => {
                    setMessage({ ...message, email: event.target.value });
                    setSubmissionStatus("");
                  }}
                  required
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  placeholder="What is your message about?"
                  value={message.subject}
                  onChange={(event) => {
                    setMessage({ ...message, subject: event.target.value });
                    setSubmissionStatus("");
                  }}
                />
              </div>
              <div className="contact-form-field contact-form-message">
                <label htmlFor="contact-message">Message <span>*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Write your message"
                  value={message.message}
                  onChange={(event) => {
                    setMessage({ ...message, message: event.target.value });
                    setSubmissionStatus("");
                  }}
                  required
                />
              </div>
              {submissionStatus && (
                <p className="contact-email-ready" role={submissionStatus === "error" ? "alert" : "status"}>
                  {submissionStatus === "success"
                    ? "Thank you. Your message has been sent to ABC School."
                    : submissionError || "We couldn't send your message. Please try again."}
                </p>
              )}
              <button className="button button-dark contact-send-button" type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Send message"} <ArrowIcon />
              </button>
              <p className="contact-form-note">Your message will be sent securely to the ABC School team.</p>
            </form>
          </section>
        </section>
      </main>
    </>
  );
}
