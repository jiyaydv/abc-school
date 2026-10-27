import type { Metadata } from "next";
import AdmissionsPageContent from "./page-content";

export const metadata: Metadata = {
  title: "Admissions | ABC School",
  description:
    "Start a conversation with ABC School and learn about applying for the 2026–2027 academic year.",
};

export default function AdmissionsPage() {
  return <AdmissionsPageContent />;
}
