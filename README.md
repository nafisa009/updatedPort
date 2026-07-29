# Nafisa Nasrin — Portfolio (v3: Richer content, SEO, filters)

This is the full upgraded portfolio: a multi-page site with dark/light mode,
a public testimonials guestbook, a News/Achievements page, and a floating
AI assistant that can answer visitor questions about Nafisa.

**What's new in v3:**
- Every project now has a **problem statement**, **key features**, **role**, and **duration** — not just a one-line description
- **Tech filter** on the Projects page — filter cards by React/Python/JS/etc.
- **Availability banner** on the Home page ("Open to internships…") — edit `availability` in `js/data.js`
- **FAQ accordion** on the Contact page (also mirrored into the AI assistant's knowledge)
- **Languages section** added to the About page
- Skills page now groups skills by category with short notes on each
- SEO: meta descriptions, Open Graph tags, a favicon, JSON-LD structured data, `robots.txt`, `sitemap.xml`
- A proper `404.html` page
- Server-side honeypot spam check added to the guestbook backend (defense in depth)

```
portfolio-v3/
├── frontend/              → the actual website (static — deploy to GitHub Pages)
│   ├── index.html          Home
│   ├── about.html          About
│   ├── skills.html         Skills
│   ├── projects.html       Projects
│   ├── news.html           News & Achievements
│   ├── testimonials.html   Guestbook / testimonials
│   ├── education.html      Education & Certificates
│   ├── contact.html        Contact + FAQ
│   ├── 404.html             Not-found page
│   ├── robots.txt / sitemap.xml
│   ├── css/style.css       All styling + dark/light theme
│   ├── js/
│   │   ├── config.js        ← set your live backend URL here after deploying
│   │   ├── data.js          ← all editable content (skills/projects/news/certs/FAQ)
│   │   ├── common.js        nav, footer, theme toggle, petals, animations
│   │   ├── chatbot.js       AI assistant widget
│   │   └── comments.js      guestbook logic
│   └── assets/
│       ├── Nafisa_Nasrin_Resume.pdf
│       └── favicon.svg
│
└── backend/                → the API server (deploy separately — see backend/README.md)
    ├── server.js            Express server: /api/ask + /api/comments
    ├── profile.js           info the AI assistant is allowed to talk about
    ├── commentsStore.js     guestbook storage (file-based)
    ├── package.json
    ├── .env.example
    └── README.md            ⭐ full setup + free deployment steps
```

---

## Quick Start (run everything locally first)

**1. Frontend** — just open it:
- In VS Code, right-click `frontend/index.html` → **Open with Live Server**.

**2. Backend** (needed for the AI assistant + guestbook to actually work):
- Follow **`backend/README.md`** step by step — it walks through getting a
  free Anthropic API key, running the server locally, and deploying it for
  free so the live site works for every visitor, not just you.

Until the backend is deployed and `frontend/js/config.js` is updated with
its live URL, the chat widget and guestbook will show a friendly
"not connected yet" message instead of erroring out — the rest of the site
works completely fine without it.

---

## What's new in this version vs. the single-page site

| Feature | Details |
|---|---|
| **Multi-page** | Each nav item (Home, About, Skills, Projects, News, Testimonials, Education, Contact) is its own page/URL, not a scroll anchor. |
| **Dark / Light mode** | Toggle button in the navbar (🌙 / ☀️). Preference is saved in the visitor's browser and remembered next visit. |
| **News & Achievements** | Combined timeline of milestones + "what I'm working on" updates, filterable. Edit `js/data.js` → `news` array to add new entries. |
| **Public Guestbook** | Anyone can leave a testimonial; it's stored on the backend and visible to all visitors. Includes spam protection (honeypot field + rate limiting). |
| **AI Assistant** | Floating chat bubble (bottom-right, every page) that answers questions about Nafisa using Claude, grounded in `backend/profile.js` so it only talks about real information. |
| **Live project links** | `js/data.js` has `liveUrl` / `repoUrl` fields per project — currently empty, so the site shows "Coming soon". Add real links once projects are hosted/pushed to GitHub. |

---

## Deploying the whole thing live

1. **Frontend → GitHub Pages** (free): push the `frontend/` folder's contents
   to a GitHub repo and enable Pages, same as before (Settings → Pages →
   deploy from `main` branch). If `frontend/` is a subfolder of your repo,
   GitHub Pages needs the site files at the repo root or you'll need to set
   the Pages source folder accordingly — simplest is to make `frontend/`'s
   contents the root of the repo.
2. **Backend → Render.com** (free): follow `backend/README.md`.
3. Update `frontend/js/config.js` with your live backend URL, push again.
4. Add real project links & certificates in `frontend/js/data.js` and
   `backend/profile.js` (keep both in sync) whenever you have them.

---

## Editing content later

Everything content-related lives in **`frontend/js/data.js`** (skills,
projects, news, certificates, socials) — edit that one file and every page
updates automatically. For the AI assistant to know about the same updates,
mirror the change into **`backend/profile.js`** too.
