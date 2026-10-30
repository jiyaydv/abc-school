"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const programs = [
  { id: "kindergarten", label: "Kindergarten", short: "K" },
  { id: "elementary", label: "Elementary", short: "01-05" },
  { id: "middle", label: "Middle School", short: "06-08" },
  { id: "high", label: "High School", short: "09-12" },
  { id: "advanced", label: "Advanced Placement (AP/IB)", short: "AP / IB" },
];

const departments = [
  {
    id: "robotics",
    name: "Robotics Lab",
    category: "DESIGN / ENGINEERING",
    icon: "⌘",
    image:
      "https://images.unsplash.com/photo-1561144257-e32e8efc6f30?auto=format&fit=crop&w=900&q=85",
    highlights: {
      kindergarten: ["Build-and-test play", "Patterns, shapes, and simple machines", "Team challenge: make it move"],
      elementary: ["Block coding and sequencing", "Sensors, gears, and basic circuits", "Design a helpful classroom robot"],
      middle: ["Programming with sensors", "Prototyping and engineering journals", "Build an autonomous rover"],
      high: ["Mechatronics and applied coding", "CAD, fabrication, and system design", "Capstone: solve a community need"],
      advanced: ["AP Computer Science principles", "IB Design Technology investigation", "Independent robotics research project"],
    },
    outcomes: {
      kindergarten: "Ask questions, try an idea, and explain what happened.",
      elementary: "Use a design cycle to build, test, and improve a solution.",
      middle: "Program a prototype and support design choices with evidence.",
      high: "Integrate software and hardware to address a complex challenge.",
      advanced: "Evaluate a technical system and present a documented solution.",
    },
  },
  {
    id: "arts",
    name: "Visual Arts",
    category: "CREATE / COMMUNICATE",
    icon: "✳",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85",
    highlights: {
      kindergarten: ["Color, line, and texture explorations", "Clay, collage, and big ideas", "Tell a story through pictures"],
      elementary: ["Drawing and painting foundations", "Printmaking and three-dimensional forms", "Create a gallery-ready portfolio"],
      middle: ["Studio practice and visual composition", "Art history across cultures", "Develop a personal theme and portfolio"],
      high: ["Advanced studio techniques", "Critique, curation, and visual literacy", "Exhibition-quality portfolio"],
      advanced: ["AP Studio Art portfolio development", "IB Visual Arts comparative study", "Artist statement and final exhibition"],
    },
    outcomes: {
      kindergarten: "Explore materials and share the story behind an artwork.",
      elementary: "Choose techniques to communicate an idea with intention.",
      middle: "Reflect on artistic choices and make work with a point of view.",
      high: "Build a cohesive body of original work and discuss its influences.",
      advanced: "Present a sustained portfolio with thoughtful visual analysis.",
    },
  },
  {
    id: "humanities",
    name: "Humanities",
    category: "QUESTION / UNDERSTAND",
    icon: "⌂",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85",
    highlights: {
      kindergarten: ["Stories, community, and belonging", "Maps and the world around us", "Ask, listen, and share"],
      elementary: ["Reading circles and source skills", "Local history and world cultures", "Write a researched class story"],
      middle: ["Literature, history, and civic dialogue", "Media literacy and source evaluation", "Create a museum-style inquiry project"],
      high: ["Seminar discussion and close reading", "Historical evidence and civic systems", "Research, argue, and publish"],
      advanced: ["AP / IB seminar and source analysis", "Comparative perspectives across societies", "Extended research and oral defense"],
    },
    outcomes: {
      kindergarten: "Listen with curiosity and share ideas with confidence.",
      elementary: "Connect a text or artifact to people, place, and time.",
      middle: "Compare sources and build a claim using supporting evidence.",
      high: "Develop a clear argument and consider more than one perspective.",
      advanced: "Complete independent inquiry and communicate nuanced conclusions.",
    },
  },
  {
    id: "athletics",
    name: "Athletic Training",
    category: "MOVE / PERSEVERE",
    icon: "↗",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    highlights: {
      kindergarten: ["Balance, rhythm, and active play", "Kind teamwork and turn-taking", "Discover movement you enjoy"],
      elementary: ["Fundamental movement skills", "Small-sided games and fair play", "Set a personal activity goal"],
      middle: ["Strength, mobility, and coordination", "Game strategy and team roles", "Track progress and recovery"],
      high: ["Performance training and conditioning", "Sport nutrition and injury prevention", "Build a personal training plan"],
      advanced: ["Exercise science and biomechanics", "Performance data and training cycles", "Coach a peer through a safe program"],
    },
    outcomes: {
      kindergarten: "Move safely and enjoy being active with others.",
      elementary: "Practice skills, encourage teammates, and set healthy goals.",
      middle: "Apply strategy and reflect on effort, recovery, and progress.",
      high: "Plan safe training and understand the habits behind performance.",
      advanced: "Use movement science to design and evaluate a training program.",
    },
  },
];

const steamProjects = [
  {
    label: "STUDENT PROJECT",
    title: "A garden that waters itself",
    detail: "Middle school makers built a soil-sensing irrigation prototype.",
  },
  {
    label: "COMPETITION HIGHLIGHT",
    title: "Regional robotics finalists",
    detail: "A student team earned a design award for its assistive robot concept.",
  },
  {
    label: "MAKER-LAB CERTIFICATION",
    title: "Safe tool-use pathway",
    detail: "Students complete guided training before using fabrication equipment.",
  },
];

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function createSyllabusPdf(programLabel: string, programShort: string) {
  const lines = [
    "ABC SCHOOL",
    `${programLabel.toUpperCase()} CURRICULUM GUIDE`,
    `Program level: ${programShort}`,
    "",
    "Our approach",
    "Curious, caring learners grow through meaningful projects,",
    "strong foundations, creative practice, and reflection.",
    "",
    "Learning areas",
    "Robotics Lab - design, coding, prototyping, and problem solving",
    "Visual Arts - studio practice, visual literacy, and portfolio work",
    "Humanities - literature, history, inquiry, and communication",
    "Athletic Training - movement, teamwork, wellbeing, and goal setting",
    "",
    "Learning outcomes",
    "Students communicate ideas, collaborate with others,",
    "use evidence, and reflect on progress.",
    "",
    "This sample overview is a general guide. Contact ABC School",
    "for current course descriptions and official program requirements.",
  ];
  const textCommands = lines
    .map((line, index) => `1 0 0 1 58 ${755 - index * 31} Tm (${escapePdfText(line)}) Tj`)
    .join("\n");
  const stream = `BT\n/F1 11 Tf\n${textCommands}\nET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function downloadSyllabus(programLabel: string, programShort: string) {
  const pdf = createSyllabusPdf(programLabel, programShort);
  const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `abc-school-${programLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-syllabus.pdf`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.75v9.5m-3.5-3.5 3.5 3.5 3.5-3.5M3.5 14v2.5h13V14" />
    </svg>
  );
}

export default function AcademicsPageContent() {
  const [activeProgram, setActiveProgram] = useState(programs[0].id);
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const program = programs.find((item) => item.id === activeProgram) ?? programs[0];

  function selectProgram(programId: string) {
    setActiveProgram(programId);
    setActiveDepartment(0);
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }

  function moveCarousel(direction: -1 | 1) {
    const container = carouselRef.current;
    if (!container) return;
    const firstCard = container.querySelector<HTMLElement>(".curriculum-card");
    if (!firstCard) return;
    container.scrollBy({
      left: direction * (firstCard.offsetWidth + 18),
      behavior: "smooth",
    });
  }

  function handleCarouselScroll() {
    const container = carouselRef.current;
    const firstCard = container?.querySelector<HTMLElement>(".curriculum-card");
    if (!container || !firstCard) return;
    const cardWidth = firstCard.offsetWidth + 18;
    setActiveDepartment(Math.min(departments.length - 1, Math.round(container.scrollLeft / cardWidth)));
  }

  return (
    <>
      <main className="academics-page">
        <section className="academics-hero" aria-labelledby="academics-title">
          <div className="academics-hero-image" />
          <div className="academics-hero-shade" />
          <div className="academics-hero-content">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Academics &amp; Curriculum</span>
            </nav>
            <p className="eyebrow">A strong foundation for what comes next</p>
            <h1 id="academics-title">Learn with purpose.<br /><em>Grow without limits.</em></h1>
            <p>
              A connected curriculum gives every student the tools to explore
              deeply, create boldly, and bring ideas to life.
            </p>
            <a className="button button-light" href="#programs">
              Explore our programs <ArrowIcon />
            </a>
          </div>
          <div className="academics-hero-note">
            <span>ABC ACADEMICS</span>
            <strong>Curiosity in action.</strong>
          </div>
        </section>

        <section className="program-section" id="programs">
          <div className="academics-section-heading">
            <div>
              <p className="eyebrow">A pathway for every learner</p>
              <h2>Choose your <em>next step.</em></h2>
            </div>
            <p>
              Every stage builds on the last—developing knowledge, creativity,
              and confidence along the way.
            </p>
          </div>

          <div className="program-tabs" role="tablist" aria-label="Select a school program">
            {programs.map((item) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                className={`program-tab${activeProgram === item.id ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeProgram === item.id}
                aria-controls="program-panel"
                onClick={() => selectProgram(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="program-panel" id="program-panel" role="tabpanel" aria-labelledby={`tab-${activeProgram}`}>
            <div className="curriculum-main">
              <div className="curriculum-topline">
                <div>
                  <span className="program-level">{program.short} / ACADEMIC PATHWAY</span>
                  <h3>{program.label}</h3>
                </div>
                <div className="carousel-controls">
                  <span>{String(activeDepartment + 1).padStart(2, "0")} <i>/</i> {String(departments.length).padStart(2, "0")}</span>
                  <button type="button" aria-label="Previous department" onClick={() => moveCarousel(-1)}>←</button>
                  <button type="button" aria-label="Next department" onClick={() => moveCarousel(1)}>→</button>
                </div>
              </div>
              <div
                className="curriculum-carousel"
                ref={carouselRef}
                onScroll={handleCarouselScroll}
                aria-label={`${program.label} departments; swipe or use arrow buttons to explore`}
              >
                {departments.map((department) => (
                  <article className="curriculum-card" key={department.id}>
                    <div className="curriculum-card-image" style={{ backgroundImage: `url("${department.image}")` }}>
                      <span className="department-icon" aria-hidden="true">{department.icon}</span>
                      <span className="department-category">{department.category}</span>
                    </div>
                    <div className="curriculum-card-content">
                      <h4>{department.name}</h4>
                      <p className="course-label">COURSE HIGHLIGHTS</p>
                      <ul>
                        {department.highlights[activeProgram as keyof typeof department.highlights].map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                      <div className="learning-outcome">
                        <span>LEARNING OUTCOME</span>
                        <p>{department.outcomes[activeProgram as keyof typeof department.outcomes]}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="carousel-dots" aria-label="Select a department">
                {departments.map((department, index) => (
                  <button
                    key={department.id}
                    type="button"
                    className={activeDepartment === index ? "is-active" : ""}
                    aria-label={`Show ${department.name}`}
                    aria-pressed={activeDepartment === index}
                    onClick={() => {
                      const firstCard = carouselRef.current?.querySelector<HTMLElement>(".curriculum-card");
                      if (firstCard) {
                        carouselRef.current?.scrollTo({
                          left: index * (firstCard.offsetWidth + 18),
                          behavior: "smooth",
                        });
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            <aside className={`steam-widget${showAllProjects ? " is-expanded" : ""}`}>
              <div className="steam-widget-head">
                <span className="steam-mark" aria-hidden="true">✳</span>
                <span>STEAM IN ACTION</span>
              </div>
              <h3>Ideas become<br /><em>real things.</em></h3>
              <p className="steam-intro">
                Students learn by making, testing, and sharing their ideas.
                Here&apos;s a glimpse of what is happening in our labs.
              </p>
              <div className="steam-projects">
                {steamProjects.slice(0, showAllProjects ? steamProjects.length : 1).map((project) => (
                  <article className="steam-project" key={project.title}>
                    <span>{project.label}</span>
                    <h4>{project.title}</h4>
                    <p>{project.detail}</p>
                  </article>
                ))}
              </div>
              <button
                className="steam-toggle"
                type="button"
                aria-expanded={showAllProjects}
                onClick={() => setShowAllProjects((expanded) => !expanded)}
              >
                {showAllProjects ? "Show featured project" : "More from the maker lab"}
                <span aria-hidden="true">{showAllProjects ? "−" : "+"}</span>
              </button>
              <span className="steam-note">Student highlights · ABC School</span>
              <span className="steam-disclaimer">
                Sample spotlights; replace with verified school news.
              </span>
            </aside>
          </div>
        </section>

        <section className="syllabus-section" id="syllabus">
          <div className="syllabus-orbit" aria-hidden="true">✳</div>
          <div className="syllabus-content">
            <p className="eyebrow">Take a closer look</p>
            <h2>A guide to <em>what’s ahead.</em></h2>
            <p>
              Download a program overview to explore sample learning areas
              and outcomes for each stage.
            </p>
            <div className="syllabus-chips" aria-label="Download a program syllabus">
              {programs.map((item) => (
                <button
                  className="syllabus-chip"
                  type="button"
                  key={item.id}
                  onClick={() => downloadSyllabus(item.label, item.short)}
                >
                  <span className="syllabus-chip-icon"><DownloadIcon /></span>
                  <span><strong>{item.label}</strong><small>PDF · Program overview</small></span>
                  <span className="syllabus-chip-arrow" aria-hidden="true">↓</span>
                </button>
              ))}
            </div>
            <p className="syllabus-note">
              These downloadable overviews are general samples; please contact
              ABC School for current official course and program requirements.
            </p>
          </div>
        </section>

        <section className="academics-cta">
          <p className="eyebrow">There’s more to discover</p>
          <h2>Find your place<br />to <em>make an impact.</em></h2>
          <p>Let’s talk about the next step in your learning journey.</p>
          <Link className="button button-light" href="/contact">
            Connect with us <ArrowIcon />
          </Link>
        </section>
      </main>
    </>
  );
}
