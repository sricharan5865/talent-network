## 2026-11-06T13:05:38Z

You are Worker 1 for Milestone 1 of the TalentFlow implementation.

## Mandatory Reading
Read the authoritative user request at:
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\ORIGINAL_REQUEST.md`
Also read:
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\PROJECT.md`
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_explorer_survey_1\report.md`
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_explorer_survey_3\report.md`

## Your Identity & Working Directory
- Identity: teamwork_worker_m1
- Working directory: `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_worker_m1`
- Parent Orchestrator Conversation ID: `5f22dc5b-73ae-4760-a282-e67479601cde`

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Milestone 1 Scope & Exclusive File Ownership
You exclusively own and will create/modify:
- `src/data/resdexData.ts` (new)
- `src/components/layout/TopNavigation.tsx` (new)
- `src/components/layout/AppShell.tsx` (update to integrate TopNavigation seamlessly)
- `src/pages/resdex/PublicLandingPage.tsx` (new)
- `src/app/routes.tsx` (update to register landing and resdex route paths)

## Specific Requirements
1. **Centralized Data Models (`src/data/resdexData.ts`)**:
   - Define TypeScript interfaces and rich mock datasets matching the reference images:
     - Candidates: `PAWAR MUKESH` (9y 5m, ₹ 13 Lacs, 0-15d notice, Bengaluru, DevOps Engineer at TalentPull, B.Tech LNCT Indore), `Balgare Kailash` (5y 2m, ₹ 8 Lacs, Serving notice, Hyderabad, Specialist at HCLTech), `M Arunkumar` (8y, ₹ 8 Lacs, 1m notice, Teamlease), and additional diverse candidates.
     - Quotas: `RESDEX 4,000 CV Access` (2,228 used, 1,772 left), `RESDEX 32,000 NVite` (18,648 used, 13,352 left), `JOB POSTING 20 Hot Vacancies` (18 used, 2 left).
     - Job Requisitions: `Sr GIS Analyst - Database` (144 applies, 150 CVs), `IoT Engineer` (72 applies), `US IT Recruiter` (80 applies), across Active/Closed/Expired and NVite/Private/Hot Vacancy categories.
     - Resdex Folders: `PCB` (138 profiles), `Program Manager` (0 profiles), `sitecore` (152 profiles), `Office administrator` (40 profiles).
     - Recent searches: `GIS Developer`, `java`, etc.
2. **Public Landing & Launcher Login (`src/pages/resdex/PublicLandingPage.tsx`)**:
   - Matching `Screenshot 2026-11-06 175531.png`:
     - Tech dark gradient background (`#0c1021` to `#111827`).
     - "TALENT DECODED", "Decode India’s largest talent pool with the power of ✦ AI".
     - Bullets: "10 crore+ registered jobseekers", "Most advanced recruitment AI".
     - CTA button: "Explore our products".
     - Elevated white authentication card with "Sales enquiry" and "Register/Log in" tabs.
     - Account callout: "Your account is Naukri Launcher enabled", user email `sheela.nancy@ispatialtec.com`.
     - Button: "Login with Naukri Launcher" (routes to `/employer`).
     - Quick help links.
3. **Top Navigation Shell (`src/components/layout/TopNavigation.tsx` & `src/components/layout/AppShell.tsx`)**:
   - Matching Naukri / Talent Cloud design:
     - Top navigation bar with active tab indicators.
     - "Jobs & Responses ⌵" dropdown (Post a Hot Vacancy, Post a SMB Job, Post an Internship, Manage Jobs & Responses).
     - "Resdex ⌵" dropdown (Search Resumes, Send NVite, Manage Searches, Folders, Resdex Requirements).
     - Quota indicator pill (e.g. "CV Access: 1,772 left").
     - Search input, notification bell with badge, and user menu for `sheela.nancy@ispatialtec.com`.
     - Smooth transitions to all portal routes.
4. **Build & Verification**:
   - Run `npm run build` using `run_command` and confirm exit code 0 and zero TypeScript errors.
   - Document commands, code files created, and build verification in `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_worker_m1\handoff.md`.
   - Update `progress.md` in your directory.
   - Send completion message to parent orchestrator (`5f22dc5b-73ae-4760-a282-e67479601cde`) when done.
