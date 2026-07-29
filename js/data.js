/* =========================================================
   DATA — single source of truth for portfolio content.
   Edit this file to update Skills / Projects / News / Certificates /
   FAQ / Availability across the whole site.

   ⚠️ Keep backend/profile.js roughly in sync with this file —
   that's what the AI assistant reads to answer visitor questions.
   ========================================================= */

window.PORTFOLIO_DATA = {

  // Shown as a small banner on the Home page + used by the AI assistant.
  availability: {
    status: "open",   // "open" | "busy" | "closed"
    text: "Open to internships, freelance web projects, and collaboration opportunities.",
  },

  skills: [
    { name: "HTML", level: 90, category: "Frontend", note: "Semantic, accessible markup." },
    { name: "CSS", level: 85, category: "Frontend", note: "Responsive layouts, animations, Flexbox/Grid." },
    { name: "JavaScript", level: 82, category: "Frontend", note: "DOM manipulation, async/await, fetch APIs." },
    { name: "React", level: 72, category: "Frontend", note: "Component-based UIs, hooks, state management." },
    { name: "Python", level: 78, category: "Programming", note: "Scripting, problem solving, data basics." },
    { name: "C", level: 70, category: "Programming", note: "Core fundamentals, memory-aware programming." },
    { name: "Java", level: 65, category: "Programming", note: "OOP fundamentals, coursework projects." },
    { name: "Node.js", level: 68, category: "Backend", note: "REST APIs with Express, server-side JS." },
    { name: "Data Structures", level: 75, category: "Core CS", note: "Arrays, trees, graphs, hash maps." },
    { name: "Algorithms", level: 73, category: "Core CS", note: "Sorting, searching, complexity analysis." },
    { name: "Photoshop", level: 70, category: "Design", note: "UI mockups, image editing, social graphics." },
    { name: "Git & GitHub", level: 74, category: "Tools", note: "Version control, branching, collaboration." },
  ],

  capstoneProjects: [
    {
      tag: "Capstone Project",
      title: "CampusNova",
      duration: "2026",
      role: "Full-stack Developer",
      desc: "A smart campus management platform designed to centralize academic resources, notices, and everyday campus services into one streamlined experience.",
      problem: "Students at DIU had to check multiple disconnected sources — notice boards, department pages, group chats — just to stay updated on academic life, which meant important updates were easy to miss.",
      highlights: [
        "Centralized dashboard for notices, resources, and campus services",
        "Role-based views so students and staff see relevant information",
        "Responsive design built to work across desktop and mobile",
      ],
      stack: ["React", "Node.js", "JavaScript"],
      liveUrl: "",
      repoUrl: "",
    },
    {
      tag: "Capstone Project",
      title: "Women Safety App",
      duration: "2026",
      role: "Full-stack Developer",
      desc: "A safety-focused application built to enable quick emergency alerts and location sharing, aimed at improving response time during emergencies.",
      problem: "In an emergency, every second spent fumbling for the right contact or explaining a location costs time. This app was built to collapse that into a single quick action.",
      highlights: [
        "One-tap emergency alert with live location sharing",
        "Trusted contacts list configurable in advance",
        "Simple, high-contrast UI designed for stressful, low-visibility situations",
      ],
      stack: ["React", "JavaScript", "Node.js"],
      liveUrl: "",
      repoUrl: "",
    },
  ],

  otherProjects: [
    {
      tag: "Web Game",
      title: "Chess Project",
      duration: "2025",
      role: "Solo Developer",
      desc: "An interactive web-based chess game with move validation and a clean, responsive board interface.",
      problem: "Wanted to test how deep I could take core JavaScript logic — implementing real chess rules (legal move validation, turn order, check detection) without a game engine library.",
      highlights: [
        "Full legal-move validation coded from scratch in JavaScript",
        "Interactive, click-to-move board with visual move hints",
        "Fully responsive — playable on both desktop and mobile",
      ],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "",
      repoUrl: "",
    },
    {
      tag: "Web App",
      title: "Study Helper Website",
      duration: "2025",
      role: "Solo Developer",
      desc: "A productivity tool that helps students organize study material and manage study sessions more effectively.",
      problem: "Built this after noticing how much time students lose juggling notes, deadlines, and study schedules across scattered apps and notebooks.",
      highlights: [
        "Organize study material by subject and topic",
        "Session tracking to build consistent study habits",
        "Lightweight, distraction-free interface",
      ],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "",
      repoUrl: "",
    },
  ],

  // "Both combined" — achievements/milestones + blog-style updates, sorted newest first
  news: [
    {
      date: "2026-07-29",
      type: "update",
      title: "Added an AI assistant and public guestbook to the site",
      desc: "Extended the portfolio with a Claude-powered AI assistant that answers visitor questions, plus a public guestbook so visitors can leave feedback directly on the site.",
    },
    {
      date: "2026-07-21",
      type: "update",
      title: "Rebuilt personal portfolio into a multi-page site",
      desc: "Redesigned the portfolio from a single page into a full multi-page experience with dark/light mode, richer project write-ups, and a News & Achievements page.",
    },
    {
      date: "2026-07-15",
      type: "achievement",
      title: "Completed the Women Safety App capstone build",
      desc: "Wrapped up development on a safety-focused capstone application enabling quick emergency alerts and location sharing.",
    },
    {
      date: "2026-06-20",
      type: "achievement",
      title: "Shipped CampusNova capstone project",
      desc: "Delivered a centralized campus management platform as part of the software engineering capstone track.",
    },
    {
      date: "2026-01-10",
      type: "update",
      title: "Started exploring React & Node.js more deeply",
      desc: "Began building full-stack habits — moving from static sites to React front-ends backed by Node.js APIs.",
    },
    {
      date: "2024-01-05",
      type: "achievement",
      title: "Started BSc in Software Engineering",
      desc: "Began the Software Engineering program at Daffodil International University.",
    },
  ],

  // Placeholder certificates — replace with real ones anytime
  certificates: [
    { name: "Web Development Fundamentals", issuer: "Add issuing platform", year: "Add year", url: "" },
    { name: "Python Programming", issuer: "Add issuing platform", year: "Add year", url: "" },
    { name: "Data Structures & Algorithms", issuer: "Add issuing platform", year: "Add year", url: "" },
  ],

  languages: [
    { name: "Bangla", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Japanese", level: "Basic" },
    { name: "Hindi", level: "Basic" },
    { name: "Urdu", level: "Basic" },
  ],

  socials: [
    { label: "GitHub", short: "Gh", url: "https://github.com/nafisa009?tab=repositories" },
    { label: "LinkedIn", short: "In", url: "https://www.linkedin.com/in/nafisa-nasrin-1872ba341/" },
    { label: "Facebook", short: "Fb", url: "https://www.facebook.com/nafuwu" },
    { label: "Instagram", short: "Ig", url: "https://www.instagram.com/__bee.boo__/" },
  ],

  // Shown on the Contact page — also fed to the AI assistant so it can
  // answer these directly instead of guessing.
  faq: [
    {
      q: "What kind of work are you looking for right now?",
      a: "I'm currently open to internships, freelance web development projects, and collaborative opportunities where I can keep growing as a full-stack developer.",
    },
    {
      q: "What's your tech stack?",
      a: "Front-end: HTML, CSS, JavaScript, React. Back-end: Node.js. Core programming: Python, C, Java, with a solid grounding in Data Structures & Algorithms.",
    },
    {
      q: "Do you have live demos of your projects?",
      a: "Not yet for all of them — I'm actively working on deploying live versions and publishing the source code. Check the Projects page for the latest links.",
    },
    {
      q: "What's the fastest way to reach you?",
      a: "Email (nafisanasrin28@gmail.com) is best, or use the contact form on this site. You can also ask my AI assistant (bottom-right chat bubble) if you just have a quick question.",
    },
    {
      q: "Are you currently a student?",
      a: "Yes — I'm pursuing a BSc in Software Engineering at Daffodil International University, started in 2024.",
    },
  ],
};
