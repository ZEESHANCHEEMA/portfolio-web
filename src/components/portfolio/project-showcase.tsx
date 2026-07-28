"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { featuredProjects } from "@/content/profile";
import styles from "../hero.module.css";

type ProjectShowcaseProps = { shouldReduceMotion: boolean };

/** Sticky Lenis-driven project showcase with editorial product specimens. */
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
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    section.style.setProperty("--project-progress", progress.toFixed(4));

    const travel = Math.min(window.innerWidth * 0.88, 1180);
    const drift = shouldReduceMotion ? 0 : Math.max(-8, Math.min(8, velocity * 0.04));

    section.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card, index) => {
      const delta = index - position;
      const absoluteDelta = Math.abs(delta);
      const x = delta * travel;
      const scale = Math.max(0.92, 1 - absoluteDelta * 0.045);
      const opacity = Math.max(0, 1 - absoluteDelta * 0.85);
      card.style.transform = `translate3d(${(x + drift).toFixed(2)}px, 0, 0) scale(${scale.toFixed(4)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = "none";
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
        <header className={styles.projectsHeader}>
          <h2 id="projects-title">Selected work</h2>
        </header>

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
                <a
                  className={styles.projectVisual}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name} live site`}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 900px) 92vw, 70vw"
                    priority={index === 0}
                  />
                </a>

                <div className={styles.projectContent}>
                  <div className={styles.projectIdentity}>
                    <span>
                      {project.platform}
                      <i aria-hidden="true" />
                      {project.role}
                    </span>
                    <h3>{project.name}</h3>
                    <p>{project.product}</p>
                  </div>

                  <ul className={styles.projectStack} aria-label={`${project.name} technologies`}>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className={styles.projectActions}>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      View live
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    {project.githubUrl ? (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        Source
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : null}
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
