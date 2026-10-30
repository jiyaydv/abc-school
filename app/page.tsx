"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Academics", href: "/academics" },
  { label: "Classes", href: "#classes" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "/contact" },
];

const quickLinks = [
  {
    number: "01",
    title: "About our school",
    description: "Get to know the people, values, and vision that make our school special.",
    href: "/about",
    label: "Discover ABC School",
  },
  {
    number: "02",
    title: "Admissions",
    description: "Find the right starting point for your family and learn how to apply.",
    href: "/admissions",
    label: "Explore admissions",
  },
  {
    number: "03",
    title: "Academics",
    description: "A thoughtful, engaging curriculum helps every student find their spark.",
    href: "/academics",
    label: "See our approach",
  },
  {
    number: "04",
    title: "Classes",
    description: "Explore learning experiences designed for every stage of growing up.",
    href: "#classes",
    label: "View classes",
  },
];

const stats = [
  { value: "1:1", label: "Care that sees every student" },
  { value: 100, suffix: "%", label: "Room to learn your way" },
  { value: "∞", label: "Possibilities to explore" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

function CountUp({
  value,
  suffix = "",
}: {
  value: number | string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || typeof value !== "number") return;

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  if (typeof value === "string") {
    return <strong ref={ref}>{value}</strong>;
  }

  return (
    <strong ref={ref}>
      {Math.round(display)}
      {suffix}
    </strong>
  );
}

function StatsDivider({ className }: { className: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const timer = window.setTimeout(() => setIsLoading(false), 1600);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className={`loader-screen${isLoading ? " is-visible" : " is-hidden"}`} aria-live="polite" aria-busy={isLoading}>
        <div className="loader-mark-wrap" aria-hidden="true">
          <svg className="loader-mark" viewBox="0 0 140 140" role="img">
            <path d="M20 110V28l38 52 38-52v82" />
            <path d="M20 110h100" />
          </svg>
        </div>
      </div>

      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="ABC School home">
            <span className="brand-mark" aria-hidden="true">M</span>
            <span>ABC School</span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a className="nav-home" href="#home">Home</a>
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <a className="header-cta" href="/admissions">
            Apply now <ArrowIcon />
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-shade" />
          <div className="hero-content">
            <motion.p
              className="eyebrow hero-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              A place to learn, belong & grow
            </motion.p>
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="hero-line"
                initial={{ opacity: 0, y: 56, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Big possibilities
              </motion.span>
              <motion.span
                className="hero-line hero-line--last"
                initial={{ opacity: 0, y: 56, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                start <motion.em
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                >
                  right here.
                </motion.em>
              </motion.span>
            </motion.h1>
            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              At ABC School, curious minds become confident learners—and every
              student gets the room to discover what they can do.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <a className="button button-light" href="/about">Discover our school <ArrowIcon /></a>
              <a className="text-link hero-link" href="/admissions">Join our community <span aria-hidden="true">↗</span></a>
            </motion.div>
          </div>
          <div className="hero-caption">
            <span className="caption-dot" />
            A welcoming community. A world of opportunity.
          </div>
          <a className="scroll-cue" href="#welcome" aria-label="Scroll to welcome section">
            <span>Scroll to explore</span><span className="scroll-line" />
          </a>
        </section>

        <section className="welcome section-wrap" id="welcome">
          <div className="welcome-heading">
            <p className="eyebrow">Welcome to ABC School</p>
            <h2>A wonderful place<br />to <em>become yourself.</em></h2>
          </div>
          <div className="welcome-copy">
            <p>
              Childhood is full of firsts, questions, and big ideas. We create
              a warm, inspiring place where students feel known, try new things,
              and build the confidence to shape their own futures.
            </p>
            <a className="text-link" href="/about">A little more about us <ArrowIcon /></a>
          </div>
          <div className="welcome-stats" aria-label="Our school at a glance">
            <StatsDivider className="stats-divider stats-divider-top" />
            {stats.map((stat, index) => (
              <div className="stat-item" key={stat.label}>
                <motion.div
                  className="stat-divider"
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
                />
                {typeof stat.value === "number" ? (
                  <CountUp value={stat.value} suffix={stat.suffix ?? ""} />
                ) : (
                  <strong>{stat.value}</strong>
                )}
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="quick-section" aria-labelledby="quick-title">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Find your way</p>
                <h2 id="quick-title">Your next step <em>starts here.</em></h2>
              </div>
              <p className="section-intro">
                New to ABC School? Looking for something specific? Start with the
                information you need.
              </p>
            </div>
            <div className="quick-grid">
              {quickLinks.map((item) => (
                <article className="quick-card" key={item.number}>
                  <span className="card-number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <a href={item.href} aria-label={item.label}>
                    <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-image" role="img" aria-label="Sunlit school building surrounded by trees">
            <span className="image-note">Learning today, leading tomorrow.</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">More than a school</p>
            <h2>Known by name.<br /><em>Inspired for life.</em></h2>
            <p>
              The best learning happens when children feel safe enough to be
              curious and supported enough to be brave. Our caring teachers
              make space for both—every day, in every classroom.
            </p>
            <a className="text-link" href="/contact">Come see us in person <ArrowIcon /></a>
            <span className="handwritten">Your story belongs here.</span>
          </div>
        </section>

        <section className="learning-section" id="academics">
          <div className="section-wrap learning-inner">
            <div className="learning-copy">
              <p className="eyebrow">Learning with purpose</p>
              <h2>Curiosity leads.<br /><em>Confidence follows.</em></h2>
              <p>
                From the first question to the final project, we help students
                connect ideas, find their voice, and take pride in the progress
                they make.
              </p>
              <a className="button button-dark" href="/academics">Explore academics <ArrowIcon /></a>
            </div>
            <div className="learning-aside">
              <span className="aside-mark" aria-hidden="true">“</span>
              <blockquote>
                A great education doesn’t just fill a mind. It helps a young
                person discover what their mind can do.
              </blockquote>
              <span className="aside-caption">The ABC School approach</span>
            </div>
          </div>
        </section>

        <section className="pathways section-wrap" id="classes">
          <div className="pathways-heading">
            <p className="eyebrow">Every age, every stage</p>
            <h2>Room to grow <em>at every step.</em></h2>
          </div>
          <div className="pathway-list">
            <a href="/admissions" className="pathway">
              <span className="pathway-index">01</span>
              <span><strong>Early learning</strong><small>Wonder, play, and first discoveries</small></span>
              <ArrowIcon />
            </a>
            <a href="/admissions" className="pathway">
              <span className="pathway-index">02</span>
              <span><strong>Elementary</strong><small>Strong foundations and bright ideas</small></span>
              <ArrowIcon />
            </a>
            <a href="/admissions" className="pathway">
              <span className="pathway-index">03</span>
              <span><strong>Middle school</strong><small>Finding a voice and thinking bigger</small></span>
              <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="events-section" id="events">
          <div className="section-wrap events-inner">
            <div>
              <p className="eyebrow">There’s always something happening</p>
              <h2>Come be part <em>of it.</em></h2>
              <p className="events-copy">
                From family gatherings to student showcases, our school is
                better when we’re together. We’d love to see you at an upcoming
                event.
              </p>
            </div>
            <a className="event-card" href="/contact">
              <span className="event-label">Save the date</span>
              <span className="event-name">A day at ABC School</span>
              <span className="event-details">Visit, meet our teachers, and explore campus.</span>
              <span className="event-link">Ask us about our next open house <ArrowIcon /></span>
            </a>
          </div>
        </section>

        <section className="admissions-section" id="admissions">
          <div className="admissions-inner">
            <p className="eyebrow">Your next chapter</p>
            <h2>Let’s make room<br />for <em>what’s possible.</em></h2>
            <p>We’d love to help you find out if ABC School feels like the right fit.</p>
            <a className="button button-light" href="/contact">Start a conversation <ArrowIcon /></a>
          </div>
          <span className="admissions-flower" aria-hidden="true">✳</span>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-main section-wrap">
          <div className="footer-brand-column">
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark" aria-hidden="true">M</span>
              <span>ABC School</span>
            </a>
            <p>A place to learn, belong,<br />and grow into what’s next.</p>
            <a className="footer-email" href="mailto:hello@myschool.edu">hello@myschool.edu</a>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <a href="/about">About</a>
            <a href="/admissions">Admissions</a>
            <a href="/academics">Academics</a>
            <a href="#classes">Classes</a>
          </div>
          <div className="footer-column">
            <h2>Stay connected</h2>
            <a href="#events">Events</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
          <div className="footer-column footer-contact">
            <h2>Come say hello</h2>
            <address>
              123 Learning Lane<br />
              Your City, ST 00000
            </address>
            <a href="tel:+15551234567">(555) 123-4567</a>
            <span>Monday–Friday, 8:00 am–4:00 pm</span>
          </div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>© 2026 ABC School. All rights reserved.</span>
          <div className="footer-policies">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
