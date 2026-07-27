"use client";

/*
THESIS: Zeeshan’s identity leads; one real web project supports it instead of competing with it.
OWN-WORLD: Near-black canvas, mineral-white type, electric lime signal color, thin graphite rules, and one full-width browser specimen.
STORY: A short identity signal resolves into Zeeshan’s role, work invitation, and a single featured web product.
FIRST VIEWPORT: Quiet navigation, oversized introduction, two actions, then a project preview deliberately entering from below the fold.
FORM: Dark studio title sequence followed by a restrained product reel; no device collage, dashboard grid, or tab cluster.
*/

import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { LogoMark } from "@/components/logo-mark";
import { AboutSection, ContactSection, SkillsShowcase, WhatIBuild } from "@/components/portfolio/content-sections";
import { ProjectShowcase } from "@/components/portfolio/project-showcase";
import styles from "./hero.module.css";

const revealEase = [0.53, 1, 0.32, 1] as const;
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

        <AboutSection shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <ProjectShowcase shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <WhatIBuild shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <SkillsShowcase shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <ContactSection shouldReduceMotion={Boolean(shouldReduceMotion)} />
      </div>
    </main>
  );
}

function loaderLine(delay: number) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.5, delay, ease: revealEase },
  } as const;
}
