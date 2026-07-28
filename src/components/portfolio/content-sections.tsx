"use client";

import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Compass,
  Download,
  Layers3,
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

type SectionProps = { shouldReduceMotion: boolean };

const capabilities = [
  { icon: Code2, title: "Web products", description: "Fast, accessible interfaces and complete product experiences built for real users and real business goals.", tags: ["Product websites", "Web applications", "Admin platforms"] },
  { icon: Smartphone, title: "Mobile applications", description: "Cross-platform mobile experiences with thoughtful navigation, reliable state, and native-feeling interaction.", tags: ["React Native", "Expo applications", "Responsive systems"] },
  { icon: Layers3, title: "Product systems", description: "Maintainable frontend architecture that connects design systems, APIs, authentication, and complex workflows.", tags: ["Design systems", "API integration", "Frontend architecture"] },
] as const;

const skillGroups = [
  { label: "Core", skills: ["TypeScript", "JavaScript", "React", "Next.js"] },
  { label: "Mobile", skills: ["React Native", "Expo", "Responsive UI"] },
  { label: "Interface", skills: ["CSS", "Tailwind CSS", "Motion", "Material UI"] },
  { label: "Data & tools", skills: ["REST APIs", "Redux Toolkit", "Zustand", "Firebase", "Git"] },
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
  return (
    <section className={styles.skillsSection} aria-labelledby="skills-title">
      <ScrollSurface effect="skills" shouldReduceMotion={shouldReduceMotion}>
        <div className={styles.skillsRedesign}>
          <div className={styles.skillsStatement}>
            <span className={styles.skillsSignal}><i /> Product-minded engineering</span>
            <h2 id="skills-title">Tools change.<br /><em>Good systems last.</em></h2>
            <p>I work across the product surface—from interaction and motion to application architecture and data.</p>
          </div>
          <div className={styles.skillBands}>
            {skillGroups.map((group, index) => (
              <article className={styles.skillBand} key={group.label} data-skill-band style={{ "--item-index": index } as CSSProperties}>
                <header><strong>{group.label}</strong><i /></header>
                <div>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
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
  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <ScrollSurface effect="contact" shouldReduceMotion={shouldReduceMotion}>
        <div className={styles.contactContent}>
          <p className={styles.locationOnly}>
            <MapPin size={14} strokeWidth={1.6} aria-hidden="true" />
            <span>{profile.location}</span>
          </p>
          <div className={styles.contactMessage}>
            <h2 id="contact-title"><span data-contact-line="first">Have an idea?</span><span data-contact-line="second" className={styles.contactAccent}>Let&apos;s move it.</span></h2>
            <a className={styles.contactAction} data-contact-action href={`mailto:${profile.email}`}><span>Start<br />a project</span><ArrowUpRight size={34} aria-hidden="true" /></a>
          </div>
          <a className={styles.contactEmail} href={`mailto:${profile.email}`}>{profile.email}<ArrowRight size={20} /></a>
        </div>
        <footer className={styles.footer}>
          <LogoMark title="Zeeshan Nawaz" />
          <span>Gujranwala, Pakistan</span>
          <div>
            <a href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
            <a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={13} /></a>
          </div>
        </footer>
      </ScrollSurface>
    </section>
  );
}
