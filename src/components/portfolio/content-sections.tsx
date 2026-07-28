"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Compass,
  Download,
  Layers3,
  Mail,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { profile } from "@/content/profile";
import { ScrollSurface } from "./scroll-surface";
import styles from "../hero.module.css";
import setupStyles from "./portfolio-setup.module.css";

type SectionProps = { shouldReduceMotion: boolean };

const capabilities = [
  { icon: Code2, title: "Web products", description: "Fast, accessible interfaces and complete product experiences built for real users and real business goals.", tags: ["Product websites", "Web applications", "Admin platforms"] },
  { icon: Smartphone, title: "Mobile applications", description: "Cross-platform mobile experiences with thoughtful navigation, reliable state, and native-feeling interaction.", tags: ["React Native", "Expo applications", "Responsive systems"] },
  { icon: Layers3, title: "Product systems", description: "Maintainable frontend architecture that connects design systems, APIs, authentication, and complex workflows.", tags: ["Design systems", "API integration", "Frontend architecture"] },
] as const;

const skillGroups = [
  { id: "frontend", label: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { id: "mobile", label: "Mobile", skills: ["React Native", "Expo", "Responsive UI"] },
  { id: "backend", label: "Backend / APIs", skills: ["REST APIs", "Firebase", "Stripe", "Hono RPC"] },
  { id: "workflow", label: "Tools & Workflow", skills: ["Git", "Redux Toolkit", "Zustand", "Zod"] },
] as const;

const workingPrinciples: ReadonlyArray<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: Compass, title: "Product thinking", description: "I begin with the user journey and business goal—not the component list." },
  { icon: Sparkles, title: "Interface craft", description: "Clear hierarchy, responsive behavior, and purposeful motion shape every screen." },
  { icon: ShieldCheck, title: "Reliable delivery", description: "Typed systems and maintainable architecture keep the product ready to grow." },
];

export function WhatIBuild({ shouldReduceMotion }: SectionProps) {
  return (
    <section className={styles.buildSection} aria-labelledby="build-title">
      <ScrollSurface effect="build" shouldReduceMotion={shouldReduceMotion}>
        <div className={styles.buildHeading}>
          <div><p>From idea to interface</p><span>Strategy · Interface · Engineering</span></div>
          <h2 id="build-title">I turn complex ideas into <em>clear digital products.</em></h2>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <article className={styles.capabilityCard} key={capability.title} data-capability style={{ "--item-index": index } as CSSProperties}>
                <span className={styles.capabilityIcon}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /></span>
                <div><h3>{capability.title}</h3><p>{capability.description}</p></div>
                <ul aria-label={`${capability.title} services`}>{capability.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </ScrollSurface>
    </section>
  );
}

export function SkillsShowcase({ shouldReduceMotion }: SectionProps) {
  const [active, setActive] = useState<(typeof skillGroups)[number]["id"]>(skillGroups[0].id);
  const current = skillGroups.find((group) => group.id === active) ?? skillGroups[0];

  return (
    <section className={`${styles.skillsSection} ${setupStyles.skills}`} id="skills" aria-labelledby="skills-title">
      <ScrollSurface effect="skills" shouldReduceMotion={shouldReduceMotion}>
        <p className={setupStyles.eyebrow}>{"// stack manifest"}</p>
        <h2 className={setupStyles.sectionTitle} id="skills-title">What I build with.</h2>
        <div className={setupStyles.skillTabs} role="group" aria-label="Skill categories">
          {skillGroups.map((group) => (
            <button key={group.id} type="button" aria-pressed={active === group.id} onClick={() => setActive(group.id)}>{group.label}</button>
          ))}
        </div>
        <div className={setupStyles.manifest} data-skill-band>
          <span>{"{"}</span>
          <ul>
            {current.skills.map((skill, index) => (
              <li key={skill}><code>&quot;{skill.toLowerCase().replaceAll(" ", "-")}&quot;</code><span>:</span><strong>&quot;proficiency — verify&quot;</strong>{index < current.skills.length - 1 ? "," : ""}</li>
            ))}
          </ul>
          <span>{"}"}</span>
          <p>Experience levels awaiting Zeeshan&apos;s confirmation.</p>
        </div>
      </ScrollSurface>
    </section>
  );
}

export function AboutSection({ shouldReduceMotion }: SectionProps) {
  return (
    <section className={styles.aboutSection} id="about" aria-labelledby="about-title">
      <ScrollSurface effect="about" shouldReduceMotion={shouldReduceMotion}>
        <div className={styles.aboutLead}>
          <span data-about-label>
            <MapPin size={13} strokeWidth={1.6} aria-hidden="true" />
            {profile.location}
          </span>
          <h2 id="about-title"><span data-about-line="first">I work where thoughtful</span><span data-about-line="second">design meets <em>production code.</em></span></h2>
          <p data-about-copy>I build web and mobile products from the first interface decision through implementation—connecting interaction, frontend architecture, APIs, and the details that make software feel considered.</p>
        </div>
        <div className={styles.aboutPrinciples}>
          {workingPrinciples.map(({ icon: Icon, title, description }) => (
            <article key={title} data-about-item>
              <span className={styles.principleIcon} aria-hidden="true">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className={styles.aboutFooter} data-about-footer>
          <span>React · Next.js · React Native · TypeScript</span>
          <a href="/resume/Zeeshan-Nawaz-Resume.pdf" download>Download résumé <Download size={16} aria-hidden="true" /></a>
        </div>
      </ScrollSurface>
    </section>
  );
}

export function ContactSection({ shouldReduceMotion }: SectionProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "unconfigured">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
    if (!formId) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });
      if (!response.ok) throw new Error("Contact request failed");
      event.currentTarget.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={`${styles.contactSection} ${setupStyles.contact}`} id="contact" aria-labelledby="contact-title">
      <ScrollSurface effect="contact" shouldReduceMotion={shouldReduceMotion}>
        <div className={setupStyles.contactGrid}>
          <div className={setupStyles.contactIntro}>
            <p className={setupStyles.eyebrow}>Start a project</p>
            <h2 className={setupStyles.sectionTitle} id="contact-title">Have an idea? Let&apos;s move it.</h2>
            <p>Tell me what you&apos;re building. If it&apos;s a fit, I&apos;ll follow up with questions and a rough plan—no sales pitch.</p>
            <dl><div><dt>response-time</dt><dd>&lt; 24 hours</dd></div><div><dt>based-in</dt><dd>Gujranwala, PK</dd></div></dl>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
          </div>
          <form className={setupStyles.contactForm} onSubmit={handleSubmit}>
            <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
            <div className={setupStyles.formRow}>
              <CustomSelect label="Project type" name="projectType" defaultValue="Web app" options={["Web app", "Mobile app", "Both", "Not sure yet"]} />
              <CustomSelect label="Budget range" name="budget" defaultValue="Not sure yet" options={["Not sure yet", "Under $1,000", "$1,000 – $5,000", "$5,000+"]} />
            </div>
            <label>Project details<textarea name="message" rows={5} required placeholder="What are you building, and what would make it a success?" /></label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
            <div className={setupStyles.formStatus} role="status" aria-live="polite">
              {status === "sent" && <p>Message sent. I&apos;ll reply within 24 hours.</p>}
              {(status === "error" || status === "unconfigured") && <p>Form unavailable for now. Email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>}
            </div>
          </form>
        </div>
        <footer className={styles.footer}>
          <LogoMark title="Zeeshan Nawaz" />
          <span>Gujranwala, Pakistan</span>
          <nav className={setupStyles.footerSocials} aria-label="Social links">
            <span className={setupStyles.socialTile}>
              <span className={setupStyles.socialTooltip} role="tooltip">LinkedIn</span>
              <a href={profile.linkedIn} target="_blank" rel="noreferrer" aria-label="Zeeshan Nawaz on LinkedIn">
                <LinkedInMark /><i aria-hidden="true" />
              </a>
            </span>
            <span className={setupStyles.socialTile}>
              <span className={setupStyles.socialTooltip} role="tooltip">GitHub</span>
              <a href="https://github.com/ZEESHANCHEEMA" target="_blank" rel="noreferrer" aria-label="Zeeshan Nawaz on GitHub">
                <GitHubMark /><i aria-hidden="true" />
              </a>
            </span>
            <span className={setupStyles.socialTile}>
              <span className={setupStyles.socialTooltip} role="tooltip">Email</span>
              <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>
                <Mail aria-hidden="true" /><i aria-hidden="true" />
              </a>
            </span>
          </nav>
        </footer>
      </ScrollSurface>
    </section>
  );
}

type CustomSelectProps = {
  label: string;
  name: string;
  defaultValue: string;
  options: readonly string[];
};

function CustomSelect({ label, name, defaultValue, options }: CustomSelectProps) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.indexOf(defaultValue)));
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, []);

  function selectOption(option: string) {
    setValue(option);
    setActiveIndex(options.indexOf(option));
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setOpen(true);
      setActiveIndex((index) => (index + direction + options.length) % options.length);
    } else if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      selectOption(options[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={setupStyles.selectField} ref={rootRef}>
      <span className={setupStyles.selectLabel} id={`${listId}-label`}>{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        ref={buttonRef}
        className={setupStyles.selectTrigger}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${listId}-label ${listId}-value`}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span id={`${listId}-value`}>{value}</span>
        <ChevronDown aria-hidden="true" />
      </button>
      {open && (
        <ul className={setupStyles.selectMenu} id={listId} role="listbox" aria-labelledby={`${listId}-label`}>
          {options.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              data-active={activeIndex === index}
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => selectOption(option)}
            >
              <span>{option}</span>{value === option && <Check aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LinkedInMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" /></svg>;
}

function GitHubMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1 0S17.9-.4 15 1.6a13.4 13.4 0 0 0-7 0C5.1-.4 3.9 0 3.9 0a5.4 5.4 0 0 0-.2 3A5.8 5.8 0 0 0 2.2 7c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 8 18v4m0-3c-3 .9-3-1.5-4.2-2" /></svg>;
}
