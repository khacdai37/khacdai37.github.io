import { routes } from "@/lib/routes";

export const siteUrl = "https://khacdai37.github.io";

export const profile = {
  name: "Dai Khac Nguyen",
  role: "iOS Engineer",
  eyebrow: "iOS & Mobile Engineer",
  tagline: "Ten years of shipping apps people keep on their home screen.",
  summary:
    "iOS engineer with 10+ years building apps for health, lifestyle, and social media. Swift, Objective-C, UIKit, MVVM — shipped apps with 2M+ downloads and a 4.8/5 App Store rating.",
  about: [
    "I started on iOS in 2013 and never really left. Most of that decade went into consumer apps — the kind with millions of downloads, where a dropped frame or a 200ms delay is something real people feel. That taught me to care about performance, offline behaviour, and the unglamorous work of keeping a codebase alive across years of feature churn.",
    "Lately I have been deep in real-time media — video and voice streaming with Agora SDK and WebRTC — and in cross-platform work with React Native. I lead small teams, mentor juniors, and generally believe the best architecture is the one the next engineer can read without a meeting.",
  ],
  philosophy: "Ship it, measure it, then make it faster.",
  stack: "Native iOS with Swift & UIKit. Cross-platform with React Native.",
  avatar: "/portfolio/avatar.jpg",
  social: {
    github: "https://github.com/khacdai37",
    linkedin: "https://www.linkedin.com/in/khacdai37",
    youtube: "https://www.youtube.com/@khacdai37it",
    youtubeHandle: "@khacdai37it",
    // Ghép lại ở client để tránh bot scrape — xem components/portfolio/ContactSection.tsx
    emailUser: "khacdai.37.it",
    emailDomain: "gmail.com",
  },
} as const;

export const contactSubjects = [
  "Freelance iOS Project",
  "Full-Time Opportunity",
  "App Collaboration",
  "General Inquiry",
] as const;

/* ────────────────────────────────────────────────────────────
   Tech & Tools (trang /apps)
   `color` là class Tailwind cho pill — giữ tương phản đủ đọc.
   ──────────────────────────────────────────────────────────── */

export interface TechItem {
  name: string;
  color: string;
}
export interface TechGroup {
  group: string;
  items: TechItem[];
}

export const techIntro =
  "Swift and Xcode are where I live — that is where the vast majority of my decade has gone. Objective-C still shows up in the codebases I inherit, React Native when a client wants one team instead of two, and the web stack when a side project calls for it.";

export const techGroups: TechGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "Swift", color: "bg-orange-500 text-white" },
      { name: "Objective-C", color: "bg-blue-600 text-white" },
      { name: "Java", color: "bg-red-600 text-white" },
      { name: "C#", color: "bg-green-700 text-white" },
      { name: "TypeScript", color: "bg-blue-700 text-white" },
      { name: "SQL", color: "bg-slate-600 text-white" },
    ],
  },
  {
    group: "iOS / Apple Frameworks",
    items: [
      { name: "UIKit", color: "bg-blue-500 text-white" },
      { name: "SwiftUI", color: "bg-orange-500 text-white" },
      { name: "Combine", color: "bg-purple-600 text-white" },
      { name: "Core Data", color: "bg-indigo-600 text-white" },
      { name: "CallKit", color: "bg-green-600 text-white" },
      { name: "AVFoundation", color: "bg-blue-500 text-white" },
      { name: "StoreKit", color: "bg-gray-700 text-white" },
      { name: "Auto Layout", color: "bg-sky-600 text-white" },
    ],
  },
  {
    group: "Real-Time & Media",
    items: [
      { name: "Agora SDK", color: "bg-cyan-600 text-white" },
      { name: "WebRTC", color: "bg-violet-600 text-white" },
      { name: "WebSocket", color: "bg-teal-600 text-white" },
    ],
  },
  {
    group: "Architecture & Libraries",
    items: [
      { name: "MVVM", color: "bg-gray-800 text-white" },
      { name: "RxSwift", color: "bg-pink-600 text-white" },
      { name: "SnapKit", color: "bg-rose-500 text-white" },
      { name: "Alamofire", color: "bg-orange-600 text-white" },
      { name: "Kingfisher", color: "bg-emerald-600 text-white" },
      { name: "Realm", color: "bg-indigo-900 text-white" },
      { name: "GraphQL / Apollo", color: "bg-fuchsia-600 text-white" },
      { name: "Firebase", color: "bg-yellow-400 text-black" },
    ],
  },
  {
    group: "Cross-Platform",
    items: [
      { name: "React Native", color: "bg-cyan-400 text-black" },
      { name: "Xamarin", color: "bg-blue-800 text-white" },
      { name: "Next.js", color: "bg-black text-white" },
    ],
  },
  {
    group: "Tools & Workflow",
    items: [
      { name: "Xcode", color: "bg-blue-600 text-white" },
      { name: "CocoaPods", color: "bg-red-500 text-white" },
      { name: "SPM", color: "bg-orange-500 text-white" },
      { name: "Carthage", color: "bg-gray-700 text-white" },
      { name: "Git / GitLab", color: "bg-orange-600 text-white" },
      { name: "Jira", color: "bg-blue-500 text-white" },
      { name: "Docker", color: "bg-sky-700 text-white" },
      { name: "Agile / Scrum", color: "bg-emerald-700 text-white" },
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Freelance & Consulting — cố ý KHÔNG nêu tên khách hàng.
   ──────────────────────────────────────────────────────────── */

export const consulting = {
  title: "Freelance & Consulting",
  available: true,
  intro:
    "Alongside my own apps, most of my decade has been building iOS for other people's products — largely for the Japanese and Korean markets, plus startups that needed an app shipped before the runway ran out.",
  markets: [
    {
      name: "Japan & Korea",
      body: "Long-running engagements with product teams in Tokyo and Seoul. Remote-first, async-heavy, and held to the review standards those markets expect.",
    },
    {
      name: "Startups",
      body: "First version to App Store, usually as the only iOS engineer. Scoping, architecture, release pipeline, and the pragmatic trade-offs that get a v1 out.",
    },
    {
      name: "Team leadership",
      body: "Led teams of 2–3 engineers, mentored juniors, and ran delivery in Agile/Scrum with cross-functional partners.",
    },
  ],
  offers: [
    "Native iOS builds in Swift & Objective-C",
    "Real-time video/voice features (Agora, WebRTC)",
    "Rescuing and re-architecting legacy codebases",
    "Performance, crash-rate and App Store review work",
    "Cross-platform delivery with React Native",
  ],
};

/* ────────────────────────────────────────────────────────────
   YouTube — @khacdai37it. Link video sẽ cập nhật sau.
   ──────────────────────────────────────────────────────────── */

export const youtube = {
  handle: profile.social.youtubeHandle,
  url: profile.social.youtube,
  intro:
    "I make iOS videos in Vietnamese — the things I had to learn the hard way over ten years of shipping, explained properly rather than skimmed. No copy-this-and-move-on tutorials.",
  learnIntro:
    "Topics I keep coming back to, drawn from problems I have actually had to solve on production apps.",
  topics: [
    {
      title: "Swift & UIKit",
      body: "Layout, navigation, gestures, animation — and how UIKit and SwiftUI actually coexist in a real codebase.",
      icon: "smartphone",
    },
    {
      title: "Architecture",
      body: "MVVM in practice, dependency handling, and how to keep a codebase readable after three years of feature churn.",
      icon: "layers",
    },
    {
      title: "Real-Time Media",
      body: "Video and voice streaming with Agora SDK and WebRTC — the parts the documentation glosses over.",
      icon: "video",
    },
    {
      title: "Data & Offline",
      body: "Core Data, Realm, and Apollo caching — making an app feel instant when the network does not cooperate.",
      icon: "database",
    },
    {
      title: "Performance",
      body: "Profiling with Instruments, cutting crash rates, memory and threading work on real production apps.",
      icon: "gauge",
    },
    {
      title: "Shipping",
      body: "App Store review, TestFlight, CI, and everything between 'it works on my machine' and a live release.",
      icon: "rocket",
    },
  ],
  /** Điền khi có video. Rỗng ⇒ trang hiện trạng thái "coming soon". */
  videos: [] as { title: string; url: string; repo?: string }[],
};

/* ────────────────────────────────────────────────────────────
   Apps
   ──────────────────────────────────────────────────────────── */

export interface App {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  description: string;
  platform: "iOS" | "Web";
  year: string;
  tech: string[];
  /** 3 gạch đầu dòng ngắn trên thẻ ở /apps — điểm nổi bật, không lặp `blurb`. */
  highlights: string[];
  featured: boolean;
  live: boolean;
  /** Link nội bộ (app web) — loại trừ với `appStoreUrl`. */
  href?: string;
  /** Trang landing riêng của app. Thiếu ⇒ thẻ không hiện "Learn more". */
  detailHref?: string;
  appStoreId?: string;
  appStoreUrl?: string;
  /** Ảnh trong public/. Rỗng ⇒ card dùng fallback, carousel tự ẩn. */
  images: string[];
}

export const apps: App[] = [
  {
    slug: "inkline",
    name: "Inkline — English Dictation",
    category: "Education",
    blurb:
      "Hear a sentence, write down exactly what you heard, and get graded word by word — what you missed, what you added, what you misheard.",
    description:
      "Dictation is the strictest listening practice there is: you cannot catch the gist and move on, because every word has to be heard and written. Inkline does that one thing. Lessons arrive already split into sentences, playback stops at the end of each one, and every answer is compared against the transcript word by word. It ships with 54 public-domain lessons and imports your own audio — with subtitles, with a transcript, or with nothing at all.",
    platform: "iOS",
    year: "2026",
    tech: ["Swift", "SwiftUI", "SwiftData"],
    highlights: [
      "Graded word by word — misspelled, missing and extra words each get their own colour",
      "Import your own audio: SRT/VTT, a plain transcript, or nothing at all",
      "54 free public-domain lessons, 3,500+ sentences, A2 to C1 — no account, no ads",
    ],
    featured: true,
    live: true,
    appStoreId: "6795887349",
    appStoreUrl:
      "https://apps.apple.com/us/app/inkline-english-dictation/id6795887349",
    detailHref: routes.inkline,
    // Mockup nền trong suốt — xem `lib/deviceShot.ts`.
    // Ảnh đầu là màn đang chấm — vừa làm cover thẻ ở /apps, vừa làm ảnh hero.
    images: [
      "/portfolio/inkline/dictation-graded.png",
      "/portfolio/inkline/library.png",
      "/portfolio/inkline/categories.png",
      "/portfolio/inkline/lessons.png",
      "/portfolio/inkline/listen-read.png",
      "/portfolio/inkline/add-lesson.png",
      "/portfolio/inkline/dictation.png",
    ],
  },
  {
    slug: "pomodoro",
    name: "Pomodoro — Focused, Ticking Away",
    category: "Productivity",
    blurb:
      "A focus timer that keeps the Pomodoro technique honest: work, break, repeat, with the ticking that tells you it is still running.",
    description:
      "Most focus timers bury the technique under features. This one keeps it plain: pick a length, start, and let the tick hold you to it. Work, short break, long break, repeat — no accounts, no dashboards, nothing to configure before you can begin.",
    platform: "iOS",
    year: "2025",
    tech: ["Swift", "SwiftUI"],
    highlights: [
      "Work, short break, long break — the technique with nothing bolted on",
      "An optional tick keeps the session present without you watching it",
      "No accounts, no dashboards, nothing to configure before you start",
    ],
    featured: true,
    live: true,
    appStoreId: "6771709585",
    appStoreUrl:
      "https://apps.apple.com/vn/app/pomodoro-focused-ticking-away/id6771709585",
    detailHref: routes.pomodoro,
    images: [
      "/portfolio/pomodoro/home-focus-idle.png",
      "/portfolio/pomodoro/home-short-break.png",
      "/portfolio/pomodoro/settings.png",
    ],
  },
  {
    slug: "family-tree",
    name: "Gia Phả — Family Tree",
    category: "Web App",
    blurb:
      "A Vietnamese family-tree viewer. Members live in Markdown files, load from a .zip entirely in the browser, and render as an interactive d3 tree.",
    description:
      "A genealogy viewer for Vietnamese families. Each member is a Markdown file; you load a .zip and everything is parsed in the browser — no backend, no account, nothing leaves your device. It draws the tree with d3, works out generations dynamically, resolves the notoriously intricate Vietnamese kinship terms, and reports statistics across the family.",
    platform: "Web",
    year: "2026",
    tech: ["Next.js", "React", "TypeScript", "d3", "Tailwind"],
    highlights: [
      "Members live in Markdown files — load a .zip and it parses in the browser",
      "Interactive d3 tree that works out generations dynamically",
      "Vietnamese kinship-term resolver plus family-wide statistics",
    ],
    featured: true,
    live: true,
    href: routes.familyTree.root,
    images: [
      "/portfolio/family-tree/tree.jpg",
      "/portfolio/family-tree/launchpad.jpg",
      "/portfolio/family-tree/kinship.jpg",
      "/portfolio/family-tree/stats.jpg",
    ],
  },
];

export const featuredApps = apps.filter((a) => a.featured);
