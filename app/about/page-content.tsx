"use client";

import { useState } from "react";
import Link from "next/link";

const milestones = [
  {
    year: 1988,
    title: "A school begins with a big idea",
    story:
      "ABC School opens its doors with a simple promise: every child deserves to be known, encouraged, and challenged. A close-knit first community lays the foundations for a school built around belonging.",
    achievement: "The first classrooms welcome our founding students.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85",
    alt: "A historic school building in warm afternoon light",
  },
  {
    year: 2000,
    title: "Growing together",
    story:
      "A new century brings new families and fresh possibilities. ABC grows its learning spaces while holding on to the personal care and community spirit that shaped its early years.",
    achievement: "A new campus brings more room to learn and play.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
    alt: "Students learning together in a bright classroom",
  },
  {
    year: 2012,
    title: "Learning beyond the classroom",
    story:
      "Hands-on projects, creative arts, and meaningful service become an even bigger part of the student experience. Learning connects to the world outside school walls.",
    achievement: "Project-based learning and community partnerships take root.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85",
    alt: "Students collaborating on a classroom activity",
  },
  {
    year: 2024,
    title: "A community without borders",
    story:
      "As the world changes, ABC strengthens its focus on global understanding, thoughtful technology, and the skills students need to make a positive difference.",
    achievement: "A refreshed global learning program connects students and ideas.",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85",
    alt: "Students sharing ideas in a sunlit learning space",
  },
  {
    year: 2026,
    title: "The next chapter is yours",
    story:
      "Today, the ABC community keeps looking ahead. We are building on generations of care and curiosity, making space for every student to find their voice and shape what comes next.",
    achievement: "Celebrating 38 years of learning, belonging, and growth.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",
    alt: "A welcoming modern school campus",
  },
];

const leaders = [
  {
    role: "Board of Trustees",
    name: "Guiding our community",
    description:
      "Our trustees steward the school’s mission and long-term vision, bringing care, experience, and a commitment to students’ futures.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
    alt: "School community members meeting together",
    linkedin:
      "https://www.linkedin.com/search/results/companies/?keywords=ABC%20School",
  },
  {
    role: "Principal",
    name: "Leading with purpose",
    description:
      "Our principal works alongside teachers, students, and families to make sure every learner feels seen, supported, and ready to grow.",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=85",
    alt: "Educator smiling in a bright school setting",
    linkedin:
      "https://www.linkedin.com/search/results/people/?keywords=ABC%20School%20Principal",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

export default function AboutPageContent() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const milestone = milestones[activeMilestone];

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
            <Link className="nav-home" href="/about" aria-current="page">About</Link>
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

      <main className="about-page">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero-image" />
          <div className="about-hero-shade" />
          <div className="about-hero-content">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">/</span><span>About us</span>
            </nav>
            <p className="eyebrow">Rooted in care. Ready for tomorrow.</p>
            <h1 id="about-title">A school with<br /><em>room to become.</em></h1>
            <p className="about-hero-copy">
              Since 1988, ABC School has helped young people discover what
              they can do—and who they want to be.
            </p>
          </div>
          <div className="established-badge">
            <span className="badge-star" aria-hidden="true">✳</span>
            <span>Established<br /><strong>in 1988</strong></span>
          </div>
          <a className="about-scroll" href="#mission">Scroll to discover <span aria-hidden="true">↓</span></a>
        </section>

        <section className="mission-section" id="mission">
          <div className="mission-heading">
            <p className="eyebrow">What guides us</p>
            <h2>Grounded in purpose.<br /><em>Open to possibility.</em></h2>
          </div>
          <div className="mission-cards">
            <article className="mission-card mission-card-primary">
              <span className="mission-card-number">01 / OUR MISSION</span>
              <span className="mission-card-icon" aria-hidden="true">✳</span>
              <h3>Our Mission</h3>
              <p>
                To nurture curious, compassionate learners through meaningful
                relationships, a joyful pursuit of knowledge, and the courage
                to make a difference.
              </p>
              <span className="mission-card-bottom">Every student. Every day.</span>
            </article>
            <article className="mission-card mission-card-light">
              <span className="mission-card-number">02 / OUR GLOBAL VISION</span>
              <span className="mission-card-icon" aria-hidden="true">◎</span>
              <h3>Our Global Vision</h3>
              <p>
                To prepare thoughtful global citizens who meet the future with
                empathy, imagination, and the confidence to contribute wherever
                life takes them.
              </p>
              <span className="mission-card-bottom">Learning that reaches further.</span>
            </article>
          </div>
        </section>

        <section className="timeline-section" id="our-story">
          <div className="timeline-heading">
            <p className="eyebrow">Our story, year by year</p>
            <h2>Built on yesterday.<br /><em>Inspired by tomorrow.</em></h2>
            <p className="timeline-intro">
              Explore the moments that have shaped our school—and the community
              we continue to build together.
            </p>
          </div>

          <div className="timeline-control" aria-label="School history timeline">
            <div className="timeline-years">
              {milestones.map((item, index) => (
                <button
                  className={`timeline-year${index === activeMilestone ? " is-active" : ""}`}
                  type="button"
                  key={item.year}
                  aria-pressed={index === activeMilestone}
                  onClick={() => setActiveMilestone(index)}
                >
                  <span className="timeline-dot" />
                  <span>{item.year}</span>
                </button>
              ))}
            </div>
            <label className="timeline-range-label" htmlFor="milestone-range">
              Choose a year
            </label>
            <input
              id="milestone-range"
              className="timeline-range"
              type="range"
              min="0"
              max={milestones.length - 1}
              step="1"
              value={activeMilestone}
              aria-label={`Selected milestone: ${milestone.year}`}
              onChange={(event) => setActiveMilestone(Number(event.target.value))}
            />
          </div>

          <article className="milestone-story" aria-live="polite">
            <div
              className="milestone-photo"
              role="img"
              aria-label={milestone.alt}
              style={{ backgroundImage: `url("${milestone.image}")` }}
            >
              <span className="photo-year">{milestone.year}</span>
              <span className="photo-caption">Illustrative school photo</span>
            </div>
            <div className="milestone-copy">
              <p className="eyebrow">A moment in our story</p>
              <h3>{milestone.title}</h3>
              <p>{milestone.story}</p>
              <div className="milestone-achievement">
                <span className="achievement-mark" aria-hidden="true">✳</span>
                <span><small>Milestone</small><strong>{milestone.achievement}</strong></span>
              </div>
              <div className="milestone-controls">
                <span>{String(activeMilestone + 1).padStart(2, "0")} <i>/</i> {String(milestones.length).padStart(2, "0")}</span>
                <div>
                  <button
                    type="button"
                    aria-label="Previous milestone"
                    disabled={activeMilestone === 0}
                    onClick={() => setActiveMilestone((index) => Math.max(0, index - 1))}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next milestone"
                    disabled={activeMilestone === milestones.length - 1}
                    onClick={() => setActiveMilestone((index) => Math.min(milestones.length - 1, index + 1))}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </article>
          <p className="timeline-note">
            Timeline stories, achievements, and photos are starter content;
            replace them with ABC School’s verified milestones and archive images.
          </p>
        </section>

        <section className="leadership-section" id="leadership">
          <div className="leadership-heading">
            <div>
              <p className="eyebrow">The people behind the purpose</p>
              <h2>Guided by care.<br /><em>United by possibility.</em></h2>
            </div>
            <p>
              Great schools are built by people who believe in the potential
              of every student. Meet the leadership guiding ABC School forward.
            </p>
          </div>
          <div className="leadership-grid">
            {leaders.map((leader) => (
              <article className="leader-card" key={leader.role}>
                <div
                  className="leader-photo"
                  role="img"
                  aria-label={leader.alt}
                  style={{ backgroundImage: `url("${leader.image}")` }}
                />
                <div className="leader-quote-badge">“A place where every learner belongs.”</div>
                <div className="leader-info">
                  <p>{leader.role}</p>
                  <h3>{leader.name}</h3>
                  <span className="leader-linkedin" aria-label={`${leader.role} LinkedIn search`}>
                    in
                  </span>
                </div>
                <div className="leader-overlay">
                  <span className="leader-overlay-role">{leader.role}</span>
                  <h3>{leader.name}</h3>
                  <p>{leader.description}</p>
                  <a href={leader.linkedin} target="_blank" rel="noreferrer">
                    Connect on LinkedIn <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="leadership-note">
            Leadership details are presented by role. Contact the school for
            current trustee and principal names.
          </p>
        </section>

        <section className="about-cta">
          <p className="eyebrow">Come see what makes us, us</p>
          <h2>There’s a place<br />for <em>you here.</em></h2>
          <p>Meet our community and imagine what your next chapter could be.</p>
          <Link className="button button-light" href="/contact">
            Get in touch <ArrowIcon />
          </Link>
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
          <a href="#about-title">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
