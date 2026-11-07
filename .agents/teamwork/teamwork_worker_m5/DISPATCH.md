## 2026-11-06T13:47:23Z
You are Worker 5 for Milestone 5 of the TalentFlow implementation.

## Mandatory Reading
Read the authoritative user request at:
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\ORIGINAL_REQUEST.md`
Also read:
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\PROJECT.md`
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_explorer_survey_1\report.md`
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_explorer_survey_3\report.md`

## Your Identity & Working Directory
- Identity: teamwork_worker_m5
- Working directory: `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_worker_m5`
- Parent Orchestrator Conversation ID: `5f22dc5b-73ae-4760-a282-e67479601cde`

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Milestone 5 Scope & Exclusive File Ownership
You exclusively own and will create:
- `src/pages/resdex/NViteWizardModal.tsx` (new)
- `src/components/resdex/NVitePreferencesModal.tsx` (new)
DO NOT edit `src/app/routes.tsx` or other workers' files. Export your components cleanly.

## Specific Requirements
1. **NVite Targeting Preferences Modal (`src/components/resdex/NVitePreferencesModal.tsx`)**:
   - Matching Screenshot `180014.png`:
     - Modal header: "Targeting Preferences / Calibration".
     - Experience range (Min/Max years).
     - Candidate location & Relocation cities (Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR).
     - Salary range (CTC in INR Lacs).
     - Helper note and "Save & Proceed to Campaign" button.
2. **Send NVite Campaign Wizard (`src/pages/resdex/NViteWizardModal.tsx`)**:
   - Matching Screenshots `175950.png`, `180140.png`, `180151.png`, `180154.png`:
     - Breadcrumb step indicator: Step 1 (Audience Target), Step 2 (Compose Campaign), Step 3 (Review & Send).
     - Step 1: Volume selection (e.g. 500 candidates), live quota check against `mockQuotas` (`13,352 NVite left`), audience quality breakdown.
     - Step 2: Role details & JD:
       - Designation: `DevOps Engineer / Cloud Specialist`.
       - Work mode: `Hybrid`.
       - Key skills: `AWS`, `Kubernetes`, `Terraform`, `Docker`, `CI/CD`.
       - Salary: `12 - 16 Lacs`.
       - Job Description verbatim preview container.
       - Multi-channel delivery checkboxes: `Naukri App Notification`, `Email Alert`, `Candidate Inbox`.
       - AI Reach-out Booster (Beta) toggle switch.
     - Step 3: Summary confirmation, quota deduction call (`deductQuota`), and success dialog with "View Sent Campaign" CTA.
3. **Verification**:
   - Run `npm run build` using `run_command` and confirm exit code 0 and zero TypeScript errors.
   - Run `npm test` using `run_command` and confirm all 161 tests pass.
   - Document files, components, and verification outputs in `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_worker_m5\handoff.md`.
   - Send completion message to parent orchestrator (`5f22dc5b-73ae-4760-a282-e67479601cde`).
