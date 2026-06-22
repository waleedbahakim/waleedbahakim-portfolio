import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail, MapPin, Copy, Check, Search, Sun, Moon, Pencil, Terminal } from "lucide-react";

/* =====================================================================
   WALEED BAHAKIM  ·  PORTFOLIO  ·  concept: "The Drawing Set"
   A full-stack engineer's work presented as a blueprint / drawing set.
   Palette: drafting navy ink, paper white, brand orange as markup ink.
   ===================================================================== */

// --- content -------------------------------------------------------------
const EMAIL = "bahakimwaleed08@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/waleed-bahakim-890381227";
const GITHUB = "https://github.com/waleedbahakim";

const NAV = [
  { id: "about", label: "About", sheet: "02" },
  { id: "experience", label: "Experience", sheet: "03" },
  { id: "work", label: "Work", sheet: "04" },
  { id: "stack", label: "Stack", sheet: "05" },
  { id: "contact", label: "Contact", sheet: "06" },
];

// sections for the ⌘K command palette (Home + the five sheets)
const SHEETS = [{ id: "home", label: "Home", sheet: "01" }, ...NAV];

const METRICS = [
  { v: "35%", d: "faster load times", dir: "down" },
  { v: "90+", d: "Lighthouse scores" },
  { v: "40%", d: "faster onboarding", dir: "up" },
  { v: "1.5 yr", d: "shipping in production" },
];

const EXPERIENCE = [
  {
    tag: "CURRENT",
    role: "Full Stack Developer",
    company: "Fika AI Research",
    meta: "MERN + GenAI",
    period: "Jul 2025 — Present",
    points: [
      "Build client-facing dashboards and automation systems end to end — CallQC.AI, ConvergeIQ and ConsignFlow — React/Next.js front ends with Node APIs and data pipelines behind them.",
      "Integrate AI/LLM and Vision-AI services (OpenAI, Gemini) across the stack, and ship cloud-native apps on AWS with Docker.",
    ],
  },
  {
    tag: "EARLIER",
    role: "Associate Software Developer (Intern)",
    company: "CleverPe",
    meta: "Fintech · React/Next.js",
    period: "Dec 2024 — Jun 2025",
    points: [
      "Built merchant, partner and admin platforms with a loan gateway and multi-lender integrations (Cashe, Zype).",
      "Lifted performance by 35% (90+ Lighthouse) and cut merchant onboarding time by 40% with reusable architecture.",
    ],
  },
];

const PROJECTS = [
  {
    no: "01",
    name: "CBVI — Unified Case Management Platform",
    role: "Frontend · API · Backend modules",
    blurb:
      "Replaced fragmented spreadsheets with one real-time system for a U.S. violence-intervention nonprofit: role-based dashboards, multi-stage intake with consent rules, live notifications, file attachments, audit trails, and anonymized grant reporting.",
    stack: ["React", "Node.js", "Socket.IO", "AWS S3", "MongoDB"],
    link: "https://cbvi-web.vercel.app/login",
    tag: "Flagship",
    featured: true,
  },
  {
    no: "02",
    name: "Kriya",
    role: "Full-stack · Standup & task management",
    blurb:
      "A production tool teams run their day on. Multi-status workflows, recurrence-based scheduling, role-based access, Jira integration, and Razorpay-powered subscriptions.",
    stack: ["React", "Node.js", "MongoDB"],
    link: "https://kriya.xoft.in/login",
    tag: "Product",
  },
  {
    no: "03",
    name: "EStyleWala",
    role: "Frontend · Integration",
    blurb:
      "A vendor-facing dashboard for orders, listings and shipping — wired to Shiprocket for real-time tracking, shipment creation, and automated status updates.",
    stack: ["React", "Shiprocket API", "Node.js"],
    link: "https://vendor.estylewala.com",
    tag: "Freelance",
  },
  {
    no: "04",
    name: "StudyRevise",
    role: "Full-stack · GenAI",
    blurb:
      "Upload PDFs and get topic analysis, citation-grounded answers, and cross-document Q&A across multiple LLM providers — plus generated quizzes and progress tracking.",
    stack: ["Next.js", "Tailwind", "Multi-LLM"],
    link: null,
    tag: "GenAI",
  },
  {
    no: "05",
    name: "Ikhlaas",
    role: "Mobile · Offline-first",
    blurb:
      "A cross-platform habit app — daily task tracking, prayer times, gratitude journaling, Hijri calendar, and Quran/Hadith access, with a home-screen widget and local persistence.",
    stack: ["React Native", "Expo", "AsyncStorage"],
    link: null,
    tag: "Mobile",
  },
];

const STACK = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Zustand", "React Query", "Tailwind CSS", "Vite"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "REST APIs", "WebSockets", "Socket.IO"] },
  { group: "Data & Cloud", items: ["MongoDB", "Redis", "AWS S3", "GCP", "Firebase", "Docker", "Vercel"] },
  { group: "AI", items: ["GenAI", "LLM integration", "OpenAI", "Gemini", "Claude", "Whisper", "MCP"] },
  { group: "Mobile", items: ["React Native", "Expo", "Flutter", "Dart (intermediate)"] },
  { group: "Tooling", items: ["Git", "GitHub", "Jest", "Postman", "Figma"] },
];

// --- styles --------------------------------------------------------------
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root{
  --ink:#0A1220;
  --ink-2:#0d1828;
  --ink-3:#102135;
  --line:rgba(134,180,214,0.10);
  --line-2:rgba(134,180,214,0.20);
  --line-3:rgba(134,180,214,0.34);
  --paper:#EAF0F7;
  --paper-2:#C5D3E2;
  --muted:#7E94AC;
  --muted-2:#586C82;
  --signal:#FF6A2B;
  --signal-2:#ff8a57;
  --signal-soft:rgba(255,106,43,0.13);
  --ice:#8FBBDD;
  --maxw:1200px;
  --pad:clamp(1.15rem,5vw,4rem);
  --dsp:'Bricolage Grotesque',ui-sans-serif,system-ui,-apple-system,sans-serif;
  --body:'Inter',ui-sans-serif,system-ui,-apple-system,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  /* themeable surfaces (overridden by the light "paper" theme) */
  --nav-bg:rgba(10,18,32,.72);
  --panel-bg:rgba(13,24,40,.66);
  --panel-shadow:0 30px 80px -20px rgba(0,0,0,.7);
  --stroke:rgba(234,240,247,.74);
  --vig:inset 0 0 220px 40px rgba(3,7,14,.7);
  --tint:rgba(255,255,255,.02);
  --tint-hover:rgba(255,255,255,.03);
  --feat-grad:linear-gradient(180deg,rgba(16,33,53,.5),rgba(13,24,40,.3));
}

/* light "paper / drawing" theme — drafting paper, navy ink, orange markup */
.pf[data-theme="light"]{
  --ink:#ECEAE2;
  --ink-2:#E3E1D7;
  --ink-3:#D6D3C6;
  --paper:#15202E;
  --paper-2:#3B4B5F;
  --muted:#55687C;
  --muted-2:#82909F;
  --line:rgba(26,50,84,0.16);
  --line-2:rgba(26,50,84,0.26);
  --line-3:rgba(26,50,84,0.40);
  --signal:#E5561B;
  --signal-2:#FF6A2B;
  --signal-soft:rgba(229,86,27,0.12);
  --nav-bg:rgba(236,234,226,.82);
  --panel-bg:rgba(227,225,215,.74);
  --panel-shadow:0 24px 60px -24px rgba(26,42,66,.28);
  --stroke:rgba(21,32,46,.5);
  --vig:inset 0 0 200px 30px rgba(110,120,135,.10);
  --tint:rgba(26,40,60,.03);
  --tint-hover:rgba(26,40,60,.05);
  --feat-grad:linear-gradient(180deg,rgba(255,255,255,.5),rgba(255,255,255,.18));
}

*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
.pf{ background:var(--ink); color:var(--paper); font-family:var(--body);
  position:relative; overflow-x:hidden; -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility; line-height:1.55; min-height:100vh; }
.pf ::selection{ background:var(--signal); color:#0A1220; }

/* blueprint grid + atmosphere */
.bg-grid{ position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:linear-gradient(var(--line) 1px,transparent 1px),
                   linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:40px 40px;
  -webkit-mask-image:radial-gradient(125% 90% at 50% 0%,#000 35%,rgba(0,0,0,.45) 72%,transparent 100%);
  mask-image:radial-gradient(125% 90% at 50% 0%,#000 35%,rgba(0,0,0,.45) 72%,transparent 100%); }
.bg-glow{ position:fixed; z-index:0; pointer-events:none; top:-22vh; left:50%;
  width:120vw; height:80vh; transform:translateX(-50%);
  background:radial-gradient(50% 60% at 50% 0%,var(--signal-soft),transparent 70%); }
.bg-vig{ position:fixed; inset:0; z-index:0; pointer-events:none;
  box-shadow:var(--vig); }
.bg-scan{ position:fixed; left:0; right:0; height:1px; z-index:0; pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(255,138,87,.5),transparent);
  opacity:.05; animation:scan 9s linear infinite; }
@keyframes scan{ from{transform:translateY(-8vh);} to{transform:translateY(112vh);} }

.wrap{ position:relative; z-index:2; max-width:var(--maxw); margin:0 auto; padding-inline:var(--pad); }

/* scroll progress */
.scan-progress{ position:fixed; top:0; left:0; right:0; height:2px; z-index:60; pointer-events:none; }
.scan-progress i{ display:block; height:100%; width:100%; transform:scaleX(0); transform-origin:0 50%;
  background:linear-gradient(90deg,var(--signal),var(--signal-2)); transition:transform .1s linear; }

/* nav */
.nav{ position:fixed; top:0; left:0; right:0; z-index:50; transition:background .35s, border-color .35s, backdrop-filter .35s; border-bottom:1px solid transparent; }
.nav.scrolled{ background:var(--nav-bg); backdrop-filter:blur(12px) saturate(140%); border-bottom-color:var(--line-2); }
.nav-in{ max-width:var(--maxw); margin:0 auto; padding:.85rem var(--pad); display:flex; align-items:center; justify-content:space-between; gap:1rem; }
.brand{ display:flex; align-items:center; gap:.7rem; text-decoration:none; color:var(--paper); }
.mono-mark{ width:30px; height:30px; display:grid; place-items:center; border:1px solid var(--line-3); font-family:var(--mono); font-weight:700; font-size:.72rem; letter-spacing:.04em; color:var(--paper); background:var(--ink-2); }
.brand-name{ font-family:var(--mono); font-size:.74rem; letter-spacing:.16em; color:var(--paper-2); text-transform:uppercase; }
.nav-links{ display:flex; align-items:center; gap:1.6rem; }
.nav-link{ position:relative; text-decoration:none; color:var(--muted); font-family:var(--mono); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; transition:color .2s; padding-block:.3rem; }
.nav-link sup{ color:var(--muted-2); font-size:.58rem; margin-left:.15em; }
.nav-link:hover{ color:var(--paper); }
.nav-link.on{ color:var(--paper); }
.nav-link.on::after{ content:""; position:absolute; left:0; bottom:-2px; height:1px; width:100%; background:var(--signal); }
.nav-right{ display:flex; align-items:center; gap:.8rem; }
.cmdk-hint{ display:inline-flex; align-items:center; gap:.45rem; background:transparent; border:1px solid var(--line-2); color:var(--muted);
  font-family:var(--mono); font-size:.66rem; letter-spacing:.08em; padding:.45rem .6rem; cursor:pointer; transition:border-color .2s, color .2s; }
.cmdk-hint:hover{ border-color:var(--line-3); color:var(--paper); }
.cmdk-hint kbd{ font-family:var(--mono); font-size:.66rem; }
.theme-toggle{ display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; background:transparent;
  border:1px solid var(--line-2); color:var(--paper-2); cursor:pointer; transition:border-color .2s, color .2s; }
.theme-toggle:hover{ border-color:var(--line-3); color:var(--signal); }
.btn-nav{ font-family:var(--mono); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; text-decoration:none;
  color:var(--signal); border:1px solid var(--signal); padding:.5rem .85rem; transition:.2s; display:inline-flex; align-items:center; gap:.4rem; }
.btn-nav:hover{ background:var(--signal); color:#0A1220; }

/* command palette */
.cmdk{ position:fixed; inset:0; z-index:120; display:flex; align-items:flex-start; justify-content:center; padding-top:14vh;
  background:rgba(5,10,18,.6); backdrop-filter:blur(4px); animation:cmdkin .18s ease; }
.cmdk-panel{ width:min(440px,92vw); background:var(--ink-2); border:1px solid var(--line-3); box-shadow:var(--panel-shadow); }
.cmdk-head{ display:flex; align-items:center; gap:.6rem; padding:.7rem .9rem; border-bottom:1px solid var(--line-2);
  font-family:var(--mono); font-size:.7rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
.cmdk-head kbd{ margin-left:auto; font-family:var(--mono); font-size:.6rem; border:1px solid var(--line-2); padding:.12rem .35rem; color:var(--muted-2); }
.cmdk-list{ padding:.4rem; display:flex; flex-direction:column; gap:.1rem; }
.cmdk-item{ display:flex; align-items:center; gap:.8rem; padding:.62rem .7rem; background:transparent; border:none; text-align:left; cursor:pointer; color:var(--paper-2); font-family:var(--body); }
.cmdk-item.on{ background:var(--signal-soft); color:var(--paper); }
.cmdk-sheet{ font-family:var(--mono); font-size:.66rem; color:var(--signal); letter-spacing:.1em; }
.cmdk-label{ font-size:.96rem; }
.cmdk-go{ margin-left:auto; font-family:var(--mono); font-size:.85rem; color:var(--muted-2); opacity:0; }
.cmdk-item.on .cmdk-go{ opacity:1; }
@keyframes cmdkin{ from{opacity:0; transform:translateY(-8px);} to{opacity:1; transform:none;} }

/* shared section bits */
.section{ padding-block:clamp(4.5rem,11vh,8.5rem); position:relative; }
.sheet-head{ display:flex; align-items:baseline; gap:1rem; flex-wrap:wrap; margin-bottom:clamp(2rem,5vw,3.2rem); }
.eyebrow{ font-family:var(--mono); font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:var(--signal); display:inline-flex; align-items:center; gap:.55rem; }
.eyebrow::before{ content:""; width:26px; height:1px; background:var(--signal); display:inline-block; }
.sheet-tag{ font-family:var(--mono); font-size:.7rem; letter-spacing:.14em; color:var(--muted-2); margin-left:auto; }
.h2{ font-family:var(--dsp); font-weight:700; font-size:clamp(2.1rem,6vw,3.6rem); line-height:1; letter-spacing:-.02em; margin:.6rem 0 0; }
.rule{ height:1px; background:var(--line-2); margin-top:1.1rem; position:relative; }
.rule::before{ content:""; position:absolute; left:0; top:-2px; width:5px; height:5px; background:var(--signal); }

/* reveal */
[data-reveal]{ opacity:0; transform:translateY(18px); transition:opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1); }
[data-reveal].in{ opacity:1; transform:none; }

/* ---------- HERO ---------- */
.hero{ position:relative; min-height:100vh; display:flex; align-items:center; padding-top:6rem; padding-bottom:3rem; }
.hero-glow{ position:absolute; inset:0; z-index:1; pointer-events:none;
  background:radial-gradient(340px circle at var(--mx,50%) var(--my,40%),rgba(255,106,43,.10),transparent 62%); }
.hero-in{ position:relative; z-index:3; width:100%; }
.h-eyebrow{ font-family:var(--mono); font-size:clamp(.7rem,1.4vw,.82rem); letter-spacing:.2em; text-transform:uppercase; color:var(--paper-2);
  display:inline-flex; align-items:center; gap:.6rem; opacity:0; animation:up .7s .05s forwards; }
.h-eyebrow b{ color:var(--signal); font-weight:500; }
.dot{ width:6px; height:6px; border-radius:50%; background:var(--signal); box-shadow:0 0 0 0 rgba(255,106,43,.55); animation:pulse 2.4s infinite; display:inline-block; }
.h-title{ font-family:var(--dsp); font-weight:800; letter-spacing:-.035em; line-height:.86;
  font-size:clamp(3.4rem,13.5vw,11rem); margin:1.1rem 0 0; }
.h-title .l1{ display:block; color:var(--paper); opacity:0; animation:up .8s .14s forwards; }
.h-title .l2{ display:block; color:transparent; -webkit-text-stroke:1.4px var(--stroke); text-stroke:1.4px var(--stroke);
  opacity:0; animation:up .8s .24s forwards; }
.h-dim{ display:flex; align-items:center; gap:.75rem; margin:1.5rem 0 0; max-width:560px; opacity:0; animation:up .8s .36s forwards; }
.h-dim .tick{ width:1px; height:13px; background:var(--line-3); flex:none; }
.h-dim .bar{ flex:1; height:1px; background:linear-gradient(90deg,var(--line-3),var(--line-2)); position:relative; }
.h-dim .bar::before,.h-dim .bar::after{ content:""; position:absolute; top:-3px; width:1px; height:7px; background:var(--line-3); }
.h-dim .bar::before{ left:0; } .h-dim .bar::after{ right:0; }
.h-dim .lab{ font-family:var(--mono); font-size:.7rem; letter-spacing:.16em; text-transform:uppercase; color:var(--signal); white-space:nowrap; }
.h-thesis{ margin:1.7rem 0 0; max-width:46ch; font-size:clamp(1rem,1.7vw,1.18rem); color:var(--paper-2); line-height:1.62; opacity:0; animation:up .8s .46s forwards; }
.h-cta{ display:flex; align-items:center; gap:1rem 1.4rem; flex-wrap:wrap; margin-top:2.2rem; opacity:0; animation:up .8s .56s forwards; }
.btn{ display:inline-flex; align-items:center; gap:.55rem; text-decoration:none; font-weight:600; font-size:.93rem; padding:.85rem 1.3rem; transition:.22s; cursor:pointer; border:1px solid transparent; }
.btn-fill{ background:var(--signal); color:#0A1220; }
.btn-fill:hover{ background:var(--signal-2); transform:translateY(-2px); box-shadow:0 12px 30px -12px rgba(255,106,43,.7); }
.btn-fill svg{ transition:transform .22s; }
.btn-fill:hover svg{ transform:translate(3px,-3px); }
.btn-ghost{ color:var(--paper); border-color:var(--line-3); background:transparent; }
.btn-ghost:hover{ border-color:var(--paper-2); background:var(--tint-hover); }
.lnk-mono{ font-family:var(--mono); font-size:.74rem; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); text-decoration:none; display:inline-flex; align-items:center; gap:.45rem; transition:color .2s; }
.lnk-mono:hover{ color:var(--signal); }

/* title block (signature) */
.titleblock{ position:absolute; right:var(--pad); top:calc(100vh - clamp(2rem,5vh,3.2rem)); transform:translateY(-100%); z-index:3; width:min(300px,42vw);
  border:1px solid var(--line-2); background:var(--panel-bg); backdrop-filter:blur(4px); opacity:0; animation:tbfade .9s .7s forwards; }
.tb-top{ display:flex; align-items:center; justify-content:space-between; padding:.55rem .8rem; border-bottom:1px solid var(--line-2); }
.tb-top span{ font-family:var(--mono); font-size:.62rem; letter-spacing:.18em; color:var(--muted); text-transform:uppercase; }
.tb-row{ display:grid; grid-template-columns:1fr 1.25fr; }
.tb-row > div{ padding:.5rem .8rem; border-bottom:1px solid var(--line); }
.tb-row > div:nth-child(odd){ border-right:1px solid var(--line); }
.tb-k{ font-family:var(--mono); font-size:.58rem; letter-spacing:.12em; color:var(--muted-2); text-transform:uppercase; }
.tb-v{ font-family:var(--mono); font-size:.7rem; color:var(--paper); margin-top:.18rem; }
.tb-v.sig{ color:var(--signal); }

/* metrics band */
.metrics{ border-top:1px solid var(--line-2); border-bottom:1px solid var(--line-2); }
.metrics-in{ display:grid; grid-template-columns:repeat(4,1fr); }
.metric{ padding:clamp(1.5rem,3.5vw,2.6rem) clamp(1rem,2.5vw,1.8rem); border-right:1px solid var(--line); }
.metric:last-child{ border-right:none; }
.metric .num{ font-family:var(--dsp); font-weight:700; font-size:clamp(1.9rem,4.6vw,3rem); line-height:1; letter-spacing:-.02em; color:var(--paper); display:inline-flex; align-items:baseline; gap:.25rem; }
.metric .num i{ color:var(--signal); font-style:normal; font-size:.7em; }
.metric .lab{ font-family:var(--mono); font-size:.7rem; letter-spacing:.06em; color:var(--muted); margin-top:.6rem; text-transform:uppercase; }

/* about */
.about-grid{ display:grid; grid-template-columns:1.55fr 1fr; gap:clamp(2rem,5vw,4.5rem); align-items:start; }
.about-copy p{ font-size:clamp(1.02rem,1.7vw,1.2rem); color:var(--paper-2); margin:0 0 1.15rem; line-height:1.7; max-width:54ch; }
.about-copy p b{ color:var(--paper); font-weight:600; }
.spec{ border:1px solid var(--line-2); }
.spec .sr{ display:grid; grid-template-columns:auto 1fr; gap:1rem; padding:.85rem 1rem; border-bottom:1px solid var(--line); align-items:baseline; }
.spec .sr:last-child{ border-bottom:none; }
.spec .sk{ font-family:var(--mono); font-size:.66rem; letter-spacing:.12em; color:var(--muted-2); text-transform:uppercase; }
.spec .sv{ font-size:.92rem; color:var(--paper); text-align:right; }
.spec .sv.sig{ color:var(--signal); font-family:var(--mono); font-size:.84rem; }

/* experience */
.exp{ display:grid; grid-template-columns:1fr; gap:0; }
.exp-row{ display:grid; grid-template-columns:170px 1fr; gap:clamp(1rem,3vw,2.5rem); padding:clamp(1.6rem,3.5vw,2.4rem) 0; border-top:1px solid var(--line-2); }
.exp-row:last-child{ border-bottom:1px solid var(--line-2); }
.exp-aside{ display:flex; flex-direction:column; gap:.6rem; }
.exp-pill{ align-self:flex-start; font-family:var(--mono); font-size:.62rem; letter-spacing:.14em; padding:.28rem .55rem; border:1px solid var(--line-3); color:var(--muted); text-transform:uppercase; }
.exp-pill.now{ color:var(--signal); border-color:var(--signal); }
.exp-period{ font-family:var(--mono); font-size:.68rem; color:var(--muted-2); letter-spacing:.04em; }
.exp-meta{ font-family:var(--mono); font-size:.72rem; color:var(--muted); letter-spacing:.04em; }
.exp-role{ font-family:var(--dsp); font-weight:700; font-size:clamp(1.35rem,2.8vw,1.85rem); line-height:1.1; letter-spacing:-.01em; }
.exp-co{ color:var(--signal); }
.exp-points{ list-style:none; padding:0; margin:1rem 0 0; display:grid; gap:.7rem; }
.exp-points li{ position:relative; padding-left:1.4rem; color:var(--paper-2); font-size:.98rem; line-height:1.6; max-width:64ch; }
.exp-points li::before{ content:""; position:absolute; left:0; top:.62em; width:7px; height:1px; background:var(--signal); }

/* work */
.feat{ display:flex; flex-direction:column; border:1px solid var(--line-2); background:var(--feat-grad); padding:clamp(1.6rem,4vw,2.8rem); position:relative; overflow:hidden; transition:border-color .3s; text-decoration:none; color:var(--paper); }
.feat::after{ content:""; position:absolute; right:14px; top:14px; width:34px; height:34px; border-top:1px solid var(--line-3); border-right:1px solid var(--line-3); }
.feat:hover{ border-color:var(--line-3); }
.feat-top{ display:flex; align-items:center; gap:.9rem; flex-wrap:wrap; }
.proj-no{ font-family:var(--mono); font-size:.8rem; color:var(--signal); letter-spacing:.1em; }
.proj-tag{ font-family:var(--mono); font-size:.62rem; letter-spacing:.14em; text-transform:uppercase; color:#0A1220; background:var(--signal); padding:.22rem .5rem; }
.proj-tag.ghost{ color:var(--muted); background:transparent; border:1px solid var(--line-3); }
.feat-name{ font-family:var(--dsp); font-weight:700; font-size:clamp(1.7rem,4vw,2.7rem); line-height:1.05; letter-spacing:-.02em; margin:1.1rem 0 0; max-width:22ch; }
.feat-role{ font-family:var(--mono); font-size:.74rem; letter-spacing:.06em; color:var(--muted); margin-top:.7rem; text-transform:uppercase; }
.feat-blurb{ color:var(--paper-2); font-size:1.02rem; line-height:1.66; margin:1.1rem 0 0; max-width:62ch; }
.chips{ display:flex; flex-wrap:wrap; gap:.5rem; margin-top:1.3rem; }
.chip{ font-family:var(--mono); font-size:.68rem; letter-spacing:.04em; color:var(--paper-2); border:1px solid var(--line-2); padding:.32rem .6rem; background:var(--tint); }
.visit{ display:inline-flex; align-items:center; gap:.5rem; margin-top:1.5rem; text-decoration:none; color:var(--signal); font-weight:600; font-size:.95rem; }
.visit svg{ transition:transform .22s; }
.visit:hover svg{ transform:translate(3px,-3px); }

.grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line-2); border:1px solid var(--line-2); margin-top:1px; }
.card{ background:var(--ink); padding:clamp(1.4rem,2.6vw,1.9rem); display:flex; flex-direction:column; gap:.4rem; text-decoration:none; color:var(--paper); transition:background .28s, transform .28s; position:relative; min-height:260px; }
.card:hover{ background:var(--ink-2); }
.card--nolink{ cursor:default; }
.card .ct{ display:flex; align-items:center; justify-content:space-between; }
.card .cgo{ color:var(--muted); transition:transform .25s, color .25s; }
.card:hover .cgo{ color:var(--signal); transform:translate(3px,-3px); }
.card .soon{ font-family:var(--mono); font-size:.58rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted-2); border:1px solid var(--line-2); padding:.2rem .45rem; }
.card-name{ font-family:var(--dsp); font-weight:700; font-size:1.3rem; line-height:1.12; letter-spacing:-.01em; margin-top:.5rem; }
.card-role{ font-family:var(--mono); font-size:.68rem; letter-spacing:.05em; color:var(--muted); text-transform:uppercase; }
.card-blurb{ color:var(--paper-2); font-size:.92rem; line-height:1.58; margin-top:.5rem; flex:1; }
.card .chips{ margin-top:1rem; }
.also{ display:flex; align-items:center; gap:.7rem; flex-wrap:wrap; margin-top:1.6rem; font-family:var(--mono); font-size:.72rem; color:var(--muted); letter-spacing:.04em; }
.also b{ color:var(--paper-2); border:1px solid var(--line-2); padding:.25rem .55rem; font-weight:500; }

/* interactive play cell (sketch ⇄ terminal) */
.card--play{ grid-column:span 2; cursor:default; }
.card--play:hover{ background:var(--ink); }
.play-top{ display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
.play-tabs{ display:inline-flex; gap:.4rem; }
.play-tab{ display:inline-flex; align-items:center; gap:.4rem; font-family:var(--mono); font-size:.64rem; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); background:transparent; border:1px solid var(--line-2); padding:.34rem .6rem; cursor:pointer; transition:border-color .2s, color .2s; }
.play-tab:hover{ color:var(--paper); border-color:var(--line-3); }
.play-tab.on{ color:var(--signal); border-color:var(--signal); }
.play-hint{ font-family:var(--mono); font-size:.58rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted-2); }
.play-pane{ display:flex; flex-direction:column; flex:1; min-height:0; margin-top:.85rem; }
.play-pane[hidden]{ display:none; }
.play-foot{ display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-top:.7rem; font-family:var(--mono); font-size:.58rem; letter-spacing:.06em; text-transform:uppercase; color:var(--muted-2); }
.play-btn{ font-family:var(--mono); font-size:.6rem; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); background:transparent; border:1px solid var(--line-2); padding:.32rem .6rem; cursor:pointer; transition:border-color .2s, color .2s; }
.play-btn:hover{ border-color:var(--signal); color:var(--signal); }
.sketch-wrap{ position:relative; flex:1; min-height:0;
  border:1px solid var(--line-2); background-image:radial-gradient(var(--line-2) 1px,transparent 1px); background-size:16px 16px; background-position:-1px -1px; }
.sketch-canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; cursor:crosshair; touch-action:none; }
.term-body{ flex:1; min-height:0; overflow-y:auto; border:1px solid var(--line-2); background:rgba(0,0,0,.14); padding:.7rem .8rem;
  font-family:var(--mono); font-size:.74rem; line-height:1.65; color:var(--paper-2); cursor:text; }
.pf[data-theme="light"] .term-body{ background:rgba(20,32,46,.05); }
.term-line{ white-space:pre-wrap; word-break:break-word; }
.term-line--cmd{ color:var(--paper); }
.term-ps{ color:var(--signal); }
.term-input-row{ display:flex; align-items:center; gap:.4rem; }
.term-input{ flex:1; min-width:0; background:transparent; border:none; outline:none; color:var(--paper); font-family:var(--mono); font-size:.74rem; caret-color:var(--signal); padding:0; }

/* stack */
.stack-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--line-2); border:1px solid var(--line-2); }
.stack-cell{ background:var(--ink); padding:clamp(1.3rem,3vw,2rem); }
.stack-cell h4{ font-family:var(--mono); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--signal); margin:0 0 1rem; display:flex; align-items:center; gap:.6rem; }
.stack-cell h4 span{ color:var(--muted-2); font-size:.66rem; }
.stack-list{ display:flex; flex-wrap:wrap; gap:.55rem; }
.stack-item{ font-size:.9rem; color:var(--paper); border:1px solid var(--line-2); padding:.4rem .7rem; transition:.2s; background:var(--tint); }
.stack-item:hover{ border-color:var(--signal); color:var(--signal); }

/* contact */
.contact-lead{ font-family:var(--dsp); font-weight:700; font-size:clamp(2.4rem,8vw,5.5rem); line-height:.94; letter-spacing:-.03em; }
.contact-lead .em{ color:transparent; -webkit-text-stroke:1.4px var(--stroke); text-stroke:1.4px var(--stroke); }
.contact-sub{ color:var(--paper-2); font-size:clamp(1rem,1.7vw,1.18rem); max-width:54ch; margin:1.6rem 0 0; line-height:1.65; }
.contact-actions{ display:flex; flex-wrap:wrap; gap:1rem; margin-top:2.2rem; align-items:center; }
.email-btn{ display:inline-flex; align-items:center; gap:.7rem; border:1px solid var(--line-3); padding:.8rem 1rem; cursor:pointer; background:transparent; color:var(--paper); font-family:var(--mono); font-size:.86rem; letter-spacing:.02em; transition:.2s; }
.email-btn:hover{ border-color:var(--signal); color:var(--signal); }
.email-btn .cp{ color:var(--muted); display:inline-flex; }
.soc{ display:inline-flex; align-items:center; gap:.55rem; text-decoration:none; color:var(--paper); border:1px solid var(--line-3); width:46px; height:46px; justify-content:center; transition:.2s; }
.soc:hover{ border-color:var(--signal); color:var(--signal); transform:translateY(-2px); }
.contact-meta{ display:flex; gap:1.6rem; flex-wrap:wrap; margin-top:2.4rem; font-family:var(--mono); font-size:.74rem; color:var(--muted); letter-spacing:.04em; }
.contact-meta span b{ color:var(--paper-2); font-weight:500; }

/* footer title block */
.foot{ border-top:1px solid var(--line-2); margin-top:clamp(3rem,8vh,6rem); }
.foot-in{ display:grid; grid-template-columns:repeat(5,1fr); }
.foot-cell{ padding:1.1rem var(--pad); border-right:1px solid var(--line); }
.foot-cell:last-child{ border-right:none; }
.foot-k{ font-family:var(--mono); font-size:.58rem; letter-spacing:.14em; color:var(--muted-2); text-transform:uppercase; }
.foot-v{ font-family:var(--mono); font-size:.74rem; color:var(--paper-2); margin-top:.3rem; }
.foot-v a{ color:var(--paper-2); text-decoration:none; }
.foot-v a:hover{ color:var(--signal); }
.to-top{ color:var(--signal)!important; cursor:pointer; }

/* keyframes */
@keyframes up{ from{opacity:0; transform:translateY(18px);} to{opacity:1; transform:translateY(0);} }
@keyframes tbfade{ from{opacity:0;} to{opacity:1;} }
@keyframes pulse{ 0%{box-shadow:0 0 0 0 rgba(255,106,43,.5);} 70%{box-shadow:0 0 0 7px rgba(255,106,43,0);} 100%{box-shadow:0 0 0 0 rgba(255,106,43,0);} }

/* focus */
.pf a:focus-visible, .pf button:focus-visible{ outline:2px solid var(--signal); outline-offset:3px; }

/* responsive */
@media (max-width:900px){
  .nav-links{ display:none; }
  .cmdk-hint{ display:none; }
  .about-grid{ grid-template-columns:1fr; }
  .grid3{ grid-template-columns:1fr; }
  .card--play{ grid-column:auto; }
  .stack-grid{ grid-template-columns:1fr; }
  .metrics-in{ grid-template-columns:repeat(2,1fr); }
  .metric:nth-child(2){ border-right:none; }
  .metric:nth-child(1),.metric:nth-child(2){ border-bottom:1px solid var(--line); }
  .hero{ display:block; }
  .titleblock{ position:static; width:100%; max-width:420px; margin-top:2.5rem; transform:none; }
  .foot-in{ grid-template-columns:repeat(2,1fr); }
  .foot-cell:nth-child(2){ border-right:none; }
  .foot-cell{ border-bottom:1px solid var(--line); }
  .exp-row{ grid-template-columns:1fr; gap:1rem; }
  .exp-aside{ flex-direction:row; align-items:center; gap:1rem; flex-wrap:wrap; }
}
@media (max-width:560px){
  .brand-name{ display:none; }
  .metrics-in{ grid-template-columns:1fr 1fr; }
  .foot-in{ grid-template-columns:1fr; }
  .foot-cell{ border-right:none; }
}

@media (prefers-reduced-motion:reduce){
  *{ animation:none!important; transition:none!important; }
  [data-reveal]{ opacity:1!important; transform:none!important; }
  .bg-scan,.hero-glow{ display:none!important; }
  .h-eyebrow,.h-title .l1,.h-title .l2,.h-dim,.h-thesis,.h-cta,.titleblock{ opacity:1!important; animation:none!important; }
}
`;

// --- component -----------------------------------------------------------
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [now, setNow] = useState("00:00:00");
  const [copied, setCopied] = useState(false);
  const [palette, setPalette] = useState(false);
  const [pidx, setPidx] = useState(0);
  const [theme, setTheme] = useState(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t === "light" || t === "dark") return t;
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch (_) {
      return "dark";
    }
  });
  const [playMode, setPlayMode] = useState("terminal");
  const [termLines, setTermLines] = useState(() => [
    { p: false, t: "Waleed Bahakim — interactive shell. Type 'help' to look around." },
  ]);
  const [termInput, setTermInput] = useState("");
  const heroRef = useRef(null);
  const progRef = useRef(null);
  const sketchRef = useRef(null);
  const termInputRef = useRef(null);
  const termBodyRef = useRef(null);
  const termFirst = useRef(true);

  // live IST clock for the title block
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString("en-GB", { hour12: false, timeZone: "Asia/Kolkata" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // persist + apply theme
  useEffect(() => {
    try { localStorage.setItem("theme", theme); } catch (_) {}
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // nav background + scroll-progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progRef.current) progRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // scroll reveals
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // active section
  useEffect(() => {
    const ids = ["home", "about", "experience", "work", "stack", "contact"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-46% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // command palette (⌘K / Ctrl+K) keyboard handling
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        setPalette((v) => !v);
        setPidx(0);
        return;
      }
      if (e.key === "Escape") { setPalette(false); return; }
      if (!palette) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setPidx((i) => (i + 1) % SHEETS.length); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setPidx((i) => (i - 1 + SHEETS.length) % SHEETS.length); }
      else if (e.key === "Enter") { e.preventDefault(); jump(SHEETS[pidx].id); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [palette, pidx]);

  // interactive blueprint sketchpad (canvas drawing) — drawing survives flips
  useEffect(() => {
    const canvas = sketchRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let drawing = false, lastX = 0, lastY = 0, ink = "#FF6A2B";
    const fit = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w; canvas.height = h;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 2.4;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    const at = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const down = (e) => {
      drawing = true;
      ink = (getComputedStyle(canvas).getPropertyValue("--signal") || "#FF6A2B").trim() || "#FF6A2B";
      [lastX, lastY] = at(e);
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    };
    const move = (e) => {
      if (!drawing) return;
      const [x, y] = at(e);
      ctx.strokeStyle = ink;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX = x; lastY = y;
    };
    const up = () => { drawing = false; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      ro.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  const clearSketch = () => {
    const canvas = sketchRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // terminal: keep scrolled to the latest line, focus the input when opened
  useEffect(() => {
    const el = termBodyRef.current;
    if (el && playMode === "terminal") el.scrollTop = el.scrollHeight;
  }, [termLines, playMode]);
  useEffect(() => {
    if (termFirst.current) { termFirst.current = false; return; } // don't grab focus on initial load
    if (playMode === "terminal") termInputRef.current?.focus({ preventScroll: true });
  }, [playMode]);

  const runTerm = (raw) => {
    const parts = raw.trim().toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1];
    if (!cmd) { setTermLines((prev) => [...prev, { p: true, t: "" }]); return; }
    if (cmd === "clear") { setTermLines([]); return; }
    let out;
    switch (cmd) {
      case "help": out = ["commands: about · projects · work · stack · resume · contact · social · theme · clear"]; break;
      case "about": out = ["Full-stack developer (MERN + GenAI) who ships production software, front to back."]; break;
      case "whoami": out = ["waleed — full-stack engineer · Aurangabad, India"]; break;
      case "projects": out = [
        "01 CBVI        → cbvi-web.vercel.app/login   (live)",
        "02 Kriya       → kriya.xoft.in/login         (live)",
        "03 EStyleWala  → vendor.estylewala.com       (live)",
        "04 StudyRevise → case study soon",
        "05 Ikhlaas     → case study soon",
        "tip: 'open <name>' to launch one — e.g. open cbvi",
      ]; break;
      case "open": {
        const urls = {
          cbvi: "https://cbvi-web.vercel.app/login",
          kriya: "https://kriya.xoft.in/login",
          estylewala: "https://vendor.estylewala.com",
          estyle: "https://vendor.estylewala.com",
        };
        if (!arg) { out = ["usage: open <project> — try 'projects' for the list"]; }
        else if (urls[arg]) { window.open(urls[arg], "_blank", "noopener"); out = [`opening ${arg} …`]; }
        else { out = [`no live link for '${arg}'. type 'projects'.`]; }
        break;
      }
      case "work": out = ["scroll up to the Work sheet — or type 'projects' for live links"]; break;
      case "stack": out = ["React · Next.js · Node · NestJS · Python · Mongo · Postgres · Redis · AI (OpenAI/Gemini/Claude)"]; break;
      case "resume": case "cv": out = ["opening resume.pdf …"]; window.open("/Waleed_Bahakim_Resume.pdf", "_blank", "noopener"); break;
      case "contact": out = ["email · bahakimwaleed08@gmail.com"]; break;
      case "social": out = ["github.com/waleedbahakim", "linkedin.com/in/waleed-bahakim-890381227"]; break;
      case "theme": {
        const target = arg === "light" || arg === "dark" ? arg : (theme === "dark" ? "light" : "dark");
        setTheme(target);
        out = [`switched to ${target} mode`];
        break;
      }
      case "ls": out = ["about  projects  work  stack  resume  contact  social  theme"]; break;
      case "hi": case "hello": out = ["hey 👋 — type 'help' to look around"]; break;
      case "sudo": out = ["nice try — you already have root on this site 😏"]; break;
      case "coffee": out = ["☕ brewing… (though Waleed actually runs on chai)"]; break;
      case "hire": out = ["📨 excellent taste. type 'contact' or 'resume' — let's build."]; break;
      case "rm": out = ["whoa — nothing here is yours to delete 😄"]; break;
      default: out = [`command not found: ${cmd} — try 'help'`];
    }
    setTermLines((prev) => [...prev, { p: true, t: raw }, ...out.map((t) => ({ p: false, t }))]);
  };

  const onHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  };

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch (_) {}
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const go = (id) => (e) => { e.preventDefault(); scrollToId(id); };
  const jump = (id) => { setPalette(false); scrollToId(id); };
  const openPalette = () => { setPalette(true); setPidx(0); };
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="pf" data-theme={theme}>
      <style>{CSS}</style>

      {/* scroll progress */}
      <div className="scan-progress" aria-hidden><i ref={progRef} /></div>

      {/* atmosphere */}
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="bg-scan" />
      <div className="bg-vig" />

      {/* command palette */}
      {palette && (
        <div className="cmdk" role="dialog" aria-modal="true" aria-label="Jump to section" onClick={() => setPalette(false)}>
          <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cmdk-head"><Search size={14} /> <span>Jump to sheet</span> <kbd>ESC</kbd></div>
            <div className="cmdk-list">
              {SHEETS.map((s, i) => (
                <button
                  key={s.id}
                  className={"cmdk-item" + (i === pidx ? " on" : "")}
                  onMouseEnter={() => setPidx(i)}
                  onClick={() => jump(s.id)}
                >
                  <span className="cmdk-sheet">{s.sheet}</span>
                  <span className="cmdk-label">{s.label}</span>
                  <span className="cmdk-go">&#8629;</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* nav */}
      <nav className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="nav-in">
          <a className="brand" href="#home" onClick={go("home")}>
            <span className="mono-mark">WB</span>
            <span className="brand-name">Waleed Bahakim</span>
          </a>
          <div className="nav-links">
            {NAV.map((n) => (
              <a key={n.id} href={"#" + n.id} onClick={go(n.id)} className={"nav-link" + (active === n.id ? " on" : "")}>
                {n.label}<sup>{n.sheet}</sup>
              </a>
            ))}
          </div>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light or dark theme">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button className="cmdk-hint" onClick={openPalette} aria-label="Open command palette (Ctrl or Cmd + K)">
              <Search size={12} /> <kbd>&#8984;K</kbd>
            </button>
            <a className="btn-nav" href="#contact" onClick={go("contact")}>
              Contact <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </nav>

      {/* ---------------- HERO / SHEET 01 ---------------- */}
      <header id="home" className="hero" ref={heroRef} onMouseMove={onHeroMove}>
        <div className="hero-glow" />
        <div className="wrap hero-in">
          <div className="h-eyebrow">
            <span className="dot" /> FULL-STACK ENGINEER <span style={{ color: "var(--muted-2)" }}>/</span> <b>MERN + GENAI</b>
          </div>

          <h1 className="h-title">
            <span className="l1">Waleed</span>
            <span className="l2">Bahakim</span>
          </h1>

          <div className="h-dim">
            <span className="tick" />
            <span className="bar" />
            <span className="lab">Builds + ships, front to back</span>
            <span className="bar" />
            <span className="tick" />
          </div>

          <p className="h-thesis">
            I build production software end to end, from fast React interfaces to the APIs,
            real-time layers and AI behind them. Currently shipping at Fika AI.
          </p>

          <div className="h-cta">
            <a className="btn btn-fill" href="#work" onClick={go("work")}>
              View selected work <ArrowUpRight size={17} />
            </a>
            <a className="btn btn-ghost" href="#contact" onClick={go("contact")}>
              Get in touch
            </a>
            <a className="lnk-mono" href="/Waleed_Bahakim_Resume.pdf" target="_blank" rel="noreferrer" download>
              <ArrowRight size={13} /> Download CV
            </a>
          </div>
        </div>

        {/* signature: title block */}
        <aside className="titleblock">
          <div className="tb-top">
            <span>Title Block</span>
            <span>SHEET 01 / 06</span>
          </div>
          <div className="tb-row">
            <div><div className="tb-k">Drawn by</div><div className="tb-v">W. Bahakim</div></div>
            <div><div className="tb-k">Discipline</div><div className="tb-v">Full-stack / GenAI</div></div>
            <div><div className="tb-k">Location</div><div className="tb-v">Aurangabad, IN</div></div>
            <div><div className="tb-k">Availability</div><div className="tb-v sig">Open to work</div></div>
            <div><div className="tb-k">Local time</div><div className="tb-v">{now} IST</div></div>
            <div><div className="tb-k">Revision</div><div className="tb-v">2026.06</div></div>
          </div>
        </aside>
      </header>

      {/* ---------------- METRICS BAND ---------------- */}
      <section className="metrics">
        <div className="metrics-in">
          {METRICS.map((m, i) => (
            <div className="metric" key={i} data-reveal style={{ transitionDelay: i * 60 + "ms" }}>
              <div className="num">
                {m.v}{m.dir && <i>{m.dir === "down" ? "↓" : "↑"}</i>}
              </div>
              <div className="lab">{m.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- ABOUT / SHEET 02 ---------------- */}
      <section id="about" className="section">
        <div className="wrap">
          <div className="sheet-head" data-reveal>
            <div>
              <div className="eyebrow">About</div>
              <h2 className="h2">The short version</h2>
            </div>
            <span className="sheet-tag">SHEET 02 / 06</span>
          </div>
          <div className="rule" data-reveal />

          <div className="about-grid" style={{ marginTop: "clamp(2rem,5vw,3.4rem)" }}>
            <div className="about-copy" data-reveal>
              <p>
                I'm a full stack developer who likes shipping things that actually go live.
                Most of my work sits in the <b>MERN</b> world with a growing focus on
                <b> GenAI</b>, and I care a lot about how fast and clean the final product feels.
              </p>
              <p>
                Over the last year and a half I've built production features at <b>Fika AI</b> and
                shipped freelance products for clients in the US and India, usually owning the work
                front to back. I'm comfortable across the stack, from React interfaces to the APIs,
                real-time layers and data behind them.
              </p>
              <p>
                I'm based in Aurangabad, India, and open to <b>remote, onsite, and freelance</b> work.
                If it ships and people use it, I'm interested.
              </p>
            </div>

            <div className="spec" data-reveal style={{ transitionDelay: "90ms" }}>
              {[
                ["Role", "Full Stack Developer", false],
                ["Focus", "MERN + GenAI", true],
                ["Based in", "Aurangabad, India", false],
                ["Open to", "Remote / Onsite / Freelance", true],
                ["Languages", "English, Hindi, Urdu", false],
                ["Status", "Open to work", true],
              ].map(([k, v, sig], i) => (
                <div className="sr" key={i}>
                  <span className="sk">{k}</span>
                  <span className={"sv" + (sig ? " sig" : "")}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- EXPERIENCE / SHEET 03 ---------------- */}
      <section id="experience" className="section">
        <div className="wrap">
          <div className="sheet-head" data-reveal>
            <div>
              <div className="eyebrow">Experience</div>
              <h2 className="h2">Where I've worked</h2>
            </div>
            <span className="sheet-tag">SHEET 03 / 06</span>
          </div>

          <div className="exp">
            {EXPERIENCE.map((x, i) => (
              <div className="exp-row" key={i} data-reveal>
                <div className="exp-aside">
                  <span className={"exp-pill" + (x.tag === "CURRENT" ? " now" : "")}>{x.tag}</span>
                  <span className="exp-period">{x.period}</span>
                  <span className="exp-meta">{x.meta}</span>
                </div>
                <div>
                  <h3 className="exp-role">
                    {x.role} <span className="exp-co">/ {x.company}</span>
                  </h3>
                  <ul className="exp-points">
                    {x.points.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WORK / SHEET 04 ---------------- */}
      <section id="work" className="section">
        <div className="wrap">
          <div className="sheet-head" data-reveal>
            <div>
              <div className="eyebrow">Selected Work</div>
              <h2 className="h2">Things I've built</h2>
            </div>
            <span className="sheet-tag">SHEET 04 / 06</span>
          </div>

          {/* featured */}
          {PROJECTS.filter((p) => p.featured).map((p) => (
            <a className="feat" key={p.no} href={p.link} target="_blank" rel="noreferrer" data-reveal>
              <div className="feat-top">
                <span className="proj-no">{p.no}</span>
                <span className="proj-tag">{p.tag}</span>
              </div>
              <h3 className="feat-name">{p.name}</h3>
              <div className="feat-role">{p.role}</div>
              <p className="feat-blurb">{p.blurb}</p>
              <div className="chips">
                {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
              <span className="visit">Visit live site <ArrowUpRight size={17} /></span>
            </a>
          ))}

          {/* grid */}
          <div className="grid3">
            {PROJECTS.filter((p) => !p.featured).map((p) => {
              const body = (
                <>
                  <div className="ct">
                    <span className="proj-no">{p.no}</span>
                    {p.link ? <ArrowUpRight size={18} className="cgo" /> : <span className="soon">Case study soon</span>}
                  </div>
                  <div>
                    <div className="card-role">{p.role}</div>
                    <h3 className="card-name">{p.name}</h3>
                  </div>
                  <p className="card-blurb">{p.blurb}</p>
                  <div className="chips">
                    {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
                  </div>
                </>
              );
              return p.link ? (
                <a className="card" key={p.no} href={p.link} target="_blank" rel="noreferrer" data-reveal>{body}</a>
              ) : (
                <div className="card card--nolink" key={p.no} data-reveal>{body}</div>
              );
            })}

            {/* interactive play cell — flip between sketch & terminal; fills the open grid cells */}
            <div className="card card--play" data-reveal>
              <div className="play-top">
                <div className="play-tabs" role="tablist" aria-label="Mini playground">
                  <button type="button" role="tab" aria-selected={playMode === "sketch"} className={"play-tab" + (playMode === "sketch" ? " on" : "")} onClick={() => setPlayMode("sketch")}>
                    <Pencil size={12} /> Sketch
                  </button>
                  <button type="button" role="tab" aria-selected={playMode === "terminal"} className={"play-tab" + (playMode === "terminal" ? " on" : "")} onClick={() => setPlayMode("terminal")}>
                    <Terminal size={12} /> Terminal
                  </button>
                </div>
                <span className="play-hint">{playMode === "sketch" ? "drag to draw" : "type a command"}</span>
              </div>

              <div className="play-pane" hidden={playMode !== "sketch"}>
                <div className="sketch-wrap">
                  <canvas ref={sketchRef} className="sketch-canvas" aria-label="Blueprint sketchpad — drag to draw" />
                </div>
                <div className="play-foot">
                  <span>Orange markup ink · it's a drawing set</span>
                  <button className="play-btn" type="button" onClick={clearSketch}>Clear</button>
                </div>
              </div>

              <div className="play-pane" hidden={playMode !== "terminal"}>
                <div className="term-body" ref={termBodyRef} onClick={() => termInputRef.current?.focus({ preventScroll: true })}>
                  {termLines.map((l, i) => (
                    <div key={i} className={"term-line" + (l.p ? " term-line--cmd" : "")}>
                      {l.p && <span className="term-ps">wb@portfolio:~$</span>}{l.p ? " " : ""}{l.t}
                    </div>
                  ))}
                  <div className="term-input-row">
                    <span className="term-ps">wb@portfolio:~$</span>
                    <input
                      ref={termInputRef}
                      className="term-input"
                      value={termInput}
                      onChange={(e) => setTermInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { runTerm(termInput); setTermInput(""); } }}
                      spellCheck={false}
                      autoComplete="off"
                      aria-label="Terminal input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="also" data-reveal>
            Also built: <b>Biochar Atlas</b> <b>ResumeX</b>
          </div>
        </div>
      </section>

      {/* ---------------- STACK / SHEET 05 ---------------- */}
      <section id="stack" className="section">
        <div className="wrap">
          <div className="sheet-head" data-reveal>
            <div>
              <div className="eyebrow">Stack</div>
              <h2 className="h2">Tools of the trade</h2>
            </div>
            <span className="sheet-tag">SHEET 05 / 06</span>
          </div>

          <div className="stack-grid">
            {STACK.map((g, i) => (
              <div className="stack-cell" key={g.group} data-reveal style={{ transitionDelay: (i % 2) * 80 + "ms" }}>
                <h4>{g.group} <span>{"[" + String(g.items.length).padStart(2, "0") + "]"}</span></h4>
                <div className="stack-list">
                  {g.items.map((it) => <span className="stack-item" key={it}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT / SHEET 06 ---------------- */}
      <section id="contact" className="section">
        <div className="wrap">
          <div className="sheet-head" data-reveal>
            <div className="eyebrow">Contact</div>
            <span className="sheet-tag">SHEET 06 / 06</span>
          </div>

          <h2 className="contact-lead" data-reveal>
            Let's build<br /><span className="em">something.</span>
          </h2>
          <p className="contact-sub" data-reveal>
            Open to full-stack and frontend roles — remote / onsite — plus interesting freelance.
            The fastest way to reach me is email.
          </p>

          <div className="contact-actions" data-reveal>
            <button className="email-btn" onClick={copyEmail}>
              <Mail size={16} /> {EMAIL}
              <span className="cp">{copied ? <Check size={15} /> : <Copy size={15} />}</span>
            </button>
            <a className="soc" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a className="soc" href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          </div>

          <div className="contact-meta" data-reveal>
            <span><MapPin size={13} style={{ verticalAlign: "-2px", color: "var(--signal)" }} /> <b>Aurangabad, India</b></span>
            <span>LOCAL TIME <b>{now} IST</b></span>
            <span>STATUS <b style={{ color: "var(--signal)" }}>Open to work</b></span>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER TITLE BLOCK ---------------- */}
      <footer className="foot">
        <div className="foot-in">
          <div className="foot-cell"><div className="foot-k">Drawing</div><div className="foot-v">Personal Portfolio</div></div>
          <div className="foot-cell"><div className="foot-k">Drawn by</div><div className="foot-v">W. Bahakim</div></div>
          <div className="foot-cell"><div className="foot-k">Built with</div><div className="foot-v">React</div></div>
          <div className="foot-cell"><div className="foot-k">Revision</div><div className="foot-v">2026.06 · 06/06</div></div>
          <div className="foot-cell"><div className="foot-k">Nav</div><div className="foot-v"><a className="to-top" onClick={go("home")}>Back to top &uarr;</a></div></div>
        </div>
      </footer>
    </div>
  );
}
