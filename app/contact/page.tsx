import type { Metadata } from "next";
import ContactPageContent from "./page-content";

export const metadata: Metadata = {
  title: "Contact Us & Campus Visit | ABC School",
  description:
    "Contact ABC School, explore the campus, and request a visit with our admissions team.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
