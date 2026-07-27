export type FeaturedProject = {
  id: string;
  name: string;
  product: string;
  role: string;
  platform: "Web" | "Web & Mobile";
  stack: readonly string[];
  highlights: readonly string[];
  outcomes: readonly { value: string; label: string }[];
  image: string;
  imageAlt: string;
  mobileImage?: string;
  liveUrl: string;
  githubUrl?: string;
};

export const profile = {
  name: "Zeeshan Nawaz",
  role: "Web & Mobile Application Developer",
  location: "Gujranwala, Pakistan",
  email: "ze3shannawaz@gmail.com",
  linkedIn: "https://www.linkedin.com/in/zeeshan-nawaz-f0842",
  summary:
    "I build responsive web products and cross-platform mobile applications with React, Next.js, React Native, and TypeScript.",
} as const;

export const featuredProjects: readonly FeaturedProject[] = [
  {
    id: "dex-remit",
    name: "Dex Remit",
    product: "A regulated international money-transfer platform for fast, secure cross-border payments.",
    role: "Fintech Product",
    platform: "Web & Mobile",
    stack: ["React", "React Native", "Payment APIs", "Secure transfers"],
    highlights: ["Global remittance", "Live exchange flow", "Mobile onboarding"],
    outcomes: [
      { value: "Web + mobile", label: "One connected transfer journey" },
      { value: "Cross-border", label: "Product built for international reach" },
    ],
    image: "/projects/dex-remit-web.png",
    imageAlt: "Dex Remit international money transfer website",
    mobileImage: "/projects/dex-mobile.png",
    liveUrl: "https://dexremit.com/",
  },
  {
    id: "logical-commercial-brokers",
    name: "Logical Commercial",
    product: "A property discovery and brokerage website for an Abu Dhabi real estate agency.",
    role: "Real Estate Platform",
    platform: "Web",
    stack: ["Next.js", "React", "TypeScript", "Lucide"],
    highlights: ["Property search", "Service showcase", "Enquiry flow"],
    outcomes: [
      { value: "Search → enquiry", label: "A shorter path for qualified leads" },
      { value: "Responsive", label: "Property discovery on every screen" },
    ],
    image: "/projects/logical-commercial.png",
    imageAlt: "Logical Commercial property discovery homepage",
    liveUrl: "https://real-state-sandy-one.vercel.app/",
    githubUrl: "https://github.com/ZEESHANCHEEMA/real-state",
  },
  {
    id: "tourist-guide",
    name: "Tourist Guide",
    product: "A destination-focused travel guide and photographer portfolio with interactive exploration.",
    role: "Travel Experience",
    platform: "Web",
    stack: ["Next.js", "React", "Leaflet", "Tailwind CSS"],
    highlights: ["Destination pages", "Interactive map", "Responsive gallery"],
    outcomes: [
      { value: "Map-led", label: "Exploration designed around place" },
      { value: "Visual-first", label: "A clearer route from story to destination" },
    ],
    image: "/projects/tourist-guide.png",
    imageAlt: "Tourist Guide cinematic travel homepage",
    liveUrl: "https://tourist-guide-seven-ivory.vercel.app/",
    githubUrl: "https://github.com/ZEESHANCHEEMA/Tourist-Guide",
  },
  {
    id: "pocketfiler",
    name: "Pocket Filer",
    product: "A workspace for managing contracts, project documents, clients, payments, and collaboration.",
    role: "Business Workspace",
    platform: "Web",
    stack: ["React", "Redux Toolkit", "Material UI", "Firebase", "Stripe"],
    highlights: ["Contract workflows", "Secure file locker", "Client collaboration"],
    outcomes: [
      { value: "One workspace", label: "Files, clients and payments connected" },
      { value: "End-to-end", label: "Contract work without tool switching" },
    ],
    image: "/projects/pocket-filer.png",
    imageAlt: "Pocket Filer workspace product visual",
    liveUrl: "https://pocketfiler.vercel.app/",
    githubUrl: "https://github.com/ZEESHANCHEEMA/pocketfiler",
  },
  {
    id: "edutrack-pk",
    name: "EduTrack PK",
    product: "A school management platform for academic operations, records, attendance, and fees.",
    role: "Education Platform",
    platform: "Web",
    stack: ["Next.js", "TypeScript", "Hono RPC", "Zod", "Zustand"],
    highlights: ["Student records", "Attendance tracking", "Academic operations"],
    outcomes: [
      { value: "Unified", label: "Academic operations in one product" },
      { value: "Role-based", label: "Clear workflows for school teams" },
    ],
    image: "/projects/edutrack-login-2026.png",
    imageAlt: "EduTrack PK live school management login screen",
    liveUrl: "https://present.labsliva.com/",
    githubUrl: "https://github.com/fayzanrj/project-present-web",
  },
] as const;
