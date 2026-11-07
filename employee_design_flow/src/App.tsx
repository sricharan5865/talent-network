import { FormEvent, useMemo, useState } from "react";

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
  | "spark";

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
  },
  {
    company: "Kiteworks",
    role: "Lead UX Designer",
    location: "Remote · India",
    salary: "₹28L – ₹38L",
    match: 91,
    color: "#1586b8",
  },
  {
    company: "OrbitPay",
    role: "Product Design Lead",
    location: "Mumbai · Hybrid",
    salary: "₹30L – ₹42L",
    match: 88,
    color: "#ef795d",
  },
];

const topNavGroups = [
  {
    label: "Discover",
    activeTargets: ["Discover", "Candidates"],
    items: [
      {
        label: "Dashboard",
        detail: "Your personalized talent overview",
        target: "Discover",
        icon: "grid" as IconName,
      },
      {
        label: "Search candidates",
        detail: "Advanced skills, salary and location search",
        target: "Candidates",
        icon: "search" as IconName,
      },
      {
        label: "Manage searches",
        detail: "Recent searches, saved criteria and alerts",
        target: "Candidates",
        icon: "clock" as IconName,
      },
      {
        label: "Talent folders",
        detail: "Organize candidates into shared pools",
        target: "Candidates",
        icon: "users" as IconName,
      },
    ],
  },
  {
    label: "Apply & Prepare",
    activeTargets: ["Jobs", "Interviews", "Outreach"],
    items: [
      {
        label: "Jobs & responses",
        detail: "Manage postings, applications and pipelines",
        target: "Jobs",
        icon: "briefcase" as IconName,
      },
      {
        label: "Send personalized invite",
        detail: "AI-assisted candidate outreach campaigns",
        target: "Outreach",
        icon: "message" as IconName,
      },
      {
        label: "Talent requirements",
        detail: "Convert job requirements into sourcing plans",
        target: "Jobs",
        icon: "spark" as IconName,
      },
      {
        label: "Interview management",
        detail: "Schedule interviews and collect feedback",
        target: "Interviews",
        icon: "calendar" as IconName,
      },
    ],
  },
  {
    label: "Identity & Settings",
    activeTargets: ["Analytics", "Settings"],
    items: [
      {
        label: "Company profile",
        detail: "Brand, locations and hiring preferences",
        target: "Discover",
        icon: "briefcase" as IconName,
      },
      {
        label: "Team and access",
        detail: "Recruiter roles, permissions and collaboration",
        target: "Settings",
        icon: "users" as IconName,
      },
      {
        label: "Analytics",
        detail: "Activity and performance insights",
        target: "Analytics",
        icon: "chart" as IconName,
      },
      {
        label: "Account settings",
        detail: "Privacy, alerts and permissions",
        target: "Settings",
        icon: "settings" as IconName,
      },
    ],
  },
];

function CandidateDashboard({ notify }: { notify: (message: string) => void }) {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  function toggleSaved(role: string) {
    setSavedJobs((current) =>
      current.includes(role) ? current.filter((item) => item !== role) : [...current, role],
    );
    notify(savedJobs.includes(role) ? "Removed from saved jobs" : "Job saved");
  }

  return (
    <>
      <div className="product-banner">
        <span>
          <Icon name="spark" size={18} /> New
        </span>
        <strong>Application Studio: tailor your resume to any job in one click</strong>
        <button onClick={() => notify("Application Studio opened")}>
          Try it now <Icon name="arrow" size={16} />
        </button>
      </div>
      <div className="candidate-home">
        <aside className="candidate-home-rail">
          <section className="profile-completion-card">
            <div className="completion-ring">
              <span>PS</span>
            </div>
            <b>82% complete</b>
            <h2>Priya Sharma</h2>
            <p>Senior Product Designer</p>
            <small>Razorpay · Bengaluru</small>
            <em>Last updated 2 days ago</em>
            <button onClick={() => notify("Profile editor opened")}>Complete profile</button>
          </section>
          <section className="candidate-quick-links">
            {[
              ["briefcase", "My applications", "5"],
              ["calendar", "Interviews", "2"],
              ["message", "Saved jobs", "7"],
              ["users", "Profile views", "12"],
            ].map(([icon, label, count]) => (
              <button onClick={() => notify(`${label} opened`)} key={label}>
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
              <button onClick={() => notify("Interview preparation guide opened")}>
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
              <button onClick={() => notify("All recommendations opened")}>View all</button>
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
                    <button onClick={() => notify(`Opening ${job.role}`)}>View role</button>
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

export default function App() {
  const [active, setActive] = useState("Discover");
  const [query, setQuery] = useState("");
  const [jobFilter, setJobFilter] = useState<"All" | "Active" | "Paused">("All");
  const [mobileNav, setMobileNav] = useState(false);
  const [openTopMenu, setOpenTopMenu] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const [jobs, setJobs] = useState(initialJobs);

  const visibleJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          (jobFilter === "All" || job.status === jobFilter) &&
          job.role.toLowerCase().includes(query.toLowerCase()),
      ),
    [jobs, jobFilter, query],
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

  function handleNav(label: string) {
    setActive(label);
    setMobileNav(false);
    setOpenTopMenu(null);
    if (label !== "Discover") {
      setToast(`${label} workspace selected`);
      window.setTimeout(() => setToast(""), 2200);
    }
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span>Talent Network</span>
          <button
            className="mobile-close"
            onClick={() => setMobileNav(false)}
            aria-label="Close navigation"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav className="primary-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {nav.map((item) => (
            <button
              className={active === item.label ? "active" : ""}
              key={item.label}
              onClick={() => handleNav(item.label)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.count && <span className="nav-count">{item.count}</span>}
              {item.dot && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            onClick={() => handleNav("Settings")}
            className={active === "Settings" ? "active" : ""}
          >
            <Icon name="settings" size={19} />
            <span>Settings</span>
          </button>
          <div className="hire-card">
            <span className="spark-icon">
              <Icon name="spark" size={18} />
            </span>
            <strong>Application Studio</strong>
            <p>Tailor your resume to a role with guided AI.</p>
            <button onClick={() => handleNav("Discover")}>
              Open studio <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="user-card">
            <div className="avatar avatar-main">PS</div>
            <div>
              <strong>Priya Sharma</strong>
              <span>Senior Product Designer</span>
            </div>
            <Icon name="more" size={18} />
          </div>
        </div>
      </aside>

      {mobileNav && (
        <button
          className="backdrop"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation overlay"
        />
      )}

      <main>
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileNav(true)}
            aria-label="Open navigation"
          >
            <Icon name="menu" />
          </button>
          <button className="desktop-brand" onClick={() => handleNav("Discover")}>
            <span className="brand-mark">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <b>Talent Network</b>
          </button>
          <nav className="desktop-nav" aria-label="Desktop navigation">
            {topNavGroups.map((group) => (
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
              placeholder="Search jobs here"
              aria-label="Search"
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <button className="icon-button has-alert" aria-label="Notifications">
              <Icon name="bell" size={20} />
            </button>
            <button
              className="top-menu-button"
              onClick={() => setMobileNav(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" size={19} />
            </button>
            <button className="top-profile" onClick={() => setToast("Profile menu opened")}>
              PS
            </button>
          </div>
        </header>

        {active === "Discover" ? (
          <CandidateDashboard
            notify={(message) => {
              setToast(message);
              window.setTimeout(() => setToast(""), 2600);
            }}
          />
        ) : active === "Candidates" ? (
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
          <div className="content">
            <section className="page-heading">
              <div>
                <p className="eyebrow">MONDAY, JUNE 24</p>
                <h1>Good morning, Anika</h1>
                <p>Here’s what’s happening with your hiring today.</p>
              </div>
              <button className="mobile-create" onClick={() => setShowModal(true)}>
                <Icon name="plus" size={18} /> New job
              </button>
            </section>

            <section className="metrics-grid" aria-label="Recruitment metrics">
              <article className="metric-card">
                <div className="metric-top">
                  <span className="metric-icon violet">
                    <Icon name="briefcase" size={19} />
                  </span>
                  <span className="trend up">↑ 8.4%</span>
                </div>
                <span>Open roles</span>
                <strong>18</strong>
                <small>4 closing this week</small>
              </article>
              <article className="metric-card">
                <div className="metric-top">
                  <span className="metric-icon blue">
                    <Icon name="users" size={19} />
                  </span>
                  <span className="trend up">↑ 12.6%</span>
                </div>
                <span>Total candidates</span>
                <strong>284</strong>
                <small>32 new this week</small>
              </article>
              <article className="metric-card">
                <div className="metric-top">
                  <span className="metric-icon orange">
                    <Icon name="calendar" size={19} />
                  </span>
                  <span className="trend">This week</span>
                </div>
                <span>Interviews</span>
                <strong>26</strong>
                <small>5 scheduled today</small>
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
                <small>Above 78% average</small>
              </article>
            </section>

            <section className="dashboard-grid">
              <article className="panel activity-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Hiring activity</h2>
                    <p>Candidate movement across your pipeline</p>
                  </div>
                  <button className="select-button">
                    Last 30 days <Icon name="chevron" size={14} />
                  </button>
                </div>
                <div className="activity-body">
                  <div className="chart-wrap">
                    <div className="chart-value">
                      <strong>462</strong>
                      <span>Total activity</span>
                    </div>
                    <svg
                      className="line-chart"
                      viewBox="0 0 600 200"
                      preserveAspectRatio="none"
                      role="img"
                      aria-label="Hiring activity rose over the last 30 days"
                    >
                      <defs>
                        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#7655dd" stopOpacity=".22" />
                          <stop offset="100%" stopColor="#7655dd" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path className="grid-line" d="M0 40H600M0 90H600M0 140H600M0 190H600" />
                      <path
                        className="area"
                        d="M0 170 C45 160 65 140 105 150 S165 125 205 135 S255 70 300 104 S365 110 405 78 S465 95 510 48 S560 60 600 24 V200 H0Z"
                      />
                      <path
                        className="line"
                        d="M0 170 C45 160 65 140 105 150 S165 125 205 135 S255 70 300 104 S365 110 405 78 S465 95 510 48 S560 60 600 24"
                      />
                      <circle cx="600" cy="24" r="5" />
                    </svg>
                    <div className="chart-labels">
                      <span>May 26</span>
                      <span>Jun 2</span>
                      <span>Jun 9</span>
                      <span>Jun 16</span>
                      <span>Jun 23</span>
                    </div>
                  </div>
                  <div className="funnel">
                    <h3>Hiring funnel</h3>
                    {funnel.map((stage) => (
                      <div className="funnel-row" key={stage.label}>
                        <div>
                          <span>{stage.label}</span>
                          <strong>{stage.value}</strong>
                        </div>
                        <div className="funnel-track">
                          <span style={{ width: `${stage.width}%`, background: stage.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="panel interview-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Today’s interviews</h2>
                    <p>5 interviews scheduled</p>
                  </div>
                  <button className="text-link" onClick={() => handleNav("Interviews")}>
                    View all
                  </button>
                </div>
                <div className="date-banner">
                  <span>24</span>
                  <div>
                    <strong>Monday</strong>
                    <small>June 2024</small>
                  </div>
                  <div className="date-avatars">
                    <i>+2</i>
                  </div>
                </div>
                <div className="interview-list">
                  {interviews.map((person) => (
                    <button
                      className="interview-row"
                      key={person.name}
                      onClick={() => setToast(`Opening interview with ${person.name}`)}
                    >
                      <span className="avatar" style={{ backgroundColor: person.color }}>
                        {person.initials}
                      </span>
                      <span>
                        <strong>{person.name}</strong>
                        <small>{person.role}</small>
                      </span>
                      <time>
                        <Icon name="clock" size={14} /> {person.time}
                      </time>
                    </button>
                  ))}
                </div>
                <button className="calendar-button" onClick={() => handleNav("Interviews")}>
                  Open calendar <Icon name="arrow" size={15} />
                </button>
              </article>

              <article className="panel roles-panel">
                <div className="panel-heading roles-heading">
                  <div>
                    <h2>Open roles</h2>
                    <p>Track and manage active job listings</p>
                  </div>
                  <div className="role-tools">
                    <div className="filter-tabs">
                      {(["All", "Active", "Paused"] as const).map((filter) => (
                        <button
                          className={jobFilter === filter ? "selected" : ""}
                          onClick={() => setJobFilter(filter)}
                          key={filter}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <button className="text-link" onClick={() => handleNav("Jobs")}>
                      View all jobs
                    </button>
                  </div>
                </div>
                <div className="role-table">
                  <div className="role-head">
                    <span>ROLE</span>
                    <span>CANDIDATES</span>
                    <span>POSTED</span>
                    <span>STATUS</span>
                    <span></span>
                  </div>
                  {visibleJobs.length ? (
                    visibleJobs.map((job) => (
                      <div className="role-row" key={job.role}>
                        <span className="role-name">
                          <i style={{ background: job.color }}>{job.role.charAt(0)}</i>
                          <span>
                            <strong>{job.role}</strong>
                            <small>{job.dept}</small>
                          </span>
                        </span>
                        <span className="candidate-count">
                          <b>{job.candidates}</b>
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
                        <button aria-label={`More options for ${job.role}`}>
                          <Icon name="more" size={18} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">No roles match your search.</div>
                  )}
                </div>
              </article>
            </section>
          </div>
        )}
      </main>

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
            <p>Start attracting the right candidates to your team.</p>
            <label>
              Job title
              <input name="role" placeholder="e.g. Senior Product Designer" required autoFocus />
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
