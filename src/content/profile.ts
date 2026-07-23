export type FeaturedProject = {
  id: string;
  name: string;
  product: string;
  role: string;
  platform: "Web";
  stack: readonly string[];
  highlights: readonly string[];
  image: string;
  imageAlt: string;
  liveUrl: string;
  githubUrl: string;
};

export const profile = {
  name: "Zeeshan Nawaz",
  role: "Web & Mobile Application Developer",
  location: "Gujranwala, Pakistan",
  email: "zeeshancheema1200@gmail.com",
  linkedIn: "https://www.linkedin.com/in/zeeshan-nawaz-10842",
  summary:
    "I build responsive web products and cross-platform mobile applications with React, Next.js, React Native, and TypeScript.",
} as const;

export const featuredProjects: readonly FeaturedProject[] = [
  {
    id: "logical-commercial-brokers",
    name: "Logical Commercial",
    product: "A property discovery and brokerage website for an Abu Dhabi real estate agency.",
    role: "Real Estate Platform",
    platform: "Web",
    stack: ["Next.js", "React", "TypeScript", "Lucide"],
    highlights: ["Property search", "Service showcase", "Enquiry flow"],
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
    image: "/projects/edutrack-pk.png",
    imageAlt: "EduTrack PK school dashboard preview",
    liveUrl: "https://project-present-web-eosin.vercel.app/",
    githubUrl: "https://github.com/fayzanrj/project-present-web",
  },
] as const;
