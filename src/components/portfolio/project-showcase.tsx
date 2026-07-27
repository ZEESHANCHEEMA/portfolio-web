"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { featuredProjects } from "@/content/profile";
import styles from "../hero.module.css";

type ProjectShowcaseProps = { shouldReduceMotion: boolean };

export function ProjectShowcase({ shouldReduceMotion }: ProjectShowcaseProps) {
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
    <section className={styles.projects} id="work" ref={sectionRef} aria-labelledby="projects-title" style={{ "--project-scroll-height": `${(projects.length + 1) * 100}svh` } as CSSProperties}>
      <div className={styles.projectsSticky}>
        <div className={styles.projectsTopline}><span>Selected work</span><span id="projects-title">Live products</span></div>
        <div className={styles.projectsLayout}>
          <div className={styles.projectStage} aria-live="polite">
            {projects.map((project, index) => (
              <article className={styles.projectPanel} key={project.id} data-project-card aria-hidden={activeIndex !== index} style={shouldReduceMotion ? { opacity: activeIndex === index ? 1 : 0 } : undefined}>
                <div className={styles.projectChrome} aria-hidden="true"><span>ZN</span><span>{project.name.toUpperCase()}</span><span>SCROLL ↓</span></div>
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
                  <div className={styles.projectIdentity}><span>{project.platform} / {project.role}</span><h3>{project.name}</h3><p>{project.product}</p></div>
                  <div className={styles.projectDetails}>
                    <div><span>Core work</span><p>{project.highlights.join(" · ")}</p></div>
                    <div><span>Stack</span><p>{project.stack.join(" · ")}</p></div>
                    <div className={styles.projectOutcomes}>
                      <span>Product result</span>
                      <ul>{project.outcomes.map((outcome) => <li key={outcome.value}><strong>{outcome.value}</strong><small>{outcome.label}</small></li>)}</ul>
                    </div>
                  </div>
                  <div className={styles.projectActions}>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={17} aria-hidden="true" /></a>
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.scrollProgress} aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
