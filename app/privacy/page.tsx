import type { Metadata } from "next";
import LegalPageContent from "../legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy | ABC School",
  description:
    "Read how ABC School's website handles information shared through its contact options.",
};

export default function PrivacyPage() {
  return <LegalPageContent kind="privacy" />;
}
