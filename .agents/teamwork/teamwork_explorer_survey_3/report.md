# TalentFlow Navigation Architecture & Mock Data Model Report
**Author**: Explorer 3 (`teamwork_explorer_survey_3`)  
**Mission**: Map all user journeys, navigation state, interactive transitions, and the comprehensive data model needed to power TalentFlow.  
**Date**: November 2026  
**Reference Material**:
- 33 reference screenshots in `C:\Users\SRI CHARAN\Documents\pic for talenflow design`
- 108 screens cataloged in `c:\Users\SRI CHARAN\Desktop\talent\Talent_Network_UI_Screen_Inventory_v2.xlsx`
- Authoritative requirements in `ORIGINAL_REQUEST.md`

---

## 1. Executive Summary & Synthesis

An exhaustive analysis of the reference screenshots in `C:\Users\SRI CHARAN\Documents\pic for talenflow design` reveals that the visual design and UX workflow represent a **high-volume, enterprise-grade Talent Network & Sourcing Suite** (inspired by leading platforms such as Naukri Recruiter / Resdex / NVite, integrated with modern AI ATS capabilities).

### Core Discoveries:
1. **The Primary Workflow Engine is Resdex + NVite + Response Management**:
   - **Employer Dashboard**: Focuses on quota tracking (CV Access, NVite quota, Hot Vacancies), recent job postings, saved searches, Resdex folders (talent pools), and upcoming webinar education.
   - **Resdex Search (Advanced Candidate Discovery)**: Multi-attribute parametric search with autocomplete pill tags, Boolean search toggles, mandatory vs optional criteria, salary ranges in Lakhs (INR), and expandable deep-filter accordions (Employment Details, Education Course Selectors, Diversity Hiring categories, Age/Work Permits, and Profile Freshness).
   - **AI-Matched Search Results**: Surfaces millions of ranked profiles with bulk actions (Save Search, Add to Folder/Pool, Set Reminder, Switch to NVite).
   - **Targeted NVite Outreach**: Multi-step broadcast workflow (Preferences Modal -> Candidate Selection -> NVite Composer -> Multi-channel Broadcast via Email, Push, and Inbox with AI smart targeting booster).
   - **Manage Jobs and Responses**: Requisition listing partitioned by status (Active 27, Closed 3, Expired 40) and category (Hot Vacancy, NVite, Private), with real-time response counters and Resdex recommendation numbers.
   - **Applicant Responses Pipeline**: Per-job candidate inbox with stage tabs (`All responses`, `Shortlisted`, `Maybe`, `Rejected`), sub-status chips (`New responses`, `Not viewed`, `Action pending`), channel telemetry (Web, Push, Email), and rich candidate cards displaying compensation, notice period, previous employer, education, and direct contact actions.
2. **Current Codebase Gap**:
   - The current `src/pages/EmployerPages.tsx` and `src/data/mockData.ts` contain only generic mock lists (e.g. 5 simple candidate rows, minimal filters, generic jobs).
   - The 33 reference screenshots provide exact, authentic data (e.g., candidate profiles for Pawar Mukesh, Balgare Kailash, M Arunkumar; exact quota figures like 4,000 CV access, 32,000 NVite; specific job posts like "Sr GIS Analyst - Database", "Us It Recruiter", "IoT Engineer").
   - Implementing this full suite requires expanding the navigation structure, adding dedicated views/overlays, and establishing a unified, type-safe Mock Data Model.

---

## 2. Complete Navigation Hierarchy & User Journeys

### 2.1 Global App Shell

The platform requires a responsive, high-density App Shell that supports multiple layout styles (Topnav, Sidebar, Dock) while strictly honoring the navigation patterns from the reference screenshots.

```
+----------------------------------------------------------------------------------------------------+
| [Logo] TalentFlow  |  Jobs & Responses [v]  |  Resdex [v]  |  Reports [v]  |  [Portal Switcher: Emp/Cand/Rec/Adm] |
| Search: [Ctrl+K]              [Clock History]  [Search]  [Bookmark]  [Bell Notifications (3)]  [User Avatar] [App Grid] |
+----------------------------------------------------------------------------------------------------+
```

#### Global Header Elements:
1. **Brand Identity**: `TalentFlow` / `Naukri Talent Cloud` logo linking to `/employer`.
2. **Primary Menu Dropdowns**:
   - **`Jobs & Responses`**:
     - *Post a Hot Vacancy* [Active badge] -> opens Job Creation Wizard
     - *Post a SMB Job* -> opens Standard Job Form
     - *Post an Internship* [Active badge] -> opens Internship Form
     - *Manage Jobs & Responses* -> navigates to `/employer/jobs`
   - **`Resdex`**:
     - *Search Resumes* -> navigates to `/employer/candidates/search` (Advanced Search)
     - *Send NVite* -> navigates to `/employer/nvite/broadcast`
     - *Manage Searches* -> navigates to `/employer/candidates/saved-searches`
     - *Folders (Talent Pools)* -> navigates to `/employer/candidates/folders`
     - *Resdex Requirements* -> navigates to `/employer/candidates/requirements`
   - **`Reports & Analytics`**:
     - *Hiring Analytics* -> `/employer/analytics`
     - *Quota Usage & ROI* -> `/employer/analytics/quota`
     - *Recruiter Activity* -> `/employer/analytics/team`
3. **Utility & Quick Tools**:
   - **Global Search / Omnibar (`Ctrl+K`)**: Rapid candidate, requisition, or pool jumping.
   - **Recent Activity / History (Clock icon)**: Popover of last 10 viewed profiles & executed searches.
   - **Bookmarks / Saved Items**: Drawer of saved candidates and bookmarked jobs.
   - **Notification Center (Bell with badge)**: Real-time candidate replies, SLA warnings, interview acceptances.
   - **User Profile Menu**: Account settings, company verification status, billing, and logout (`sheela.nancy@ispatialtec.com`).
   - **App Grid (9 dots)**: Quick switch between Employer Portal, Recruiter CRM, Candidate Portal, and Admin Console.
   - **Floating Help Widget**: Persistent bottom-right floating trigger with instant recruiter support, tutorial links, and FAQ popover.

---

### 2.2 Primary Views & Screen Routing Architecture

```
/
├── /candidate                    (Candidate Portal - Career Passport & Applications)
│   ├── /jobs                     (Job Search Marketplace)
│   ├── /radar                    (Opportunity Radar & Market CTC)
│   ├── /applications             (Stage Tracker)
│   └── /profile                  (Career Passport & Resume Builder)
│
├── /employer                     (Employer Sourcing & ATS Suite)
│   ├── /                         (Employer Dashboard with Quotas, Jobs, Folders & Searches)
│   ├── /jobs                     (Manage Jobs and Responses - Listing & Filters)
│   ├── /jobs/new                 (Job Creation Wizard - Hot Vacancy / Standard)
│   ├── /jobs/:jobId/responses    (Job Responses Pipeline & Applicant Management)
│   ├── /candidates/search        (Resdex Advanced Candidate Search Form)
│   ├── /candidates/results       (AI Search Results & Candidate Discovery Grid)
│   ├── /candidates/:id           (Candidate Detailed Profile & Evaluation)
│   ├── /candidates/folders       (Talent Pools / Resdex Folders Management)
│   ├── /nvite/broadcast          (NVite Multi-step Outreach Broadcast Campaign)
│   ├── /pipeline                 (Full Drag-and-Drop Kanban ATS Board)
│   ├── /communication            (Unified Candidate Messaging - Email & WhatsApp)
│   ├── /interviews               (Interview Scheduling & Feedback Scorecards)
│   ├── /analytics                (Funnel Conversion & Sourcing Telemetry)
│   └── /settings                 (Company Settings, Team Invites & Quota Subscriptions)
│
├── /recruiter                    (Agency Recruiter Workspace & Mandates)
│   ├── /mandates                 (Client Requisitions & SLAs)
│   ├── /clients                  (Accounts & Commercial Terms)
│   ├── /sourcing                 (Recruiter AI Radar)
│   └── /placements               (Fee Invoicing & Placements)
│
└── /admin                        (Platform Admin & Multi-tenant Governance)
```

---

### 2.3 Detailed Screen Flows & Interactive States

#### Flow 1: Employer Dashboard (`/employer`)
- **Banner**: AmbitionBox Employee Choice Awards celebration banner with CTA "Invite your employees to rate".
- **Quota Usage Section**: 3 responsive KPI cards:
  - `RESDEX: 4,000 CV Access` (2,228 used, 1,772 left, progress bar, 1/1 licenses assigned).
  - `RESDEX: 32,000 NVite` (18,648 used, 13,352 left, progress bar, 1/1 licenses assigned).
  - `JOB POSTING: 20 Hot Vacancies` (18 used, 2 left, 2/1000 users assigned).
- **Webinars Card**: Scheduled live webinars ("Job Posting Essentials", "Resdex Essentials", "View all webinars").
- **Job Postings Card**: Condensed table of active postings with "View all jobs" button linking to `/employer/jobs`.
- **Resdex Searches Card**: Recent searches pill tags ("aws, azure...", "IT, rfp writer...", "pre-sales...") and saved searches ("GIS Developer") with direct execution triggers.
- **Resdex Folders Card**: Folder list ("PCB (138)", "Program Manager (0)", "sitecore (152)", "Office administrator (40)") with "View all resdex folders" button.

#### Flow 2: Resdex Advanced Candidate Search (`/employer/candidates/search`)
- **Tabs**: `Search candidates` (selected) vs `Send NVite`.
- **Webinar Promo Banner**: Dismissible banner with link to reserve training webinar slot.
- **Parametric Form Controls**:
  - *Keywords Input*: Multi-term tag input with autocomplete suggestions (e.g. typing "java" yields Java, Core Java, Javascript, J2EE, Javafx). Clicking or hitting Enter creates a removable pill tag. Star icon toggles mandatory requirement. Includes Boolean toggle (Boolean ON/OFF), exclude keywords link, and IT skills selector.
  - *Experience Range*: Min experience to Max experience (Years).
  - *Candidate Location*: Location autocomplete + "Include candidates who prefer to relocate" checkbox + "Exclude candidates who have mentioned Anywhere in..." checkbox.
  - *Annual Salary*: Currency selector (`INR`) + Min to Max (Lacs) + "Include candidates who did not mention current salary" checkbox.
  - *Accordion 1 - Employment Details*: Department & Role suggestions, Industry selector, Company name (with dropdown for Current company / Previous company / Both), Designation input, and Notice Period pills (`Any`, `0-15 days`, `1 month`, `2 months`, `3 months`, `Serving notice`).
  - *Accordion 2 - Education Details*: UG Qualification (`Any UG`, `Specific UG`, `No UG`) with dynamic course selector dropdown (Engineering, Computers, Management, Medical, etc.) and Passing year range; PG Qualification; Doctorate link.
  - *Accordion 3 - Diversity Hiring (New Add-on)*: Gender pills (`All`, `Male`, `Female`), Career Break (`Women returning to work`), Differently-abled category pills (Blindness, Low Vision, Locomotor, +17 more), Defence background personnel (Army, Navy, Air Force).
  - *Accordion 4 - Additional Details*: Candidate category, Age range (Min to Max Years), Seeking Job type/Employment type, Work permit checkboxes (US, India, Australia, Bahrain, Belgium, Canada, etc.).
  - *Accordion 5 - Display Freshness*: Show (`All candidates`, `New registrations`, `Modified`), Show only (`Verified mobile`, `Verified email`, `Attached resume`), Active in dropdown (`3 days`, `7 days`, `15 days`, `30 days`, `2 months`, `3 months`, `6 months`).
- **Right Sidebar**: Sticky panel with Recent Searches and Saved Searches featuring 1-click query population.

#### Flow 3: Search Results & AI Match (`/employer/candidates/results`)
- **AI Summary Header**: Dynamic result header: `AI found 15,97,293 profiles for java, Male candidates` with "Modify" search link.
- **Top Bar**: "Save Search" CTA button, Freshness filter dropdown (`Active in 6 months`), Sort dropdown (`Relevance`), Page size selector (`Show 40`), and Full pagination controls (`Page 1 of 39933`).
- **Bulk Action Toolbar**: "Select all" checkbox, "Add to Folder/Talent Pool" dropdown, "Set reminder" dropdown, and "Want to email candidates? Switch to NVite" action link.
- **Candidate Result Cards**:
  - Checkbox for multi-selection.
  - Identity & Status: Name, Recommended tag, Experience, CTC in Lacs, Notice period / Joining timeline, Location.
  - Career Timeline: Current role & company, Previous role & company, Education degree, college, and passing year.
  - Skill Chips: Complete list of highlighted matched keywords.
  - Mini Profile Card: Candidate photo avatar, professional summary headline, "Contact | Status [v]" dropdown, "Call from app ->" link, and direct action icons (Mail, Share, WhatsApp).
  - Decision Buttons: "Add comment", "Shortlist", "Maybe", "Reject", Delete.

#### Flow 4: NVite Multi-Step Broadcast Campaign (`/employer/nvite/broadcast`)
- **Step 1: Targeting Preferences Modal**:
  - Modal prompt: "NVite - Before you proceed, add these preferences for relevant targeting".
  - Refines Experience range (dropdown selectors: 0 to 10+ years), Location, Relocation willingness, Current annual salary range.
- **Step 2: Workflow Breadcrumb**:
  - `[Paper Airplane] Send NVite` -> `500 candidates selected` -> `Compose details`.
- **Step 3: Campaign Setup**:
  - Mode Selection: Radio choice between `Create new` ("All responses will appear as a new item in Manage Jobs and Responses") and `Use a previous one/posted job` ("Responses will be clubbed with a previous NVite/posted job").
  - Form Fields: "Pre-fill details using a previous NVite" link, Designation input (with suggestions: Software Engineer, Software Developer), Work mode dropdown (`In office`, `Hybrid`, `Remote`), Key skills chips, Experience range, Annual offered salary, Job description rich text editor, Roles & Responsibilities list.
  - Collaboration settings: Managed by `sheela.nancy@ispatialtec.com (Me)`, add teammate notifications.
  - Multi-channel delivery breakdown: App notification + Email + Naukri inbox.
  - AI Outreach Booster (Beta): "Allow Naukri to get more applies by reaching out to additional matching candidates [No extra cost]" toggle.
  - Sticky bottom action bar: "Reaching out to 500 candidates" | `[Preview]` `[Send now]`.

#### Flow 5: Manage Jobs and Responses (`/employer/jobs`)
- **Header**: "Manage Jobs and Responses" title, "Responses to your jobs and NVites will appear here", and "Post job [v]" dropdown button.
- **Tabs**: `All Jobs 70` vs `Drafts 0`.
- **Left Filter Sidebar**:
  - Search by Title / Ref Code / Job ID input.
  - Job Status checkboxes: `Active Jobs (27)`, `Closed Jobs (3)`, `Expired Jobs (40)`.
  - Category checkboxes: `NVite (52)`, `Private (33)`, `Hot Vacancy (21)`.
  - Job posted by: `Me (70)`.
- **Action Toolbar**: `Select All`, `Refresh`, `Collaborate`, `Close`, `Sort by: Posted/sent date [v]`.
- **Requisition List Cards**:
  - Requisition title (e.g., "Infrastructure Specialist", "Sr GIS Analyst - Database", "Us It Recruiter", "IoT Engineer").
  - Badge type: `NVite` vs `Hot Vacancy`.
  - Location and posted date.
  - Key Metrics: `Total Responses` (with `33 New` / `2 New` badge), `Shortlisted` count, `Resdex recommended` count.
  - Quick actions: Refresh/Re-promote button, Edit job icon, Context menu (`...`).
  - Clicking any row navigates directly to that job's applicant pipeline view (`/employer/jobs/:jobId/responses`).

#### Flow 6: Job Responses Pipeline View (`/employer/jobs/:jobId/responses`)
- **Breadcrumbs & Requisition Header**:
  - `All Jobs > Us It Recruiter [Active badge]`.
  - Right tools: `Share job`, `NVite insights from last 90 days: Sent to 867 candidates | View rate 38% | Response rate 9%`, `[Chart] Insights` button.
- **Left Panel**:
  - Inboxes: `Apply Inbox (80)` vs `Others (0)`.
  - Filter Drawer: AI-recommendations (1), Keywords, Location, Locality, Experience, Notice period, Salary, Education, Diversity, Industry, Designation, Company, Department.
- **Pipeline Stage Tabs**:
  - `All responses (80)` | `Shortlisted (3)` | `Maybe (0)` | `Rejected (19)`.
  - Right telemetry: `NVite response breakdown: Desktop (23%) | App Push (16%) | Email (61%)`.
  - View switcher: `[Card List View]` vs `[Table View]`.
- **Sub-Filter Pills**:
  - `All (80)` | `New responses (2)` | `Not viewed (14)` | `Action pending (58)`.
- **Bulk Action Strip**:
  - `Select all` | `Shortlist` | `Reject` | `Email` | `Download` | `Delete`.
- **Interactive Candidate Cards**: Complete applicant records (e.g. M Arunkumar, Pawar Mukesh, Balgare Kailash) with direct status transition triggers.

---

### 2.4 Interactive Overlays, Drawers & Modals

| Overlay Component | Trigger | Purpose & Interactive Behavior |
|---|---|---|
| **Candidate Quick-View Drawer** | Clicking candidate name/avatar anywhere in tables or search results | Slides in from right (width: 580px). Displays full resume, structured timeline, skill badges, contact details, notes thread, and interview scorecard without losing search context. |
| **Add Candidate / Resume Upload Modal** | "Add candidate" or "Bulk upload" button | Multi-tab modal: Drag-and-drop resume parser (PDF/DOCX), manual profile entry, and CSV import with column mapping. |
| **Create Talent Pool / Folder Modal** | "Add to Folder" or "Create new folder" button | Creates named pool (e.g. "PCB", "Java Backend Experts"), assigns tags, color label, and initial candidate membership. |
| **NVite Target Preferences Modal** | "Switch to NVite" from search results | Configures target candidate criteria (experience, salary, notice period) prior to launching broadcast composer. |
| **NVite Preview & Confirm Dialog** | "Preview" button in NVite broadcast flow | Renders simulated candidate email, push notification, and Naukri inbox preview before deducting quota. |
| **Status Change & Feedback Dialog** | Clicking "Shortlist", "Maybe", or "Reject" | Prompts optional recruiter feedback tag (e.g., "Salary out of range", "Notice period too long", "Strong technical match") and triggers automated candidate notification. |
| **Candidate Comparison Drawer** | Selecting 2-4 candidates and clicking "Compare" | Side-by-side matrix comparing experience, CTC, skill coverage against job requisition, and panel interview scores. |
| **Filter Popovers & Autocomplete Menus** | Clicking input fields (Keywords, Courses, Locations, Companies) | Floats context-aware suggestion menus with keyboard navigation (`ArrowUp`/`ArrowDown`/`Enter`) and `Ctrl`-click mandatory toggling. |

---

## 3. Complete Mock Data Model & TypeScript Schemas

To ensure exact visual and data fidelity with the reference images, the mock data model must support Indian recruitment conventions (CTC in Lakhs, notice period ranges, NVite broadcast metrics, university affiliations, diversity categories) alongside standard ATS entities.

### 3.1 Candidate Entity Schema

```typescript
export interface CandidateEducation {
  degree: string;             // e.g. "B.Tech / B.E."
  fieldOfStudy?: string;      // e.g. "Computer Science"
  institution: string;        // e.g. "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), LNCT Indore"
  graduationYear: number;     // e.g. 2016
  qualificationLevel: "UG" | "PG" | "Doctorate" | "Diploma";
}

export interface CandidateExperience {
  designation: string;        // e.g. "DevOps Engineer"
  company: string;            // e.g. "TalentPull & Infrastructure Pvt Ltd"
  duration: string;           // e.g. "3y 4m"
  isCurrent: boolean;
  location?: string;
  keyResponsibilities?: string[];
}

export interface Candidate {
  id: string;
  name: string;
  headline: string;           // e.g. "Cloud Professional with 9+ years of IT experience..."
  avatarUrl?: string;
  experienceYears: number;    // e.g. 9.4
  experienceFormatted: string;// e.g. "9y 5m"
  annualSalaryLacs: number;   // e.g. 13
  annualSalaryFormatted: string; // e.g. "₹ 13 Lacs"
  noticePeriod: string;       // e.g. "0-15d", "Serving notice", "1m notice", "30 days"
  currentLocation: string;    // e.g. "Bengaluru", "Hyderabad (Lingampally)"
  preferredLocations: string[]; // e.g. ["Pune", "Noida", "Mumbai", "Kolkata", "Chennai"]
  
  // Employment & Education
  currentRole?: string;
  currentCompany?: string;
  previousRole?: string;
  previousCompany?: string;
  education: CandidateEducation[];
  
  // Skills & Categorization
  skills: string[];           // e.g. ["Azure Cloud", "Terraform", "DevOps", "Kubernetes"]
  itSkills?: { name: string; version?: string; experienceYears?: number }[];
  diversityCategories?: ("Female" | "Career Break" | "Differently Abled" | "Defence Personnel")[];
  workPermits?: string[];     // e.g. ["India", "United States"]
  
  // Matching & Application Status
  matchScore: number;         // 0 - 100
  isRecommended?: boolean;
  status: "New" | "Action Pending" | "Shortlisted" | "Maybe" | "Rejected" | "Interview" | "Offered" | "Hired";
  appliedDate?: string;       // e.g. "4 Nov 2026"
  source: "NVite" | "Hot Vacancy" | "Resdex Search" | "Referral" | "Career Page";
  deliveryChannel?: "Web" | "Mobile Push" | "Email";
  
  // Contact & Verification
  phoneVerified: boolean;
  emailVerified: boolean;
  hasResumeAttached: boolean;
  phoneNumber?: string;
  emailAddress?: string;
  lastActive: string;         // e.g. "Active yesterday", "Active in 6 months"
  notes?: { id: string; author: string; content: string; date: string }[];
  commentsCount: number;
}
```

### 3.2 Job / Requisition Entity Schema

```typescript
export interface JobRequisition {
  id: string;
  title: string;              // e.g. "Infrastructure Specialist", "Sr GIS Analyst - Database"
  refCode?: string;           // e.g. "REQ-12390"
  department: string;         // e.g. "Cloud & DevOps", "Geospatial"
  location: string;           // e.g. "Hyderabad", "Bengaluru · Hybrid"
  workMode: "In office" | "Hybrid" | "Remote";
  category: "Hot Vacancy" | "NVite" | "Private";
  status: "Active" | "Closed" | "Expired" | "Draft";
  
  // Requirements & Compensation
  minExperienceYears: number;
  maxExperienceYears: number;
  salaryMinLacs: number;
  salaryMaxLacs: number;
  salaryFormatted: string;    // e.g. "₹ 5-15 Lacs", "₹ 60,000 to 1.5 lacs"
  requiredSkills: string[];
  jobDescription: string;
  rolesAndResponsibilities: string[];
  
  // Pipeline & Response Counts
  totalResponses: number;     // e.g. 144
  newResponsesCount: number;  // e.g. 33
  shortlistedCount: number;   // e.g. 5
  maybeCount: number;         // e.g. 0
  rejectedCount: number;      // e.g. 19
  notViewedCount: number;     // e.g. 14
  actionPendingCount: number; // e.g. 58
  resdexRecommendedCount: number; // e.g. 150
  
  // NVite Campaign Telemetry
  campaignStats?: {
    candidatesSent: number;   // e.g. 867
    viewRatePercent: number;  // e.g. 38%
    responseRatePercent: number; // e.g. 9%
    channelBreakdown: {
      webPercent: number;     // e.g. 23%
      pushPercent: number;    // e.g. 16%
      emailPercent: number;   // e.g. 61%
    };
  };
  
  // Ownership & Dates
  postedBy: string;           // e.g. "sheela.nancy@ispatialtec.com (Me)"
  postedDate: string;         // e.g. "03 Nov 2026"
  modifiedDate: string;       // e.g. "03-Nov-2026"
  expiresInDays?: number;
}
```

### 3.3 Talent Pool / Resdex Folder Entity Schema

```typescript
export interface TalentPoolFolder {
  id: string;
  name: string;               // e.g. "PCB", "Program Manager", "sitecore", "Office administrator"
  description?: string;
  profileCount: number;       // e.g. 138, 0, 152, 40
  createdDate: string;        // e.g. "25-Jun-26", "09-Sept-23"
  candidateIds: string[];
  tags: string[];
  isPrivate: boolean;
}
```

### 3.4 Quotas & Subscription Usage Entity Schema

```typescript
export interface QuotaSubscription {
  type: "RESDEX_CV_ACCESS" | "RESDEX_NVITE" | "JOB_POSTING_HOT_VACANCY";
  title: string;              // e.g. "4,000 CV Access", "32,000 NVite", "20 Hot Vacancies"
  totalQuota: number;
  usedQuota: number;
  remainingQuota: number;
  unit: "CVs" | "NVites" | "Vacancies";
  assignedUsers: string;      // e.g. "1/1 licenses assigned", "2/1000 users assigned"
  renewalDate: string;
}
```

### 3.5 Saved Search & Recent Query Schema

```typescript
export interface SavedSearch {
  id: string;
  name: string;               // e.g. "GIS Developer"
  rawQuery: string;           // e.g. '"GIS Developer", esri, html, javascript'
  newProfilesCount: number;   // e.g. 10
  filters: Record<string, any>;
  lastRunDate: string;
}

export interface RecentSearchItem {
  id: string;
  displayText: string;        // e.g. "aws, azure, oci | infrastructure, certified | >=4 years | Hyderabad"
  keywords: string[];
  experienceMin?: number;
  location?: string;
  timestamp: string;
}
```

---

## 4. State Management Architecture Recommendations

To ensure fluid transitions across the 33 reference screens without page reloads or layout thrashing, we formulate an enterprise state architecture built on standard React primitives and `react-router`.

```
+-----------------------------------------------------------------------------------------+
|                                    React Router v7                                      |
|                 URL Search Params (?query=...&expMin=...&activeTab=...)                 |
+-----------------------------------------------------------------------------------------+
       |                                                                   |
+---------------------------------------+        +----------------------------------------+
|       Global Sourcing Context         |        |         Local View State               |
|  - Auth & Recruiter Identity          |        |  - Accordion open/collapse states      |
|  - Quota Usage (CVs, NVites, Jobs)    |        |  - Autocomplete query & suggestion list|
|  - Saved Searches & Folders/Pools     |        |  - Checkbox selection (Select All)     |
|  - Notifications & Activity Timeline  |        |  - Active sub-filter pills (New, Action|
+---------------------------------------+        +----------------------------------------+
       |                                                                   |
       +-----------------------------------+-------------------------------+
                                           |
                +---------------------------------------------------+
                |             Interactive Overlay Manager           |
                |  - Quick-view Slide-over Drawer (Candidate ID)    |
                |  - NVite Target Preferences Modal                 |
                |  - NVite Preview & Broadcast Confirmation         |
                |  - Status Feedback & Reject Reason Popover        |
                +---------------------------------------------------+
```

### 4.1 URL Search Parameters for Search & Filters
- All search parameters (keywords, experience, salary, location, notice period, active fresh period) should be synchronized with URL search params (`useSearchParams()`).
- **Benefits**:
  - Direct deep-linking and bookmarking (e.g. `/employer/candidates/search?kw=java&expMin=2&expMax=6`).
  - Seamless back/forward browser navigation between search results and candidate profile.
  - Zero loss of applied filters when switching tabs between `All responses`, `Shortlisted`, and `Rejected`.

### 4.2 Candidate Selection & Batch Actions State
- In both Search Results (`/employer/candidates/results`) and Job Pipeline (`/employer/jobs/:id/responses`), recruiters execute bulk operations.
- State model:
  ```typescript
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<Set<string>>(new Set());
  // Computed helpers:
  const isAllSelected = candidates.length > 0 && selectedCandidateIds.size === candidates.length;
  const isIndeterminate = selectedCandidateIds.size > 0 && selectedCandidateIds.size < candidates.length;
  ```
- Toolbar actions (`Shortlist`, `Reject`, `Email`, `Add to Folder`) operate over `selectedCandidateIds` and provide immediate visual feedback via toast notifications and optimistic state updates.

### 4.3 Coordinated Slide-over Drawer State
- Clicking on a candidate card opens the **Candidate Quick-View Drawer** without leaving the search results or applicant pipeline.
- State model:
  ```typescript
  const [activeDrawerCandidateId, setActiveDrawerCandidateId] = useState<string | null>(null);
  ```
- Allows recruiters to review 20+ resumes sequentially using `Prev Candidate` / `Next Candidate` keyboard shortcuts (`ArrowLeft`/`ArrowRight`), drastically accelerating evaluation speed.

---

## 5. Screen Inventory & Visual Cross-Reference

Below is the definitive cross-reference mapping between the 33 reference screenshots in `C:\Users\SRI CHARAN\Documents\pic for talenflow design`, the Excel catalog in `Talent_Network_UI_Screen_Inventory_v2.xlsx`, and the target implementation components.

| Screenshot File | Key Visual Content & Data Elements | Screen ID | Target Route / Component |
|---|---|---|---|
| `Screenshot 2026-11-06 175531.png` | Public Logout / Login landing: "TALENT DECODED: Decode India's largest talent pool with the power of AI", 10 crore+ registered jobseekers, Login launcher form for `sheela.nancy@ispatialtec.com`. | `TN-001`, `TN-004` | `/employer/login`, `/` |
| `Screenshot 2026-11-06 175541.png` | Employer Dashboard top: Top navigation with Jobs & Responses, Resdex, Reports; Welcome greeting; AmbitionBox banner; Quota usage cards (4,000 CV Access, 32,000 NVite, 20 Hot Vacancies); Upcoming webinars card. | `TN-039` | `/employer` (`EmployerDashboard`) |
| `Screenshot 2026-11-06 175546.png` | Employer Dashboard middle: "Job Postings" table showing recently posted jobs ("Sr GIS Analyst - Database", "IoT Engineer"), applies (144, 72), CV received. | `TN-039`, `TN-045` | `/employer` (`EmployerDashboard`) |
| `Screenshot 2026-11-06 175553.png` | Employer Dashboard lower: "Resdex Searches" card with recent search pill tags ("aws, azure...", "IT, rfp writer...") and saved searches ("GIS Developer"); "View all jobs" and "View all saved searches" buttons. | `TN-039`, `TN-049` | `/employer` (`EmployerDashboard`) |
| `Screenshot 2026-11-06 175557.png` | Employer Dashboard bottom: "Resdex Folders" card listing talent pools ("PCB", "Program Manager", "sitecore", "Office administrator") with profile counts and creation dates. | `TN-039`, `TN-050` | `/employer` (`EmployerDashboard`) |
| `Screenshot 2026-11-06 175608.png` | Navbar dropdown open: "Jobs & Responses" menu (Post a Hot Vacancy, Post a SMB Job, Post an Internship, Manage Jobs & Responses) over Resdex search form. | `TN-042`, `TN-045` | Global Navbar Dropdown |
| `Screenshot 2026-11-06 175617.png` | Manage Jobs and Responses page: Status filters (Active 27, Closed 3, Expired 40), Category filters (NVite 52, Private 33, Hot Vacancy 21), Requisition cards with response badges (Infrastructure Specialist 59, Sr GIS Analyst 144 with 33 New). | `TN-045` | `/employer/jobs` (`ManageJobsPage`) |
| `Screenshot 2026-11-06 175623.png` | Job Responses List: Left filter drawer, Candidate cards for "PAWAR MUKESH" (9y 5m, ₹13L, 0-15d notice) and "Balgare Kailash" (5y 2m, ₹8L, Serving notice), skills chips, "Call from app", "Add comment", "Shortlist", "Reject". | `TN-047`, `TN-048` | `/employer/jobs/:id/responses` |
| `Screenshot 2026-11-06 175626.png` | Visual crop element: candidate match indicator. | `TN-048` | Scorecard badge |
| `Screenshot 2026-11-06 175640.png` | Navbar dropdown open: "Resdex" menu (Search Resumes, Send NVite, Manage Searches, Folders, Resdex Requirements). | `TN-049`, `TN-050` | Global Navbar Dropdown |
| `Screenshot 2026-11-06 175652.png` | Resdex Search Header: Sub-tabs "Search candidates" vs "Send NVite", Free webinar promo banner, Keywords input with Boolean toggle. | `TN-049` | `/employer/candidates/search` |
| `Screenshot 2026-11-06 175717.png` | Keywords Autocomplete: Suggestion dropdown for "java" (Java, Core Java, Javascript, J2Ee, Javafx) with "Press 'Ctrl' to mark mandatory" hint; Location with relocation checkboxes; Annual salary Lacs input. | `TN-049` | Search Form Autocomplete |
| `Screenshot 2026-11-06 175725.png` | Keyword Pill Display: Selected keyword `[star] java [x]` with input prompt "Type another keyword". | `TN-049` | Search Form Pill Tag |
| `Screenshot 2026-11-06 175738.png` | Search Form Accordions: Closed accordions for "Employment Details [v]" and "Education Details [v]". | `TN-049` | Search Form Accordions |
| `Screenshot 2026-11-06 175747.png` | Search Form Diversity Accordion: Closed "Diversity Hiring [New Add-on] [v]". | `TN-049` | Search Form Diversity |
| `Screenshot 2026-11-06 175752.png` | Employment Details Expanded: Department & Role suggestions, Industry selector, Company name with current/previous scope, Designation. | `TN-049` | Search Form Employment Accordion |
| `Screenshot 2026-11-06 175755.png` | Notice Period Selector: Pills for "Any", "0-15 days +", "1 month +", "2 months +", "3 months +", "Currently serving notice period +". | `TN-049` | Search Form Notice Period |
| `Screenshot 2026-11-06 175808.png` | Notice period pills interactive hover and selection state. | `TN-049` | Search Form Notice Period |
| `Screenshot 2026-11-06 175826.png` | Education Details Expanded: UG Qualification (`Any UG`, `Specific UG`, `No UG`) and PG Qualification options. | `TN-049` | Search Form Education Accordion |
| `Screenshot 2026-11-06 175838.png` | Course Dropdown: Dropdown checklist for "Choose Course" (Recent Courses, Any Engineering, All Courses, Any Computers, Hotel-Management, etc.) and Passing year range. | `TN-049` | Course Multi-select Popover |
| `Screenshot 2026-11-06 175845.png` | Diversity Hiring Expanded: Gender selection, Career break (Women returning to work), Differently-abled categories (Blindness, Low Vision, etc.), Defence personnel (Army, Navy, Air Force). | `TN-049` | Diversity Hiring Accordion |
| `Screenshot 2026-11-06 175913.png` | Additional Details Expanded: Candidate category, Age range (Years), Seeking Job type & Employment type. | `TN-049` | Additional Details Accordion |
| `Screenshot 2026-11-06 175918.png` | Work Permit Dropdown: Checklist of countries (United States, India, Australia, Bahrain, Bangladesh, Belgium, Canada). | `TN-049` | Work Permit Selector |
| `Screenshot 2026-11-06 175934.png` | Display Freshness Details: Show (All, New, Modified), Show only (Verified mobile, Verified email, Attached resume), Active in dropdown (3 days to 6 months). | `TN-049` | Display Freshness Accordion |
| `Screenshot 2026-11-06 175950.png` | "Send NVite" Tab View: "Search candidates for NVite" form with right sidebar "Use your recent NVites" (Infrastructure Specialist, Us It Recruiter, Presales Coordinator). | `TN-054` | `/employer/nvite/search` |
| `Screenshot 2026-11-06 180011.png` | Search Results Header: "AI found 15,97,293 profiles for java, Male candidates", Save Search button, Active in 6 months, Sort by Relevance, Show 40, Pagination Page 1 of 39933, Bulk action bar. | `TN-049`, `TN-050` | `/employer/candidates/results` |
| `Screenshot 2026-11-06 180014.png` | NVite Preferences Modal: "NVite - Before you proceed, add these preferences for relevant targeting" (Experience dropdowns 0 to 5+, location, salary). | `TN-054` | NVite Preferences Modal |
| `Screenshot 2026-11-06 180140.png` | NVite Broadcast Composer: Steps (`Send NVite > 500 candidates selected > Compose details`), Mode (`Create new` vs `Use previous`), Designation suggestions, Work mode, Key skills, Work experience. | `TN-054` | `/employer/nvite/broadcast` |
| `Screenshot 2026-11-06 180151.png` | NVite Details Summary: Designation (Infrastructure Specialist), offered CTC (₹60,000 to 1.5 lacs), Job description, Roles & Responsibilities. | `TN-054` | NVite Broadcast Step 2 |
| `Screenshot 2026-11-06 180154.png` | NVite Broadcast Delivery & Channels: Collaborate with teammates, Delivery channels (App notification, Email, Naukri inbox), Beta AI smart apply booster, "Reaching out to 500 candidates", Preview & Send now buttons. | `TN-054` | NVite Broadcast Step 3 |
| `Screenshot 2026-11-06 180227.png` | Manage Jobs and Responses URL confirmation (`hiring.naukri.com/hiring/job-listing`) with full Requisition cards. | `TN-045` | `/employer/jobs` |
| `Screenshot 2026-11-06 180258.png` | Job Responses View (`hiring.naukri.com/hiring/221026822627/applies`): "All Jobs > Us It Recruiter", NVite insights (Sent to 867, View rate 38%, Response rate 9%), Pipeline stage tabs (All 80, Shortlisted 3, Maybe 0, Rejected 19), Sub-filters (New responses 2), Candidate "M Arunkumar" with Recommended badge. | `TN-047`, `TN-048` | `/employer/jobs/:id/responses` |
| `Screenshot 2026-11-06 180325.png` | Job Responses View with candidate card action triggers (Add comment, Shortlist, Maybe, Reject, Contact). | `TN-047`, `TN-048` | `/employer/jobs/:id/responses` |

---

## 6. Implementation Blueprint & Recommendations

For downstream implementer agents, we recommend the following step-by-step phased execution:

### Phase 1: Mock Data Expansion (`src/data/mockData.ts`)
- Replace the tiny placeholder arrays with rich datasets containing:
  - The 3 exact candidates from the screenshots (`Pawar Mukesh`, `Balgare Kailash`, `M Arunkumar`) plus the existing candidates (`Priya Sharma`, `Arjun Mehta`, `Vikram Malhotra`, etc.).
  - The exact job requisitions from the screenshots (`Infrastructure Specialist`, `Sr GIS Analyst - Database`, `Us It Recruiter`, `IoT Engineer / Embedded Systems`, `Presales Coordinator`).
  - The 4 Resdex folders (`PCB`, `Program Manager`, `sitecore`, `Office administrator`).
  - Quota subscriptions (`4,000 CV Access`, `32,000 NVite`, `20 Hot Vacancies`).
  - Recent searches and saved searches with pre-canned query text.

### Phase 2: Navigation & Route Registration (`src/app/routes.tsx`)
- Ensure the employer routes include:
  - `/employer` -> Dashboard with Quotas, Recent Jobs, Resdex Searches & Folders.
  - `/employer/jobs` -> Manage Jobs and Responses (with filter sidebar and Requisition cards).
  - `/employer/jobs/:id/responses` -> Full Job Responses Pipeline (Stage tabs, sub-filter chips, and Candidate cards).
  - `/employer/candidates/search` -> Resdex Advanced Search Form with all 5 accordions.
  - `/employer/candidates/results` -> AI-Matched Results Grid with bulk actions.
  - `/employer/nvite/broadcast` -> Multi-step NVite broadcast flow with candidate count indicator and preview modal.

### Phase 3: Component Polish & Overlays
- Build the **Candidate Quick-View Drawer** in `src/components/` for instant slide-out profile inspection.
- Build the **NVite Target Preferences Modal** and **Preview Modal**.
- Ensure all styling aligns with Tailwind CSS v4 and the clean, high-density enterprise theme exhibited in the reference images.
