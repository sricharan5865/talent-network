import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";

type IconName =
  | "grid"
  | "briefcase"
  | "users"
  | "calendar"
  | "chart"
  | "message"
  | "settings"
  | "search"
  | "bell"
  | "plus"
  | "arrow"
  | "chevron"
  | "clock"
  | "more"
  | "menu"
  | "close"
  | "spark"
  | "check"
  | "shield";

const iconPaths: Record<IconName, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 16 4-5 4 3 5-7" />
    </>
  ),
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.17.37.38.71.6 1 .3.29.7.43 1.1.4h.1v4h-.1a1.7 1.7 0 0 0-1.7.6Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="m9 18 6-6-6-6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  spark: (
    <>
      <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
      <path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

const nav = [
  { label: "Discover", icon: "grid" as IconName },
  { label: "Jobs", icon: "briefcase" as IconName },
  { label: "Candidates", icon: "users" as IconName },
  { label: "Interviews", icon: "calendar" as IconName, count: 5 },
  { label: "Analytics", icon: "chart" as IconName },
  { label: "Outreach", icon: "message" as IconName, dot: true },
];

const initialJobs = [
  {
    role: "Senior Product Designer",
    dept: "Product & Design",
    candidates: 48,
    days: "2d ago",
    status: "Active",
    color: "#7c5ce5",
  },
  {
    role: "Frontend Engineer",
    dept: "Engineering",
    candidates: 36,
    days: "3d ago",
    status: "Active",
    color: "#2588e6",
  },
  {
    role: "Talent Acquisition Lead",
    dept: "People & Culture",
    candidates: 24,
    days: "5d ago",
    status: "Active",
    color: "#ed8c55",
  },
  {
    role: "Product Marketing Manager",
    dept: "Marketing",
    candidates: 19,
    days: "1w ago",
    status: "Paused",
    color: "#49a883",
  },
];

const interviews = [
  {
    name: "Maya Patel",
    role: "Senior Product Designer",
    time: "10:30 AM",
    initials: "MP",
    color: "#ecd7ca",
  },
  {
    name: "Ethan Williams",
    role: "Frontend Engineer",
    time: "1:00 PM",
    initials: "EW",
    color: "#caddec",
  },
  {
    name: "Sophia Chen",
    role: "Product Marketing",
    time: "3:30 PM",
    initials: "SC",
    color: "#e5d5ee",
  },
];

const funnel = [
  { label: "Applied", value: 284, width: 100, color: "#6d4adb" },
  { label: "Screening", value: 148, width: 72, color: "#7c5ce5" },
  { label: "Interview", value: 64, width: 48, color: "#987eea" },
  { label: "Offer", value: 22, width: 28, color: "#b3a1ef" },
  { label: "Hired", value: 12, width: 17, color: "#49a883" },
];

const recentSearches = [
  { title: "Product designer · SaaS · 4–7 years", meta: "Bengaluru · Remote" },
  { title: "React · TypeScript · Design systems", meta: "3–6 years · India" },
  { title: "Talent acquisition · Technology", meta: "Hyderabad · 5–9 years" },
];

const candidateResults = [
  {
    name: "Priya Menon",
    title: "Senior Product Designer",
    meta: "6 years · Bengaluru · ₹24L",
    skills: ["Figma", "Design systems", "SaaS"],
    score: 94,
    initials: "PM",
    color: "#e8d7f0",
  },
  {
    name: "Arjun Mehta",
    title: "Product Designer at Loop",
    meta: "5 years · Mumbai · ₹20L",
    skills: ["Research", "Prototyping", "B2B"],
    score: 89,
    initials: "AM",
    color: "#d5e6ef",
  },
  {
    name: "Nisha Rao",
    title: "UX Designer at Northstar",
    meta: "7 years · Hyderabad · ₹26L",
    skills: ["UX strategy", "Figma", "Mobile"],
    score: 86,
    initials: "NR",
    color: "#f2dfd1",
  },
];

function ChoiceGroup({
  label,
  values,
  selected,
  onSelect,
}: {
  label: string;
  values: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="choice-group">
      <label>{label}</label>
      <div>
        {values.map((value) => (
          <button
            type="button"
            className={selected === value ? "selected" : ""}
            onClick={() => onSelect(value)}
            key={value}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

function CandidateSearch({ notify }: { notify: (message: string) => void }) {
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>(["Product Designer"]);
  const [openSections, setOpenSections] = useState<string[]>(["employment"]);
  const [education, setEducation] = useState("Any qualification");
  const [pgEducation, setPgEducation] = useState("Any PG qualification");
  const [gender, setGender] = useState("All candidates");
  const [showDoctorate, setShowDoctorate] = useState(false);
  const [diversityTags, setDiversityTags] = useState<string[]>([]);
  const [noticePeriod, setNoticePeriod] = useState("Any");
  const [companyScope, setCompanyScope] = useState("Current company");
  const [designationScope, setDesignationScope] = useState("Current designation");
  const [workPermitOpen, setWorkPermitOpen] = useState(false);
  const [workPermits, setWorkPermits] = useState<string[]>(["India"]);
  const [displayMode, setDisplayMode] = useState("All candidates");
  const [activityPeriod, setActivityPeriod] = useState("Active in 6 months");
  const [searched, setSearched] = useState(false);
  const [saved, setSaved] = useState(false);
  const suggestions = ["Product Designer", "UX Designer", "Design Lead", "Product Researcher"];

  function toggleSection(section: string) {
    setOpenSections((current) =>
      current.includes(section)
        ? current.filter((item) => item !== section)
        : [...current, section],
    );
  }

  function addKeyword(value: string) {
    const clean = value.trim();
    if (clean && !keywords.includes(clean)) setKeywords([...keywords, clean]);
    setKeyword("");
  }

  function toggleDiversityTag(value: string) {
    setDiversityTags((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    notify(`Found 128 candidates matching ${keywords.join(", ")}`);
  }

  if (searched) {
    return (
      <div className="candidate-content candidate-results-page">
        <div className="candidate-titlebar">
          <div>
            <button className="back-link" onClick={() => setSearched(false)}>
              ← Refine search
            </button>
            <h1>128 matching candidates</h1>
            <p>Ranked by relevance to {keywords.join(", ")}</p>
          </div>
          <div className="result-actions">
            <button
              className={saved ? "saved" : ""}
              onClick={() => {
                setSaved(!saved);
                notify(saved ? "Search removed from saved searches" : "Search saved successfully");
              }}
            >
              {saved ? "✓ Saved" : "Save search"}
            </button>
            <button onClick={() => notify("Candidate filters opened")}>
              Filters <span>3</span>
            </button>
          </div>
        </div>
        <div className="result-layout">
          <aside className="result-filter-card">
            <strong>Active filters</strong>
            {keywords.map((item) => (
              <span key={item}>
                {item}{" "}
                <button onClick={() => setKeywords(keywords.filter((word) => word !== item))}>
                  ×
                </button>
              </span>
            ))}
            <span>
              4–8 years <button>×</button>
            </span>
            <span>
              Bengaluru <button>×</button>
            </span>
            <button className="clear-filters" onClick={() => setKeywords([])}>
              Clear all
            </button>
          </aside>
          <section className="candidate-result-list">
            <div className="result-list-head">
              <span>
                <b>128</b> profiles found
              </span>
              <select aria-label="Sort candidates">
                <option>Best match</option>
                <option>Most recent</option>
                <option>Experience</option>
              </select>
            </div>
            {candidateResults.map((candidate) => (
              <article className="candidate-card" key={candidate.name}>
                <label className="result-check">
                  <input type="checkbox" />
                  <span />
                </label>
                <div className="candidate-avatar" style={{ background: candidate.color }}>
                  {candidate.initials}
                </div>
                <div className="candidate-info">
                  <div className="candidate-name-line">
                    <h2>{candidate.name}</h2>
                    <em>{candidate.score}% match</em>
                  </div>
                  <strong>{candidate.title}</strong>
                  <p>{candidate.meta}</p>
                  <div className="skill-list">
                    {candidate.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                  <small>Updated profile 2 days ago · Available in 30 days</small>
                </div>
                <div className="candidate-actions">
                  <button onClick={() => notify(`${candidate.name} added to shortlist`)}>
                    Shortlist
                  </button>
                  <button onClick={() => notify(`Opening ${candidate.name}'s profile`)}>
                    View profile
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="candidate-content">
      <div className="candidate-titlebar">
        <div>
          <p className="eyebrow">TALENT DISCOVERY</p>
          <h1>Search candidates</h1>
          <p>Find the right people from your talent pool.</p>
        </div>
        <div className="candidate-tabs">
          <button className="selected">Search talent</button>
          <button onClick={() => notify("Invites workspace selected")}>Send invite</button>
        </div>
      </div>

      <div className="candidate-layout">
        <form className="candidate-form" onSubmit={submitSearch}>
          <section className="search-form-section">
            <div className="section-heading">
              <span className="section-number">1</span>
              <div>
                <h2>Role and skills</h2>
                <p>Start with the expertise you’re looking for.</p>
              </div>
            </div>
            <label className="field-label">Keywords</label>
            <div className="keyword-input">
              {keywords.map((item) => (
                <span key={item}>
                  {item}
                  <button
                    type="button"
                    onClick={() => setKeywords(keywords.filter((word) => word !== item))}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addKeyword(keyword);
                  }
                }}
                placeholder={keywords.length ? "Add another skill" : "Job title, skill, or company"}
              />
            </div>
            {keyword && (
              <div className="keyword-suggestions">
                {suggestions
                  .filter((item) => item.toLowerCase().includes(keyword.toLowerCase()))
                  .map((item) => (
                    <button type="button" onClick={() => addKeyword(item)} key={item}>
                      <Icon name="search" size={14} />
                      <span>{item}</span>
                      <small>Add</small>
                    </button>
                  ))}
              </div>
            )}
            <div className="inline-links">
              <button type="button">+ Exclude keywords</button>
              <button type="button">+ Add similar skills</button>
            </div>
          </section>

          <section className="search-form-section">
            <div className="section-heading">
              <span className="section-number">2</span>
              <div>
                <h2>Experience and location</h2>
                <p>Narrow candidates by career level and preference.</p>
              </div>
            </div>
            <div className="form-row three">
              <label>
                <span>Minimum experience</span>
                <select defaultValue="4 years">
                  <option>Any experience</option>
                  <option>2 years</option>
                  <option>4 years</option>
                  <option>6 years</option>
                </select>
              </label>
              <label>
                <span>Maximum experience</span>
                <select defaultValue="8 years">
                  <option>6 years</option>
                  <option>8 years</option>
                  <option>10 years</option>
                  <option>15 years</option>
                </select>
              </label>
              <label className="location-field">
                <span>Current location</span>
                <input defaultValue="Bengaluru" />
              </label>
            </div>
            <label className="check-line">
              <input type="checkbox" defaultChecked />
              <span>Include candidates open to relocation</span>
            </label>
            <div className="salary-row">
              <label>
                <span>Annual salary</span>
                <select>
                  <option>INR</option>
                  <option>USD</option>
                </select>
              </label>
              <label>
                <span>Minimum</span>
                <input placeholder="e.g. 12L" />
              </label>
              <label>
                <span>Maximum</span>
                <input placeholder="e.g. 28L" />
              </label>
            </div>
          </section>

          <section
            className={`accordion-section ${openSections.includes("employment") ? "open" : ""}`}
          >
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => toggleSection("employment")}
            >
              <span>
                <b>Employment details</b>
                <small>Department, industry, company, and role</small>
              </span>
              <Icon name="chevron" size={17} />
            </button>
            {openSections.includes("employment") && (
              <div className="accordion-body">
                <label className="wide-field">
                  <span>Department and role</span>
                  <input placeholder="Add a department or role" />
                </label>
                <div className="suggestion-pills">
                  <button type="button">Engineering · Software +</button>
                  <button type="button">Design · Product design +</button>
                  <button type="button">Quality assurance +</button>
                </div>
                <label className="wide-field">
                  <span>Industry</span>
                  <input placeholder="Add an industry" />
                </label>
                <div className="suggestion-pills">
                  <button type="button">Software product +</button>
                  <button type="button">IT services +</button>
                  <button type="button">Emerging technology +</button>
                </div>
                <label className="wide-field">
                  <span>Company</span>
                  <input placeholder="Add company name" />
                </label>
                <div className="scope-row">
                  <select
                    value={companyScope}
                    onChange={(event) => setCompanyScope(event.target.value)}
                  >
                    <option>Current company</option>
                    <option>Previous company</option>
                    <option>Current or previous company</option>
                  </select>
                  <button type="button">+ Exclude company</button>
                </div>
                <label className="wide-field">
                  <span>Designation</span>
                  <input placeholder="Add current or previous designation" />
                </label>
                <div className="scope-row">
                  <select
                    value={designationScope}
                    onChange={(event) => setDesignationScope(event.target.value)}
                  >
                    <option>Current designation</option>
                    <option>Previous designation</option>
                    <option>Current or previous designation</option>
                  </select>
                </div>
                <ChoiceGroup
                  label="Notice period / availability to join"
                  values={[
                    "Any",
                    "0–15 days",
                    "1 month",
                    "2 months",
                    "3 months",
                    "Over 3 months",
                    "Serving notice",
                  ]}
                  selected={noticePeriod}
                  onSelect={setNoticePeriod}
                />
              </div>
            )}
          </section>

          <section
            className={`accordion-section ${openSections.includes("education") ? "open" : ""}`}
          >
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => toggleSection("education")}
            >
              <span>
                <b>Education details</b>
                <small>Qualification, course, and graduation year</small>
              </span>
              <Icon name="chevron" size={17} />
            </button>
            {openSections.includes("education") && (
              <div className="accordion-body">
                <ChoiceGroup
                  label="Undergraduate qualification"
                  values={["Any qualification", "Specific qualification", "No qualification"]}
                  selected={education}
                  onSelect={setEducation}
                />
                {education === "Specific qualification" && (
                  <>
                    <label className="wide-field">
                      <span>Choose course</span>
                      <input placeholder="Type or select a course" />
                    </label>
                    <div className="course-options">
                      {["Any Engineering", "Any Computers", "Any Management", "Any Medical"].map(
                        (course) => (
                          <label key={course}>
                            <input type="checkbox" />
                            {course}
                          </label>
                        ),
                      )}
                    </div>
                  </>
                )}
                <ChoiceGroup
                  label="Postgraduate qualification"
                  values={[
                    "Any PG qualification",
                    "Specific PG qualification",
                    "No PG qualification",
                  ]}
                  selected={pgEducation}
                  onSelect={setPgEducation}
                />
                <div className="education-years">
                  <label>
                    <span>Graduation year from</span>
                    <select>
                      <option>Any year</option>
                      <option>2015</option>
                      <option>2018</option>
                      <option>2020</option>
                      <option>2022</option>
                    </select>
                  </label>
                  <label>
                    <span>Graduation year to</span>
                    <select>
                      <option>Any year</option>
                      <option>2020</option>
                      <option>2022</option>
                      <option>2024</option>
                      <option>2026</option>
                    </select>
                  </label>
                </div>
                <button
                  type="button"
                  className="add-doctorate"
                  onClick={() => setShowDoctorate(!showDoctorate)}
                >
                  {showDoctorate
                    ? "− Remove doctorate qualification"
                    : "+ Add doctorate qualification"}
                </button>
                {showDoctorate && (
                  <label className="wide-field">
                    <span>Doctorate / specialization</span>
                    <input placeholder="Add doctorate or specialization" />
                  </label>
                )}
              </div>
            )}
          </section>

          <section
            className={`accordion-section ${openSections.includes("diversity") ? "open" : ""}`}
          >
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => toggleSection("diversity")}
            >
              <span>
                <b>
                  Diversity hiring <em>Optional</em>
                </b>
                <small>Build a more inclusive talent pipeline</small>
              </span>
              <Icon name="chevron" size={17} />
            </button>
            {openSections.includes("diversity") && (
              <div className="accordion-body">
                <ChoiceGroup
                  label="Gender"
                  values={["All candidates", "Women", "Men", "Non-binary"]}
                  selected={gender}
                  onSelect={setGender}
                />
                <div className="diversity-block">
                  <label>Career break</label>
                  <div className="selectable-pills">
                    {["Women returning to work", "Career restart"].map((item) => (
                      <button
                        type="button"
                        className={diversityTags.includes(item) ? "selected" : ""}
                        onClick={() => toggleDiversityTag(item)}
                        key={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="diversity-block">
                  <label>Differently-abled candidates</label>
                  <div className="selectable-pills">
                    {[
                      "Any disability",
                      "Blindness",
                      "Low vision",
                      "Hearing impairment",
                      "Speech disability",
                      "Locomotor disability",
                    ].map((item) => (
                      <button
                        type="button"
                        className={diversityTags.includes(item) ? "selected" : ""}
                        onClick={() => toggleDiversityTag(item)}
                        key={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="diversity-block">
                  <label>Defence background personnel</label>
                  <div className="selectable-pills">
                    {[
                      "Any defence background",
                      "Army",
                      "Navy",
                      "Air Force",
                      "Paramilitary forces",
                    ].map((item) => (
                      <button
                        type="button"
                        className={diversityTags.includes(item) ? "selected" : ""}
                        onClick={() => toggleDiversityTag(item)}
                        key={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section
            className={`accordion-section ${openSections.includes("additional") ? "open" : ""}`}
          >
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => toggleSection("additional")}
            >
              <span>
                <b>Additional details</b>
                <small>Candidate age, work type, and availability</small>
              </span>
              <Icon name="chevron" size={17} />
            </button>
            {openSections.includes("additional") && (
              <div className="accordion-body">
                <label className="wide-field">
                  <span>Candidate category</span>
                  <input placeholder="Add candidate category" />
                </label>
                <div className="form-row three">
                  <label>
                    <span>Minimum age</span>
                    <input placeholder="18" />
                  </label>
                  <label>
                    <span>Maximum age</span>
                    <input placeholder="60" />
                  </label>
                  <label>
                    <span>Job type</span>
                    <select>
                      <option>Any job type</option>
                      <option>Full time</option>
                      <option>Contract</option>
                    </select>
                  </label>
                </div>
                <div className="form-row two work-preference-row">
                  <label>
                    <span>Employment preference</span>
                    <select>
                      <option>Any employment type</option>
                      <option>Permanent</option>
                      <option>Contract</option>
                      <option>Freelance</option>
                    </select>
                  </label>
                  <label>
                    <span>Work mode</span>
                    <select>
                      <option>Any work mode</option>
                      <option>Onsite</option>
                      <option>Hybrid</option>
                      <option>Remote</option>
                    </select>
                  </label>
                </div>
                <div className="permit-field">
                  <label>Work authorization</label>
                  <button
                    type="button"
                    className="permit-trigger"
                    onClick={() => setWorkPermitOpen(!workPermitOpen)}
                  >
                    <span>{workPermits.length ? workPermits.join(", ") : "Choose countries"}</span>
                    <Icon name="chevron" size={15} />
                  </button>
                  {workPermitOpen && (
                    <div className="permit-picker">
                      {[
                        "India",
                        "United States",
                        "Australia",
                        "United Kingdom",
                        "UAE",
                        "Singapore",
                        "Canada",
                      ].map((country) => (
                        <label key={country}>
                          <input
                            type="checkbox"
                            checked={workPermits.includes(country)}
                            onChange={() =>
                              setWorkPermits((current) =>
                                current.includes(country)
                                  ? current.filter((item) => item !== country)
                                  : [...current, country],
                              )
                            }
                          />
                          <span>{country}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <section
            className={`accordion-section ${openSections.includes("display") ? "open" : ""}`}
          >
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => toggleSection("display")}
            >
              <span>
                <b>Display and verification</b>
                <small>Profile recency, contact verification, and resume availability</small>
              </span>
              <Icon name="chevron" size={17} />
            </button>
            {openSections.includes("display") && (
              <div className="accordion-body">
                <ChoiceGroup
                  label="Show profiles"
                  values={["All candidates", "New registrations", "Recently modified"]}
                  selected={displayMode}
                  onSelect={setDisplayMode}
                />
                <div className="verification-options">
                  <label>Show only</label>
                  <div>
                    {["Verified phone", "Verified email", "Attached resume"].map((item) => (
                      <label key={item}>
                        <input type="checkbox" /> <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <label className="activity-field">
                  <span>Profile activity</span>
                  <select
                    value={activityPeriod}
                    onChange={(event) => setActivityPeriod(event.target.value)}
                  >
                    <option>Active in 3 days</option>
                    <option>Active in 7 days</option>
                    <option>Active in 15 days</option>
                    <option>Active in 30 days</option>
                    <option>Active in 2 months</option>
                    <option>Active in 3 months</option>
                    <option>Active in 6 months</option>
                  </select>
                </label>
              </div>
            )}
          </section>

          <div className="search-submit-bar">
            <div>
              <span>Profile activity</span>
              <select
                value={activityPeriod}
                onChange={(event) => setActivityPeriod(event.target.value)}
              >
                <option>Active in 3 days</option>
                <option>Active in 7 days</option>
                <option>Active in 15 days</option>
                <option>Active in 30 days</option>
                <option>Active in 2 months</option>
                <option>Active in 3 months</option>
                <option>Active in 6 months</option>
              </select>
            </div>
            <button type="submit">
              <Icon name="search" size={17} /> Search candidates
            </button>
          </div>
        </form>

        <aside className="search-history">
          <section>
            <div className="history-heading">
              <span className="history-icon">
                <Icon name="clock" size={17} />
              </span>
              <div>
                <h2>Recent searches</h2>
                <p>Pick up where you left off</p>
              </div>
            </div>
            {recentSearches.map((search) => (
              <article key={search.title}>
                <strong>{search.title}</strong>
                <span>{search.meta}</span>
                <div>
                  <button
                    onClick={() => {
                      setKeywords([search.title.split(" · ")[0]]);
                      notify("Search criteria filled");
                    }}
                  >
                    Use search
                  </button>
                  <button onClick={() => setSearched(true)}>View profiles</button>
                </div>
              </article>
            ))}
          </section>
          <section className="saved-search-card">
            <div className="history-heading">
              <span className="history-icon green">
                <Icon name="spark" size={17} />
              </span>
              <div>
                <h2>Saved searches</h2>
                <p>Get alerts for new matches</p>
              </div>
            </div>
            <article>
              <strong>Senior Product Designer</strong>
              <span>Figma · SaaS · Bengaluru</span>
              <div className="new-profiles">
                <b>12 new profiles</b>
                <button onClick={() => setSearched(true)}>View</button>
              </div>
            </article>
          </section>
          <div className="search-tip">
            <Icon name="spark" size={18} />
            <div>
              <strong>Search smarter</strong>
              <p>Add 3–5 skills and a location to improve match quality.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const managedJobs = [
  {
    title: "Senior Product Designer",
    location: "Bengaluru · Hybrid",
    type: "Full time",
    applicants: 86,
    newCount: 12,
    shortlisted: 8,
    match: 24,
    status: "Active",
    posted: "2 days ago",
  },
  {
    title: "Frontend Engineer",
    location: "Hyderabad · Remote",
    type: "Full time",
    applicants: 64,
    newCount: 8,
    shortlisted: 5,
    match: 18,
    status: "Active",
    posted: "4 days ago",
  },
  {
    title: "Talent Acquisition Lead",
    location: "Mumbai · Onsite",
    type: "Full time",
    applicants: 41,
    newCount: 3,
    shortlisted: 6,
    match: 11,
    status: "Active",
    posted: "1 week ago",
  },
  {
    title: "Product Marketing Manager",
    location: "Delhi NCR · Hybrid",
    type: "Full time",
    applicants: 29,
    newCount: 0,
    shortlisted: 3,
    match: 7,
    status: "Paused",
    posted: "2 weeks ago",
  },
];

const jobApplicants = [
  {
    name: "Priya Menon",
    initials: "PM",
    role: "Senior Product Designer at Finix",
    meta: "6y 4m · Bengaluru · 30 days notice",
    skills: ["Figma", "Design systems", "B2B SaaS"],
    score: 94,
    stage: "New",
    color: "#e8d7f0",
  },
  {
    name: "Aditya Kapoor",
    initials: "AK",
    role: "Product Designer at Orbit",
    meta: "5y 8m · Pune · Serving notice",
    skills: ["Research", "Prototyping", "Mobile"],
    score: 91,
    stage: "Screening",
    color: "#d4e6ef",
  },
  {
    name: "Meera Iyer",
    initials: "MI",
    role: "UX Lead at Canvas Labs",
    meta: "7y 2m · Hyderabad · Immediate",
    skills: ["UX strategy", "Figma", "Leadership"],
    score: 88,
    stage: "Shortlisted",
    color: "#f1dece",
  },
];

function JobsWorkspace({
  notify,
  createJob,
}: {
  notify: (message: string) => void;
  createJob: () => void;
}) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("All jobs");
  const [applicationTab, setApplicationTab] = useState("All");
  const [candidateStages, setCandidateStages] = useState<Record<string, string>>({});

  function setStage(name: string, stage: string) {
    setCandidateStages((current) => ({ ...current, [name]: stage }));
    notify(`${name} moved to ${stage}`);
  }

  if (selectedJob) {
    return (
      <div className="workspace-content application-workspace">
        <div className="workspace-titlebar application-titlebar">
          <div>
            <button className="back-link" onClick={() => setSelectedJob(null)}>
              ← All jobs
            </button>
            <div className="title-with-status">
              <h1>{selectedJob}</h1>
              <em>Active</em>
            </div>
            <p>Bengaluru · Hybrid · Posted 2 days ago</p>
          </div>
          <div className="job-title-actions">
            <button onClick={() => notify("Share link copied")}>Share job</button>
            <button onClick={() => notify("Job editor opened")}>Edit job</button>
          </div>
        </div>
        <section className="ai-job-insight">
          <span>
            <Icon name="spark" size={20} />
          </span>
          <div>
            <strong>AI hiring brief</strong>
            <p>
              12 high-fit applicants arrived today. Prioritize candidates with design system
              ownership and B2B SaaS experience.
            </p>
          </div>
          <button onClick={() => notify("AI sourcing agent started")}>
            Source more candidates
          </button>
        </section>
        <div className="application-layout">
          <aside className="application-sidebar">
            <h3>Application inbox</h3>
            {[
              "All applications",
              "New and unread",
              "AI recommended",
              "Action pending",
              "Shortlisted",
              "Rejected",
            ].map((item, index) => (
              <button
                className={
                  (applicationTab === "All" && index === 0) || applicationTab === item
                    ? "active"
                    : ""
                }
                onClick={() => setApplicationTab(index === 0 ? "All" : item)}
                key={item}
              >
                <span>{item}</span>
                <b>{[86, 12, 24, 9, 8, 4][index]}</b>
              </button>
            ))}
            <div className="applicant-filter-block">
              <strong>Match score</strong>
              <label>
                <input type="checkbox" /> 90% and above
              </label>
              <label>
                <input type="checkbox" /> 75% – 89%
              </label>
            </div>
            <div className="applicant-filter-block">
              <strong>Availability</strong>
              <label>
                <input type="checkbox" /> Immediate
              </label>
              <label>
                <input type="checkbox" /> Within 30 days
              </label>
            </div>
          </aside>
          <section className="application-main">
            <div className="application-tabs">
              {["All", "New", "Screening", "Shortlisted", "Interview", "Offer"].map((tab) => (
                <button
                  className={applicationTab === tab ? "selected" : ""}
                  onClick={() => setApplicationTab(tab)}
                  key={tab}
                >
                  {tab}
                  <span>
                    {
                      [86, 12, 19, 8, 4, 2][
                        ["All", "New", "Screening", "Shortlisted", "Interview", "Offer"].indexOf(
                          tab,
                        )
                      ]
                    }
                  </span>
                </button>
              ))}
            </div>
            <div className="application-toolbar">
              <label>
                <input type="checkbox" /> Select all
              </label>
              <div>
                <button onClick={() => notify("Bulk shortlist ready")}>Shortlist</button>
                <button onClick={() => notify("Email composer opened")}>Email</button>
                <button onClick={() => notify("More bulk actions opened")}>More</button>
              </div>
              <select>
                <option>Best match</option>
                <option>Most recent</option>
                <option>Experience</option>
              </select>
            </div>
            <div className="applicant-list">
              {jobApplicants
                .filter(
                  (person) =>
                    applicationTab === "All" ||
                    applicationTab === "AI recommended" ||
                    (candidateStages[person.name] || person.stage) === applicationTab,
                )
                .map((person) => (
                  <article className="applicant-card" key={person.name}>
                    <label className="result-check">
                      <input type="checkbox" />
                    </label>
                    <div className="candidate-avatar" style={{ background: person.color }}>
                      {person.initials}
                    </div>
                    <div className="applicant-body">
                      <div className="applicant-name">
                        <h2>{person.name}</h2>
                        <em>
                          <Icon name="spark" size={11} /> {person.score}% match
                        </em>
                      </div>
                      <strong>{person.role}</strong>
                      <p>{person.meta}</p>
                      <div className="skill-list">
                        {person.skills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                      <div className="explain-match">
                        <b>Why this match</b>
                        <span>Strong design systems ownership</span>
                        <span>Relevant SaaS experience</span>
                      </div>
                    </div>
                    <div className="applicant-actions">
                      <button onClick={() => setStage(person.name, "Shortlisted")}>
                        Shortlist
                      </button>
                      <button onClick={() => setStage(person.name, "Maybe")}>Maybe</button>
                      <button className="reject" onClick={() => setStage(person.name, "Rejected")}>
                        Reject
                      </button>
                      <small>{candidateStages[person.name] || person.stage}</small>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-content">
      <div className="workspace-titlebar">
        <div>
          <p className="eyebrow">RECRUITMENT WORKSPACE</p>
          <h1>Jobs and applications</h1>
          <p>Manage roles, responses, and hiring progress in one place.</p>
        </div>
        <button className="create-button" onClick={createJob}>
          <Icon name="plus" size={17} /> Create job
        </button>
      </div>
      <section className="job-stat-grid">
        <article>
          <span className="metric-icon violet">
            <Icon name="briefcase" size={18} />
          </span>
          <div>
            <strong>18</strong>
            <p>Active jobs</p>
          </div>
          <em>+3 this month</em>
        </article>
        <article>
          <span className="metric-icon blue">
            <Icon name="users" size={18} />
          </span>
          <div>
            <strong>220</strong>
            <p>Total applicants</p>
          </div>
          <em>+26 this week</em>
        </article>
        <article>
          <span className="metric-icon orange">
            <Icon name="clock" size={18} />
          </span>
          <div>
            <strong>9</strong>
            <p>Action pending</p>
          </div>
          <em className="warning">Needs review</em>
        </article>
      </section>
      <section className="managed-jobs-panel">
        <div className="managed-jobs-head">
          <div className="job-status-tabs">
            {["All jobs", "Active", "Paused", "Closed"].map((filter) => (
              <button
                className={statusFilter === filter ? "selected" : ""}
                onClick={() => setStatusFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="jobs-search">
            <Icon name="search" size={15} />
            <input placeholder="Search jobs" />
          </div>
        </div>
        <div className="managed-jobs-table">
          <div className="managed-job-row header">
            <span>JOB</span>
            <span>APPLICANTS</span>
            <span>SHORTLISTED</span>
            <span>AI MATCHES</span>
            <span>STATUS</span>
            <span></span>
          </div>
          {managedJobs
            .filter((job) => statusFilter === "All jobs" || job.status === statusFilter)
            .map((job) => (
              <button
                className="managed-job-row"
                onClick={() => setSelectedJob(job.title)}
                key={job.title}
              >
                <span className="managed-job-name">
                  <i>{job.title.charAt(0)}</i>
                  <span>
                    <strong>{job.title}</strong>
                    <small>
                      {job.location} · {job.type}
                    </small>
                  </span>
                </span>
                <span>
                  <b>{job.applicants}</b>
                  {job.newCount > 0 && <em>{job.newCount} new</em>}
                </span>
                <span>
                  <b>{job.shortlisted}</b>
                </span>
                <span className="ai-match-count">
                  <Icon name="spark" size={13} />
                  <b>{job.match}</b>
                </span>
                <span>
                  <em className={`status ${job.status.toLowerCase()}`}>{job.status}</em>
                  <small>{job.posted}</small>
                </span>
                <Icon name="arrow" size={16} />
              </button>
            ))}
        </div>
      </section>
    </div>
  );
}

function OutreachWorkspace({ notify }: { notify: (message: string) => void }) {
  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState("Email + in-app");
  const [generated, setGenerated] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState(
    "Hi {{first_name}},\n\nYour experience in product design and design systems stood out to us. We’re hiring a Senior Product Designer at Northstar and believe your background could be a strong fit.\n\nWould you be open to a quick conversation this week?",
  );

  if (sent) {
    return (
      <div className="workspace-content">
        <div className="outreach-success">
          <span>
            <Icon name="spark" size={28} />
          </span>
          <h1>Campaign approved and queued</h1>
          <p>
            Your invitation will reach 128 matched candidates. The Outreach Agent will track opens
            and responses, but follow-ups require your approval.
          </p>
          <div>
            <article>
              <strong>128</strong>
              <small>Recipients</small>
            </article>
            <article>
              <strong>3</strong>
              <small>Channels</small>
            </article>
            <article>
              <strong>Jun 24</strong>
              <small>Starts today</small>
            </article>
          </div>
          <button
            onClick={() => {
              setSent(false);
              setStep(1);
            }}
          >
            Create another campaign
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-content outreach-workspace">
      <div className="workspace-titlebar">
        <div>
          <p className="eyebrow">AI OUTREACH AGENT</p>
          <h1>Create an outreach campaign</h1>
          <p>Personalize candidate invitations with recruiter-controlled AI.</p>
        </div>
        <button className="secondary-button" onClick={() => notify("Draft saved")}>
          Save draft
        </button>
      </div>
      <div className="campaign-stepper">
        {["Audience", "Compose", "Review & approve"].map((label, index) => (
          <div className={step >= index + 1 ? "active" : ""} key={label}>
            <span>{step > index + 1 ? "✓" : index + 1}</span>
            <b>{label}</b>
          </div>
        ))}
      </div>
      <div className="campaign-layout">
        <section className="campaign-card">
          {step === 1 && (
            <div className="campaign-step">
              <div className="campaign-section-title">
                <span>
                  <Icon name="users" size={18} />
                </span>
                <div>
                  <h2>Choose your audience</h2>
                  <p>Define who the sourcing agent should invite.</p>
                </div>
              </div>
              <label className="campaign-field">
                <span>Job or talent pool</span>
                <select defaultValue="Senior Product Designer">
                  <option>Senior Product Designer</option>
                  <option>Frontend Engineer</option>
                  <option>Design leadership pool</option>
                </select>
              </label>
              <div className="audience-summary">
                <div>
                  <Icon name="spark" size={19} />
                  <span>
                    <strong>128 candidates found</strong>
                    <small>Based on job fit, availability, and engagement</small>
                  </span>
                </div>
                <b>87% average match</b>
              </div>
              <div className="campaign-grid">
                <label className="campaign-field">
                  <span>Experience</span>
                  <div className="dual-input">
                    <input defaultValue="4 years" />
                    <input defaultValue="8 years" />
                  </div>
                </label>
                <label className="campaign-field">
                  <span>Location</span>
                  <input defaultValue="Bengaluru, Hyderabad, Remote" />
                </label>
                <label className="campaign-field">
                  <span>Salary range</span>
                  <div className="dual-input">
                    <input defaultValue="₹18L" />
                    <input defaultValue="₹30L" />
                  </div>
                </label>
                <label className="campaign-field">
                  <span>Notice period</span>
                  <select>
                    <option>Up to 60 days</option>
                    <option>Immediate</option>
                    <option>Up to 30 days</option>
                  </select>
                </label>
              </div>
              <label className="check-line campaign-check">
                <input type="checkbox" defaultChecked />
                <span>Include candidates open to relocation</span>
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="campaign-step">
              <div className="campaign-section-title">
                <span>
                  <Icon name="spark" size={18} />
                </span>
                <div>
                  <h2>Compose invitation</h2>
                  <p>Use AI to personalize the message while keeping full control.</p>
                </div>
              </div>
              <div className="ai-generate-bar">
                <div>
                  <Icon name="spark" size={18} />
                  <span>
                    <strong>Outreach Agent</strong>
                    <small>Generate an invitation from the job and candidate context.</small>
                  </span>
                </div>
                <button
                  onClick={() => {
                    setGenerated(true);
                    setMessage(
                      "Hi {{first_name}},\n\nI was impressed by your work in {{top_skill}} at {{current_company}}. We’re building a high-impact design team at Northstar, and your experience aligns strongly with our Senior Product Designer role.\n\nWould you be open to a 20-minute conversation? I’d be happy to share more about the team and the problems we’re solving.",
                    );
                  }}
                >
                  {generated ? "Regenerate" : "Generate with AI"}
                </button>
              </div>
              <label className="campaign-field">
                <span>Campaign title</span>
                <input defaultValue="Senior Product Designer · June outreach" />
              </label>
              <label className="campaign-field">
                <span>Subject</span>
                <input defaultValue="A design leadership opportunity at Northstar" />
              </label>
              <label className="campaign-field">
                <span>Message</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={9}
                />
              </label>
              <div className="personalization-chips">
                <span>Insert variable:</span>
                {["First name", "Current company", "Top skill", "Job title"].map((item) => (
                  <button
                    onClick={() =>
                      setMessage(`${message} {{${item.toLowerCase().replace(" ", "_")}}}`)
                    }
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="campaign-step review-step">
              <div className="campaign-section-title">
                <span>
                  <Icon name="spark" size={18} />
                </span>
                <div>
                  <h2>Review and approve</h2>
                  <p>No message is sent until you approve this campaign.</p>
                </div>
              </div>
              <div className="review-audience">
                <div>
                  <span>Audience</span>
                  <strong>128 matched candidates</strong>
                </div>
                <div>
                  <span>Role</span>
                  <strong>Senior Product Designer</strong>
                </div>
                <div>
                  <span>Estimated response</span>
                  <strong>18–24%</strong>
                </div>
              </div>
              <div className="message-preview">
                <span>Preview for Priya</span>
                <h3>A design leadership opportunity at Northstar</h3>
                <p>
                  {message
                    .replaceAll("{{first_name}}", "Priya")
                    .replaceAll("{{top_skill}}", "design systems")
                    .replaceAll("{{current_company}}", "Finix")
                    .replaceAll("{{job_title}}", "Senior Product Designer")}
                </p>
              </div>
              <div className="agent-permission">
                <Icon name="settings" size={18} />
                <div>
                  <strong>Agent permissions</strong>
                  <p>
                    Track delivery and responses. Draft one follow-up after 4 days for your
                    approval.
                  </p>
                </div>
                <button onClick={() => notify("Agent permissions opened")}>Edit</button>
              </div>
            </div>
          )}
          <div className="campaign-footer">
            <button disabled={step === 1} onClick={() => setStep(step - 1)}>
              Back
            </button>
            {step < 3 ? (
              <button className="primary" onClick={() => setStep(step + 1)}>
                Continue <Icon name="arrow" size={15} />
              </button>
            ) : (
              <button className="primary" onClick={() => setSent(true)}>
                Approve and send
              </button>
            )}
          </div>
        </section>
        <aside className="campaign-aside">
          <section>
            <h3>Campaign summary</h3>
            <div>
              <span>Recipients</span>
              <b>128</b>
            </div>
            <div>
              <span>Available credits</span>
              <b>1,240</b>
            </div>
            <div>
              <span>Credits used</span>
              <b>128</b>
            </div>
          </section>
          <section>
            <h3>Delivery channels</h3>
            {["Email + in-app", "WhatsApp", "Email only"].map((item) => (
              <label className={channel === item ? "selected" : ""} key={item}>
                <input
                  type="radio"
                  name="channel"
                  checked={channel === item}
                  onChange={() => setChannel(item)}
                />
                <span>
                  <b>{item}</b>
                  <small>
                    {item === "WhatsApp" ? "Requires approved template" : "Recommended"}
                  </small>
                </span>
              </label>
            ))}
          </section>
          <div className="search-tip">
            <Icon name="spark" size={18} />
            <div>
              <strong>Consent-aware outreach</strong>
              <p>Only candidates who permit recruiter communication are included.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const recommendedJobs = [
  {
    company: "Nexora Labs",
    role: "Senior Product Designer",
    location: "Bengaluru · Hybrid",
    salary: "₹26L – ₹34L",
    match: 94,
    color: "#6255d9",
    dept: "Design",
  },
  {
    company: "Kiteworks",
    role: "Lead UX Designer",
    location: "Remote · India",
    salary: "₹28L – ₹38L",
    match: 91,
    color: "#1586b8",
    dept: "Design",
  },
  {
    company: "OrbitPay",
    role: "Product Design Lead",
    location: "Mumbai · Hybrid",
    salary: "₹30L – ₹42L",
    match: 88,
    color: "#ef795d",
    dept: "Design",
  },
  {
    company: "Razorpay",
    role: "Staff Frontend Engineer",
    location: "Bengaluru · Hybrid",
    salary: "₹38L – ₹52L",
    match: 96,
    color: "#0284c7",
    dept: "Engineering",
  },
  {
    company: "Swiggy",
    role: "Senior React Developer",
    location: "Bengaluru · Onsite",
    salary: "₹28L – ₹36L",
    match: 92,
    color: "#ea580c",
    dept: "Engineering",
  },
  {
    company: "PhonePe",
    role: "Principal Product Manager",
    location: "Bengaluru · Hybrid",
    salary: "₹45L – ₹60L",
    match: 89,
    color: "#7c3aed",
    dept: "Product",
  },
  {
    company: "Zomato",
    role: "AI & Machine Learning Engineer",
    location: "Gurugram · Hybrid",
    salary: "₹34L – ₹48L",
    match: 93,
    color: "#dc2626",
    dept: "Data & AI",
  },
  {
    company: "Cred",
    role: "Design Systems Engineer",
    location: "Bengaluru · Hybrid",
    salary: "₹32L – ₹44L",
    match: 95,
    color: "#0f172a",
    dept: "Engineering",
  },
];

interface NavItem {
  label: string;
  detail: string;
  target: string;
  icon: IconName;
}

interface NavGroup {
  label: string;
  activeTargets: string[];
  items: NavItem[];
}

function getTopNavGroups(role: UserRole): NavGroup[] {
  switch (role) {
    case "Candidate":
      return [
        {
          label: "My Workspace",
          activeTargets: ["Discover", "Jobs", "Applications", "Interviews", "Saved"],
          items: [
            {
              label: "Candidate Home",
              detail: "Personalized matches & AI job studio",
              target: "Discover",
              icon: "spark" as IconName,
            },
            {
              label: "Search Jobs",
              detail: "Explore verified opportunities & openings",
              target: "Jobs",
              icon: "briefcase" as IconName,
            },
            {
              label: "My Applications",
              detail: "Track status of submitted applications",
              target: "Applications",
              icon: "briefcase" as IconName,
            },
            {
              label: "Upcoming Interviews",
              detail: "Preparation guide & scheduled rounds",
              target: "Interviews",
              icon: "calendar" as IconName,
            },
            {
              label: "Saved Roles",
              detail: "View bookmarked jobs and apply",
              target: "Saved",
              icon: "plus" as IconName,
            },
          ],
        },
        {
          label: "Career Tools",
          activeTargets: ["Studio", "Interviews", "Discover"],
          items: [
            {
              label: "AI Application Studio",
              detail: "Tailor your resume for any role in 1 click",
              target: "Studio",
              icon: "spark" as IconName,
            },
            {
              label: "Interview Prep Guide",
              detail: "Review case study and prototype checklist",
              target: "Interviews",
              icon: "calendar" as IconName,
            },
            {
              label: "Salary & Skill Insights",
              detail: "See skill demand and market ranges",
              target: "Discover",
              icon: "chart" as IconName,
            },
          ],
        },
        {
          label: "Profile & Settings",
          activeTargets: ["Profile", "Settings", "Notifications"],
          items: [
            {
              label: "Profile & Resume",
              detail: "Update skills, experience and bio",
              target: "Profile",
              icon: "users" as IconName,
            },
            {
              label: "Notification Center",
              detail: "Recruiter views, alerts and invitations",
              target: "Notifications",
              icon: "bell" as IconName,
            },
            {
              label: "Account Settings",
              detail: "Privacy, security and job preferences",
              target: "Settings",
              icon: "settings" as IconName,
            },
          ],
        },
      ];

    case "Employee":
      return [
        {
          label: "Career Hub",
          activeTargets: ["Discover", "Jobs", "Applications", "Interviews", "Saved"],
          items: [
            {
              label: "Employee Home",
              detail: "Market worth & portfolio benchmarks",
              target: "Discover",
              icon: "grid" as IconName,
            },
            {
              label: "Internal Mobility",
              detail: "Explore internal openings and career paths",
              target: "Jobs",
              icon: "briefcase" as IconName,
            },
            {
              label: "Applications & Referrals",
              detail: "Track internal transfers and applications",
              target: "Applications",
              icon: "briefcase" as IconName,
            },
            {
              label: "Portfolio Reviews",
              detail: "Scheduled interviews & review prep",
              target: "Interviews",
              icon: "calendar" as IconName,
            },
            {
              label: "Saved Opportunities",
              detail: "Review saved internal and partner roles",
              target: "Saved",
              icon: "plus" as IconName,
            },
          ],
        },
        {
          label: "Growth & Tools",
          activeTargets: ["Discover", "Studio", "Interviews"],
          items: [
            {
              label: "Market Worth Benchmark",
              detail: "Evaluate your skills vs market ranges",
              target: "Discover",
              icon: "chart" as IconName,
            },
            {
              label: "Application Studio",
              detail: "Tailor resume and portfolio with AI",
              target: "Studio",
              icon: "spark" as IconName,
            },
            {
              label: "Preparation Guide",
              detail: "Checklist for upcoming portfolio review",
              target: "Interviews",
              icon: "calendar" as IconName,
            },
          ],
        },
        {
          label: "Profile & Settings",
          activeTargets: ["Profile", "Settings", "Notifications"],
          items: [
            {
              label: "Employee Profile",
              detail: "Update role, skills, and portfolio",
              target: "Profile",
              icon: "users" as IconName,
            },
            {
              label: "Notification Center",
              detail: "Company hiring alerts and profile views",
              target: "Notifications",
              icon: "bell" as IconName,
            },
            {
              label: "Career Preferences",
              detail: "Growth goals, relocation and privacy",
              target: "Settings",
              icon: "settings" as IconName,
            },
          ],
        },
      ];

    case "HR":
      return [
        {
          label: "Recruitment Workspace",
          activeTargets: ["Discover", "Jobs", "Candidates", "Interviews", "Analytics", "Outreach"],
          items: [
            {
              label: "Hiring Overview",
              detail: "Requisitions, applicants & hiring KPIs",
              target: "Discover",
              icon: "grid" as IconName,
            },
            {
              label: "Job Postings & ATS",
              detail: "Manage postings, pipelines & applications",
              target: "Jobs",
              icon: "briefcase" as IconName,
            },
            {
              label: "Resdex Candidate Search",
              detail: "Search talent pool with filters & resumes",
              target: "Candidates",
              icon: "users" as IconName,
            },
            {
              label: "Interview Management",
              detail: "Schedule rounds & scorecard reviews",
              target: "Interviews",
              icon: "calendar" as IconName,
            },
            {
              label: "Hiring Analytics",
              detail: "Hiring funnel, conversion & telemetry",
              target: "Analytics",
              icon: "chart" as IconName,
            },
            {
              label: "NVite Outreach",
              detail: "AI personalized candidate campaigns",
              target: "Outreach",
              icon: "message" as IconName,
            },
          ],
        },
        {
          label: "Talent Operations",
          activeTargets: ["Jobs", "Interviews", "Outreach"],
          items: [
            {
              label: "Post a New Job",
              detail: "Publish openings across job boards",
              target: "CreateJob",
              icon: "plus" as IconName,
            },
            {
              label: "Search Resdex Database",
              detail: "Find matching candidates in database",
              target: "Candidates",
              icon: "search" as IconName,
            },
            {
              label: "Send NVite Outreach",
              detail: "Engage top passive candidates",
              target: "Outreach",
              icon: "message" as IconName,
            },
            {
              label: "Scorecard Reviews",
              detail: "Track interviewer feedback and debriefs",
              target: "Interviews",
              icon: "calendar" as IconName,
            },
          ],
        },
        {
          label: "Company & Settings",
          activeTargets: ["Settings", "Analytics"],
          items: [
            {
              label: "Company Profile",
              detail: "Branding, perks and locations",
              target: "Discover",
              icon: "briefcase" as IconName,
            },
            {
              label: "Team & Access",
              detail: "Recruiter roles, seats and permissions",
              target: "Settings",
              icon: "users" as IconName,
            },
            {
              label: "Hiring Analytics",
              detail: "Time-to-hire and pipeline velocity",
              target: "Analytics",
              icon: "chart" as IconName,
            },
            {
              label: "Account Settings",
              detail: "ATS integrations, billing and alerts",
              target: "Settings",
              icon: "settings" as IconName,
            },
          ],
        },
      ];

    case "Admin":
      return [
        {
          label: "Platform Administration",
          activeTargets: ["Discover", "Users", "Telemetry", "Security", "Audit"],
          items: [
            {
              label: "Admin Overview",
              detail: "System telemetry, uptime & license quotas",
              target: "Discover",
              icon: "shield" as IconName,
            },
            {
              label: "User Directory & Roles",
              detail: "Manage accounts & assign user categories",
              target: "Discover",
              icon: "users" as IconName,
            },
            {
              label: "System Diagnostics",
              detail: "API health, latency & microservices",
              target: "Discover",
              icon: "chart" as IconName,
            },
            {
              label: "Audit Trail",
              detail: "Immutable platform event logs",
              target: "Discover",
              icon: "clock" as IconName,
            },
          ],
        },
        {
          label: "Governance & IAM",
          activeTargets: ["Discover", "Settings"],
          items: [
            {
              label: "Security & IAM Policies",
              detail: "Configure authentication & RBAC rules",
              target: "Discover",
              icon: "shield" as IconName,
            },
            {
              label: "Quota & Recruiter Seats",
              detail: "Allocate tier subscriptions and seats",
              target: "Discover",
              icon: "briefcase" as IconName,
            },
            {
              label: "Run Diagnostics",
              detail: "Verify all 8 cloud microservices",
              target: "Discover",
              icon: "spark" as IconName,
            },
          ],
        },
        {
          label: "Settings",
          activeTargets: ["Settings"],
          items: [
            {
              label: "Global Platform Settings",
              detail: "Feature toggles & environment config",
              target: "Settings",
              icon: "settings" as IconName,
            },
            {
              label: "System Alerts",
              detail: "Realtime infrastructure notifications",
              target: "Notifications",
              icon: "bell" as IconName,
            },
            {
              label: "Superadmin Profile",
              detail: "Credentials and security keys",
              target: "Settings",
              icon: "settings" as IconName,
            },
          ],
        },
      ];
  }
}

export type UserRole = "Employee" | "HR" | "Candidate" | "Admin";

interface UserProfileData {
  name: string;
  email: string;
  title: string;
  company: string;
  location: string;
  initials: string;
  completion: number;
  bio: string;
  skills: string[];
}

const INITIAL_PROFILES: Record<UserRole, UserProfileData> = {
  Employee: {
    name: "Priya Sharma",
    email: "priya.sharma@razorpay.com",
    title: "Senior Product Designer",
    company: "Razorpay",
    location: "Bengaluru, India",
    initials: "PS",
    completion: 82,
    bio: "Senior product designer specializing in fintech checkout flows, responsive design systems, and rapid prototyping.",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Fintech UX"],
  },
  HR: {
    name: "Sheela Nancy",
    email: "sheela.nancy@ispatialtec.com",
    title: "Head of Talent Acquisition",
    company: "ISpatial Techno Solutions",
    location: "Hyderabad, India",
    initials: "SN",
    completion: 96,
    bio: "Hiring lead driving tech, product and engineering recruitment across India and North America.",
    skills: ["Technical Recruiting", "Executive Search", "Pipeline Ops", "Resdex Sourcing"],
  },
  Candidate: {
    name: "Rohan Verma",
    email: "rohan.verma@gmail.com",
    title: "Senior Frontend Engineer",
    company: "Ex-Flipkart",
    location: "Bengaluru, India",
    initials: "RV",
    completion: 88,
    bio: "Frontend engineer with 5+ years building scalable React, TypeScript, and modern web applications.",
    skills: ["React 19", "TypeScript", "Tailwind CSS", "Next.js", "Web Performance"],
  },
  Admin: {
    name: "Vikram Malhotra",
    email: "admin@talentnetwork.internal",
    title: "Platform Superadmin",
    company: "Talent Network Inc.",
    location: "Global / Remote",
    initials: "AD",
    completion: 100,
    bio: "Managing enterprise identity, RBAC governance, quota allocations, and compliance audit logs.",
    skills: ["System Administration", "RBAC Security", "Audit Telemetry", "License Governance"],
  },
};

const ROLE_OPTIONS = [
  {
    id: "Employee" as const,
    label: "Employee",
    category: "Career Hub",
    badge: "Employee Workspace",
    desc: "Personal career growth, market worth, portfolio review & matches",
    color: "#1d4ed8",
    bg: "#eff6ff",
    icon: "users" as IconName,
  },
  {
    id: "HR" as const,
    label: "HR / Employer",
    category: "Recruiter Portal",
    badge: "HR / Recruiter",
    desc: "Hiring pipeline, job requisitions, CV access & candidate search",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: "briefcase" as IconName,
  },
  {
    id: "Candidate" as const,
    label: "Candidate",
    category: "Jobseeker Portal",
    badge: "Candidate",
    desc: "Job search, AI Application Studio, 1-click apply & tracker",
    color: "#059669",
    bg: "#ecfdf5",
    icon: "spark" as IconName,
  },
  {
    id: "Admin" as const,
    label: "Admin",
    category: "System Console",
    badge: "Super Admin",
    desc: "User management, role assignments, quota & security audit",
    color: "#dc2626",
    bg: "#fef2f2",
    icon: "shield" as IconName,
  },
];

interface CandidateDashboardProps {
  notify: (message: string) => void;
  onOpenAppStudio: () => void;
  onOpenInterviewGuide: () => void;
  onOpenRoleDetails: (role: any) => void;
  onOpenProfileEditor: () => void;
  onOpenAllRoles: () => void;
  onOpenQuickLink: (type: string) => void;
  profile: UserProfileData;
  savedJobs: string[];
  toggleSaved: (role: string) => void;
}

function CandidateDashboard({
  notify,
  onOpenAppStudio,
  onOpenInterviewGuide,
  onOpenRoleDetails,
  onOpenProfileEditor,
  onOpenAllRoles,
  onOpenQuickLink,
  profile,
  savedJobs,
  toggleSaved,
}: CandidateDashboardProps) {
  return (
    <>
      <div className="product-banner">
        <span>
          <Icon name="spark" size={18} /> New
        </span>
        <strong>Application Studio: tailor your resume to any job in one click</strong>
        <button onClick={onOpenAppStudio}>
          Try it now <Icon name="arrow" size={16} />
        </button>
      </div>
      <div className="candidate-home">
        <aside className="candidate-home-rail">
          <section className="profile-completion-card">
            <div className="completion-ring">
              <span>{profile.initials}</span>
            </div>
            <b>{profile.completion}% complete</b>
            <h2>{profile.name}</h2>
            <p>{profile.title}</p>
            <small>{profile.company} · {profile.location.split(",")[0]}</small>
            <em>Last updated 2 days ago</em>
            <button onClick={onOpenProfileEditor}>Complete profile</button>
          </section>
          <section className="candidate-quick-links">
            {[
              ["briefcase", "My applications", "5"],
              ["calendar", "Interviews", "2"],
              ["message", "Saved jobs", String(savedJobs.length > 0 ? savedJobs.length : 7)],
              ["users", "Profile views", "12"],
            ].map(([icon, label, count]) => (
              <button onClick={() => onOpenQuickLink(label)} key={label}>
                <Icon name={icon as IconName} size={17} />
                <span>{label}</span>
                <b>{count}</b>
                <Icon name="arrow" size={14} />
              </button>
            ))}
          </section>
        </aside>

        <div className="candidate-home-main">
          <section className="market-worth-card">
            <h1>
              What’s your <span>market worth?</span>
            </h1>
            <p>See how your skills rank against designers in Bengaluru.</p>
            <div>
              <article>
                <strong>248</strong>
                <small>open roles</small>
              </article>
              <article>
                <strong>₹31.5L</strong>
                <small>market midpoint</small>
              </article>
              <article>
                <strong>Top 26%</strong>
                <small>of candidates</small>
              </article>
              <article>
                <strong>+31%</strong>
                <small>AI design demand</small>
              </article>
            </div>
          </section>

          <section className="next-interview-card">
            <div className="interview-copy">
              <span className="tomorrow-label">Tomorrow</span>
              <h2>Your portfolio review is tomorrow</h2>
              <p>
                <Icon name="calendar" size={18} /> 10:00 AM · 60 minutes · Google Meet
              </p>
              <p>
                <Icon name="briefcase" size={18} /> Nexora Labs · Senior Product Designer
              </p>
              <button onClick={onOpenInterviewGuide}>
                View preparation guide
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1758876017801-f5a892ee460a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800"
              alt="Professional preparing for an interview on a laptop"
            />
          </section>

          <section className="picked-jobs-card">
            <div className="picked-jobs-heading">
              <div>
                <h2>Jobs picked for you</h2>
                <p>Based on your skills, salary range and location</p>
              </div>
              <button onClick={onOpenAllRoles}>View all</button>
            </div>
            <div className="picked-jobs-grid">
              {recommendedJobs.map((job) => (
                <article key={job.role}>
                  <div className="job-card-top">
                    <i style={{ background: job.color }}>{job.company.charAt(0)}</i>
                    <em>
                      <Icon name="spark" size={12} /> {job.match}% match
                    </em>
                  </div>
                  <span>{job.company}</span>
                  <h3>{job.role}</h3>
                  <p>{job.location}</p>
                  <strong>{job.salary}</strong>
                  <div>
                    <button onClick={() => onOpenRoleDetails(job)}>View role</button>
                    <button
                      className={savedJobs.includes(job.role) ? "saved" : ""}
                      onClick={() => toggleSaved(job.role)}
                      aria-label={`Save ${job.role}`}
                    >
                      ♡
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   Role-Specific Views (HR, Candidate, Admin)
   ========================================================================== */

function HrDashboardView({
  notify,
  onCreateJob,
  onViewApplicants,
  onSearchResdex,
  profile,
  jobs,
}: {
  notify: (msg: string) => void;
  onCreateJob: () => void;
  onViewApplicants: (job: any) => void;
  onSearchResdex: () => void;
  profile: UserProfileData;
  jobs: typeof initialJobs;
}) {
  return (
    <>
      <div className="product-banner" style={{ background: "linear-gradient(105deg, #4c1d95, #2563eb 70%, #0d9488)" }}>
        <span>
          <Icon name="spark" size={18} /> Recruiter Command Center
        </span>
        <strong>AI candidate matching is actively screening 14 new applicants across your requisitions</strong>
        <button onClick={() => notify("AI Screening complete: 8 top candidates shortlisted")}>
          Run AI Match <Icon name="arrow" size={16} />
        </button>
      </div>

      <div className="candidate-home">
        <aside className="candidate-home-rail">
          <section className="profile-completion-card" style={{ borderColor: "#ddd6fe" }}>
            <div className="completion-ring" style={{ borderColor: "#7c3aed" }}>
              <span style={{ color: "#7c3aed", background: "#f5f3ff" }}>{profile.initials}</span>
            </div>
            <b style={{ color: "#7c3aed" }}>Recruiter ID #123908</b>
            <h2>{profile.name}</h2>
            <p>{profile.title}</p>
            <small>{profile.company} · Hyderabad</small>
            <div style={{ marginTop: "14px", width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
              <button 
                onClick={onCreateJob}
                style={{ width: "100%", background: "#7c3aed", color: "white", padding: "10px", borderRadius: "10px", fontWeight: "700" }}
              >
                + Post a New Job
              </button>
              <button 
                onClick={onSearchResdex}
                style={{ width: "100%", background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ddd6fe", padding: "10px", borderRadius: "10px", fontWeight: "700" }}
              >
                Search Resdex CVs
              </button>
            </div>
          </section>

          <section className="candidate-quick-links">
            <div style={{ padding: "12px 16px 6px", fontSize: "11px", fontWeight: "800", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Quota & Usage
            </div>
            <div className="hr-quota-card" style={{ margin: "0 10px 10px" }}>
              <div className="hr-quota-card-top">
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>CV Access</span>
                <strong style={{ fontSize: "13px", color: "#16a34a" }}>1,772 left</strong>
              </div>
              <div className="hr-quota-bar">
                <div className="hr-quota-bar-fill" style={{ width: "56%", background: "#2563eb" }} />
              </div>
              <small style={{ fontSize: "11px", color: "#94a3b8" }}>2,228 / 4,000 used</small>
            </div>

            <div className="hr-quota-card" style={{ margin: "0 10px 14px" }}>
              <div className="hr-quota-card-top">
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>NVite Credits</span>
                <strong style={{ fontSize: "13px", color: "#7c3aed" }}>13,352 left</strong>
              </div>
              <div className="hr-quota-bar">
                <div className="hr-quota-bar-fill" style={{ width: "58%", background: "#7c3aed" }} />
              </div>
              <small style={{ fontSize: "11px", color: "#94a3b8" }}>18,648 / 32,000 used</small>
            </div>
          </section>
        </aside>

        <div className="candidate-home-main">
          <section className="metrics-grid" aria-label="Recruitment metrics" style={{ margin: 0 }}>
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon violet">
                  <Icon name="briefcase" size={19} />
                </span>
                <span className="trend up">↑ 8.4%</span>
              </div>
              <span>Open roles</span>
              <strong>{jobs.length}</strong>
              <small>4 closing this week</small>
            </article>
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon blue">
                  <Icon name="users" size={19} />
                </span>
                <span className="trend up">↑ 12.6%</span>
              </div>
              <span>Pipeline candidates</span>
              <strong>284</strong>
              <small>32 new today</small>
            </article>
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon orange">
                  <Icon name="calendar" size={19} />
                </span>
                <span className="trend">Today</span>
              </div>
              <span>Interviews</span>
              <strong>5</strong>
              <small>Next: 10:30 AM</small>
            </article>
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon green">
                  <Icon name="chart" size={19} />
                </span>
                <span className="trend up">↑ 3.2%</span>
              </div>
              <span>Offer acceptance</span>
              <strong>84%</strong>
              <small>Above industry avg</small>
            </article>
          </section>

          <section className="panel roles-panel" style={{ marginTop: "24px" }}>
            <div className="panel-heading roles-heading">
              <div>
                <h2>Active Job Postings & Requisitions</h2>
                <p>Track candidate pipelines, screening status, and view applicant pools</p>
              </div>
              <button 
                className="btn-primary" 
                onClick={onCreateJob}
                style={{ background: "#7c3aed" }}
              >
                <Icon name="plus" size={16} /> Post a Job
              </button>
            </div>
            <div className="role-table">
              <div className="role-head">
                <span>ROLE</span>
                <span>APPLICANTS</span>
                <span>POSTED</span>
                <span>STATUS</span>
                <span>ACTIONS</span>
              </div>
              {jobs.map((job) => (
                <div className="role-row" key={job.role}>
                  <span className="role-name">
                    <i style={{ background: job.color }}>{job.role.charAt(0)}</i>
                    <span>
                      <strong>{job.role}</strong>
                      <small>{job.dept}</small>
                    </span>
                  </span>
                  <span className="candidate-count">
                    <b>{job.candidates + 14}</b>
                    <span className="mini-avatars">
                      <i>A</i>
                      <i>M</i>
                      <i>+</i>
                    </span>
                  </span>
                  <span>{job.days}</span>
                  <span>
                    <em className={`status ${job.status.toLowerCase()}`}>{job.status}</em>
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button 
                      className="btn-secondary" 
                      style={{ height: "34px", padding: "0 12px", fontSize: "12px", color: "#7c3aed", borderColor: "#ddd6fe" }}
                      onClick={() => onViewApplicants(job)}
                    >
                      View Applicants
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function CandidatePortalView({
  notify,
  onOpenAppStudio,
  onOpenRoleDetails,
  onOpenInterviewGuide,
  onOpenProfileEditor,
  onOpenAllRoles,
  onOpenQuickLink,
  profile,
  savedJobs,
  toggleSaved,
}: {
  notify: (msg: string) => void;
  onOpenAppStudio: () => void;
  onOpenRoleDetails: (job: any) => void;
  onOpenInterviewGuide: () => void;
  onOpenProfileEditor: () => void;
  onOpenAllRoles: () => void;
  onOpenQuickLink: (type: string) => void;
  profile: UserProfileData;
  savedJobs: string[];
  toggleSaved: (role: string) => void;
}) {
  return (
    <>
      <div className="product-banner" style={{ background: "linear-gradient(105deg, #065f46, #0284c7 65%, #1e40af)" }}>
        <span>
          <Icon name="spark" size={18} /> Jobseeker AI Studio
        </span>
        <strong>Match your skills with 1,200+ verified engineering and design openings</strong>
        <button onClick={onOpenAppStudio}>
          Tailor Resume Now <Icon name="arrow" size={16} />
        </button>
      </div>

      <div className="candidate-home">
        <aside className="candidate-home-rail">
          <section className="profile-completion-card" style={{ borderColor: "#a7f3d0" }}>
            <div className="completion-ring" style={{ borderColor: "#059669" }}>
              <span style={{ color: "#059669", background: "#ecfdf5" }}>{profile.initials}</span>
            </div>
            <b style={{ color: "#059669" }}>88% Profile Strength</b>
            <h2>{profile.name}</h2>
            <p>{profile.title}</p>
            <small>{profile.location}</small>
            <em>Open to Remote & Hybrid</em>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", marginTop: "12px" }}>
              <button 
                onClick={onOpenProfileEditor} 
                style={{ width: "100%", background: "#059669", color: "white", padding: "10px", borderRadius: "10px", fontWeight: "700" }}
              >
                Edit Profile
              </button>
              <button 
                onClick={onOpenAppStudio} 
                style={{ width: "100%", background: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0", padding: "8px", borderRadius: "10px", fontWeight: "600", fontSize: "13px" }}
              >
                Tailor Resume
              </button>
            </div>
          </section>

          <section className="candidate-quick-links">
            <div style={{ padding: "12px 16px 6px", fontSize: "11px", fontWeight: "800", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Application Tracker
            </div>
            {[
              ["briefcase", "Submitted Applications", "5"],
              ["spark", "AI Tailored Matches", "18"],
              ["calendar", "Upcoming Interviews", "1"],
              ["chart", "Profile Views This Week", "34"],
            ].map(([icon, label, count]) => (
              <button 
                onClick={() => {
                  if (label === "Submitted Applications") onOpenQuickLink("My applications");
                  else if (label === "Upcoming Interviews") onOpenQuickLink("Interviews");
                  else if (label === "AI Tailored Matches") onOpenAllRoles();
                  else if (label === "Profile Views This Week") onOpenQuickLink("Profile views");
                  else notify(`${label} view opened`);
                }} 
                key={label}
              >
                <Icon name={icon as IconName} size={17} />
                <span>{label}</span>
                <b>{count}</b>
                <Icon name="arrow" size={14} />
              </button>
            ))}
          </section>
        </aside>

        <div className="candidate-home-main">
          <section className="next-interview-card" style={{ marginBottom: "24px" }}>
            <div className="interview-copy">
              <span className="tomorrow-label" style={{ background: "#059669" }}>Scheduled Interview</span>
              <h2>Technical Screen with Razorpay</h2>
              <p>
                <Icon name="calendar" size={18} /> Tomorrow at 2:00 PM · 45 mins · Google Meet
              </p>
              <p>
                <Icon name="briefcase" size={18} /> Senior Frontend Engineer · Platform UX
              </p>
              <button onClick={onOpenInterviewGuide} style={{ background: "#059669" }}>
                View Prep Checklist & Notes
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1758876017801-f5a892ee460a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800"
              alt="Candidate preparing for interview"
            />
          </section>

          <section className="picked-jobs-card">
            <div className="picked-jobs-heading">
              <div>
                <h2>Verified Opportunities for You</h2>
                <p>Curated roles matching your React, TypeScript, and design system background</p>
              </div>
              <button onClick={onOpenAllRoles}>View all</button>
            </div>
            <div className="picked-jobs-grid">
              {recommendedJobs.map((job) => (
                <article key={job.role}>
                  <div className="job-card-top">
                    <i style={{ background: job.color }}>{job.company.charAt(0)}</i>
                    <em>
                      <Icon name="spark" size={12} /> {job.match}% match
                    </em>
                  </div>
                  <span>{job.company}</span>
                  <h3>{job.role}</h3>
                  <p>{job.location}</p>
                  <strong>{job.salary}</strong>
                  <div>
                    <button onClick={() => onOpenRoleDetails(job)}>Quick Apply</button>
                    <button
                      className={savedJobs.includes(job.role) ? "saved" : ""}
                      onClick={() => toggleSaved(job.role)}
                      aria-label={`Save ${job.role}`}
                    >
                      ♡
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function CandidateJobsView({
  notify,
  onOpenRoleDetails,
  savedJobs,
  toggleSaved,
  onOpenAppStudio,
  role = "Candidate",
}: {
  notify: (msg: string) => void;
  onOpenRoleDetails: (job: any) => void;
  savedJobs: string[];
  toggleSaved: (role: string) => void;
  onOpenAppStudio: () => void;
  role?: UserRole;
}) {
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const departments = ["All", "Design", "Engineering", "Data & AI", "Product"];

  const filteredJobs = recommendedJobs.filter((job) => {
    const matchDept =
      selectedDept === "All" ||
      (job.dept && job.dept === selectedDept) ||
      (selectedDept === "Design" && job.role.toLowerCase().includes("design")) ||
      (selectedDept === "Engineering" && (job.role.toLowerCase().includes("engineer") || job.role.toLowerCase().includes("developer"))) ||
      (selectedDept === "Data & AI" && (job.role.toLowerCase().includes("ai") || job.role.toLowerCase().includes("data"))) ||
      (selectedDept === "Product" && job.role.toLowerCase().includes("product"));

    const matchSearch =
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchDept && matchSearch;
  });

  return (
    <div className="workspace-content" style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px" }}>
      <div className="workspace-titlebar" style={{ marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: "800", color: role === "Employee" ? "#1d4ed8" : "#059669", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            {role === "Employee" ? "Internal & Partner Mobility" : "Verified Opportunities"}
          </span>
          <h1 style={{ fontSize: "24px", margin: "4px 0", color: "#0f172a" }}>
            {role === "Employee" ? "Explore Internal Job Openings" : "Browse Verified Job Openings"}
          </h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            {role === "Employee"
              ? "Discover new roles across departments, benchmark requirements, and request internal transfers"
              : "Discover hand-picked roles matched to your verified tech stack, experience, and salary expectations"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            className="btn-secondary" 
            style={{ height: "38px", padding: "0 14px", fontSize: "13px" }}
            onClick={onOpenAppStudio}
          >
            <Icon name="spark" size={15} /> Tailor Resume with AI
          </button>
        </div>
      </div>

      {/* Filter and search bar */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div className="selectable-pills" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              className={selectedDept === dept ? "selected" : ""}
              onClick={() => setSelectedDept(dept)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "600",
                border: "1px solid",
                borderColor: selectedDept === dept ? (role === "Employee" ? "#1d4ed8" : "#059669") : "#e2e8f0",
                background: selectedDept === dept ? (role === "Employee" ? "#eff6ff" : "#ecfdf5") : "white",
                color: selectedDept === dept ? (role === "Employee" ? "#1e40af" : "#065f46") : "#475569",
                cursor: "pointer",
              }}
            >
              {dept}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", background: "white", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "6px 12px", width: "min(300px, 100%)" }}>
          <Icon name="search" size={16} />
          <input
            style={{ border: "none", outline: "none", marginLeft: "8px", fontSize: "13px", width: "100%" }}
            placeholder="Filter by role or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs grid using existing picked-jobs-grid styling */}
      <div className="picked-jobs-grid">
        {filteredJobs.map((job) => (
          <article key={job.role}>
            <div className="job-card-top">
              <i style={{ background: job.color }}>{job.company.charAt(0)}</i>
              <em>
                <Icon name="spark" size={12} /> {job.match}% match
              </em>
            </div>
            <span>{job.company}</span>
            <h3>{job.role}</h3>
            <p>{job.location}</p>
            <strong>{job.salary}</strong>
            <div>
              <button onClick={() => onOpenRoleDetails(job)}>Quick Apply</button>
              <button
                className={savedJobs.includes(job.role) ? "saved" : ""}
                onClick={() => toggleSaved(job.role)}
                aria-label={`Save ${job.role}`}
              >
                ♡
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AdminConsoleView({
  notify,
  onUserRoleChange,
  currentUsers,
}: {
  notify: (msg: string) => void;
  onUserRoleChange: (email: string, newRole: UserRole) => void;
  currentUsers: Array<{ name: string; email: string; role: UserRole; status: string; licenses: string }>;
}) {
  return (
    <>
      <div className="product-banner" style={{ background: "linear-gradient(105deg, #991b1b, #1e293b 70%, #0f172a)" }}>
        <span>
          <Icon name="shield" size={18} /> Platform Security & Administration
        </span>
        <strong>Enterprise Tier Active · 99.98% platform SLA uptime · Zero compliance alerts</strong>
        <button onClick={() => notify("System health diagnostics: All 8 microservices operational")}>
          Run Diagnostics <Icon name="arrow" size={16} />
        </button>
      </div>

      <div className="candidate-home">
        <aside className="candidate-home-rail">
          <section className="profile-completion-card" style={{ borderColor: "#fca5a5" }}>
            <div className="completion-ring" style={{ borderColor: "#dc2626" }}>
              <span style={{ color: "#dc2626", background: "#fef2f2" }}>AD</span>
            </div>
            <b style={{ color: "#dc2626" }}>SUPERADMIN</b>
            <h2>Vikram Malhotra</h2>
            <p>Platform Superadmin</p>
            <small>Security & IAM Policy</small>
            <div style={{ marginTop: "14px", width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
              <button 
                onClick={() => notify("Role permissions policy saved")}
                style={{ width: "100%", background: "#dc2626", color: "white", padding: "10px", borderRadius: "10px", fontWeight: "700" }}
              >
                Security Policy
              </button>
              <button 
                onClick={() => notify("Audit logs exported to CSV")}
                style={{ width: "100%", background: "#f8fafc", color: "#334155", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "10px", fontWeight: "700" }}
              >
                Export Audit Trail
              </button>
            </div>
          </section>

          <section className="candidate-quick-links">
            <div style={{ padding: "12px 16px 6px", fontSize: "11px", fontWeight: "800", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              System Telemetry
            </div>
            {[
              ["settings", "API Response Time", "42ms"],
              ["users", "Active Sessions", "148"],
              ["shield", "Failed Logins", "0"],
              ["chart", "Subscription MRR", "$48.2k"],
            ].map(([icon, label, count]) => (
              <button onClick={() => notify(`${label}: ${count}`)} key={label}>
                <Icon name={icon as IconName} size={17} />
                <span>{label}</span>
                <b>{count}</b>
                <Icon name="arrow" size={14} />
              </button>
            ))}
          </section>
        </aside>

        <div className="candidate-home-main">
          <section className="metrics-grid" aria-label="Admin metrics" style={{ margin: 0 }}>
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon violet">
                  <Icon name="users" size={19} />
                </span>
                <span className="trend up">↑ 14%</span>
              </div>
              <span>Total Users</span>
              <strong>14,820</strong>
              <small>Across 48 organizations</small>
            </article>
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon blue">
                  <Icon name="briefcase" size={19} />
                </span>
                <span className="trend">Allocated</span>
              </div>
              <span>Recruiter Licenses</span>
              <strong>128 / 150</strong>
              <small>22 unassigned seats</small>
            </article>
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon orange">
                  <Icon name="shield" size={19} />
                </span>
                <span className="trend up">Healthy</span>
              </div>
              <span>API Health</span>
              <strong>99.98%</strong>
              <small>Zero outage incidents</small>
            </article>
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon green">
                  <Icon name="chart" size={19} />
                </span>
                <span className="trend">Monthly</span>
              </div>
              <span>Platform Quota</span>
              <strong>84%</strong>
              <small>Within allocated tiers</small>
            </article>
          </section>

          <section className="panel roles-panel" style={{ marginTop: "24px" }}>
            <div className="panel-heading roles-heading">
              <div>
                <h2>User Management & Category Role Assignment</h2>
                <p>Change user categories between Employee, HR, Candidate, and Admin dynamically</p>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => notify("Invitation dialog: Invite link created")}
                style={{ background: "#dc2626" }}
              >
                <Icon name="plus" size={16} /> Invite User
              </button>
            </div>
            <div style={{ padding: "0 24px 20px", overflowX: "auto" }}>
              <table className="admin-user-table">
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>EMAIL</th>
                    <th>ASSIGNED CATEGORY</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((u) => (
                    <tr key={u.email}>
                      <td>
                        <strong>{u.name}</strong>
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          className="admin-role-select"
                          value={u.role}
                          onChange={(e) => onUserRoleChange(u.email, e.target.value as UserRole)}
                        >
                          <option value="Employee">Employee</option>
                          <option value="HR">HR / Employer</option>
                          <option value="Candidate">Candidate</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "12px", background: "#f0fdf4", color: "#16a34a", fontSize: "12px", fontWeight: "700" }}>
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-secondary" 
                          style={{ height: "32px", padding: "0 10px", fontSize: "12px" }}
                          onClick={() => notify(`Updated permissions for ${u.name}`)}
                        >
                          Edit Permissions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   Main Application Scaffold
   ========================================================================== */

export function EmployeeFlowApp() {
  const location = useLocation();

  // Role detection from pathname or fallback to Employee
  const getRoleFromPath = (): UserRole => {
    const p = location.pathname.toLowerCase();
    if (p.startsWith("/admin")) return "Admin";
    if (p.startsWith("/employer") || p.startsWith("/hr") || p.startsWith("/recruiter")) return "HR";
    if (p.startsWith("/candidate")) return "Candidate";
    return "Employee";
  };

  const [activeRole, setActiveRole] = useState<UserRole>(getRoleFromPath);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileContainerRef = useRef<HTMLDivElement>(null);

  // Editable user profiles
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);

  // Admin user directory
  const [adminUsers, setAdminUsers] = useState([
    { name: "Priya Sharma", email: "priya.sharma@razorpay.com", role: "Employee" as UserRole, status: "Active", licenses: "Standard" },
    { name: "Sheela Nancy", email: "sheela.nancy@ispatialtec.com", role: "HR" as UserRole, status: "Active", licenses: "Recruiter Pro" },
    { name: "Rohan Verma", email: "rohan.verma@gmail.com", role: "Candidate" as UserRole, status: "Active", licenses: "Candidate" },
    { name: "Vikram Malhotra", email: "admin@talentnetwork.internal", role: "Admin" as UserRole, status: "Active", licenses: "Superadmin" },
  ]);

  // Tab navigation inside flow
  const getTabFromPath = () => {
    const p = location.pathname.toLowerCase();
    if (p.includes("/jobs")) return "Jobs";
    if (p.includes("/candidates")) return "Candidates";
    if (p.includes("/interviews")) return "Interviews";
    if (p.includes("/analytics")) return "Analytics";
    if (p.includes("/outreach") || p.includes("/nvite")) return "Outreach";
    if (p.includes("/settings")) return "Settings";
    return "Discover";
  };
  const [active, setActive] = useState(getTabFromPath);

  useEffect(() => {
    const pathRole = getRoleFromPath();
    setActiveRole(pathRole);
    const tab = getTabFromPath();
    if ((pathRole === "Candidate" || pathRole === "Employee") && (tab === "Candidates" || tab === "Outreach")) {
      setActive("Discover");
    } else {
      setActive(tab);
    }
  }, [location.pathname]);

  const [query, setQuery] = useState("");
  const [jobFilter, setJobFilter] = useState<"All" | "Active" | "Paused">("All");
  const [mobileNav, setMobileNav] = useState(false);
  const [openTopMenu, setOpenTopMenu] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const [jobs, setJobs] = useState(initialJobs);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  // Demo Modals State
  const [showAppStudioModal, setShowAppStudioModal] = useState(false);
  const [studioOptimized, setStudioOptimized] = useState(false);
  const [showInterviewGuideModal, setShowInterviewGuideModal] = useState(false);
  const [prepChecklist, setPrepChecklist] = useState({
    caseStudy: true,
    prototype: true,
    systemDesign: false,
    questions: false,
  });
  const [selectedRoleModal, setSelectedRoleModal] = useState<any | null>(null);
  const [roleAppliedSuccess, setRoleAppliedSuccess] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [quickLinkModal, setQuickLinkModal] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllRolesModal, setShowAllRolesModal] = useState(false);
  const [hrSelectedJobForApplicants, setHrSelectedJobForApplicants] = useState<any | null>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileContainerRef.current && !profileContainerRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (openTopMenu && !(e.target as HTMLElement).closest(".top-nav-group")) {
        setOpenTopMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openTopMenu]);

  const currentProfile = profiles[activeRole];
  const currentRoleConfig = ROLE_OPTIONS.find((r) => r.id === activeRole) || ROLE_OPTIONS[0];
  const currentNavGroups = useMemo(() => getTopNavGroups(activeRole), [activeRole]);

  function handleSwitchRole(newRole: UserRole) {
    setActiveRole(newRole);
    setProfileOpen(false);
    setActive("Discover");
    const targetConfig = ROLE_OPTIONS.find((r) => r.id === newRole);
    setToast(`Switched to ${targetConfig?.label || newRole} workspace`);
    window.setTimeout(() => setToast(""), 2800);
  }

  function handleAdminRoleChange(email: string, newRole: UserRole) {
    setAdminUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
    );
    setToast(`Role for ${email} updated to ${newRole}`);
    window.setTimeout(() => setToast(""), 2800);
  }

  function toggleSaved(role: string) {
    setSavedJobs((current) =>
      current.includes(role) ? current.filter((item) => item !== role) : [...current, role]
    );
    setToast(savedJobs.includes(role) ? "Removed from saved jobs" : "Job saved to your bookmarks");
    window.setTimeout(() => setToast(""), 2400);
  }

  const visibleJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          (jobFilter === "All" || job.status === jobFilter) &&
          job.role.toLowerCase().includes(query.toLowerCase())
      ),
    [jobs, jobFilter, query]
  );

  function addJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const role = String(data.get("role") || "");
    const dept = String(data.get("department") || "General");
    setJobs([
      { role, dept, candidates: 0, days: "Just now", status: "Active", color: "#6d4adb" },
      ...jobs,
    ]);
    setShowModal(false);
    setToast(`${role} was published`);
    window.setTimeout(() => setToast(""), 3000);
  }

  function handleNav(target: string) {
    setMobileNav(false);
    setOpenTopMenu(null);
    if (target === "Studio") {
      setShowAppStudioModal(true);
      return;
    }
    if (target === "Profile") {
      setShowProfileEditor(true);
      return;
    }
    if (target === "Notifications") {
      setShowNotifications(true);
      return;
    }
    if (target === "Applications") {
      setQuickLinkModal("My applications");
      return;
    }
    if (target === "Saved") {
      setQuickLinkModal("Saved jobs");
      return;
    }
    if (target === "CreateJob") {
      if (activeRole === "HR") {
        setShowModal(true);
      } else {
        setToast("Only HR / Recruiters can publish job requisitions");
        window.setTimeout(() => setToast(""), 2800);
      }
      return;
    }
    if (target === "Candidates" && activeRole !== "HR") {
      setToast("Access restricted: Resdex search is only accessible to recruiters");
      window.setTimeout(() => setToast(""), 2800);
      setActive("Discover");
      return;
    }
    if (target === "Outreach" && activeRole !== "HR") {
      setToast("Access restricted: NVite outreach is only accessible to recruiters");
      window.setTimeout(() => setToast(""), 2800);
      setActive("Discover");
      return;
    }
    setActive(target);
    if (target !== "Discover") {
      setToast(`${target} workspace selected`);
      window.setTimeout(() => setToast(""), 2200);
    }
  }

  return (
    <div className="app-shell">
      <main>
        <header className="topbar">
          <button className="desktop-brand" onClick={() => handleNav("Discover")}>
            <span className="brand-mark">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <b>Talent Network</b>
          </button>
          <nav className="desktop-nav" aria-label="Desktop navigation">
            {currentNavGroups.map((group) => (
              <div className="top-nav-group" key={group.label}>
                <button
                  className={group.activeTargets.includes(active) ? "active" : ""}
                  onClick={() => setOpenTopMenu(openTopMenu === group.label ? null : group.label)}
                  aria-expanded={openTopMenu === group.label}
                >
                  {group.label}
                  <Icon name="chevron" size={12} />
                </button>
                {openTopMenu === group.label && (
                  <div className="top-dropdown">
                    <small>{group.label}</small>
                    {group.items.map((item) => (
                      <button onClick={() => handleNav(item.target)} key={item.label}>
                        <span>
                          <Icon name={item.icon} size={17} />
                        </span>
                        <span>
                          <strong>{item.label}</strong>
                          <em>{item.detail}</em>
                        </span>
                        <Icon name="arrow" size={14} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                activeRole === "Candidate"
                  ? "Search jobs, companies, or skills"
                  : activeRole === "Employee"
                  ? "Search internal roles, skills, or benchmarks"
                  : activeRole === "Admin"
                  ? "Search users, audit logs, or settings"
                  : "Search jobs, skills, or candidates"
              }
              aria-label="Search"
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <button 
              className="icon-button has-alert" 
              aria-label="Notifications"
              onClick={() => setShowNotifications(true)}
            >
              <Icon name="bell" size={20} />
            </button>
            <button
              className="top-menu-button"
              onClick={() => setMobileNav(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" size={19} />
            </button>

            {/* Profile Avatar & Interactive Category Switcher Dropdown */}
            <div className="profile-container" ref={profileContainerRef}>
              <button 
                className="top-profile" 
                style={{ 
                  background: currentRoleConfig.bg, 
                  color: currentRoleConfig.color, 
                  borderColor: currentRoleConfig.color + "55" 
                }}
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User Profile & Role Category Switcher"
                aria-expanded={profileOpen}
              >
                {currentRoleConfig.initials}
              </button>

              {profileOpen && (
                <div className="profile-dropdown-menu">
                  <div className="profile-header-card">
                    <div 
                      className="profile-header-avatar" 
                      style={{ background: currentRoleConfig.color }}
                    >
                      {currentRoleConfig.initials}
                    </div>
                    <div className="profile-header-info">
                      <h4>{currentProfile.name}</h4>
                      <p>{currentProfile.email}</p>
                      <span 
                        className="role-badge" 
                        style={{ background: currentRoleConfig.bg, color: currentRoleConfig.color }}
                      >
                        {currentRoleConfig.badge}
                      </span>
                    </div>
                  </div>

                  <div className="role-switch-section">
                    <div className="role-switch-label">Switch Category / Role</div>
                    <div className="role-options-list">
                      {ROLE_OPTIONS.map((r) => {
                        const isCurrent = activeRole === r.id;
                        return (
                          <button
                            key={r.id}
                            className={`role-option-btn ${isCurrent ? "active-role" : ""}`}
                            onClick={() => handleSwitchRole(r.id)}
                          >
                            <div className="role-option-icon" style={{ background: r.bg, color: r.color }}>
                              <Icon name={r.icon} size={18} />
                            </div>
                            <div className="role-option-text">
                              <div className="role-option-title">
                                <strong>{r.label}</strong>
                                {isCurrent && <span className="current-indicator">Active</span>}
                              </div>
                              <small>{r.desc}</small>
                            </div>
                            {isCurrent ? <Icon name="check" size={16} /> : <Icon name="chevron" size={14} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="profile-menu-footer">
                    <button onClick={() => { setProfileOpen(false); setShowProfileEditor(true); }}>
                      <Icon name="settings" size={16} /> Edit Profile & Preferences
                    </button>
                    <button onClick={() => { setProfileOpen(false); setShowNotifications(true); }}>
                      <Icon name="bell" size={16} /> Notification Center
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Canvas Routing strictly partitioned according to Active Role and Selected Tab */}
        {activeRole === "Admin" ? (
          <AdminConsoleView
            notify={(msg) => {
              setToast(msg);
              window.setTimeout(() => setToast(""), 2600);
            }}
            onUserRoleChange={handleAdminRoleChange}
            currentUsers={adminUsers}
          />
        ) : activeRole === "HR" ? (
          active === "Candidates" ? (
            <CandidateSearch
              notify={(message) => {
                setToast(message);
                window.setTimeout(() => setToast(""), 2600);
              }}
            />
          ) : active === "Jobs" ? (
            <JobsWorkspace
              createJob={() => setShowModal(true)}
              notify={(message) => {
                setToast(message);
                window.setTimeout(() => setToast(""), 2600);
              }}
            />
          ) : active === "Outreach" ? (
            <OutreachWorkspace
              notify={(message) => {
                setToast(message);
                window.setTimeout(() => setToast(""), 2600);
              }}
            />
          ) : (
            <HrDashboardView
              notify={(msg) => {
                setToast(msg);
                window.setTimeout(() => setToast(""), 2600);
              }}
              onCreateJob={() => setShowModal(true)}
              onViewApplicants={(job) => setHrSelectedJobForApplicants(job)}
              onSearchResdex={() => handleNav("Candidates")}
              profile={profiles.HR}
              jobs={jobs}
            />
          )
        ) : activeRole === "Candidate" ? (
          active === "Jobs" ? (
            <CandidateJobsView
              notify={(msg) => {
                setToast(msg);
                window.setTimeout(() => setToast(""), 2600);
              }}
              onOpenRoleDetails={(job) => {
                setSelectedRoleModal(job);
                setRoleAppliedSuccess(false);
              }}
              savedJobs={savedJobs}
              toggleSaved={toggleSaved}
              onOpenAppStudio={() => setShowAppStudioModal(true)}
              role="Candidate"
            />
          ) : (
            <CandidatePortalView
              notify={(msg) => {
                setToast(msg);
                window.setTimeout(() => setToast(""), 2600);
              }}
              onOpenAppStudio={() => setShowAppStudioModal(true)}
              onOpenRoleDetails={(job) => {
                setSelectedRoleModal(job);
                setRoleAppliedSuccess(false);
              }}
              onOpenInterviewGuide={() => setShowInterviewGuideModal(true)}
              onOpenProfileEditor={() => setShowProfileEditor(true)}
              onOpenAllRoles={() => setShowAllRolesModal(true)}
              onOpenQuickLink={(label) => setQuickLinkModal(label)}
              profile={profiles.Candidate}
              savedJobs={savedJobs}
              toggleSaved={toggleSaved}
            />
          )
        ) : (
          /* Employee Role */
          active === "Jobs" ? (
            <CandidateJobsView
              notify={(msg) => {
                setToast(msg);
                window.setTimeout(() => setToast(""), 2600);
              }}
              onOpenRoleDetails={(job) => {
                setSelectedRoleModal(job);
                setRoleAppliedSuccess(false);
              }}
              savedJobs={savedJobs}
              toggleSaved={toggleSaved}
              onOpenAppStudio={() => setShowAppStudioModal(true)}
              role="Employee"
            />
          ) : (
            <CandidateDashboard
              notify={(message) => {
                setToast(message);
                window.setTimeout(() => setToast(""), 2600);
              }}
              onOpenAppStudio={() => setShowAppStudioModal(true)}
              onOpenInterviewGuide={() => setShowInterviewGuideModal(true)}
              onOpenRoleDetails={(job) => {
                setSelectedRoleModal(job);
                setRoleAppliedSuccess(false);
              }}
              onOpenProfileEditor={() => setShowProfileEditor(true)}
              onOpenAllRoles={() => setShowAllRolesModal(true)}
              onOpenQuickLink={(label) => setQuickLinkModal(label)}
              profile={profiles.Employee}
              savedJobs={savedJobs}
              toggleSaved={toggleSaved}
            />
          )
        )}
      </main>

      {/* ==========================================================================
          UNIVERSAL INTERACTIVE DEMO MODALS
          ========================================================================== */}

      {/* 0. Mobile Navigation Drawer */}
      {mobileNav && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setMobileNav(false)}>
          <div className="demo-modal-card" style={{ width: "min(340px, 88vw)", maxHeight: "90vh", overflowY: "auto" }} onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon" style={{ background: currentRoleConfig.bg, color: currentRoleConfig.color }}>
                  <Icon name={currentRoleConfig.icon} size={20} />
                </div>
                <div>
                  <h3>{currentRoleConfig.label} Workspace</h3>
                  <p>{currentRoleConfig.category}</p>
                </div>
              </div>
              <button className="demo-modal-close" onClick={() => setMobileNav(false)} aria-label="Close">
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="demo-modal-body" style={{ padding: "16px 14px" }}>
              {currentNavGroups.map((group) => (
                <div key={group.label} style={{ marginBottom: "18px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", padding: "0 8px 6px" }}>
                    {group.label}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {group.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNav(item.target)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "none",
                          background: active === item.target ? "#f1f5f9" : "transparent",
                          color: "#1e293b",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <Icon name={item.icon} size={17} />
                        <div>
                          <strong style={{ display: "block", fontSize: "14px" }}>{item.label}</strong>
                          <small style={{ color: "#64748b", fontSize: "12px" }}>{item.detail}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1. Application Studio Modal */}
      {showAppStudioModal && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setShowAppStudioModal(false)}>
          <div className="demo-modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon">
                  <Icon name="spark" size={20} />
                </div>
                <div>
                  <h3>Application Studio</h3>
                  <p>AI-assisted resume tailoring for high ATS match scores</p>
                </div>
              </div>
              <button 
                className="demo-modal-close" 
                onClick={() => setShowAppStudioModal(false)}
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="demo-modal-body">
              <div className="studio-hero-box">
                <div>
                  <small style={{ color: "#2563eb", fontWeight: "700", textTransform: "uppercase" }}>TARGET POSITION</small>
                  <h4 style={{ margin: "2px 0 0", fontSize: "16px", color: "#0f172a" }}>Senior Product Designer · Razorpay</h4>
                </div>
                <div className="studio-match-badge" style={{ background: studioOptimized ? "#16a34a" : "#2563eb" }}>
                  <Icon name="spark" size={14} />
                  {studioOptimized ? "100% Match" : "94% Match"}
                </div>
              </div>

              <div className="ai-suggestion-box">
                <strong style={{ fontSize: "14px", color: "#0f172a" }}>AI Optimization Insights:</strong>
                <div className="ai-suggestion-item">
                  <Icon name="check" size={16} />
                  <span>Added metrics for design token adoption across 14 product squads.</span>
                </div>
                <div className="ai-suggestion-item">
                  <Icon name="check" size={16} />
                  <span>Aligned typography and design systems terminology with job requisition spec.</span>
                </div>
                <div className="ai-suggestion-item">
                  <Icon name="check" size={16} />
                  <span>Highlighted 4 key conversion metrics from checkout flow redesign.</span>
                </div>
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>LIVE RESUME PREVIEW</span>
                <p style={{ marginTop: "6px", fontSize: "13px", color: "#334155" }}>
                  "Led end-to-end design system overhaul, unifying 420+ components across web and mobile. Improved design-to-engineering handoff speed by 38% and elevated accessibility contrast compliance to WCAG AAA."
                </p>
              </div>
            </div>
            <div className="demo-modal-footer">
              <button className="btn-secondary" onClick={() => setShowAppStudioModal(false)}>
                Close
              </button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  setStudioOptimized(true);
                  setToast("Resume tailored! ATS score upgraded to 100%");
                  window.setTimeout(() => setToast(""), 2800);
                }}
              >
                <Icon name="spark" size={16} />
                {studioOptimized ? "Optimized & Saved" : "Apply AI Optimizations"}
              </button>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setToast("Tailored PDF exported successfully");
                  setShowAppStudioModal(false);
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Interview Preparation Guide Modal */}
      {showInterviewGuideModal && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setShowInterviewGuideModal(false)}>
          <div className="demo-modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                  <Icon name="calendar" size={20} />
                </div>
                <div>
                  <h3>Portfolio Review Guide</h3>
                  <p>Nexora Labs · Senior Product Designer</p>
                </div>
              </div>
              <button 
                className="demo-modal-close" 
                onClick={() => setShowInterviewGuideModal(false)}
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="demo-modal-body">
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "14px 16px" }}>
                <strong style={{ color: "#1d4ed8" }}>Time & Platform:</strong>
                <p style={{ margin: "4px 0 0", color: "#1e3a8a", fontSize: "13px" }}>
                  Tomorrow, 10:00 AM – 11:00 AM IST · Google Meet
                </p>
                <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
                  <button 
                    className="btn-secondary" 
                    style={{ height: "32px", padding: "0 12px", fontSize: "12px" }}
                    onClick={() => setToast("Meeting link copied to clipboard")}
                  >
                    Copy Link
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ height: "32px", padding: "0 12px", fontSize: "12px" }}
                    onClick={() => setToast("Joining demo test room...")}
                  >
                    Test Audio / Video
                  </button>
                </div>
              </div>

              <div>
                <strong style={{ fontSize: "14px", color: "#0f172a" }}>Interactive Prep Checklist:</strong>
                <div className="checklist-container" style={{ marginTop: "10px" }}>
                  <div 
                    className={`checklist-item ${prepChecklist.caseStudy ? "done" : ""}`}
                    onClick={() => setPrepChecklist({ ...prepChecklist, caseStudy: !prepChecklist.caseStudy })}
                  >
                    <div className="checklist-checkbox">{prepChecklist.caseStudy && "✓"}</div>
                    <span>Walkthrough slide deck prepared for checkout redesign case study</span>
                  </div>
                  <div 
                    className={`checklist-item ${prepChecklist.prototype ? "done" : ""}`}
                    onClick={() => setPrepChecklist({ ...prepChecklist, prototype: !prepChecklist.prototype })}
                  >
                    <div className="checklist-checkbox">{prepChecklist.prototype && "✓"}</div>
                    <span>Interactive Figma prototype link loaded with present mode ready</span>
                  </div>
                  <div 
                    className={`checklist-item ${prepChecklist.systemDesign ? "done" : ""}`}
                    onClick={() => setPrepChecklist({ ...prepChecklist, systemDesign: !prepChecklist.systemDesign })}
                  >
                    <div className="checklist-checkbox">{prepChecklist.systemDesign && "✓"}</div>
                    <span>Design system governance model and token handover examples prepared</span>
                  </div>
                  <div 
                    className={`checklist-item ${prepChecklist.questions ? "done" : ""}`}
                    onClick={() => setPrepChecklist({ ...prepChecklist, questions: !prepChecklist.questions })}
                  >
                    <div className="checklist-checkbox">{prepChecklist.questions && "✓"}</div>
                    <span>Prepared 3 thoughtful questions for the design director and staff engineer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="demo-modal-footer">
              <button className="btn-secondary" onClick={() => setShowInterviewGuideModal(false)}>
                Done
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setToast("Mock practice session launched");
                  setShowInterviewGuideModal(false);
                }}
              >
                Launch Mock Practice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Role Details & Quick Apply Modal */}
      {selectedRoleModal && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setSelectedRoleModal(null)}>
          <div className="demo-modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon" style={{ background: selectedRoleModal.color + "22", color: selectedRoleModal.color }}>
                  <Icon name="briefcase" size={20} />
                </div>
                <div>
                  <h3>{selectedRoleModal.role}</h3>
                  <p>{selectedRoleModal.company} · {selectedRoleModal.location}</p>
                </div>
              </div>
              <button 
                className="demo-modal-close" 
                onClick={() => setSelectedRoleModal(null)}
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="demo-modal-body">
              {roleAppliedSuccess ? (
                <div style={{ textAlign: "center", padding: "24px 12px" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#f0fdf4", color: "#16a34a", display: "grid", placeItems: "center", margin: "0 auto 14px", fontSize: "24px" }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: "18px", color: "#0f172a" }}>Application Submitted!</h3>
                  <p style={{ color: "#64748b", marginTop: "4px" }}>
                    Your tailored resume and profile were delivered to the hiring team at <strong>{selectedRoleModal.company}</strong>.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", gap: "16px", padding: "12px 16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div>
                      <small style={{ color: "#64748b" }}>COMPENSATION</small>
                      <strong style={{ display: "block", color: "#0f172a", fontSize: "15px" }}>{selectedRoleModal.salary}</strong>
                    </div>
                    <div>
                      <small style={{ color: "#64748b" }}>MATCH SCORE</small>
                      <strong style={{ display: "block", color: "#16a34a", fontSize: "15px" }}>{selectedRoleModal.match}% ATS Match</strong>
                    </div>
                    <div>
                      <small style={{ color: "#64748b" }}>POSTED</small>
                      <strong style={{ display: "block", color: "#0f172a", fontSize: "15px" }}>2 days ago</strong>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "14px", color: "#0f172a", marginBottom: "6px" }}>About the role</h4>
                    <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6" }}>
                      We are seeking a senior practitioner to lead core product initiatives, build and maintain design system foundations, and collaborate closely with product management and engineering squads.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRoleAppliedSuccess(true);
                      setToast(`Application submitted to ${selectedRoleModal.company}`);
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    <div className="demo-form-field">
                      <label>Applicant Name</label>
                      <input defaultValue={currentProfile.name} required />
                    </div>
                    <div className="demo-form-field">
                      <label>Email Address</label>
                      <input defaultValue={currentProfile.email} type="email" required />
                    </div>
                    <div className="demo-form-field">
                      <label>Portfolio / GitHub URL</label>
                      <input defaultValue="https://portfolio.design/priya" required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ marginTop: "6px" }}>
                      Submit 1-Click Application
                    </button>
                  </form>
                </>
              )}
            </div>
            <div className="demo-modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedRoleModal(null)}>
                {roleAppliedSuccess ? "Done" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Profile Editor Modal */}
      {showProfileEditor && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setShowProfileEditor(false)}>
          <div className="demo-modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon">
                  <Icon name="settings" size={20} />
                </div>
                <div>
                  <h3>Edit Profile & Preferences</h3>
                  <p>Update personal info, title, and career preferences</p>
                </div>
              </div>
              <button 
                className="demo-modal-close" 
                onClick={() => setShowProfileEditor(false)}
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const updated = {
                  ...currentProfile,
                  name: String(fd.get("name")),
                  title: String(fd.get("title")),
                  company: String(fd.get("company")),
                  location: String(fd.get("location")),
                  bio: String(fd.get("bio")),
                  completion: 100,
                };
                setProfiles({ ...profiles, [activeRole]: updated });
                setShowProfileEditor(false);
                setToast("Profile updated successfully!");
                window.setTimeout(() => setToast(""), 2800);
              }}
            >
              <div className="demo-modal-body">
                <div className="demo-form-grid">
                  <div className="demo-form-field">
                    <label>Full Name</label>
                    <input name="name" defaultValue={currentProfile.name} required />
                  </div>
                  <div className="demo-form-field">
                    <label>Current Title</label>
                    <input name="title" defaultValue={currentProfile.title} required />
                  </div>
                  <div className="demo-form-field">
                    <label>Company / Org</label>
                    <input name="company" defaultValue={currentProfile.company} required />
                  </div>
                  <div className="demo-form-field">
                    <label>Location</label>
                    <input name="location" defaultValue={currentProfile.location} required />
                  </div>
                  <div className="demo-form-field full-width">
                    <label>Professional Bio</label>
                    <textarea name="bio" defaultValue={currentProfile.bio} />
                  </div>
                </div>
              </div>
              <div className="demo-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowProfileEditor(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Quick Links Drawer / Modal */}
      {quickLinkModal && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setQuickLinkModal(null)}>
          <div className="demo-modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon">
                  <Icon name={quickLinkModal === "Interviews" ? "calendar" : "briefcase"} size={20} />
                </div>
                <div>
                  <h3>{quickLinkModal}</h3>
                  <p>Overview of your active activity and items</p>
                </div>
              </div>
              <button 
                className="demo-modal-close" 
                onClick={() => setQuickLinkModal(null)}
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="demo-modal-body">
              {quickLinkModal === "My applications" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { role: "Senior Product Designer", company: "Razorpay", status: "Interviewing", date: "Applied 4 days ago" },
                    { role: "Lead UI/UX Architect", company: "Nexora Labs", status: "Review Tomorrow", date: "Applied 1 week ago" },
                    { role: "Staff Product Designer", company: "Swiggy", status: "Under Review", date: "Applied 2 weeks ago" },
                    { role: "Design Systems Lead", company: "Cred", status: "Offer Stage", date: "Applied 3 weeks ago" },
                    { role: "Product Designer II", company: "Flipkart", status: "Screening Passed", date: "Applied 1 month ago" },
                  ].map((app) => (
                    <div className="drawer-list-item" key={app.company}>
                      <div>
                        <strong>{app.role}</strong>
                        <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>{app.company} · {app.date}</p>
                      </div>
                      <span style={{ padding: "4px 10px", borderRadius: "12px", background: "#eff6ff", color: "#2563eb", fontWeight: "700", fontSize: "12px" }}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : quickLinkModal === "Interviews" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div className="drawer-list-item">
                    <div>
                      <strong>Nexora Labs · Portfolio Review</strong>
                      <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>Tomorrow at 10:00 AM IST · 60 mins</p>
                    </div>
                    <button className="btn-primary" style={{ height: "34px", padding: "0 12px", fontSize: "12px" }} onClick={() => setToast("Launching meeting...")}>
                      Join
                    </button>
                  </div>
                  <div className="drawer-list-item">
                    <div>
                      <strong>Razorpay · Technical Deep Dive</strong>
                      <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>Thursday at 3:00 PM IST · 45 mins</p>
                    </div>
                    <button className="btn-secondary" style={{ height: "34px", padding: "0 12px", fontSize: "12px" }} onClick={() => setToast("Reschedule requested")}>
                      Details
                    </button>
                  </div>
                </div>
              ) : quickLinkModal === "Saved jobs" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {recommendedJobs.map((job) => (
                    <div className="drawer-list-item" key={job.role}>
                      <div>
                        <strong>{job.role}</strong>
                        <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>{job.company} · {job.salary}</p>
                      </div>
                      <button 
                        className="btn-primary" 
                        style={{ height: "34px", padding: "0 12px", fontSize: "12px" }}
                        onClick={() => {
                          setSelectedRoleModal(job);
                          setQuickLinkModal(null);
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { recruiter: "Ananya Roy (Google)", time: "2 hours ago" },
                    { recruiter: "Vikram Seth (Razorpay)", time: "5 hours ago" },
                    { recruiter: "Pooja Hegde (Swiggy)", time: "Yesterday" },
                    { recruiter: "Karan Johar (Cred)", time: "2 days ago" },
                  ].map((v) => (
                    <div className="drawer-list-item" key={v.recruiter}>
                      <div>
                        <strong>{v.recruiter}</strong>
                        <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>Viewed full profile & portfolio</p>
                      </div>
                      <small style={{ color: "#94a3b8" }}>{v.time}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="demo-modal-footer">
              <button className="btn-secondary" onClick={() => setQuickLinkModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Notifications Drawer */}
      {showNotifications && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setShowNotifications(false)}>
          <div className="demo-modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon">
                  <Icon name="bell" size={20} />
                </div>
                <div>
                  <h3>Notifications</h3>
                  <p>Recent updates, interview alerts and invitations</p>
                </div>
              </div>
              <button 
                className="demo-modal-close" 
                onClick={() => setShowNotifications(false)}
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="demo-modal-body">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { title: "Interview Confirmation", desc: "Nexora Labs confirmed your portfolio review for tomorrow at 10:00 AM.", time: "10m ago", unread: true },
                  { title: "Application Viewed", desc: "Razorpay recruiter viewed your tailored resume.", time: "1h ago", unread: true },
                  { title: "Market Worth Benchmark", desc: "Product design midpoint salary updated to ₹31.5L in Bengaluru.", time: "5h ago", unread: false },
                  { title: "New Recommended Job", desc: "Staff Design Systems Architect at Cred matches 96% of your profile.", time: "1d ago", unread: false },
                ].map((n, i) => (
                  <div key={i} className="drawer-list-item" style={{ background: n.unread ? "#f8fafc" : "#ffffff", borderLeft: n.unread ? "4px solid #2563eb" : "1px solid #e2e8f0" }}>
                    <div>
                      <strong style={{ fontSize: "14px", color: "#0f172a" }}>{n.title}</strong>
                      <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#475569" }}>{n.desc}</p>
                    </div>
                    <small style={{ color: "#94a3b8", whiteSpace: "nowrap" }}>{n.time}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="demo-modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setToast("All notifications marked as read");
                  setShowNotifications(false);
                }}
              >
                Mark all as read
              </button>
              <button className="btn-primary" onClick={() => setShowNotifications(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. View All Recommended Roles Modal */}
      {showAllRolesModal && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setShowAllRolesModal(false)}>
          <div className="demo-modal-card" style={{ width: "min(720px, 94vw)" }} onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon">
                  <Icon name="spark" size={20} />
                </div>
                <div>
                  <h3>All Recommended Roles</h3>
                  <p>Curated matches based on your skills, experience, and salary targets</p>
                </div>
              </div>
              <button 
                className="demo-modal-close" 
                onClick={() => setShowAllRolesModal(false)}
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="demo-modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                {recommendedJobs.map((job) => (
                  <article 
                    key={job.role}
                    style={{ padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", background: "white", display: "flex", flexDirection: "column", gap: "8px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#64748b" }}>{job.company}</span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#16a34a", background: "#f0fdf4", padding: "2px 8px", borderRadius: "10px" }}>
                        {job.match}% match
                      </span>
                    </div>
                    <h4 style={{ margin: 0, fontSize: "15px", color: "#0f172a" }}>{job.role}</h4>
                    <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>{job.location}</p>
                    <strong style={{ fontSize: "14px", color: "#0f172a" }}>{job.salary}</strong>
                    <div style={{ marginTop: "6px", display: "flex", gap: "8px" }}>
                      <button 
                        className="btn-primary" 
                        style={{ height: "34px", padding: "0 12px", fontSize: "13px", flex: 1 }}
                        onClick={() => {
                          setSelectedRoleModal(job);
                          setShowAllRolesModal(false);
                        }}
                      >
                        View & Apply
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="demo-modal-footer">
              <button className="btn-secondary" onClick={() => setShowAllRolesModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. HR Requisition Applicants Modal */}
      {hrSelectedJobForApplicants && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setHrSelectedJobForApplicants(null)}>
          <div className="demo-modal-card" style={{ width: "min(680px, 94vw)" }} onMouseDown={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <div className="demo-modal-header-left">
                <div className="demo-modal-header-icon" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
                  <Icon name="users" size={20} />
                </div>
                <div>
                  <h3>Applicants for {hrSelectedJobForApplicants.role}</h3>
                  <p>{hrSelectedJobForApplicants.dept} · 14 candidates applied</p>
                </div>
              </div>
              <button 
                className="demo-modal-close" 
                onClick={() => setHrSelectedJobForApplicants(null)}
                aria-label="Close"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="demo-modal-body">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { name: "Aarav Patel", exp: "6 yrs exp · Ex-Amazon", match: 96, status: "New Applicant" },
                  { name: "Neha Singhania", exp: "5 yrs exp · Razorpay", match: 94, status: "Screening Passed" },
                  { name: "Kavita Rao", exp: "7 yrs exp · Swiggy", match: 91, status: "Portfolio Reviewed" },
                  { name: "Rajat Menon", exp: "4 yrs exp · Cred", match: 88, status: "New Applicant" },
                ].map((applicant) => (
                  <div className="drawer-list-item" key={applicant.name}>
                    <div>
                      <strong>{applicant.name}</strong>
                      <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>{applicant.exp} · <span style={{ color: "#16a34a", fontWeight: "700" }}>{applicant.match}% match</span></p>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        className="btn-secondary" 
                        style={{ height: "32px", padding: "0 10px", fontSize: "12px" }}
                        onClick={() => setToast(`Shortlisted ${applicant.name}`)}
                      >
                        Shortlist
                      </button>
                      <button 
                        className="btn-primary" 
                        style={{ height: "32px", padding: "0 10px", fontSize: "12px", background: "#7c3aed" }}
                        onClick={() => setToast(`Interview scheduled with ${applicant.name}`)}
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="demo-modal-footer">
              <button className="btn-secondary" onClick={() => setHrSelectedJobForApplicants(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Create New Job Modal */}
      {showModal && (
        <div className="modal-layer" role="presentation" onMouseDown={() => setShowModal(false)}>
          <form className="job-modal" onSubmit={addJob} onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <Icon name="briefcase" />
            </div>
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <Icon name="close" size={20} />
            </button>
            <h2>Create a new job</h2>
            <p>Start attracting top verified candidates to your team.</p>
            <label>
              Job title
              <input name="role" placeholder="e.g. Lead Product Designer" required autoFocus />
            </label>
            <label>
              Department
              <select name="department" defaultValue="Engineering">
                <option>Engineering</option>
                <option>Product & Design</option>
                <option>Marketing</option>
                <option>People & Culture</option>
                <option>Sales</option>
              </select>
            </label>
            <div className="modal-actions">
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit">Publish job</button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div className="toast">
          <span>✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}
