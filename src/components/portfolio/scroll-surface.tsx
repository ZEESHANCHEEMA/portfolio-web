"use client";

import { useRef, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import styles from "./scroll-surface.module.css";

export type SurfaceEffect = "build" | "skills" | "about" | "contact";

type ScrollSurfaceProps = {
  children: ReactNode;
  effect: SurfaceEffect;
  shouldReduceMotion: boolean;
};

export function ScrollSurface({ children, effect, shouldReduceMotion }: ScrollSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    const surface = surfaceRef.current;
    if (!surface || shouldReduceMotion) return;

    const rect = surface.getBoundingClientRect();
    const viewport = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));

    if (effect === "build") {
      const scale = 0.98 + Math.sin(progress * Math.PI) * 0.02;
      surface.style.transform = `scale(${scale.toFixed(4)})`;
    } else if (effect === "skills" || effect === "about") {
      surface.style.transform = "none";
    } else {
      const reveal = Math.max(0, Math.min(1, progress * 1.35));
      surface.style.transform = `translate3d(0, ${((1 - reveal) * 80).toFixed(2)}px, 0)`;
    }

    surface.style.filter = "none";
    surface.style.setProperty("--surface-progress", progress.toFixed(4));

    if (effect === "build") animateBuild(surface, progress);
    if (effect === "skills") animateSkills(surface, progress);
    if (effect === "about") animateAbout(surface, progress, lenis.velocity);
    if (effect === "contact") animateContact(surface, progress);
  }, [effect, shouldReduceMotion]);

  return (
    <div ref={surfaceRef} className={styles.surface} data-surface-effect={effect}>
      {children}
    </div>
  );
}

function animateBuild(surface: HTMLElement, progress: number) {
  surface.querySelectorAll<HTMLElement>("[data-capability]").forEach((card, index) => {
    const localProgress = Math.max(0, Math.min(1, (progress - 0.14 - index * 0.055) / 0.32));
    const eased = 1 - (1 - localProgress) ** 3;
    const x = (index - 1) * (1 - eased) * 150;
    const y = (1 - eased) * (90 + index * 20) + (index === 1 ? 54 : 0);
    const rotation = (index - 1) * (1 - eased) * 7;
    card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotation.toFixed(2)}deg) scale(${(0.9 + eased * 0.1).toFixed(3)})`;
    card.style.opacity = (0.18 + eased * 0.82).toFixed(3);
  });
}

function animateSkills(surface: HTMLElement, progress: number) {
  surface.querySelectorAll<HTMLElement>("[data-skill-band]").forEach((band, index) => {
    const localProgress = Math.max(0, Math.min(1, (progress - 0.1 - index * 0.035) / 0.42));
    const travel = (1 - localProgress) * (index % 2 === 0 ? 150 : -150);
    band.style.transform = `translate3d(${travel.toFixed(2)}px, 0, 0)`;
    band.style.opacity = (0.2 + localProgress * 0.8).toFixed(3);
    band.style.setProperty("--band-progress", localProgress.toFixed(3));
  });
}

function animateAbout(surface: HTMLElement, progress: number, rawVelocity: number) {
  const revealProgress = Math.max(0, Math.min(1, (progress - 0.06) / 0.48));
  const eased = 1 - (1 - revealProgress) ** 3;
  const velocity = Math.max(-14, Math.min(14, rawVelocity));
  const label = surface.querySelector<HTMLElement>("[data-about-label]");
  const firstLine = surface.querySelector<HTMLElement>("[data-about-line='first']");
  const secondLine = surface.querySelector<HTMLElement>("[data-about-line='second']");
  const copy = surface.querySelector<HTMLElement>("[data-about-copy]");
  const footer = surface.querySelector<HTMLElement>("[data-about-footer]");

  if (label) {
    label.style.transform = `translate3d(${((1 - eased) * -48).toFixed(2)}px, 0, 0)`;
    label.style.opacity = eased.toFixed(3);
  }
  if (firstLine) firstLine.style.transform = `translate3d(${((1 - eased) * 11).toFixed(2)}vw, 0, 0)`;
  if (secondLine) secondLine.style.transform = `translate3d(${((1 - eased) * -13).toFixed(2)}vw, 0, 0)`;
  if (copy) {
    copy.style.transform = `translate3d(0, ${((1 - eased) * 52).toFixed(2)}px, 0)`;
    copy.style.opacity = eased.toFixed(3);
  }
  if (footer) {
    const footerProgress = Math.max(0, Math.min(1, (progress - 0.34) / 0.22));
    footer.style.transform = `translate3d(0, ${((1 - footerProgress) * 28).toFixed(2)}px, 0)`;
    footer.style.opacity = footerProgress.toFixed(3);
  }

  surface.querySelectorAll<HTMLElement>("[data-about-item]").forEach((item, index) => {
    const localProgress = Math.max(0, Math.min(1, (progress - 0.18 - index * 0.045) / 0.27));
    const itemEase = 1 - (1 - localProgress) ** 3;
    const y = (1 - itemEase) * (72 + index * 12);
    const rotation = (1 - itemEase) * (index - 1) * 2.5 + velocity * 0.025;
    item.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${rotation.toFixed(2)}deg)`;
    item.style.opacity = itemEase.toFixed(3);
  });
}

function animateContact(surface: HTMLElement, progress: number) {
  const firstLine = surface.querySelector<HTMLElement>("[data-contact-line='first']");
  const secondLine = surface.querySelector<HTMLElement>("[data-contact-line='second']");
  const action = surface.querySelector<HTMLElement>("[data-contact-action]");
  const contactProgress = Math.max(0, Math.min(1, (progress - 0.12) / 0.42));
  const eased = 1 - (1 - contactProgress) ** 3;

  if (firstLine) firstLine.style.clipPath = `inset(0 ${(1 - eased) * 100}% 0 0)`;
  if (secondLine) secondLine.style.clipPath = `inset(0 0 0 ${(1 - eased) * 100}%)`;
  if (action) {
    action.style.transform = `scale(${(0.35 + eased * 0.65).toFixed(3)}) rotate(${((1 - eased) * -14).toFixed(2)}deg)`;
    action.style.opacity = eased.toFixed(3);
  }
}
