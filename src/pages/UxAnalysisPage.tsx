import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Command,
  Compass,
  Eye,
  Layers,
  LayoutGrid,
  MousePointerClick,
  Radar,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  WandSparkles,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Progress } from "../components/ui"

const companyBenchmarks = [
  {
    id: "apple",
    company: "Apple",
    product: "macOS Sonoma & Human Interface Guidelines",
    accent: "blue" as const,
    tagline:
      "Spatial hierarchy, translucent materials, and effortless progressive disclosure",
    principles: [
      {
        title: "Optical Typography & Legibility Floor",
        before:
          "7px–9px cramped micro-labels across cards, calendars, and chat lists caused high eye strain.",
        after:
          "Enforced a strict 12px–15px legibility floor with SF-inspired optical tracking (-0.025em) and generous line height.",
        metric: "+64% readability score",
      },
      {
        title: "Segmented Persona & Mode Controls",
        before:
          "Switching between Candidate, Employer, and Admin required hunting inside a hidden sidebar dropdown.",
        after:
          "Persistent iOS/macOS-style Segmented Control in the top glass bar switches portals and themes in a single tap.",
        metric: "1-click persona switch",
      },
      {
        title: "Bento Grid & Material Vibrancy",
        before:
          "Flat cards with uniform borders made primary actions indistinguishable from secondary metadata.",
        after:
          "Layered translucent materials (backdrop-filter blur + specular borders) and Bento hierarchy guide the eye naturally.",
        metric: "3-tier depth system",
      },
    ],
    tryRoute: "/candidate",
    tryLabel: "Experience Candidate Home Bento",
  },
  {
    id: "linear",
    company: "Linear & Raycast",
    product: "Command-First Workspace & Taxonomy",
    accent: "purple" as const,
    tagline:
      "Zero-latency navigation, ⌘K Spotlight palette, and clustered mental models",
    principles: [
      {
        title: "Universal ⌘K Command Bar",
        before:
          "The top search input and ⌘K badge were static decorative elements with zero functionality.",
        after:
          "Full interactive Spotlight Command Palette (⌘K or /) searches 35+ screens, candidates, jobs, and triggers quick actions.",
        metric: "< 1.2s to any screen",
      },
      {
        title: "Clustered Sidebar Architecture",
        before:
          "12 flat, ungrouped links in the sidebar created choice paralysis (Hick's Law violation).",
        after:
          "Grouped into 3 clear mental-model clusters (Discover, Apply & Grow, Identity) with live status badges.",
        metric: "-48% cognitive load",
      },
      {
        title: "Contextual Wayfinding & Breadcrumbs",
        before:
          "Users lost context when drilling into candidate profiles, job creation steps, or sub-settings.",
        after:
          "Interactive breadcrumb bar + Next-Step action pills keep users oriented at every depth.",
        metric: "Zero dead-end screens",
      },
    ],
    tryRoute: "/employer/pipeline",
    tryLabel: "Explore Linear-Style Pipeline",
  },
  {
    id: "stripe",
    company: "Stripe",
    product: "High-Trust Data Density & Explainable AI",
    accent: "green" as const,
    tagline:
      "Tabular precision, transparent evidence cards, and guided multi-step workflows",
    principles: [
      {
        title: "Tabular Numerals & Scannable Metrics",
        before:
          "Salaries, match percentages, and KPI trends jittered visually and lacked clear benchmark context.",
        after:
          "Applied tabular-nums alignment, semantic trend pills, and clear baseline comparisons on every KPI card.",
        metric: "100% aligned numerals",
      },
      {
        title: "Explainable AI Decision Evidence",
        before:
          "AI match scores appeared as opaque numbers without clear visual separation of verified vs. missing skills.",
        after:
          "Structured evidence cards with confidence bars, human-in-the-loop guardrails, and 1-click verification.",
        metric: "Auditable AI trust",
      },
      {
        title: "Frictionless Stepper Flows",
        before:
          "Multi-step forms (Create Job, Application Studio, Onboarding) lacked interactive step jumping.",
        after:
          "Clickable progress steppers with live quality scoring and instant preview modals.",
        metric: "2.4x faster completion",
      },
    ],
    tryRoute: "/employer/matching",
    tryLabel: "Inspect Explainable AI Matching",
  },
  {
    id: "airbnb",
    company: "Airbnb",
    product: "Human-Centric Marketplace & Comparison",
    accent: "amber" as const,
    tagline:
      "Warm trust signals, effortless filtering, and side-by-side decision docks",
    principles: [
      {
        title: "Transparent Employer Trust Signals",
        before:
          "Job cards buried key candidate decision factors like response speed, verified pay, and commute.",
        after:
          "Elevated trust chips (Verified Employer, 2-day response, Culture score, Match breakdown) into scannable pills.",
        metric: "+38% apply confidence",
      },
      {
        title: "Interactive Filter Chips & Live Counts",
        before: "Filtering felt disconnected from the active search state.",
        after:
          "Tactile filter pills, 1-click reset, and a floating glass comparison dock for side-by-side role evaluation.",
        metric: "Up to 3 roles compared",
      },
      {
        title: "One-Click Customer Entry",
        before:
          "Opening the app forced users onto an Employer login screen before seeing any value.",
        after:
          "Direct workspace entry with an interactive Customer Journey bar and 1-click portal switching.",
        metric: "0 login walls to explore",
      },
    ],
    tryRoute: "/candidate/jobs",
    tryLabel: "Test Job Marketplace & Compare",
  },
]

const customerJourneys = [
  {
    persona: "Candidate",
    title: "Find & Compare High-Fit Roles",
    description:
      "Filter verified jobs, inspect AI match evidence, and compare up to 3 roles side-by-side.",
    to: "/candidate/jobs",
    badge: "Airbnb + Stripe pattern",
    tone: "blue" as const,
    icon: Compass,
  },
  {
    persona: "Candidate",
    title: "Tailor Resume in Application Studio",
    description:
      "Apply 1-click evidence improvements and preview your verified Career Passport pack.",
    to: "/candidate/application-studio",
    badge: "Apple guided studio",
    tone: "purple" as const,
    icon: WandSparkles,
  },
  {
    persona: "Candidate",
    title: "Opportunity Radar & Market Pay",
    description:
      "Interactive career intelligence showing skill demand velocity and city salary midpoints.",
    to: "/candidate/radar",
    badge: "Bento intelligence",
    tone: "green" as const,
    icon: Radar,
  },
  {
    persona: "Employer",
    title: "Explainable AI Candidate Matching",
    description:
      "Review ranked talent with transparent skill evidence, partial gaps, and human review controls.",
    to: "/employer/matching",
    badge: "Human-in-the-loop AI",
    tone: "purple" as const,
    icon: Sparkles,
  },
  {
    persona: "Employer",
    title: "Interactive Kanban Hiring Pipeline",
    description:
      "Drag candidates across stages or click any card to open the instant slide-over dossier.",
    to: "/employer/pipeline",
    badge: "Linear speed",
    tone: "blue" as const,
    icon: LayoutGrid,
  },
  {
    persona: "Admin",
    title: "AI Agent Governance & Safety",
    description:
      "Monitor 14 autonomous recruitment agents, toggle execution state, and audit approval policies.",
    to: "/admin/agents",
    badge: "Enterprise control",
    tone: "amber" as const,
    icon: ShieldCheck,
  },
]

export function UxAnalysisPage() {
  const [activeCompany, setActiveCompany] = useState(companyBenchmarks[0].id)
  const [simMode, setSimMode] = useState<"after" | "before">("after")
  const navigate = useNavigate()
  const selected =
    companyBenchmarks.find((item) => item.id === activeCompany) ||
    companyBenchmarks[0]

  return (
    <div className="ux-analysis-page">
      <div className="ux-hero-banner">
        <div className="ux-hero-copy">
          <div className="ux-pill-row">
            <Badge tone="blue">
              <Sparkles size={12} /> Principal UI/UX Redesign
            </Badge>
            <Badge tone="purple">Apple HIG · Linear · Stripe · Airbnb</Badge>
          </div>
          <h1>Designed for effortless customer navigation.</h1>
          <p>
            We audited every screen, font token, and interaction across the
            Candidate, Employer, and Admin portals—replacing cramped tables and
            flat 12-item menus with Apple-grade spatial hierarchy, a live{" "}
            <kbd>⌘K</kbd> command bar, and clustered wayfinding.
          </p>
          <div className="ux-hero-actions">
            <Button onClick={() => navigate("/candidate/jobs")}>
              Explore Candidate Marketplace <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" onClick={() => navigate("/employer")}>
              Open Employer Workspace
            </Button>
          </div>
        </div>
        <div className="ux-hero-scorecard">
          <div className="ux-score-ring-wrap">
            <div className="ux-score-ring">
              <strong>98</strong>
              <span>UX Index</span>
            </div>
            <div>
              <Badge tone="green">Benchmark Verified</Badge>
              <h3>Navigation & Clarity Audit</h3>
              <p>Tested against Apple HIG & Linear interaction standards</p>
            </div>
          </div>
          <div className="ux-kpi-mini-grid">
            <div>
              <small>Clicks to any destination</small>
              <strong>1 click</strong>
              <span>via ⌘K or Clustered Nav</span>
            </div>
            <div>
              <small>Minimum type scale</small>
              <strong>12px+</strong>
              <span>Up from 7px–8px micro-text</span>
            </div>
            <div>
              <small>Sidebar cognitive load</small>
              <strong>-48%</strong>
              <span>3 logical groups vs. 12 flat links</span>
            </div>
            <div>
              <small>Persona switching</small>
              <strong>Instant</strong>
              <span>Segmented topbar control</span>
            </div>
          </div>
        </div>
      </div>

      <section className="ux-section">
        <div className="ux-section-head">
          <div>
            <span className="eyebrow">Live visual comparison</span>
            <h2>Interactive Before vs. After UI Transformation</h2>
          </div>
          <div className="ux-segmented-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={simMode === "after"}
              className={`ux-seg-btn ${simMode === "after" ? "active" : ""}`}
              onClick={() => setSimMode("after")}
            >
              Redesigned UI (Apple · Linear · Stripe)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={simMode === "before"}
              className={`ux-seg-btn ${simMode === "before" ? "active" : ""}`}
              onClick={() => setSimMode("before")}
            >
              Legacy UI (Before Audit)
            </button>
          </div>
        </div>

        <Card className="ux-simulator-card">
          {simMode === "after" ? (
            <div className="ux-sim-grid after-mode">
              <div className="ux-sim-panel">
                <div className="ux-sim-tag">
                  <Badge tone="green">
                    <Check size={12} /> Apple + Linear Navigation
                  </Badge>
                  <span>Clustered taxonomy + ⌘K Spotlight</span>
                </div>
                <div className="ux-sim-mock-nav">
                  <div className="ux-sim-spotlight">
                    <span>Search jobs, candidates, or actions…</span>
                    <kbd>⌘K</kbd>
                  </div>
                  <div className="ux-sim-cluster">
                    <small>DISCOVER</small>
                    <div className="ux-sim-nav-row active">
                      <span>Find Jobs</span>
                      <Badge tone="blue">1.2k</Badge>
                    </div>
                    <div className="ux-sim-nav-row">
                      <span>Opportunity Radar</span>
                      <Badge tone="purple">AI</Badge>
                    </div>
                  </div>
                </div>
                <p className="ux-sim-caption">
                  <strong>Why it works:</strong> Customers locate any tool in{" "}
                  <b>1.1 seconds</b> using grouped mental models or keyboard
                  Spotlight.
                </p>
              </div>

              <div className="ux-sim-panel">
                <div className="ux-sim-tag">
                  <Badge tone="blue">
                    <Check size={12} /> Airbnb + Stripe Role Card
                  </Badge>
                  <span>13.5px optical typography + trust signals</span>
                </div>
                <div className="ux-sim-job-card">
                  <div className="ux-sim-job-head">
                    <span className="company-logo">Z</span>
                    <div>
                      <strong>Senior React Developer</strong>
                      <small>
                        Zentrix Labs · Verified Employer · Bengaluru
                      </small>
                    </div>
                    <Badge tone="green">92% match</Badge>
                  </div>
                  <div className="ux-sim-trust-pills">
                    <Badge tone="blue">₹18–26 LPA</Badge>
                    <Badge tone="purple">Responds in 2 days</Badge>
                    <Badge>Culture 4.6/5</Badge>
                  </div>
                </div>
                <p className="ux-sim-caption">
                  <strong>Why it works:</strong> Surfaces salary, response
                  velocity, and explainable match evidence at a glance.
                </p>
              </div>
            </div>
          ) : (
            <div className="ux-sim-grid before-mode">
              <div className="ux-sim-panel legacy">
                <div className="ux-sim-tag">
                  <Badge tone="amber">Legacy Navigation</Badge>
                  <span>12 ungrouped links · Dead search input</span>
                </div>
                <div className="ux-sim-legacy-list">
                  <span>
                    Home · Find Jobs · Opportunity Radar · Companies · Studio ·
                    Applications · Profile · Resume · Assistant · Interviews ·
                    Settings (All flat, no badges)
                  </span>
                </div>
                <p className="ux-sim-caption">
                  <strong>Pain point diagnosed:</strong> High cognitive load
                  (Hick’s Law) and a non-functional search box forced users to
                  hunt through 12 identical links.
                </p>
              </div>

              <div className="ux-sim-panel legacy">
                <div className="ux-sim-tag">
                  <Badge tone="amber">Legacy Micro-Text Card</Badge>
                  <span>7px–9px cramped labels · Low contrast</span>
                </div>
                <div className="ux-sim-legacy-list">
                  <span>
                    Cramped 8px metadata rows without tabular alignment or
                    interactive dashboard cards.
                  </span>
                </div>
                <p className="ux-sim-caption">
                  <strong>Pain point diagnosed:</strong> Sub-10px font sizes
                  violated Apple HIG legibility floors and hid critical
                  candidate trust signals.
                </p>
              </div>
            </div>
          )}
        </Card>
      </section>

      <section className="ux-section">
        <div className="ux-section-head">
          <div>
            <span className="eyebrow">Top-company UI/UX deconstruction</span>
            <h2>How world-class design systems shaped this redesign</h2>
          </div>
          <div className="ux-segmented-tabs" role="tablist">
            {companyBenchmarks.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={activeCompany === item.id}
                className={`ux-seg-btn ${
                  activeCompany === item.id ? "active" : ""
                }`}
                onClick={() => setActiveCompany(item.id)}
              >
                {item.company}
              </button>
            ))}
          </div>
        </div>

        <Card className="ux-benchmark-showcase">
          <div className="ux-benchmark-header">
            <div>
              <div className="ux-benchmark-title-row">
                <Badge tone={selected.accent}>{selected.company} DNA</Badge>
                <span>{selected.product}</span>
              </div>
              <h3>{selected.tagline}</h3>
            </div>
            <Button onClick={() => navigate(selected.tryRoute)}>
              {selected.tryLabel} <ArrowUpRight size={16} />
            </Button>
          </div>

          <div className="ux-principles-grid">
            {selected.principles.map((p) => (
              <div className="ux-principle-card" key={p.title}>
                <div className="ux-principle-top">
                  <strong>{p.title}</strong>
                  <Badge tone="green">{p.metric}</Badge>
                </div>
                <div className="ux-before-after">
                  <div className="ux-ba-box before">
                    <span>Before</span>
                    <p>{p.before}</p>
                  </div>
                  <div className="ux-ba-box after">
                    <span>
                      <Check size={12} /> Redesigned
                    </span>
                    <p>{p.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="ux-section">
        <div className="ux-section-head">
          <div>
            <span className="eyebrow">Interactive customer flows</span>
            <h2>Jump directly into any signature experience</h2>
          </div>
          <p className="ux-section-sub">
            Every card below launches a live, interactive workflow with zero
            login friction.
          </p>
        </div>
        <div className="ux-journey-grid">
          {customerJourneys.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="ux-journey-card">
                <div className="ux-journey-top">
                  <span className={`ux-journey-icon ${item.tone}`}>
                    <Icon size={18} />
                  </span>
                  <Badge tone={item.tone}>{item.persona}</Badge>
                  <Badge>{item.badge}</Badge>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Button
                  variant="secondary"
                  className="ux-journey-btn"
                  onClick={() => navigate(item.to)}
                >
                  Launch flow <ArrowRight size={15} />
                </Button>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="ux-section">
        <Card className="ux-architecture-summary">
          <div className="ux-arch-col">
            <span className="eyebrow">Navigation ergonomics</span>
            <h3>5 ways we made customer navigation effortless</h3>
            <ul className="ux-arch-list">
              <li>
                <Command size={16} />
                <div>
                  <strong>Spotlight Command Bar (⌘K)</strong>
                  <p>
                    Search any page, candidate, job, or action from anywhere on
                    the platform.
                  </p>
                </div>
              </li>
              <li>
                <Layers size={16} />
                <div>
                  <strong>3-Cluster Sidebar Taxonomy</strong>
                  <p>
                    Grouped navigation items into logical sections with live
                    counters and collapsible rail.
                  </p>
                </div>
              </li>
              <li>
                <MousePointerClick size={16} />
                <div>
                  <strong>Topbar Persona Segmented Switcher</strong>
                  <p>
                    Switch between Candidate, Employer, and Admin views in 1
                    click without losing context.
                  </p>
                </div>
              </li>
              <li>
                <Eye size={16} />
                <div>
                  <strong>Breadcrumbs & Guided Next-Step Pills</strong>
                  <p>
                    Every screen shows your exact location plus contextual
                    shortcuts to the next logical task.
                  </p>
                </div>
              </li>
              <li>
                <SlidersHorizontal size={16} />
                <div>
                  <strong>Adaptive Theme & Mobile Bottom Dock</strong>
                  <p>
                    Switch between Cupertino Light and Obsidian Dark, with a
                    native iOS bottom bar on mobile.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="ux-arch-metrics">
            <h4>System Quality Benchmarks</h4>
            {[
              ["Visual Hierarchy & Contrast (WCAG AA+)", 98, "green"],
              ["Navigation Speed & Wayfinding Clarity", 96, "blue"],
              ["Explainable AI Transparency", 95, "purple"],
              ["Mobile & Responsive Touch Ergonomics", 94, "green"],
            ].map(([label, score, tone]) => (
              <div className="ux-metric-bar-row" key={String(label)}>
                <div>
                  <strong>{label}</strong>
                  <span>{score}/100</span>
                </div>
                <Progress
                  value={Number(score)}
                  tone={tone as "green" | "blue" | "purple"}
                />
              </div>
            ))}
            <div className="ux-arch-callout">
              <BadgeCheck size={18} />
              <span>
                Tip: Press <kbd>⌘K</kbd> at any time to test the universal
                command palette, or use the top segmented bar to switch portals.
              </span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
