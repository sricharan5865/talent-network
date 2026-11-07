# Project: TalentFlow

## Architecture
- **Framework**: React 19 + TypeScript 5.7 + Vite 8
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`, CSS variables / design tokens (`src/index.css`)
- **Icons**: `lucide-react`
- **Routing**: React Router v7 (`src/app/routes.tsx`)
- **Navigation Shell**: Top Navigation with dropdown menus matching Naukri/Talent Cloud styling (`src/components/layout/AppShell.tsx`, `src/components/layout/TopNavigation.tsx`)
- **Data Layer**: Centralized typed mock data models (`src/data/mockData.ts`, `src/data/resdexData.ts`) covering Indian recruitment data (INR Lacs CTC, Notice periods, Quota usage, Resdex Folders, Indian IT candidate profiles, Requisitions)

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Public Landing & Launcher Login | Hero section with "TALENT DECODED", AI value props, "10 crore+ registered jobseekers", and elevated Naukri Launcher login card for `sheela.nancy@ispatialtec.com` | M1 | `TN-001`, `TN-003`, `TN-004`, Screenshot `175531.png` |
| F2 | Talent Cloud Top Navigation Shell | Global Top Nav with active tabs, dropdowns for "Jobs & Responses" and "Resdex", user profile, notifications, search bar | M1 | `TN-039`, Screenshots `175608.png`, `175640.png` |
| F3 | Enterprise Mock Data Model | Extended mock data for candidates (Pawar Mukesh, Balgare Kailash, M Arunkumar), Quotas (RESDEX 4k, NVite 32k, Jobs 20), Folders, Requisitions | M1 | `mockData.ts`, Screenshots `175541.png`, `175623.png` |
| F4 | Employer Home Dashboard & Quota Usage | AmbitionBox Employee Choice Awards banner, Quota Usage carousel (RESDEX CV Access, NVite, Hot Vacancies), Upcoming webinars | M2 | `TN-039`, `TN-061`, Screenshots `175541.png` |
| F5 | Dashboard Job Postings & Resdex Folders | Recently posted jobs table with response metrics, Resdex Recent Searches with saved chips, Resdex Folders widget (PCB, Program Manager, sitecore, Office administrator) | M2 | `TN-039`, Screenshots `175546.png`, `175553.png`, `175557.png` |
| F6 | Resdex Advanced Search Engine | Search form with keyword autocomplete (`java`), Boolean search toggle, IT skills, Experience, Salary INR Lacs, and 5 collapsible accordions (Employment, Education, Diversity, Additional, Freshness) | M3 | `TN-046`, `TN-066`, Screenshots `175652.png` to `175934.png` |
| F7 | AI Candidate Search Results Grid | Search results view with "AI found: 15,97,293 profiles" summary banner, left-hand facet filter tree, Indian IT candidate cards, action bar | M3 | `TN-047`, Screenshots `180011.png` |
| F8 | Manage Jobs & Responses Listing | Requisitions list with status filters (Active 27, Closed 3, Expired 40), category tabs (NVite 52, Private 33, Hot Vacancy 21), response counts | M4 | `TN-039`, `TN-065`, Screenshots `175608.png`, `175617.png`, `180227.png` |
| F9 | Job Applicant Responses / ATS Inbox | Requisition application inbox (`US IT Recruiter`), stage pipeline tabs (All 80, Shortlisted 3, Maybe 0, Rejected 19), sub-status filters, rich candidate cards | M4 | `TN-043`, `TN-047`, `TN-067`, Screenshots `175623.png`, `180258.png`, `180325.png` |
| F10 | Candidate Quick-View Profile Drawer | Slide-over drawer / modal showing full candidate details, skills, education, employment timeline, and stage progression actions | M4 | `TN-047`, `TN-067`, Screenshots `180258.png`, `180325.png` |
| F11 | NVite Targeting Preferences Modal | Calibration modal for experience range, locations, and salary limits before sending NVite campaign | M5 | `TN-054`, Screenshot `180014.png` |
| F12 | Send NVite Campaign Composer Wizard | Multi-step outreach composer: target candidate count, job preview, collaboration, notification channels (App push & inbox), AI match boost | M5 | `TN-054`, `TN-068`, Screenshots `175950.png`, `180140.png`, `180151.png`, `180154.png` |
| F13 | End-to-End Interactivity & Route Wiring | Comprehensive seamless routing, tab switching, search filter state propagation, shortlist/reject transitions, quota consumption simulation | M5 | All reference flows |
| F14 | Comprehensive E2E Test Suite Validation | 100% pass of Tiers 1-4 tests covering all 13 features, edge cases, cross-feature flows, and user journeys | M6 | E2E Testing Track |
| F15 | Adversarial Coverage Hardening & Integrity Audit | White-box adversarial testing (Tier 5) and clean Forensic Integrity Audit report | M6 | Quality & Security Verification |

## Milestones
| # | Name | Scope | Dependencies | Status | Key Outputs |
|---|------|-------|-------------|--------|-------------|
| M1 | Shell, Navigation, Auth Landing & Data Model | F1, F2, F3: Launcher Login, Top Nav with dropdowns, Centralized typed mock data models | none | **DONE** | `src/data/resdexData.ts`, `src/pages/resdex/PublicLandingPage.tsx`, `src/components/layout/TopNavigation.tsx`, `src/app/routes.tsx`; build exits 0, 161 tests pass |
| M2 | Employer Dashboard, Quota Hub & Folders | F4, F5: Quota Usage carousel, AmbitionBox banner, Recent Jobs, Resdex Searches & Folders | M1 | PLANNED | |
| M3 | Resdex Advanced Search & AI Candidate Results | F6, F7: Multi-criteria search with 5 accordions, AI results banner, candidate cards | M1 | PLANNED | |
| M4 | Manage Jobs Requisitions & ATS Candidate Inbox | F8, F9, F10: Requisitions table, Apply Inbox with stages, Candidate Quick-View drawer | M1, M2 | PLANNED | |
| M5 | NVite Outreach Wizard, Preferences & Full Wiring | F11, F12, F13: Targeting Modal, Multi-step NVite Wizard, full cross-screen navigation | M2, M3, M4 | PLANNED | |
| M6 | Final Milestone: E2E Test Pass & Coverage Hardening | F14, F15: Pass 100% E2E tests (Tiers 1-4), Tier 5 adversarial testing, Forensic Integrity Audit | M1, M2, M3, M4, M5 | PLANNED | |

## Interface Contracts

### Navigation & Shell (`src/components/layout/TopNavigation.tsx` ↔ `src/app/routes.tsx`)
- TopNavigation provides links:
  - `/employer` (Dashboard)
  - `/employer/jobs` (Manage Jobs and Responses)
  - `/employer/candidates/search` (Resdex Search)
  - `/employer/candidates/results` (Search Results)
  - `/employer/jobs/:id/responses` (Applicant Inbox)
  - `/employer/nvite/broadcast` (Send NVite)
  - `/employer/login` (Auth / Launcher Landing)

### Mock Data & Entities (`src/data/resdexData.ts` ↔ Views)
```typescript
export interface Candidate {
  id: string;
  name: string;
  headline: string;
  experienceYears: number;
  experienceMonths: number;
  currentSalaryLacs: number;
  expectedSalaryLacs?: number;
  noticePeriod: string;
  currentLocation: string;
  preferredLocations?: string[];
  currentCompany: string;
  currentDesignation: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  };
  keySkills: string[];
  mayAlsoKnowSkills?: string[];
  verifiedSkills?: string[];
  stage: 'all' | 'shortlisted' | 'maybe' | 'rejected';
  subStatus: 'new' | 'viewed' | 'action_pending';
  appliedDate: string;
  recommendedBadge?: boolean;
}

export interface QuotaUsage {
  id: string;
  name: string;
  total: number;
  used: number;
  remaining: number;
  unit: string;
  renewalDate: string;
}

export interface ResdexFolder {
  id: string;
  name: string;
  count: number;
  updatedDate: string;
}

export interface JobRequisition {
  id: string;
  title: string;
  department: string;
  postedDate: string;
  status: 'active' | 'closed' | 'expired';
  category: 'nvite' | 'private' | 'hot_vacancy';
  appliesCount: number;
  cvsCount: number;
  location: string;
  experience: string;
}
```

## Code Layout
- `src/components/layout/TopNavigation.tsx`: Naukri / Talent Cloud style top navigation bar and dropdowns
- `src/components/layout/AppShell.tsx`: Root layout shell hosting TopNavigation and view container
- `src/data/resdexData.ts`: Extended mock data models, candidates, quotas, folders, and requisitions
- `src/pages/resdex/PublicLandingPage.tsx`: Public hero & Naukri launcher login screen
- `src/pages/resdex/EmployerDashboardView.tsx`: Home dashboard with AmbitionBox, Quota Carousel, Folders
- `src/pages/resdex/ResdexSearchPage.tsx`: Multi-accordion candidate search engine
- `src/pages/resdex/ResdexResultsPage.tsx`: Search results grid, Pawar Mukesh cards, AI banner
- `src/pages/resdex/ManageJobsPage.tsx`: Jobs listing with status & category filters
- `src/pages/resdex/JobResponsesPage.tsx`: Applicant Inbox, stage pipeline, candidate profile drawer
- `src/pages/resdex/NViteWizardModal.tsx`: Send NVite campaign composer & targeting modal
- `src/app/routes.tsx`: Router configuration binding all URLs to views
