import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Filter,
  Globe2,
  IndianRupee,
  Link2,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
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

const screens: Record<string, string[]> = {
  "Offers & onboarding": [
    "Offer dashboard",
    "Create offer",
    "Approval queue",
    "Offer details",
    "Decision status",
    "Joining checklist",
    "Onboarding progress",
  ],
  Analytics: [
    "Recruitment funnel",
    "Hiring sources",
    "Time-to-hire",
    "Cost-per-hire",
    "Candidate conversion",
    "Interview attendance",
    "Recruiter performance",
    "AI matching quality",
    "AI overrides",
    "Time savings",
  ],
  "AI agents": [
    "Agent overview",
    "Execution history",
    "Approval queue",
    "Safety controls",
  ],
  "Workflow automation": [
    "Workflows",
    "Builder",
    "Templates",
    "Execution history",
  ],
  Settings: [
    "Organization",
    "Team management",
    "Roles & permissions",
    "Hiring workflows",
    "Career page",
    "Notifications",
    "Integrations",
    "Billing",
    "Usage",
    "Audit logs",
  ],
  "Candidate settings": [
    "Account",
    "Notifications",
    "Communication consent",
    "Privacy controls",
    "Profile visibility",
    "Data export & deletion",
  ],
  "Admin settings": [
    "Platform defaults",
    "Languages",
    "Feature flags",
    "Data retention",
  ],
  "Resume builder": [
    "Resume editor",
    "Templates",
    "Resume preview",
    "Job tailoring",
  ],
  "Career assistant": [
    "Career chat",
    "Resume suggestions",
    "Resume tailoring",
    "Skill gaps",
    "Learning paths",
    "Interview preparation",
    "Mock interview",
    "Feedback",
  ],
  "Interview center": [
    "Upcoming interviews",
    "Invitations",
    "Scheduling slots",
    "Reschedule",
    "Preparation",
    "Readiness checklist",
  ],
  Organizations: [
    "Organization directory",
    "Organization details",
    "Tenant usage",
    "Access controls",
  ],
  Users: ["User directory", "User details", "Roles", "Access review"],
  Subscriptions: [
    "Subscription overview",
    "Plan management",
    "Invoices",
    "Usage limits",
  ],
  Automations: ["Workflow catalog", "Executions", "Failures", "Governance"],
  Integrations: [
    "Integration catalog",
    "Connected apps",
    "Credentials",
    "Health",
  ],
  Security: [
    "Security overview",
    "Compliance",
    "Risk register",
    "System health",
  ],
  "Audit logs": [
    "Platform activity",
    "Administrator actions",
    "Data access",
    "Exports",
  ],
}

const tableRows: Record<string, string[][]> = {
  "Offers & onboarding": [
    [
      "Priya Sharma",
      "Senior Product Designer",
      "₹32,00,000",
      "Awaiting approval",
    ],
    ["Arjun Mehta", "Product Designer", "₹25,50,000", "Sent"],
    ["Sneha Iyer", "UX Designer", "₹22,00,000", "Accepted"],
    ["Rohan Kapoor", "Design Lead", "₹38,00,000", "Draft"],
  ],
  Organizations: [
    ["Nexora Labs", "Enterprise", "4,280 users", "Active"],
    ["Aarav Fintech", "Business", "2,914 users", "Active"],
    ["Sarva Health", "Enterprise", "2,102 users", "Active"],
    ["Kite Commerce", "Growth", "1,847 users", "Review"],
  ],
  Users: [
    ["Aditi Rao", "Platform administrator", "Talent Network", "Active"],
    ["Neha Kapoor", "Employer administrator", "Nexora Labs", "Active"],
    ["Priya Sharma", "Candidate", "Independent", "Active"],
    ["Rohan Sen", "Employer recruiter", "Aarav Fintech", "Review"],
  ],
  Subscriptions: [
    ["Nexora Labs", "Enterprise", "₹8,40,000 / year", "Renews 14 Aug"],
    ["Aarav Fintech", "Business", "₹4,80,000 / year", "Renews 02 Sep"],
    ["Sarva Health", "Enterprise", "₹7,20,000 / year", "Renews 21 Jul"],
    ["Kite Commerce", "Growth", "₹2,40,000 / year", "Renews 30 Jun"],
  ],
}

const activityRows = [
  ["JD Authoring Agent", "Draft generated", "Nexora Labs", "Successful"],
  [
    "Match & Ranking Agent",
    "42 candidates evaluated",
    "Aarav Fintech",
    "Needs review",
  ],
  ["CV Ingestion Agent", "128 resumes processed", "Sarva Health", "Successful"],
  ["Outreach Agent", "Sequence paused by user", "Kite Commerce", "Paused"],
]

function DemoTable({ title }: { title: string }) {
  const rows = tableRows[title] || activityRows
  return (
    <Card className="table-card demo-table-card">
      <div className="table-toolbar">
        <div className="search-box">
          <Search />
          <Input placeholder={`Search ${title.toLowerCase()}…`} />
        </div>
        <div>
          <Button variant="secondary">
            <Filter /> Filters
          </Button>
          <Select>
            <option>Most recent</option>
            <option>Name</option>
          </Select>
        </div>
      </div>
      <div className="demo-table">
        {rows.map((row) => (
          <div className="demo-table-row" key={row[0]}>
            <Input type="checkbox" aria-label={`Select ${row[0]}`} />
            <span className="demo-row-icon">
              {title === "Organizations" ? (
                <Globe2 />
              ) : title === "Users" ? (
                <Users />
              ) : (
                <FileText />
              )}
            </span>
            <span>
              <strong>{row[0]}</strong>
              <small>{row[1]}</small>
            </span>
            <span>{row[2]}</span>
            <Badge
              tone={
                row[3].includes("Active") ||
                row[3].includes("Successful") ||
                row[3].includes("Accepted")
                  ? "green"
                  : row[3].includes("review") || row[3].includes("Review")
                    ? "amber"
                    : "blue"
              }
            >
              {row[3]}
            </Badge>
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

function SettingsDemo({ active }: { active: string }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="settings-demo-grid">
      <Card className="settings-summary">
        <span className="demo-feature-icon">
          {active.includes("permission") || active.includes("Security") ? (
            <ShieldCheck />
          ) : active.includes("Integration") ? (
            <Link2 />
          ) : (
            <Settings2 />
          )}
        </span>
        <h2>{active}</h2>
        <p>
          Configure defaults and policies for this workspace. Changes shown here
          are local prototype interactions.
        </p>
        <div className="settings-health">
          <span>Configuration complete</span>
          <strong>84%</strong>
        </div>
        <Progress value={84} tone="green" />
      </Card>
      <Card className="settings-form">
        <div className="card-head">
          <div>
            <h2>{active} configuration</h2>
            <p>Workspace-level defaults</p>
          </div>
          <Badge tone="green">Enabled</Badge>
        </div>
        <div className="form-grid">
          <label>
            Display name
            <Input defaultValue={active} />
          </label>
          <label>
            Default policy
            <Select>
              <option>Organization standard</option>
              <option>Team managed</option>
              <option>Approval required</option>
            </Select>
          </label>
          <label className="span-2">
            Description
            <textarea
              className="textarea"
              defaultValue={`${active} settings for the Talent Network demonstration workspace.`}
            />
          </label>
          <label className="demo-toggle-row span-2">
            <Input type="checkbox" defaultChecked />
            <span>
              <strong>Enable for this workspace</strong>
              <small>Authorized team members can use this feature.</small>
            </span>
          </label>
        </div>
        <div className="form-actions">
          <Button variant="secondary">Discard</Button>
          <Button onClick={() => setSaved(true)}>Save configuration</Button>
        </div>
      </Card>
      <Modal
        open={saved}
        onClose={() => setSaved(false)}
        title="Configuration saved"
      >
        <div className="application-preview">
          <CheckCircle2 />
          <div>
            <strong>{active} updated</strong>
            <p>Your prototype settings have been saved for this session.</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function AnalyticsDemo({ active }: { active: string }) {
  return (
    <div className="demo-analytics-grid">
      {[
        [
          "Current value",
          active.includes("Cost")
            ? "₹42,800"
            : active.includes("Time")
              ? "31 days"
              : "84.2%",
          "+8.4%",
        ],
        ["Target", active.includes("Cost") ? "₹40,000" : "88.0%", "On track"],
        [
          "Benchmark",
          active.includes("Time") ? "36 days" : "79.6%",
          "Top quartile",
        ],
      ].map((item) => (
        <Card className="demo-kpi" key={item[0]}>
          <span>{item[0]}</span>
          <strong>{item[1]}</strong>
          <small>{item[2]}</small>
        </Card>
      ))}
      <Card className="demo-bars-card">
        <div className="card-head">
          <div>
            <h2>{active} trend</h2>
            <p>Last eight reporting periods</p>
          </div>
          <Select>
            <option>Last 90 days</option>
            <option>Last year</option>
          </Select>
        </div>
        <div className="demo-bars">
          {[54, 72, 61, 84, 68, 91, 76, 88].map((bar, index) => (
            <span key={index}>
              <i style={{ height: `${bar}%` }} />
              <small>W{index + 1}</small>
            </span>
          ))}
        </div>
      </Card>
      <Card className="demo-insights-card">
        <Sparkles />
        <div>
          <span className="eyebrow">AI-assisted insight</span>
          <h2>Performance is improving</h2>
          <p>
            Structured interviews and faster feedback are associated with a 12%
            improvement. Treat this as directional evidence, not causation.
          </p>
          <Button variant="secondary">Review supporting data</Button>
        </div>
      </Card>
    </div>
  )
}

function CareerDemo({ active }: { active: string }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])
  if (active === "Career chat" || active === "Mock interview") {
    return (
      <Card className="career-chat-demo">
        <div className="career-chat-head">
          <span className="demo-feature-icon">
            <Sparkles />
          </span>
          <div>
            <h2>
              {active === "Mock interview"
                ? "Product design mock interview"
                : "Career assistant"}
            </h2>
            <p>Static guidance for demonstration purposes</p>
          </div>
          <Badge tone="purple">AI assistant</Badge>
        </div>
        <div className="career-demo-messages">
          <div className="assistant-message">
            <Sparkles />
            <p>
              {active === "Mock interview"
                ? "Tell me about a complex product decision where customer needs and business constraints were in tension."
                : "Your design-systems leadership is a strong differentiator. What would you like to work on today?"}
            </p>
          </div>
          {messages.map((item, index) => (
            <div className="candidate-demo-message" key={index}>
              {item}
            </div>
          ))}
        </div>
        <div className="career-chat-input">
          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your response…"
          />
          <Button
            onClick={() => {
              if (message) {
                setMessages([...messages, message])
                setMessage("")
              }
            }}
          >
            Send <ArrowRight />
          </Button>
        </div>
      </Card>
    )
  }
  return (
    <div className="career-demo-grid">
      <Card className="career-score-card">
        <span className="demo-feature-icon">
          <Sparkles />
        </span>
        <span className="eyebrow">{active}</span>
        <strong>82</strong>
        <p>Your profile is well positioned for senior product design roles.</p>
        <Progress value={82} tone="purple" />
      </Card>
      <Card className="career-actions-card">
        <div className="card-head">
          <div>
            <h2>Personalized recommendations</h2>
            <p>Based on your selected goals</p>
          </div>
          <Badge tone="purple">3 suggestions</Badge>
        </div>
        {[
          [
            "Strengthen outcome evidence",
            "Add measurable impact to your Razorpay experience.",
          ],
          [
            "Show systems thinking",
            "Include one design-system governance example.",
          ],
          [
            "Prepare a leadership story",
            "Practice influencing without formal authority.",
          ],
        ].map((item, index) => (
          <div className="career-action" key={item[0]}>
            <span>{index + 1}</span>
            <div>
              <strong>{item[0]}</strong>
              <p>{item[1]}</p>
            </div>
            <Badge tone={index === 0 ? "green" : "blue"}>
              {index === 0 ? "High impact" : "Recommended"}
            </Badge>
            <Button variant="secondary">Start</Button>
          </div>
        ))}
      </Card>
    </div>
  )
}

function DemoContent({ title, active }: { title: string; active: string }) {
  if (
    title === "Settings" ||
    title === "Candidate settings" ||
    title === "Admin settings" ||
    title === "Security" ||
    title === "Integrations"
  )
    return <SettingsDemo active={active} />
  if (title === "Analytics") return <AnalyticsDemo active={active} />
  if (title === "Career assistant" || title === "Resume builder")
    return <CareerDemo active={active} />
  return (
    <>
      <div className="demo-operation-metrics">
        {[
          ["In progress", "18", Clock3],
          ["Completed", "142", CheckCircle2],
          ["Needs attention", "6", CircleAlert],
          ["This month", "₹32.4L", IndianRupee],
        ].map(([label, value, Icon], index) => (
          <Card key={String(label)}>
            <span className={`demo-metric-icon tone-${index}`}>
              <Icon />
            </span>
            <span>{label as string}</span>
            <strong>{value as string}</strong>
          </Card>
        ))}
      </div>
      <DemoTable title={title} />
    </>
  )
}

export function FeatureDemoPage({
  portal,
  title,
}: {
  portal: "Employer" | "Candidate" | "Platform administration"
  title: string
}) {
  const tabs = screens[title] || [
    title,
    "Overview",
    "Activity",
    "Configuration",
  ]
  const [active, setActive] = useState(tabs[0])
  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">{portal}</span>
          <h1>{active}</h1>
          <p>{title} · Interactive demonstration with realistic mock data.</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary">
            <Download /> Export
          </Button>
          <Button>
            <Plus /> Create new
          </Button>
        </div>
      </div>
      <Card className="demo-screen-tabs">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={active === tab ? "tab-active" : ""}
            onClick={() => setActive(tab)}
          >
            {tab}
          </Button>
        ))}
      </Card>
      <DemoContent title={title} active={active} />
    </>
  )
}

const employerSteps = [
  ["Organization", "Create your organization"],
  ["Workspace", "Configure hiring defaults"],
  ["Branding", "Add company branding"],
  ["Team", "Invite your hiring team"],
  ["Permissions", "Choose roles and permissions"],
  ["Complete", "Review and launch"],
]
const candidateSteps = [
  ["Profile", "Tell us about yourself"],
  ["Resume", "Upload your resume"],
  ["Review", "Confirm extracted information"],
  ["Preferences", "Set job preferences"],
  ["Complete", "Start discovering roles"],
]

export function OnboardingDemo({
  portal,
}: {
  portal: "employer" | "candidate"
}) {
  const navigate = useNavigate()
  const steps = portal === "employer" ? employerSteps : candidateSteps
  const [step, setStep] = useState(0)
  const [uploaded, setUploaded] = useState(false)
  const current = steps[step]
  const final = step === steps.length - 1
  return (
    <div className="onboarding-page">
      <aside className="onboarding-aside">
        <div className="auth-brand">
          <span>
            <Sparkles />
          </span>
          Talent Network
        </div>
        <div>
          <span className="eyebrow light">
            {portal === "employer" ? "Employer setup" : "Candidate profile"}
          </span>
          <h1>
            {portal === "employer"
              ? "Build your hiring workspace"
              : "Make your profile work harder"}
          </h1>
          <p>
            {portal === "employer"
              ? "Set up the essentials now. Fine-tune every detail later."
              : "A complete profile helps us show more relevant opportunities."}
          </p>
        </div>
        <div className="onboarding-step-list">
          {steps.map((item, index) => (
            <button
              className={
                step === index ? "active" : step > index ? "complete" : ""
              }
              key={item[0]}
              onClick={() => setStep(index)}
            >
              <span>{step > index ? <Check /> : index + 1}</span>
              <div>
                <strong>{item[0]}</strong>
                <small>{item[1]}</small>
              </div>
            </button>
          ))}
        </div>
        <small>English (India) · हिन्दी support coming soon</small>
      </aside>
      <main className="onboarding-main">
        <div className="onboarding-card">
          <div className="onboarding-progress">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <strong>
              {Math.round(((step + 1) / steps.length) * 100)}% complete
            </strong>
          </div>
          <Progress value={((step + 1) / steps.length) * 100} />
          <span className="eyebrow">{current[0]}</span>
          <h2>{current[1]}</h2>
          <p>Complete this step using the realistic demo information below.</p>
          {final ? (
            <div className="onboarding-complete">
              <span>
                <Check />
              </span>
              <h3>
                {portal === "employer"
                  ? "Your workspace is ready"
                  : "Your profile is ready"}
              </h3>
              <p>
                {portal === "employer"
                  ? "Nexora Labs is configured and ready for your hiring team."
                  : "Your profile is visible and personalized recommendations are ready."}
              </p>
              <div>
                <Badge tone="green">Profile complete</Badge>
                <Badge tone="blue">Privacy reviewed</Badge>
                <Badge tone="purple">Recommendations ready</Badge>
              </div>
            </div>
          ) : current[0] === "Resume" ? (
            <div className={`resume-upload-demo ${uploaded ? "uploaded" : ""}`}>
              {uploaded ? <FileCheck2 /> : <Upload />}
              <strong>
                {uploaded
                  ? "Priya_Sharma_Resume.pdf"
                  : "Upload your latest resume"}
              </strong>
              <p>
                {uploaded
                  ? "1.8 MB · Information extracted successfully"
                  : "PDF or DOCX up to 10 MB"}
              </p>
              <Button
                variant="secondary"
                onClick={() => setUploaded(!uploaded)}
              >
                {uploaded ? "Replace resume" : "Choose file"}
              </Button>
            </div>
          ) : current[0] === "Review" ? (
            <div className="extracted-profile-demo">
              <div>
                <CheckCircle2 />
                <span>
                  <strong>Profile information extracted</strong>
                  <small>Please verify before continuing.</small>
                </span>
              </div>
              <label>
                Current role
                <Input defaultValue="Senior Product Designer" />
              </label>
              <label>
                Most recent company
                <Input defaultValue="Razorpay" />
              </label>
              <label>
                Experience
                <Input defaultValue="7 years" />
              </label>
            </div>
          ) : (
            <div className="form-grid onboarding-form-grid">
              <label>
                {portal === "employer" ? "Organization name" : "Full name"}
                <Input
                  defaultValue={
                    portal === "employer" ? "Nexora Labs" : "Priya Sharma"
                  }
                />
              </label>
              <label>
                {portal === "employer" ? "Company size" : "Current role"}
                <Select>
                  <option>
                    {portal === "employer"
                      ? "201–500 employees"
                      : "Senior Product Designer"}
                  </option>
                </Select>
              </label>
              <label>
                {portal === "employer"
                  ? "Primary location"
                  : "Current location"}
                <Input defaultValue="Bengaluru, Karnataka" />
              </label>
              <label>
                {portal === "employer" ? "Industry" : "Preferred work style"}
                <Select>
                  <option>
                    {portal === "employer" ? "B2B Software" : "Hybrid"}
                  </option>
                </Select>
              </label>
              {current[0] === "Branding" && (
                <label className="span-2 brand-upload-row">
                  <span className="company-logo">NL</span>
                  <span>
                    <strong>Company logo</strong>
                    <small>SVG or PNG · Recommended 512 × 512</small>
                  </span>
                  <Button variant="secondary">
                    <Upload /> Upload
                  </Button>
                </label>
              )}
            </div>
          )}
          <div className="onboarding-actions">
            <Button
              variant="ghost"
              onClick={() =>
                step > 0 ? setStep(step - 1) : navigate(`/${portal}/login`)
              }
            >
              Back
            </Button>
            <Button
              onClick={() =>
                final
                  ? navigate(portal === "employer" ? "/employer" : "/candidate")
                  : setStep(step + 1)
              }
            >
              {final
                ? portal === "employer"
                  ? "Open workspace"
                  : "View my dashboard"
                : "Continue"}{" "}
              <ArrowRight />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
