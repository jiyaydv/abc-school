import Link from "next/link";

export type LegalPageKind = "privacy" | "terms";

const legalPages = {
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Your information matters",
    intro:
      "This page explains what to expect when you browse the ABC School website or choose to contact us through it.",
    updated: "October 2026",
    sections: [
      {
        title: "Information you choose to share",
        paragraphs: [
          "The contact and admissions forms on this website prepare a message in your own email application. The website does not submit those form details to a school server. Information is shared with ABC School only if you choose to send the prepared email.",
          "If you contact the school directly by phone or email, the information you provide will be handled by the school to respond to your request. Please do not include sensitive student, health, or financial information in a general inquiry.",
        ],
      },
      {
        title: "Information collected while browsing",
        paragraphs: [
          "The website may make requests to third-party services used to display assets, such as externally hosted images or fonts. Those providers may receive technical information such as your IP address and browser details when your browser requests their content.",
          "This website does not currently provide an online account, payment service, or application-submission system. This policy should be updated if analytics, advertising, cookies, or other data-collection tools are added.",
        ],
      },
      {
        title: "How information is used",
        paragraphs: [
          "When you choose to contact the school, the information in your message can be used to respond to your question, discuss admissions, or coordinate a requested visit. The school should retain and manage correspondence according to its own records and retention practices.",
        ],
      },
      {
        title: "Children and families",
        paragraphs: [
          "Parents and guardians should use the website contact options on behalf of younger students. Please share only the information needed for the school to respond. Contact ABC School directly if you have a question about a student’s information or records.",
        ],
      },
      {
        title: "Your choices and questions",
        paragraphs: [
          "You can choose not to send a prepared email. For questions about information you have shared directly with the school, contact hello@abcschool.edu or call (555) 123-4567.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    eyebrow: "Using this website",
    intro:
      "These terms describe the basic expectations for using the ABC School website and its public information.",
    updated: "October 2026",
    sections: [
      {
        title: "Website information",
        paragraphs: [
          "This website provides general information about ABC School, its programs, and ways to contact the school. Content is for informational purposes and may change without notice. Contact the school to confirm current schedules, availability, fees, admissions requirements, and other details.",
          "Any sample contact details, dates, program descriptions, or other illustrative content should be confirmed with ABC School before you rely on it.",
        ],
      },
      {
        title: "Admissions and visit requests",
        paragraphs: [
          "Using a contact link or preparing an email does not create an application, reserve a place, or confirm a campus visit. A visit or application is confirmed only when ABC School communicates confirmation through its official process.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Use this website lawfully and respectfully. Do not attempt to disrupt the site, interfere with other visitors, or use the site to send unlawful, misleading, or harmful material.",
        ],
      },
      {
        title: "External services and links",
        paragraphs: [
          "The website may link to third-party services or display content hosted by external providers. Those services operate under their own terms and privacy practices; ABC School does not control their content or availability.",
        ],
      },
      {
        title: "Questions",
        paragraphs: [
          "If you have questions about this website or these terms, contact hello@abcschool.edu or call (555) 123-4567.",
        ],
      },
    ],
  },
} satisfies Record<LegalPageKind, {
  title: string;
  eyebrow: string;
  intro: string;
  updated: string;
  sections: { title: string; paragraphs: string[] }[];
}>;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

export default function LegalPageContent({ kind }: { kind: LegalPageKind }) {
  const page = legalPages[kind];

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
            <Link href="/contact">Contact</Link>
          </nav>
          <Link className="header-cta" href="/admissions">
            Admissions <ArrowIcon />
          </Link>
        </div>
      </header>

      <main className="legal-page" id="legal-top">
        <section className="legal-hero">
          <div className="legal-hero-inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">/</span><span>{page.title}</span>
            </nav>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
        </section>

        <div className="legal-layout">
          <aside className="legal-sidebar">
            <p className="eyebrow">School policies</p>
            <Link className={kind === "privacy" ? "is-current" : ""} href="/privacy">Privacy Policy</Link>
            <Link className={kind === "terms" ? "is-current" : ""} href="/terms">Terms of Use</Link>
            <span>Last reviewed: {page.updated}</span>
          </aside>

          <article className="legal-document">
            <div className="legal-review-note">
              <span aria-hidden="true">i</span>
              <p>
                Please have ABC School review this draft and confirm that it
                reflects the school&apos;s actual policies before publication.
              </p>
            </div>
            {page.sections.map((section, index) => (
              <section className="legal-section" key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
            <div className="legal-contact">
              <p>Need more information?</p>
              <Link href="/contact">Contact ABC School <ArrowIcon /></Link>
            </div>
          </article>
        </div>
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
          <Link href="#legal-top">Back to top ↑</Link>
        </div>
      </footer>
    </>
  );
}
