"use client";

/*
THESIS: Zeeshan’s identity leads; one real web project supports it instead of competing with it.
OWN-WORLD: Near-black canvas, mineral-white type, electric lime signal color, thin graphite rules, and one full-width browser specimen.
STORY: A short identity signal resolves into Zeeshan’s role, work invitation, and a single featured web product.
FIRST VIEWPORT: Quiet navigation, oversized introduction, two actions, then a project preview deliberately entering from below the fold.
FORM: Dark studio title sequence followed by a restrained product reel; no device collage, dashboard grid, or tab cluster.
*/

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Download, Layers3, Smartphone } from "lucide-react";
import Image from "next/image";
import { featuredProjects, profile } from "@/content/profile";
import { LogoMark } from "@/components/logo-mark";
import styles from "./hero.module.css";

const revealEase = [0.53, 1, 0.32, 1] as const;
const capabilities = [
  {
   
    icon: Code2,
    title: "Web products",
    description: "Fast, accessible interfaces and complete product experiences built for real users and real business goals.",
    tags: ["Product websites", "Web applications", "Admin platforms"],
  },
  {
 
    icon: Smartphone,
    title: "Mobile applications",
    description: "Cross-platform mobile experiences with thoughtful navigation, reliable state, and native-feeling interaction.",
    tags: ["React Native", "Expo applications", "Responsive systems"],
  },
  {
   
    icon: Layers3,
    title: "Product systems",
    description: "Maintainable frontend architecture that connects design systems, APIs, authentication, and complex workflows.",
    tags: ["Design systems", "API integration", "Frontend architecture"],
  },
] as const;

const skillGroups = [
  { label: "Core", skills: ["TypeScript", "JavaScript", "React", "Next.js"] },
  { label: "Mobile", skills: ["React Native", "Expo", "Responsive UI"] },
  { label: "Interface", skills: ["CSS", "Tailwind CSS", "Motion", "Material UI"] },
  { label: "Data & tools", skills: ["REST APIs", "Redux Toolkit", "Zustand", "Firebase", "Git"] },
] as const;
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const loaderProgress = useMotionValue(0);
  const roundedProgress = useTransform(loaderProgress, (value) => Math.round(value));
  const loaderScale = useTransform(loaderProgress, [0, 100], [0, 1]);
  const heroRef = useRef<HTMLElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const coverFooterRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLAnchorElement>(null);
  const heroIntroComplete = useRef(false);

  useEffect(() => {
    if (!shouldReduceMotion) {
      const progressAnimation = animate(loaderProgress, 100, {
        duration: 1.9,
        ease: revealEase,
      });
      const timer = window.setTimeout(() => setIsLoading(false), 1450);
      return () => {
        progressAnimation.stop();
        window.clearTimeout(timer);
      };
    }

    const timer = window.setTimeout(() => setIsLoading(false), shouldReduceMotion ? 0 : 1450);
    return () => window.clearTimeout(timer);
  }, [loaderProgress, shouldReduceMotion]);

  useEffect(() => {
    if (isLoading || heroIntroComplete.current) return;
    heroIntroComplete.current = true;

    const elements = [firstNameRef.current, lastNameRef.current, monogramRef.current, coverFooterRef.current, scrollCueRef.current];
    if (shouldReduceMotion) {
      elements.forEach((element) => element?.removeAttribute("data-intro-pending"));
      return;
    }

    const animations = [
      firstNameRef.current?.animate(
        [{ opacity: 0, transform: "translate3d(-12vw, 28px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)" }],
        { duration: 760, delay: 70, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "both" },
      ),
      lastNameRef.current?.animate(
        [{ opacity: 0, transform: "translate3d(14vw, 34px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)" }],
        { duration: 820, delay: 150, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "both" },
      ),
      monogramRef.current?.animate(
        [{ opacity: 0, transform: "translate3d(8vw, 42px, 0) rotate(-18deg) scale(0.94)" }, { opacity: 0.5, transform: "translate3d(0, 0, 0) rotate(-8deg) scale(1)" }],
        { duration: 980, delay: 40, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "both" },
      ),
      coverFooterRef.current?.animate(
        [{ opacity: 0, transform: "translate3d(0, 46px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)" }],
        { duration: 680, delay: 330, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "both" },
      ),
      scrollCueRef.current?.animate(
        [{ opacity: 0, transform: "translate3d(0, 12px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)" }],
        { duration: 520, delay: 510, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "both" },
      ),
    ].filter(Boolean) as Animation[];

    const finishTimer = window.setTimeout(() => {
      animations.forEach((animation) => animation.cancel());
      elements.forEach((element) => element?.removeAttribute("data-intro-pending"));
    }, 1100);

    return () => {
      window.clearTimeout(finishTimer);
      animations.forEach((animation) => animation.cancel());
    };
  }, [isLoading, shouldReduceMotion]);

  useLenis((lenis) => {
    const hero = heroRef.current;
    if (!hero || shouldReduceMotion || firstNameRef.current?.hasAttribute("data-intro-pending")) return;
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height * 0.88)));
    const eased = 1 - (1 - progress) ** 3;
    const velocity = Math.max(-18, Math.min(18, lenis.velocity));

    if (firstNameRef.current) firstNameRef.current.style.transform = `translate3d(${(-eased * 12).toFixed(2)}vw, ${(-eased * 18).toFixed(2)}px, 0)`;
    if (lastNameRef.current) lastNameRef.current.style.transform = `translate3d(${(eased * 14).toFixed(2)}vw, ${(-eased * 46).toFixed(2)}px, 0)`;
    if (monogramRef.current) monogramRef.current.style.transform = `translate3d(${(eased * 7).toFixed(2)}vw, ${(-eased * 80).toFixed(2)}px, 0) rotate(${(-8 + eased * 18 + velocity * 0.05).toFixed(2)}deg) scale(${(1 + eased * 0.08).toFixed(3)})`;
    if (coverFooterRef.current) {
      coverFooterRef.current.style.transform = `translate3d(0, ${(eased * 70).toFixed(2)}px, 0)`;
      coverFooterRef.current.style.opacity = Math.max(0, 1 - eased * 1.25).toFixed(3);
    }
    if (scrollCueRef.current) scrollCueRef.current.style.opacity = Math.max(0, 1 - eased * 2.2).toFixed(3);
  }, [shouldReduceMotion]);

  return (
    <main className={styles.page}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={styles.loader}
            role="status"
            aria-label="Loading Zeeshan Nawaz portfolio"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: revealEase } }}
          >
            <motion.svg
              className={styles.loaderMark}
              viewBox="0 0 310 120"
              role="presentation"
              initial={{ opacity: 0.45, filter: "blur(5px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.42, ease: revealEase }}
            >
              <motion.line x1="12" y1="14" x2="132" y2="14" {...loaderLine(0.02)} />
              <motion.line x1="132" y1="14" x2="12" y2="106" {...loaderLine(0.14)} />
              <motion.line x1="12" y1="106" x2="132" y2="106" {...loaderLine(0.26)} />
              <motion.line x1="178" y1="106" x2="178" y2="14" {...loaderLine(0.38)} />
              <motion.line x1="178" y1="14" x2="298" y2="106" {...loaderLine(0.5)} />
              <motion.line x1="298" y1="106" x2="298" y2="14" {...loaderLine(0.62)} />
            </motion.svg>
            <div className={styles.loaderMeta} aria-hidden="true">
              <span>Zeeshan Nawaz / Portfolio</span>
              <motion.span>{roundedProgress}</motion.span>
            </div>
            <div className={styles.loaderTrack} aria-hidden="true">
              <motion.span style={{ scaleX: loaderScale }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.site}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a className={styles.wordmark} href="#top" aria-label="Zeeshan Nawaz, home">
            <LogoMark title="Zeeshan Nawaz" />
          </a>
          <div className={styles.navLinks}>
            <a href="#work">Work</a>
            <a href={`mailto:${profile.email}`}>Contact</a>
          </div>
          <a className={styles.availability} href={profile.linkedIn} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>

        <section className={styles.hero} id="top" ref={heroRef} aria-labelledby="hero-title">

          <div className={styles.heroCover}>
            <div className={styles.heroMonogram} ref={monogramRef} data-intro-pending aria-hidden="true">
              <LogoMark />
            </div>
            <h1 id="hero-title" aria-label={profile.name}>
              <span className={styles.coverLine}>
                <span className={styles.nameClip}>
                  <span ref={firstNameRef} data-intro-pending>Zeeshan</span>
                </span>
              </span>
              <span className={`${styles.coverLine} ${styles.coverLineSecond}`}>
                <span className={styles.nameClip}>
                  <span ref={lastNameRef} data-intro-pending className={styles.accentName}>Nawaz.</span>
                </span>
              </span>
            </h1>
            <div className={styles.coverFooter} ref={coverFooterRef} data-intro-pending>
              <div className={styles.coverRole}>
                <span>{profile.role}</span>
                <strong>I design the interface.<br />I build the product.</strong>
              </div>
              <p>{profile.summary}</p>
              <div className={styles.actions}>
                <a className={styles.primaryAction} href="#work">
                  Selected work <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a className={styles.secondaryAction} href="/resume/Zeeshan-Nawaz-Resume.pdf" download>
                  Résumé <Download size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <a
            className={styles.scrollCue}
            ref={scrollCueRef}
            data-intro-pending
            href="#work"
            aria-label="Scroll to featured work"
          >
            Scroll / explore <ArrowDown size={14} aria-hidden="true" />
          </a>
        </section>

        <ProjectShowcase shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <WhatIBuild shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <SkillsShowcase shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <ContactSection shouldReduceMotion={Boolean(shouldReduceMotion)} />
      </div>
    </main>
  );
}

function ScrollSurface({ children, shouldReduceMotion }: { children: ReactNode; shouldReduceMotion: boolean }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  useLenis((lenis) => {
    const surface = surfaceRef.current;
    if (!surface || shouldReduceMotion) return;
    const rect = surface.getBoundingClientRect();
    const viewport = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
    const centered = 1 - Math.min(1, Math.abs(progress - 0.5) * 2);
    const y = (0.5 - progress) * 90;
    const scale = 0.965 + centered * 0.035;
    const tilt = (0.5 - progress) * 1.4;
    const velocityBlur = Math.min(3.5, Math.abs(lenis.velocity) * 0.045);
    surface.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotateX(${tilt.toFixed(2)}deg)`;
    surface.style.filter = `blur(${velocityBlur.toFixed(2)}px)`;
    surface.style.setProperty("--surface-progress", progress.toFixed(4));
  }, [shouldReduceMotion]);

  return (
    <div ref={surfaceRef} className={styles.rectangleSurface}>
      <span className={styles.surfaceIndex} aria-hidden="true">ZN</span>
      {children}
    </div>
  );
}

function WhatIBuild({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <section className={styles.buildSection} aria-labelledby="build-title">
      <ScrollSurface shouldReduceMotion={shouldReduceMotion}>
      <div className={styles.sectionTopline}>
        <span>What I build</span>
        <span>Capabilities</span>
      </div>
      <div className={styles.buildHeading}>
        <div>
          <p>From idea to interface</p>
          <span>Strategy · Interface · Engineering</span>
        </div>
        <h2 id="build-title">I turn complex ideas into <em>clear digital products.</em></h2>
      </div>
      <div className={styles.capabilityGrid}>
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;
          return (
            <article
              className={styles.capabilityCard}
              key={capability.title}
              style={{ "--item-index": index } as CSSProperties}
            >
              <span className={styles.capabilityIcon}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /></span>
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
              <ul aria-label={`${capability.title} services`}>
                {capability.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          );
        })}
      </div>
      </ScrollSurface>
    </section>
  );
}

function SkillsShowcase({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <section className={styles.skillsSection} aria-labelledby="skills-title">
      <ScrollSurface shouldReduceMotion={shouldReduceMotion}>
      <div className={styles.sectionTopline}>
        <span>Stack &amp; skills</span>
        <span>Tools for the work</span>
      </div>
      <div className={styles.skillsRedesign}>
        <div className={styles.skillsStatement}>
          <span className={styles.skillsSignal}><i /> Product-minded engineering</span>
          <h2 id="skills-title">Tools change.<br /><em>Good systems last.</em></h2>
          <p>I work across the product surface—from interaction and motion to application architecture and data.</p>
        </div>
        <div className={styles.skillBands}>
          {skillGroups.map((group, index) => (
            <article
              className={styles.skillBand}
              key={group.label}
              style={{ "--item-index": index } as CSSProperties}
            >
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

function ContactSection({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <ScrollSurface shouldReduceMotion={shouldReduceMotion}>
      <div className={styles.sectionTopline}>
        <span>Contact</span>
        <span>Available for selected work</span>
      </div>
      <div className={styles.contactContent}>
        <div className={styles.contactStatus}><i /><span>Open to thoughtful collaborations</span></div>
        <div className={styles.contactMessage}>
          <p>Have a product in mind?</p>
          <h2 id="contact-title"><span>Let&apos;s make it</span><span className={styles.contactAccent}>real.</span></h2>
        </div>
        <a className={styles.contactAction} href={`mailto:${profile.email}`}>
          <span><small>Start a project</small>{profile.email}</span>
          <span className={styles.contactArrow}><ArrowRight size={25} aria-hidden="true" /></span>
        </a>
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

function loaderLine(delay: number) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.5, delay, ease: revealEase },
  } as const;
}

function ProjectShowcase({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = featuredProjects;
  const updateProjects = useCallback((velocity = 0) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const distance = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / distance));
    const position = progress * (projects.length - 1);
    const nextIndex = Math.min(projects.length - 1, Math.round(position));
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
    section.style.setProperty("--project-progress", progress.toFixed(4));

    section.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card, index) => {
      const delta = index - position;
      const absoluteDelta = Math.abs(delta);
      const x = delta * Math.min(window.innerWidth * 0.94, 1340);
      const scale = Math.max(0.84, 1 - absoluteDelta * 0.08);
      const opacity = Math.max(0.12, 1 - absoluteDelta * 0.62);
      const rotate = delta * -2.2;
      const blur = shouldReduceMotion ? 0 : Math.min(9, absoluteDelta * 5 + Math.abs(velocity) * 0.02);
      card.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) scale(${scale.toFixed(4)}) rotateY(${rotate.toFixed(2)}deg)`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `blur(${blur.toFixed(2)}px)`;
      card.style.zIndex = String(projects.length - Math.round(absoluteDelta));
      card.style.pointerEvents = absoluteDelta < 0.48 ? "auto" : "none";
    });
  }, [projects.length, shouldReduceMotion]);

  useLenis((lenis) => updateProjects(lenis.velocity), [updateProjects]);

  useEffect(() => {
    if (!shouldReduceMotion) return;
    const update = () => updateProjects();
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [shouldReduceMotion, updateProjects]);

  return (
    <section
      className={styles.projects}
      id="work"
      ref={sectionRef}
      aria-labelledby="projects-title"
      style={{ "--project-scroll-height": `${(projects.length + 1) * 100}svh` } as CSSProperties}
    >
      <div className={styles.projectsSticky}>
        <div className={styles.projectsTopline}>
          <span>Selected work</span>
          <span id="projects-title">Live products</span>
        </div>

        <div className={styles.projectsLayout}>
          <div className={styles.projectStage} aria-live="polite">
            {projects.map((project, index) => (
              <article
                className={styles.projectPanel}
                key={project.id}
                data-project-card
                aria-hidden={activeIndex !== index}
                style={shouldReduceMotion ? { opacity: activeIndex === index ? 1 : 0 } : undefined}
              >
                <div className={styles.projectChrome} aria-hidden="true">
                  <span>ZN</span>
                  <span>{project.name.toUpperCase()}</span>
                  <span>SCROLL ↓</span>
                </div>
                <a className={styles.projectVisual} href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live site`}>
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 100vw, 60vw" priority={index === 0} />
                  {project.mobileImage && (
                    <span className={styles.mobileEmulator} aria-label="Dex Remit mobile application preview">
                      <span className={styles.emulatorSpeaker} />
                      <Image src={project.mobileImage} alt="Dex Remit mobile login and signup application" fill sizes="260px" />
                    </span>
                  )}
                  <span>View live project <ArrowUpRight size={16} aria-hidden="true" /></span>
                </a>
                <div className={styles.projectContent}>
                  <div className={styles.projectIdentity}>
                    <span>{project.platform} / {project.role}</span>
                    <h3>{project.name}</h3>
                    <p>{project.product}</p>
                  </div>
                  <div className={styles.projectDetails}>
                    <div>
                      <span>Core work</span>
                      <p>{project.highlights.join(" · ")}</p>
                    </div>
                    <div>
                      <span>Stack</span>
                      <p>{project.stack.join(" · ")}</p>
                    </div>
                  </div>
                  <div className={styles.projectActions}>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live site <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.scrollProgress} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
