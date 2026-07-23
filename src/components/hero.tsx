"use client";

/*
THESIS: Zeeshan’s identity leads; one real web project supports it instead of competing with it.
OWN-WORLD: Near-black canvas, mineral-white type, electric lime signal color, thin graphite rules, and one full-width browser specimen.
STORY: A short identity signal resolves into Zeeshan’s role, work invitation, and a single featured web product.
FIRST VIEWPORT: Quiet navigation, oversized introduction, two actions, then a project preview deliberately entering from below the fold.
FORM: Dark studio title sequence followed by a restrained product reel; no device collage, dashboard grid, or tab cluster.
*/

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Download, Layers3, Smartphone } from "lucide-react";
import Image from "next/image";
import { featuredProjects, profile } from "@/content/profile";
import { LogoMark } from "@/components/logo-mark";
import styles from "./hero.module.css";

const revealEase = [0.53, 1, 0.32, 1] as const;
const contentRevealDelay = 0.62;
const capabilities = [
  {
    number: "01",
    icon: Code2,
    title: "Web products",
    description: "Fast, accessible interfaces and complete product experiences built for real users and real business goals.",
    tags: ["Product websites", "Web applications", "Admin platforms"],
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Mobile applications",
    description: "Cross-platform mobile experiences with thoughtful navigation, reliable state, and native-feeling interaction.",
    tags: ["React Native", "Expo applications", "Responsive systems"],
  },
  {
    number: "03",
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
const heroReveal = (delay: number, distance = 18) => ({
  initial: { opacity: 0, transform: `translateY(${distance}px)`, filter: "blur(42px)" },
  animate: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
  transition: { duration: 0.82, delay: delay + contentRevealDelay, ease: revealEase },
});

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const loaderProgress = useMotionValue(0);
  const roundedProgress = useTransform(loaderProgress, (value) => Math.round(value));
  const loaderScale = useTransform(loaderProgress, [0, 100], [0, 1]);

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

      <motion.div
        className={styles.site}
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.55, delay: isLoading ? 0 : 0.16, ease: revealEase }}
      >
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

        <section className={styles.hero} id="top" aria-labelledby="hero-title">
          <motion.div
            className={styles.heroMeta}
            initial={shouldReduceMotion ? false : heroReveal(0.02, 8).initial}
            animate={isLoading ? undefined : heroReveal(0.02, 8).animate}
            transition={heroReveal(0.02, 8).transition}
          >
            <span>{profile.role}</span>
            <span>{profile.location}</span>
          </motion.div>

          <div className={styles.intro}>
            <motion.p
              className={styles.kicker}
              initial={shouldReduceMotion ? false : heroReveal(0.1, 10).initial}
              animate={isLoading ? undefined : heroReveal(0.1, 10).animate}
              transition={heroReveal(0.1, 10).transition}
            >
              Hello, I&apos;m
            </motion.p>
            <h1 id="hero-title" aria-label={profile.name}>
              <span className={styles.nameLine}>
                <span className={styles.nameClip}>
                  <motion.span
                    initial={shouldReduceMotion ? false : { opacity: 0, transform: "translateY(105%)", filter: "blur(14px)" }}
                    animate={isLoading ? undefined : { opacity: 1, transform: "translateY(0%)", filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.18 + contentRevealDelay, ease: revealEase }}
                  >
                    Zeeshan
                  </motion.span>
                </span>
                <span className={styles.nameClip}>
                  <motion.span
                    className={styles.accentName}
                    initial={shouldReduceMotion ? false : { opacity: 0, transform: "translateY(105%)", filter: "blur(14px)" }}
                    animate={isLoading ? undefined : { opacity: 1, transform: "translateY(0%)", filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.29 + contentRevealDelay, ease: revealEase }}
                  >
                    Nawaz.
                  </motion.span>
                </span>
              </span>
            </h1>
            <motion.p
              className={styles.roleStatement}
              initial={shouldReduceMotion ? false : heroReveal(0.43, 16).initial}
              animate={isLoading ? undefined : heroReveal(0.43, 16).animate}
              transition={heroReveal(0.43, 16).transition}
            >
              I design &amp; build <span>digital products.</span>
            </motion.p>
            <motion.div
              className={styles.heroFooter}
              initial="hidden"
              animate={isLoading ? "hidden" : "visible"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.56 + contentRevealDelay } },
              }}
            >
              <motion.p
                variants={{
                  hidden: shouldReduceMotion ? {} : heroReveal(0, 14).initial,
                  visible: heroReveal(0, 14).animate,
                }}
                transition={{ duration: 0.62, ease: revealEase }}
              >
                {profile.summary}
              </motion.p>
              <motion.div
                className={styles.actions}
                variants={{
                  hidden: shouldReduceMotion ? {} : heroReveal(0, 12).initial,
                  visible: heroReveal(0, 12).animate,
                }}
                transition={{ duration: 0.58, ease: revealEase }}
              >
                <a className={styles.primaryAction} href="#work">
                  View my work <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a className={styles.secondaryAction} href="/resume/Zeeshan-Nawaz-Resume.pdf" download>
                  Résumé <Download size={16} aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          <motion.a
            className={styles.scrollCue}
            href="#work"
            aria-label="Scroll to featured work"
            initial={shouldReduceMotion ? false : heroReveal(0.78, 8).initial}
            animate={isLoading ? undefined : heroReveal(0.78, 8).animate}
            transition={heroReveal(0.78, 8).transition}
          >
            Scroll to explore <ArrowDown size={14} aria-hidden="true" />
          </motion.a>
        </section>

        <ProjectShowcase shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <WhatIBuild shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <SkillsShowcase shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <ContactSection shouldReduceMotion={Boolean(shouldReduceMotion)} />
      </motion.div>
    </main>
  );
}

function sectionReveal(shouldReduceMotion: boolean, delay = 0) {
  return {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(32px)", filter: "blur(12px)" },
    whileInView: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
    viewport: { once: true, amount: 0.3 },
    transition: shouldReduceMotion
      ? { duration: 0.18, delay }
      : { duration: 0.72, delay, ease: revealEase },
  } as const;
}

function WhatIBuild({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <section className={styles.buildSection} aria-labelledby="build-title">
      <div className={styles.sectionTopline}>
        <span>What I build</span>
        <span>Capabilities / 03</span>
      </div>
      <motion.div className={styles.buildHeading} {...sectionReveal(shouldReduceMotion)}>
        <div>
          <p>From idea to interface</p>
          <span>Strategy · Interface · Engineering</span>
        </div>
        <h2 id="build-title">I turn complex ideas into <em>clear digital products.</em></h2>
      </motion.div>
      <div className={styles.capabilityGrid}>
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;
          return (
            <motion.article
              className={styles.capabilityCard}
              key={capability.title}
              {...sectionReveal(shouldReduceMotion, index * 0.08)}
            >
              <span className={styles.capabilityNumber}>{capability.number}</span>
              <span className={styles.capabilityIcon}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /></span>
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
              <ul aria-label={`${capability.title} services`}>
                {capability.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function SkillsShowcase({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <section className={styles.skillsSection} aria-labelledby="skills-title">
      <div className={styles.sectionTopline}>
        <span>Stack &amp; skills</span>
        <span>Tools for the work</span>
      </div>
      <div className={styles.skillsRedesign}>
        <motion.div className={styles.skillsStatement} {...sectionReveal(shouldReduceMotion)}>
          <span className={styles.skillsSignal}><i /> Product-minded engineering</span>
          <h2 id="skills-title">Tools change.<br /><em>Good systems last.</em></h2>
          <p>I work across the product surface—from interaction and motion to application architecture and data.</p>
        </motion.div>
        <div className={styles.skillBands}>
          {skillGroups.map((group, index) => (
            <motion.article
              className={styles.skillBand}
              key={group.label}
              {...sectionReveal(shouldReduceMotion, index * 0.07)}
            >
              <header><span>{String(index + 1).padStart(2, "0")}</span><strong>{group.label}</strong><i /></header>
              <div>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <div className={styles.sectionTopline}>
        <span>Contact</span>
        <span>Available for selected work</span>
      </div>
      <motion.div className={styles.contactContent} {...sectionReveal(shouldReduceMotion)}>
        <div className={styles.contactStatus}><i /><span>Open to thoughtful collaborations</span><strong>2026</strong></div>
        <div className={styles.contactMessage}>
          <p>Have a product in mind?</p>
          <h2 id="contact-title"><span>Let&apos;s make it</span><span className={styles.contactAccent}>real.</span></h2>
        </div>
        <a className={styles.contactAction} href={`mailto:${profile.email}`}>
          <span><small>Start a project</small>{profile.email}</span>
          <span className={styles.contactArrow}><ArrowRight size={25} aria-hidden="true" /></span>
        </a>
      </motion.div>
      <footer className={styles.footer}>
        <LogoMark title="Zeeshan Nawaz" />
        <span>Gujranwala, Pakistan</span>
        <div>
          <a href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
          <a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={13} /></a>
        </div>
      </footer>
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
  const [scrollDirection, setScrollDirection] = useState(1);
  const projects = featuredProjects;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.45,
  });
  const progressScale = useTransform(smoothScrollProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
    setActiveIndex((currentIndex) => {
      if (currentIndex === nextIndex) return currentIndex;
      setScrollDirection(nextIndex > currentIndex ? 1 : -1);
      return nextIndex;
    });
  });

  const project = projects[activeIndex];

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
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </div>

        <div className={styles.projectsLayout}>
          <div className={styles.projectsIntro}>
            <p>Scroll to explore</p>
            <h2 id="projects-title">Projects built across web and mobile.</h2>
          </div>

          <div className={styles.projectStage} aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false} custom={scrollDirection}>
              <motion.article
                className={styles.projectPanel}
                key={project.id}
                custom={scrollDirection}
                variants={{
                  enter: (direction: number) => shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: direction * 110, scale: 0.975, filter: "blur(10px)" },
                  center: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
                  exit: (direction: number) => shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: direction * -70, scale: 0.985, filter: "blur(7px)" },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={shouldReduceMotion ? { duration: 0.16 } : { type: "spring", bounce: 0, duration: 0.56 }}
              >
                <a className={styles.projectVisual} href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live site`}>
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 100vw, 60vw" priority={activeIndex === 0} />
                  <span>View live project <ArrowUpRight size={16} aria-hidden="true" /></span>
                </a>
                <div className={styles.projectContent}>
                  <div className={styles.projectNumber}>0{activeIndex + 1}</div>
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
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.scrollProgress} aria-hidden="true">
          <motion.span style={{ scaleX: progressScale }} />
        </div>
      </div>
    </section>
  );
}
