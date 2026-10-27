import type { Metadata } from "next";
import LegalPageContent from "../legal-content";

export const metadata: Metadata = {
  title: "Terms of Use | ABC School",
  description:
    "Read the terms for using the ABC School website and its public information.",
};

export default function TermsPage() {
  return <LegalPageContent kind="terms" />;
}
