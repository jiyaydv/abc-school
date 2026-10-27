import type { Metadata } from "next";
import AboutPageContent from "./page-content";

export const metadata: Metadata = {
  title: "About Us | ABC School",
  description:
    "Discover ABC School's story, mission, global vision, milestones, and leadership.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
