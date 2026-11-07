import { useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  IndianRupee,
  MapPin,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Progress,
  Select,
} from "../components/ui"

function Header({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow: string
  title: string
  text: string
  action?: React.ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action}
    </div>
  )
}

export function OpportunityRadarPage() {
  const [role, setRole] = useState("Senior Product Designer")
  const [city, setCity] = useState("Bengaluru")
  const [priority, setPriority] = useState("Balanced growth")
  const [saved, setSaved] = useState(false)
  const demand = [
    ["Design systems", 92, "+18%"],
    ["AI product design", 86, "+31%"],
    ["Research strategy", 73, "+9%"],
    ["People leadership", 68, "+12%"],
    ["Fintech compliance", 48, "+22%"],
  ]
  return (
    <>
      <Header
        eyebrow="Career intelligence"
        title="Opportunity Radar"
        text="See where your skills are gaining value before choosing your next move."
        action={
          <Button variant="secondary" onClick={() => setSaved(!saved)}>
            <Target />
            {saved ? "Radar saved" : "Save this radar"}
          </Button>
        }
      />
      <Card className="radar-controls">
        <label>
          Target role
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Senior Product Designer</option>
            <option>Product Design Lead</option>
            <option>Staff Product Designer</option>
          </Select>
        </label>
        <label>
          Market
          <Select value={city} onChange={(e) => setCity(e.target.value)}>
            <option>Bengaluru</option>
            <option>Gurugram</option>
            <option>Mumbai</option>
            <option>Remote India</option>
          </Select>
        </label>
        <label>
          Career priority
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Balanced growth</option>
            <option>Maximum salary</option>
            <option>Maximum learning</option>
          </Select>
        </label>
        <Button>
          Update radar <Radar />
        </Button>
      </Card>
      <div className="radar-summary-grid">
        <Card className="radar-score-card">
          <span className="radar-orbit">
            <strong>{priority === "Maximum salary" ? 78 : 86}</strong>
            <small>market readiness</small>
          </span>
          <div>
            <Badge tone="green">Strong momentum</Badge>
            <h2>{role}</h2>
            <p>
              Your profile is more competitive than 74% of similar candidates in{" "}
              {city}.
            </p>
          </div>
        </Card>
        {[
          ["Relevant openings", "248", "+14% in 90 days", BriefcaseBusiness],
          ["Market midpoint", "₹31.5L", "Top quartile ₹39L", IndianRupee],
        ].map(([l, v, d, Icon]) => (
          <Card className="radar-stat" key={String(l)}>
            <span>
              <Icon />
            </span>
            <div>
              <small>{l as string}</small>
              <strong>{v as string}</strong>
              <p>{d as string}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="radar-content-grid">
        <Card className="skill-demand-card">
          <div className="card-head">
            <div>
              <h2>Skill demand map</h2>
              <p>Demand among matching roles in {city}</p>
            </div>
            <Badge tone="blue">Updated today</Badge>
          </div>
          <div className="skill-demand-list">
            {demand.map(([skill, value, change]) => (
              <div key={String(skill)}>
                <span>
                  <strong>{skill}</strong>
                  <small>{Number(value) > 80 ? "Very high" : "Growing"}</small>
                </span>
                <Progress
                  value={Number(value)}
                  tone={Number(value) > 80 ? "purple" : "blue"}
                />
                <b>{change}</b>
              </div>
            ))}
          </div>
        </Card>
        <Card className="career-move-card">
          <span className="demo-feature-icon">
            <Sparkles />
          </span>
          <span className="eyebrow">Suggested move</span>
          <h2>Build an AI workflow case study</h2>
          <p>
            This portfolio addition could make you relevant to 42 more
            high-growth roles.
          </p>
          <div className="career-move-impact">
            <span>
              <strong>+42</strong>
              <small>matching roles</small>
            </span>
            <span>
              <strong>+₹3.2L</strong>
              <small>salary potential</small>
            </span>
          </div>
          <Button>Build my action plan</Button>
        </Card>
        <Card className="market-city-card">
          <div className="card-head">
            <div>
              <h2>Best markets for you</h2>
              <p>Adjusted for salary and competition</p>
            </div>
          </div>
          {[
            ["Bengaluru", "248 roles", "₹31.5L", 92],
            ["Remote India", "186 roles", "₹29.8L", 87],
            ["Gurugram", "112 roles", "₹30.2L", 79],
          ].map((item) => (
            <div className="market-city-row" key={String(item[0])}>
              <MapPin />
              <span>
                <strong>{item[0]}</strong>
                <small>{item[1]}</small>
              </span>
              <b>{item[2]}</b>
              <Progress value={Number(item[3])} />
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}

const companies = [
  {
    name: "Zentrix Labs",
    initials: "ZL",
    industry: "Enterprise software",
    trust: 96,
    response: "2 days",
    salary: "₹26L–₹38L",
    growth: "+28%",
  },
  {
    name: "Razorpay",
    initials: "RP",
    industry: "Fintech",
    trust: 92,
    response: "4 days",
    salary: "₹28L–₹42L",
    growth: "+19%",
  },
  {
    name: "Freshworks",
    initials: "FW",
    industry: "SaaS",
    trust: 89,
    response: "5 days",
    salary: "₹24L–₹36L",
    growth: "+14%",
  },
]
export function CompanyIntelligencePage() {
  const [selected, setSelected] = useState(companies[0])
  const [following, setFollowing] = useState<string[]>([])
  return (
    <>
      <Header
        eyebrow="Employer transparency"
        title="Company Intelligence"
        text="Look beyond employer branding with verified hiring, culture, and response signals."
      />
      <Card className="company-search-bar">
        <Search />
        <Input placeholder="Search companies, teams, or industries…" />
        <Button>Explore companies</Button>
      </Card>
      <div className="company-intelligence-layout">
        <Card className="company-rank-list">
          <div className="card-head">
            <div>
              <h2>Companies aligned to you</h2>
              <p>Ranked by preferences, not advertising</p>
            </div>
          </div>
          {companies.map((company) => (
            <button
              className={selected.name === company.name ? "active" : ""}
              key={company.name}
              onClick={() => setSelected(company)}
            >
              <span className="company-logo">{company.initials}</span>
              <span>
                <strong>
                  {company.name}
                  <BadgeCheck />
                </strong>
                <small>{company.industry}</small>
              </span>
              <b>{company.trust}</b>
              <ChevronRight />
            </button>
          ))}
        </Card>
        <div className="company-detail-stack">
          <Card className="company-detail-hero">
            <span className="company-logo">{selected.initials}</span>
            <div>
              <span>
                <h1>{selected.name}</h1>
                <Badge tone="blue">
                  <BadgeCheck /> Verified employer
                </Badge>
              </span>
              <p>{selected.industry} · Bengaluru · 1,000–5,000 employees</p>
            </div>
            <Button
              variant={
                following.includes(selected.name) ? "secondary" : "primary"
              }
              onClick={() =>
                setFollowing(
                  following.includes(selected.name)
                    ? following.filter((x) => x !== selected.name)
                    : [...following, selected.name],
                )
              }
            >
              {following.includes(selected.name)
                ? "Following"
                : "Follow company"}
            </Button>
          </Card>
          <div className="company-signal-grid">
            {[
              [
                "Trust score",
                `${selected.trust}/100`,
                ShieldCheck,
                "Verified data",
              ],
              [
                "Candidate response",
                selected.response,
                Zap,
                "Faster than average",
              ],
              [
                "Product salary",
                selected.salary,
                IndianRupee,
                "Published range",
              ],
              ["Team growth", selected.growth, TrendingUp, "Past 12 months"],
            ].map(([l, v, Icon, d]) => (
              <Card key={String(l)}>
                <Icon />
                <small>{l as string}</small>
                <strong>{v as string}</strong>
                <p>{d as string}</p>
              </Card>
            ))}
          </div>
          <Card className="company-transparency-card">
            <div className="card-head">
              <div>
                <h2>What candidates want to know</h2>
                <p>Aggregated, privacy-safe experience signals</p>
              </div>
              <Badge tone="green">High confidence</Badge>
            </div>
            {[
              ["Interview clarity", 88, "Clear expectations before each round"],
              ["Salary transparency", 82, "Meaningful ranges on most roles"],
              ["Feedback reliability", 74, "Usually within five working days"],
              [
                "Work-life sustainability",
                79,
                "Manageable workload in most quarters",
              ],
            ].map(([l, v, d]) => (
              <div className="transparency-row" key={String(l)}>
                <span>
                  <strong>{l}</strong>
                  <small>{d}</small>
                </span>
                <Progress
                  value={Number(v)}
                  tone={Number(v) > 80 ? "green" : "blue"}
                />
                <b>{v}%</b>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  )
}

export function ApplicationStudioPage() {
  const [step, setStep] = useState(1)
  const [tailored, setTailored] = useState(false)
  const [preview, setPreview] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  return (
    <>
      <Header
        eyebrow="Application quality"
        title="Application Studio"
        text="Create a stronger job-specific application while keeping every change under your control."
        action={
          <Badge tone="purple">
            <Sparkles /> Private workspace
          </Badge>
        }
      />
      <div className="studio-stepper">
        {["Choose role", "Review fit", "Tailor resume", "Application pack"].map(
          (item, index) => (
            <Button
              variant="ghost"
              className={step === index + 1 ? "active" : ""}
              key={item}
              onClick={() => setStep(index + 1)}
            >
              <span>{step > index + 1 ? <Check /> : index + 1}</span>
              {item}
            </Button>
          ),
        )}
      </div>
      <div className="application-studio-layout">
        <Card className="studio-main-card">
          <div className="selected-role-bar">
            <span className="company-logo">Z</span>
            <div>
              <span className="eyebrow">Target application</span>
              <h2>Senior React Developer</h2>
              <p>Zentrix Labs · Bengaluru · Hybrid</p>
            </div>
            <Badge tone="green">92% match</Badge>
          </div>
          <div className="studio-score-grid">
            {([
              { l: "Resume relevance", v: tailored ? 94 : 82, Icon: FileText },
              { l: "Evidence strength", v: 88, Icon: BadgeCheck },
              { l: "Role readiness", v: tailored ? 91 : 84, Icon: Target },
            ] as const).map(({ l, v, Icon }) => (
              <div key={l}>
                <Icon />
                <span>
                  <small>{l}</small>
                  <strong>{v}%</strong>
                </span>
                <Progress
                  value={Number(v)}
                  tone={Number(v) > 90 ? "green" : "purple"}
                />
              </div>
            ))}
          </div>
          <div className="studio-suggestions">
            <div className="card-head">
              <div>
                <h2>Recommended improvements</h2>
                <p>Review every suggestion before applying it</p>
              </div>
              <Badge tone="purple">3 ready</Badge>
            </div>
            {[
              [
                "Lead with React platform impact",
                "Move your migration result into the opening summary.",
              ],
              [
                "Add GraphQL evidence",
                "Your payments project contains relevant GraphQL work.",
              ],
              [
                "Quantify performance work",
                "Add the 34% load-time improvement.",
              ],
            ].map((item, index) => (
              <div className="studio-suggestion" key={item[0]}>
                <span>{index + 1}</span>
                <div>
                  <strong>{item[0]}</strong>
                  <p>{item[1]}</p>
                </div>
                <Badge tone={index === 1 ? "blue" : "green"}>
                  {index === 1 ? "Evidence found" : "High impact"}
                </Badge>
                <Button
                  variant={tailored ? "secondary" : "primary"}
                  onClick={() => setTailored(true)}
                >
                  {tailored ? <Check /> : <WandSparkles />}
                  {tailored ? "Applied" : "Apply"}
                </Button>
              </div>
            ))}
          </div>
        </Card>
        <aside className="studio-side">
          <Card className="application-pack-card">
            <span className="demo-feature-icon">
              <FileCheck2 />
            </span>
            <h2>Your application pack</h2>
            <p>
              Everything the employer will receive, previewed before submission.
            </p>
            {[
              ["Tailored resume", tailored ? "Ready" : "Needs review"],
              ["Career Passport", "Included"],
              ["Portfolio", "3 case studies"],
              ["Cover note", "Optional"],
            ].map((item) => (
              <div key={item[0]}>
                <CheckCircle2 />
                <span>
                  <strong>{item[0]}</strong>
                  <small>{item[1]}</small>
                </span>
              </div>
            ))}
            <Button variant="secondary" onClick={() => setPreview(true)}>
              Preview application
            </Button>
            <Button onClick={() => setSubmitted(true)}>
              Submit when ready <ArrowRight />
            </Button>
          </Card>
          <Card className="studio-privacy-card">
            <ShieldCheck />
            <div>
              <strong>You control your data</strong>
              <p>Only the selected employer receives this pack.</p>
            </div>
          </Card>
        </aside>
      </div>
      <Modal
        open={preview}
        onClose={() => setPreview(false)}
        title="Application preview"
        footer={<Button onClick={() => setPreview(false)}>Done</Button>}
      >
        <div className="application-preview-document">
          <div>
            <span className="company-logo">PS</span>
            <span>
              <strong>Priya Sharma</strong>
              <small>Senior Frontend Engineer</small>
            </span>
            <Badge tone="green">Career Passport verified</Badge>
          </div>
          <h3>Job-specific summary</h3>
          <p>
            Frontend engineer with 6 years of experience building scalable React
            products with measurable performance impact.
          </p>
          <h3>Evidence selected for this role</h3>
          <ul>
            <li>Led a React migration used by 1.2M monthly users.</li>
            <li>Reduced application load time by 34%.</li>
            <li>Built GraphQL workflows across three teams.</li>
          </ul>
        </div>
      </Modal>
      <Modal
        open={submitted}
        onClose={() => setSubmitted(false)}
        title="Application ready"
      >
        <div className="onboarding-complete studio-complete">
          <span>
            <Check />
          </span>
          <h3>Your application is prepared</h3>
          <p>This is a frontend demonstration. No information has been sent.</p>
        </div>
      </Modal>
    </>
  )
}
