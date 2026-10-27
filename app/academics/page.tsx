import type { Metadata } from "next";
import AcademicsPageContent from "./page-content";

export const metadata: Metadata = {
  title: "Academics & Curriculum | ABC School",
  description:
    "Explore ABC School's programs, curriculum departments, student projects, and grade-level syllabi.",
};

export default function AcademicsPage() {
  return <AcademicsPageContent />;
}
