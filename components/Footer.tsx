"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const backToTopHref = {
    "/about": "#about-title",
    "/academics": "#academics-title",
    "/admissions": "#admissions-title",
    "/contact": "#contact-title",
  }[pathname] ?? "#legal-top";

  return (
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
        {pathname === "/about" ? (
          <a href={backToTopHref}>Back to top ↑</a>
        ) : (
          <Link href={backToTopHref}>Back to top ↑</Link>
        )}
      </div>
    </footer>
  );
}
