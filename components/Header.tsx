"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const isAdmissions = pathname === "/admissions";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="ABC School home">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>ABC School</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link
            className={pathname === "/about" ? "nav-home" : undefined}
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
          <Link
            className={pathname === "/academics" ? "nav-home" : undefined}
            href="/academics"
            aria-current={pathname === "/academics" ? "page" : undefined}
          >
            Academics
          </Link>
          <Link href="/#classes">Classes</Link>
          <Link href="/#events">Events</Link>
          {isAdmissions ? (
            <Link className="nav-home" href="/admissions" aria-current="page">
              Admissions
            </Link>
          ) : (
            <Link
              className={pathname === "/contact" ? "nav-home" : undefined}
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
            >
              Contact
            </Link>
          )}
        </nav>
        <Link className="header-cta" href={isAdmissions ? "/contact" : "/admissions"}>
          {isAdmissions ? "Contact" : "Admissions"} <ArrowIcon />
        </Link>
      </div>
    </header>
  );
}
