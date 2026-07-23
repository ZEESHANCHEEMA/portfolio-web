import type { SVGProps } from "react";

type LogoMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function LogoMark({ title, ...props }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 310 120" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} {...props}>
      {title && <title>{title}</title>}
      <line x1="12" y1="14" x2="132" y2="14" />
      <line x1="132" y1="14" x2="12" y2="106" />
      <line x1="12" y1="106" x2="132" y2="106" />
      <line x1="178" y1="106" x2="178" y2="14" />
      <line x1="178" y1="14" x2="298" y2="106" />
      <line x1="298" y1="106" x2="298" y2="14" />
    </svg>
  );
}
