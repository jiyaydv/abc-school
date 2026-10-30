"use client";

import { useState } from "react";
import Link from "next/link";
import LeaderCard from "../../components/about/LeaderCard";
import { leaders, milestones } from "./data";

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
              <LeaderCard leader={leader} key={leader.role} />
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
    </>
  );
}
