# TalentFlow Reference Visual & Screen Mining Report
**Explorer Identity**: `teamwork_explorer_survey_1`  
**Generated Date**: 2026-11-06  
**Reference Sources**: 
1. `C:\Users\SRI CHARAN\Documents\pic for talenflow design` (33 screenshot files)
2. `c:\Users\SRI CHARAN\Desktop\talent\Talent_Network_UI_Screen_Inventory_v2.xlsx` (109 tracked screens)
3. `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\ORIGINAL_REQUEST.md`

---

## Executive Summary

A comprehensive inspection of all 33 reference design screenshots and the authoritative screen inventory spreadsheet (`Talent_Network_UI_Screen_Inventory_v2.xlsx`) was performed. The reference screenshots depict an enterprise-grade recruitment and talent acquisition platform (styled around the Naukri / Resdex / Talent Cloud design system).

The visual artifacts comprise **8 primary screen clusters / functional views**, including:
1. **Public Marketing & Authentication Portal** (Hero, value propositions, launcher login card)
2. **Employer / Recruiter Workspace Home Dashboard** (AmbitionBox banner, Quota usage carousel, Webinars, Job Postings, Resdex Searches, Resdex Folders)
3. **Manage Jobs and Responses** (Requisitions list, category & status filters, response metrics)
4. **Job Applicant Responses / ATS Application Inbox** (Candidate pipeline, response breakdowns, rich candidate cards, bulk actions)
5. **Resdex Candidate Search & Filtering Engine** (Boolean keywords, multi-accordion facets: Employment, Education, Diversity Hiring, Additional Details)
6. **Candidate Search Results Page** (AI summary banner, multi-faceted filtering, action bar)
7. **NVite Candidate Targeting Preferences Modal** (Experience, location, and CTC calibration)
8. **Send NVite Campaign Wizard & Outreach Flow** (Multi-step broadcast composer, JD preview, collaboration, notification channels, AI reach-out toggle)

Below is the complete specification of each screen, layout structure, detailed components, exact text copy, sample data values, and interactive triggers.

---

## 1. Master Screen Mapping & Inventory Cross-Reference

| Screen Cluster | Primary Name / View | Inventory Screen ID(s) | Primary Route / URL | Reference Screenshot Files |
| :--- | :--- | :--- | :--- | :--- |
| **Cluster 1** | Public Landing & Authentication | `TN-001`, `TN-003`, `TN-004` | `/` / `/employer/login` | `Screenshot 2026-11-06 175531.png` |
| **Cluster 2** | Recruiter / Employer Home Dashboard | `TN-039`, `TN-061` | `/employer` / `/recruiter` | `Screenshot 2026-11-06 175541.png`, `175546.png`, `175553.png`, `175557.png` |
| **Cluster 3** | Manage Jobs & Responses | `TN-039`, `TN-065` | `/employer/jobs`, `/recruiter/mandates` | `Screenshot 2026-11-06 175608.png`, `175617.png`, `175640.png`, `180227.png` |
| **Cluster 4** | Job Applicant Responses / ATS Inbox | `TN-043`, `TN-047`, `TN-067` | `/employer/jobs/:id/responses`, `/recruiter/crm` | `Screenshot 2026-11-06 175623.png`, `180258.png`, `180325.png` |
| **Cluster 5** | Resdex Candidate Search Engine | `TN-046`, `TN-066` | `/employer/matching`, `/recruiter/sourcing` | `Screenshot 2026-11-06 175652.png`, `175717.png`, `175725.png`, `175738.png`, `175747.png`, `175752.png`, `175755.png`, `175808.png`, `175826.png`, `175838.png`, `175845.png`, `175913.png`, `175918.png`, `175934.png` |
| **Cluster 6** | Candidate Search Results Page | `TN-047`, `TN-066` | `/recruiter/sourcing/results` | `Screenshot 2026-11-06 180011.png` |
| **Cluster 7** | NVite Targeting Preferences Modal | `TN-054` | (Modal over Search Results) | `Screenshot 2026-11-06 180014.png` |
| **Cluster 8** | Send NVite Campaign Wizard | `TN-054`, `TN-068` | `/recruiter/outreach`, `/employer/communication` | `Screenshot 2026-11-06 175950.png`, `180140.png`, `180151.png`, `180154.png` |
| *Auxiliary* | Screen Crop Fragment | N/A | N/A | `Screenshot 2026-11-06 175626.png` |

---

## 2. Detailed Screen Specifications

### Screen Cluster 1: Public Landing & Authentication Portal
- **Identifier**: `TN-001`, `TN-003`, `TN-004`
- **Reference Image**: `Screenshot 2026-11-06 175531.png`
- **Layout Structure**:
  - Full-width dark ambient header with tech gradient backdrop (`#0c1021` to `#111827`).
  - Two-column hero container:
    - Left column: Large branding, AI value propositions, and primary exploratory CTA.
    - Right column: Floating elevated white authentication card (`rounded-2xl shadow-2xl`).
- **Header Elements**:
  - Brand Logo: Naukri / TalentFlow icon + logotype.
  - Navigation Links:
    - `Our offerings ⌵` (dropdown menu)
    - `Naukri Talent Cloud ⌵` (dropdown menu)
  - Right Utility Items:
    - Telephone contact: `1800-102-5558 ⌵`
    - Outline pill button: `Buy online` (white text with subtle border)
    - Shopping cart icon
    - Mobile / Drawer menu icon (hamburger)
- **Left Hero Section Copy & Components**:
  - Eyebrow: `TALENT DECODED` (uppercase, letter-spaced)
  - Hero Headline: `Decode India’s largest talent pool with the power of ✦ AI`
  - Value Bullet 1: `👤 10 crore+ registered jobseekers for all your talent needs`
  - Value Bullet 2: `📈 Most advanced recruitment AI`
  - Primary CTA: `Explore our products` (solid royal blue button `#1765e8`, rounded-lg, font-semibold)
- **Right Authentication Card**:
  - Segmented Switcher / Tabs:
    - Tab 1: `Sales enquiry` (inactive, soft gray background)
    - Tab 2: `Register/Log in` (active, white background, elevated pill)
  - Launcher / SSO Callout Container:
    - Background: Soft blue-gray tint (`#f0f4f9`)
    - Green security shield badge icon
    - Headline: `Your account is Naukri Launcher enabled`
    - User email: `sheela.nancy@ispatialtec.com`
  - Primary Action Button: `Login with Naukri Launcher` (solid blue `#1765e8`, full-width, py-3)
  - Help Quick Links (`⏱ QUICK HELP`):
    - Row 1: `Haven’t set up Naukri Launcher? Download it 📥`
    - Row 2: `Not sure how to use it? Watch 1-min tutorial ▶`
  - Card Footer: `Don’t have a registered email? Create account` (link in blue `#1765e8`)
- **Interactive Triggers**:
  - Clicking `Sales enquiry` switches tab to lead form.
  - Clicking `Login with Naukri Launcher` authenticates the user and routes directly to the Employer/Recruiter Dashboard (`/employer` / `/recruiter`).
  - Clicking `Create account` navigates to registration (`/employer/register`).

---

### Screen Cluster 2: Employer / Recruiter Workspace Home Dashboard
- **Identifier**: `TN-039`, `TN-061`
- **Reference Images**: `Screenshot 2026-11-06 175541.png`, `175546.png`, `175553.png`, `175557.png`
- **Layout Structure**:
  - Global Top Navigation Bar with active tab indicator.
  - Welcome banner with greeting.
  - Highlighted campaign banner (AmbitionBox Employee Choice Awards).
  - Asymmetric 2-column dashboard grid:
    - Left wide column: Quota usage carousel, Recent Job Postings table, Resdex Searches widget, Resdex Folders widget.
    - Right narrow column: Upcoming Webinars card.
  - Floating bottom-right Action Button (`Help`).
- **Global Top Navigation Bar**:
  - Brand Logo: Circular icon + `naukri` logotype.
  - Nav Tabs:
    - `Jobs & Responses` (with active indicator / dropdown trigger)
    - `Resdex` (with active indicator / dropdown trigger)
    - `Reports`
  - Right Utility Icons:
    - `🕒` Recent history clock icon
    - `🔍 Search` rounded input field with placeholder
    - `🔖` Bookmark icon
    - `🔔` Notification bell with live badge
    - `👤` User profile avatar
    - `▦` 9-dot Google-style app switcher
- **Dashboard Greeting**:
  - Text: `Welcome, sheela.nancy@ispatialtec.com!` (font-semibold, text-gray-900, text-lg)
- **Campaign Banner (AmbitionBox Employee Choice Awards)**:
  - Background: Dark brushed charcoal/gold metallic banner with gold trophy graphic ("ABECA AmbitionBox Employee Choice Awards 2027").
  - Badge: `6th Edition` (gold banner ribbon)
  - Header: `AmbitionBox Employee Choice Awards`
  - Title: `Rated by India@Work`
  - Subhead: `Become India's top-rated company for culture.`
  - CTA Button: `Invite your employees to rate` (gold pill button with dark text)
  - Microcopy: `Rate before 31st Dec '26.`
- **Main Column Widgets**:
  1. **Quota Usage Carousel Card**:
     - Card Header: `Quota usage`
     - Subtitle: `Track quota usage of all your subscriptions`
     - Carousel Cards (horizontal scroll / carousel with `>` arrow):
       - **Sub-card A (Resdex CV Access)**:
         - Category badge: `RESDEX` (blue) | `FULL QUOTA` (gray, right)
         - Metric: `🗂 4,000 CV Access ⓘ`
         - Progress indicator: Blue progress bar
         - Detail: `2,228 used | 1,772 left`
         - Link: `1/1 licenses assigned ➔`
       - **Sub-card B (Resdex NVite)**:
         - Category badge: `RESDEX` (blue) | `FULL QUOTA` (gray, right)
         - Metric: `✉ 32,000 NVite ⓘ`
         - Progress indicator: Blue progress bar
         - Detail: `18,648 used | 13,352 left`
         - Link: `1/1 licenses assigned ➔`
       - **Sub-card C (Job Posting)**:
         - Category badge: `JOB POSTING`
         - Metric: `💼 20 Hot Vacancy`
         - Detail: `18 used | 2 left`
         - Link: `2/1000 users assigned ➔`
  2. **Job Postings Card**:
     - Card Header: `Job Postings`
     - Data Table Columns:
       - `Recently posted jobs`
       - `Created by`
       - `Modified on`
       - `Applies`
       - `CV rec...`
     - Rows:
       - Row 1: `Sr GIS Analyst - Database` | `12390...` | `03-Nov...` | `144` | `150`
       - Row 2: `Iot Engineer / Embedded Systems ...` | `12390...` | `15-Oct...` | `72` | `7`
     - Footer Action: `View all jobs` (solid blue button)
  3. **Resdex Searches Card**:
     - Card Header: `Resdex Searches`
     - Sub-section 1: `Recently searched for`
     - Query Chips (horizontally scrollable with arrow `>`):
       - `aws, azure, oci | infrastructure, certified, "immediate joiner" | >=4 years | Hyderabad`
       - `IT, "rfp writer", "proposal writer" | Hyderabad`
       - `"pre sales", presales, "pre-sales" | "software product", documentation | 2-8 years | Hyderabad`
       - `it products | rfq | 1-5 years | Hyderabad`
     - Sub-section 2: `Saved Searches` (right column header: `New profiles`):
       - Row: `GIS Developer - "GIS Developer", esri, html, javascript` | `0`
     - Footer Action: `View all saved searches` (solid blue button)
  4. **Resdex Folders Card**:
     - Card Header: `Resdex Folders`
     - Sub-table Columns: `Recently created folders` | `Created on` | `Profiles`
     - Rows:
       - `PCB` | `25-Jun-26` | `138`
       - `Program Manager` | `24-Jun-26` | `0`
       - `sitecore` | `09-Sept-23` | `152`
       - `Office administrator` | `09-Sept-23` | `40`
     - Footer Action: `View all resdex folders` (solid blue button)
- **Right Column Widget**:
  - **Join Upcoming Webinars Card**:
    - Card Header: `Join upcoming webinars`
    - Webinar Schedule List:
      - `09 Nov 10:15 AM` | `Job Posting Essentials`
      - `10 Nov 10:15 AM` | `Resdex Essentials`
      - `12 Nov 10:15 AM` | `Resdex Essentials`
      - `13 Nov 10:15 AM` | `Job Posting Essentials`
    - Footer Action: `View all webinars` (solid blue button, full width)
- **Floating Button**:
  - Bottom right: `🎧 Help` (blue rounded-full pill button)
- **Interactive Triggers**:
  - Clicking any Job row navigates to the Job Applicant Responses view (`/employer/jobs/:id/responses`).
  - Clicking `View all jobs` navigates to `Manage Jobs & Responses` (`/employer/jobs`).
  - Clicking any Resdex Search chip populates the search criteria and runs the search in Resdex.
  - Hovering / clicking top navigation tabs opens dropdown mega-menus.

---

### Screen Cluster 3: Manage Jobs and Responses (Requisitions List)
- **Identifier**: `TN-039`, `TN-065`
- **Reference Images**: `Screenshot 2026-11-06 175608.png`, `175617.png`, `175640.png`, `180227.png`
- **Layout Structure**:
  - Top Navigation with dropdown menus for `Jobs & Responses` and `Resdex`.
  - Page header with title, subtitle, and primary `Post job ⌵` CTA button.
  - 2-column layout:
    - Left column: Filter sidebar with Search and collapsible filter categories.
    - Right column: Requisitions list with tabs, bulk action bar, sort dropdown, pagination, and detailed job cards.
- **Top Navigation Dropdown Menus**:
  - **Dropdown A (Jobs & Responses)**:
    - `Post a Hot Vacancy` (with green `Active` badge)
    - `Post a SMB Job`
    - `Post an Internship` (with green `Active` badge)
    - `Manage Jobs & Responses`
  - **Dropdown B (Resdex)**:
    - `Search Resumes`
    - `Send NVite`
    - `Manage Searches`
    - `Folders`
    - `Resdex Requirements`
- **Page Header**:
  - Title: `Manage Jobs and Responses`
  - Subtitle: `Responses to your jobs and NVites will appear here`
  - Action Button: `Post job ⌵` (solid blue split button with dropdown arrow)
- **Left Filter Sidebar (`Filters`)**:
  - Search input: `🔍 Search by Title/Ref Code/Job ID`
  - Filter Group 1: `Job status ⌃`
    - `[ ] Active Jobs (27)`
    - `[ ] Closed Jobs (3)`
    - `[ ] Expired Jobs (40)`
  - Filter Group 2: `Category ⌃`
    - `[ ] NVite (52)`
    - `[ ] Private (33)`
    - `[ ] Hot Vacancy (21)`
  - Filter Group 3: `Job posted by ⌃`
    - `[ ] Me (70)`
- **Main Content Area**:
  - Primary Tabs:
    - `All Jobs 70` (active tab, underlined with red indicator)
    - `Drafts 0`
  - Toolbar & Pagination:
    - Left bulk controls: `[ ] Select All` | `🔄 Refresh` | `👥 Collaborate` | `⊘ Close`
    - Right controls: `Show 60 ⌵` | Pagination `|<< < Page 1 of 2 > >>|` | `Sort by: Posted/sent date ⌵`
  - Job Requisition Cards:
    - **Requisition 1: Infrastructure Specialist**:
      - Checkbox `[ ]`
      - Job Title: `Infrastructure Specialist`
      - Location: `Hyderabad`
      - Category badge: `NVite` (gray pill)
      - Metrics: `59 Total Responses` | `5 Shortlisted`
      - Ownership & Date: `sent by Me | 04 Nov 2026`
      - Actions: `⋮` 3-dot context menu
    - **Requisition 2: Sr GIS Analyst - Database**:
      - Checkbox `[ ]`
      - Job Title: `Sr GIS Analyst - Database`
      - Location: `Hyderabad`
      - Category badge: `Hot Vacancy` (amber pill)
      - Metrics:
        - `144 Total Responses` with blue pill badge `33 New`
        - `0 Shortlisted`
        - `150 Resdex recommended`
      - Quick Actions: `🔄` Refresh responses, `✏️` Edit posting, `⋮` Context menu
      - Ownership & Date: `posted by Me | 03 Nov 2026`
      - Target Route: `https://hiring.naukri.com/hiring/031126023278/applies?tab=n`
    - **Requisition 3: Us It Recruiter**:
      - Checkbox `[ ]`
      - Job Title: `Us It Recruiter`
      - Location: `Hyderabad`
      - Category badge: `NVite`
      - Metrics:
        - `80 Total Responses` with blue pill badge `2 New`
        - `3 Shortlisted`
      - Ownership & Date: `sent by Me | 22 Oct 2026`
      - Quick Actions: `⋮` Context menu
      - Target Route: `https://hiring.naukri.com/hiring/221026822627/applies`
    - **Requisition 4: Iot Engineer / Embedded Systems Engin...**:
      - Checkbox `[ ]`
      - Job Title: `Iot Engineer / Embedded Systems Engin...`
      - Location: `Hyderabad`
      - Category badge: `Hot Vacancy`
      - Metrics:
        - `72 Total Responses` with blue pill badge `2 New`
        - `7 Shortlisted`
        - `7 Resdex recommended`
      - Quick Actions: `🔄` Refresh, `✏️` Edit, `⋮` Context menu
      - Ownership & Date: `posted by Me | 15 Oct 2026`
    - **Requisition 5: Presales Coordinator**:
      - Checkbox `[ ]`
      - Job Title: `Presales Coordinator`
      - Location: `Hyderabad`
      - Metrics: `35 Total Responses` | `4 Shortlisted`
      - Ownership & Date: `posted by Me | 08 Oct 2026`
- **Interactive Triggers**:
  - Clicking any Job card title navigates to its Applicant Responses View (Cluster 4).
  - Clicking `Post job` opens the Requisition intake wizard (`TN-042`).
  - Checking `Select All` activates bulk action buttons (`Collaborate`, `Close`).

---

### Screen Cluster 4: Job Applicant Responses / ATS Application Inbox
- **Identifier**: `TN-043`, `TN-047`, `TN-067`
- **Reference Images**: `Screenshot 2026-11-06 175623.png`, `180258.png`, `180325.png`
- **Layout Structure**:
  - Top promotion banner: `Want to further improve your hiring efficiency? Join our free expert session. Reserve your seat. ➔`
  - Requisition Meta Bar:
    - Breadcrumb: `📁 All Jobs > Us It Recruiter` (with green status badge `Active`)
    - Middle: `🔗 Share job`
    - Right stats: `NVite insights from last 90 days`: `Sent to 867 candidates` | `View rate 38%` | `Response rate 9%` | Action: `📈 Insights`
  - 2-column workspace layout:
    - Left column: Application Inboxes (`Apply Inbox`, `Others`) and Multi-faceted Filters.
    - Right column: Stage pipeline tabs, sub-status pills, channel breakdown, bulk action bar, sorting, and rich candidate cards.
- **Left Column Elements**:
  - Inboxes Card:
    - `☑️ Apply Inbox (80)` (selected active light-blue card)
    - `⚠️ Others (0)`
  - Collapsible Facets:
    - Checkbox: `[ ] AI-recommendations ⓘ (1)`
    - `Keywords ⌃`:
      - Input: `Search keywords in profile`
      - Checkbox: `[ ] Search in key skills only`
    - `Location ⌵`
    - `Locality ⌵`
    - `Experience ⌵`
    - `Notice period / Availability to join ⌵`
    - `Salary ⌵`
    - `Education ⌵`
    - `Diversity ⌵`
    - `Industry ⌵`
    - `Designation ⌵`
    - `Company ⌵`
    - `Department ⌵`
- **Main Workspace Pipeline & Controls**:
  - Primary Pipeline Stage Tabs:
    - `All responses 80` (active tab, underlined in red)
    - `Shortlisted 3`
    - `Maybe 0`
    - `Rejected 19`
  - Right Channel Breakdown & View Toggle:
    - Text: `NVite response breakdown: 💻 23% | 🔔 16% | ✉ 61%`
    - View icons: `Card view` (active solid) | `List view`
  - Sub-filter Status Pills:
    - `All 80`
    - `New responses 2` (active pill with border)
    - `Not viewed 14`
    - `Action pending 58`
  - Search Header:
    - `Showing 2 responses`
    - `Sort by: Relevance ⌵`
  - Bulk Action Toolbar:
    - `[ ] Select all`
    - `✓ Shortlist`
    - `⨂ Reject`
    - `✉ Email`
    - `⬇ Download`
    - `🗑 Delete`
- **Detailed Candidate Cards**:
  - **Candidate Card 1: M Arunkumar** (`180258`):
    - Selection Checkbox: `[ ]`
    - Name: `M Arunkumar`
    - Badge: `Recommended` (teal pill badge)
    - Quick Stats: `💼 8y` | `₹ 8 Lacs` | `🕒 1m notice` | `📍 Hyderabad (Goshamahal)`
    - Current Role: `Assistant Manager Recruitment Hiring at Teamlease Services Pvt Ltd`
    - Previous Role: `Senior HR Recruitment Specialist at Caliber Human capital services Pvt LTD Resources`
    - Education: `B.A - Bachelor of Arts Government Degree College Khairtabad (A-U) 2018`
    - Preferred Locations: `Hyderabad, Vijayawada`
    - Key Skills: `US Loan | US Commercial Mortgage | US Mortgage | UK Recruitment | International Recruitment | IT Recruitment | US IT Staffing | US Recruitment | US Process | IT Staffing | UK Process | US Staffing | US IT Recruitment | UK IT Recruitment | Talent Acquisition`
    - Right Card Section:
      - Communication Icons: `✉` (email), `🔗` (share), `💬` (WhatsApp)
      - Avatar: Professional headshot photograph
      - Summary Snippet: `6+Years of Rich Experience in Recruitment Specialist in Bulk...`
      - Contact Dropdown: `📞 Contact | Status ⌵`
      - Mobile CTA: `📱 Call from app ➔`
  - **Candidate Card 2: PAWAR MUKESH** (`175623`):
    - Header Line: `Applied on: 4 Nov 26 from NVite`
    - Selection Checkbox: `[ ]`
    - Name: `PAWAR MUKESH`
    - Quick Stats: `💼 9y 5m` | `₹ 13 Lacs` | `🕒 Can join in 0-15d` | `📍 Bengaluru`
    - Previous Role: `DevOps Engineer at TalentPull & Infrastructure Pvt Ltd`
    - Education:
      - `B.Tech / B.E. Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal , LNCT Indore 2016`
      - `B.Tech / B.E. Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal 2016`
    - Preferred Locations: `Pune, Noida, Mumbai, Kolkata, Chennai, Gurugram +4 more`
    - Key Skills: `CLI | Key Vault | ymal pipeline | IaaS Services | DevOps | Azure Cloud | Azure VM | Azure Monitoring | Github | Terraform | Load Balancing | Auto Scaling | Vnets | Security Management | Log Analytics | Devsecops | GCP Cloud | Cloud Infrastructure | ARM | Aks Kubernetes | Azure Paas`
    - Action Buttons: `+ Add comment` | `✓ Shortlist` (green) | `… Maybe` (gray) | `⨂ Reject` (red) | `🗑` Delete
    - Right Card Section:
      - Avatar: Headshot photo
      - Bio: `Cloud Professional with 9+ years of IT experience, including 6 year...`
      - `📞 Contact | Status ⌵`
      - `📱 Call from app ➔`
  - **Candidate Card 3: Balgare Kailash** (`175623`):
    - Header Line: `Applied on: 5 Nov 26 from NVite`
    - Selection Checkbox: `[ ]`
    - Name: `Balgare Kailash`
    - Quick Stats: `💼 5y 2m` | `₹ 8 Lacs` | `🕒 Serving notice` | `📍 Hyderabad (Lingampally)`
    - Current Role: `Specialist at HCLTech`
    - Education: `B.C.A. Sastra University 2024`
    - Preferred Locations: `Mumbai, Bengaluru, Hyderabad, Mumbai (All Areas)`
    - Key Skills: `Control-M | Job Scheduling | Private Cloud | Monitoring Tools | Public Cloud | Monitoring`
    - Action Buttons: `+ Add comment` | `✓ Shortlist` | `… Maybe` | `⨂ Reject` | `🗑` Delete
    - Right Card Section:
      - Avatar: Headshot photo
      - Bio: `Operations & Automation Analyst | BMC Control-M Scheduler | Azure..`
      - `📞 Contact | Status ⌵`
      - `📱 Call from app ➔`
- **Interactive Triggers**:
  - Clicking `✓ Shortlist`, `… Maybe`, or `⨂ Reject` transitions the candidate between pipeline stages with toast feedback.
  - Clicking `+ Add comment` opens an inline notes input.
  - Clicking `📞 Contact | Status ⌵` displays candidate phone/email and status transition dropdown.
  - Clicking `📱 Call from app ➔` launches the in-app dialer/prompt.

---

### Screen Cluster 5: Resdex Candidate Search & Filtering Engine
- **Identifier**: `TN-046`, `TN-066`
- **Reference Images**: `Screenshot 2026-11-06 175652.png` through `175934.png` (14 screenshots)
- **Layout Structure**:
  - Top Resdex Subtabs: `Search candidates` (active) | `Send NVite`
  - Top Banner: `Learn to find candidates faster with Resdex in our free webinar. Reserve a slot ➔` `[✕]`
  - Two-column layout:
    - Left wide column: Search criteria builder with 4 expandable accordions.
    - Right narrow column: Recent Searches and Saved Searches panel.
- **Search Criteria Sections & Form Fields**:
  1. **Keywords**:
     - Toggle: `Boolean off`
     - Text Input / Chip container: `Enter keywords like skills, designation and company`
     - Autocomplete Dropdown (upon typing `java`):
       - Helper note: `Press 'Ctrl' while selecting a keyword to mark it mandatory`
       - Suggestions: `Java`, `Core Java`, `Javascript`, `J2Ee`, `Javafx`, `Java Developer`
     - Selected Chip: `[★ java ✕]` (solid star icon indicating mandatory, `✕` to remove)
     - Checkbox: `[ ] Mark all keywords as mandatory`
     - Scope Dropdown: `Search keyword in Entire resume ⌵`
     - Action Links: `+ Add Exclude Keywords`, `+ Add IT Skills`
  2. **Experience**:
     - Inputs: `Min experience [Min experience]` `to` `Max experience [Max experience]` `Years`
  3. **Current Location of Candidate**:
     - Input: `[Add location]`
     - Checkbox: `[x] Include candidates who prefer to relocate to above locations` | Link: `Change preferred location`
     - Checkbox: `[ ] Exclude candidates who have mentioned Anywhere in... ⓘ`
  4. **Annual Salary**:
     - Currency Selector: `INR ⌵`
     - Range: `Min salary [Min salary]` `to` `Max salary [Max salary]` `Lacs`
     - Checkbox: `[ ] Include candidates who did not mention their current salary`
  5. **Accordion 1: Employment Details**:
     - **Department and Role**:
       - Input: `Add Department/Role`
       - Quick Suggested Chips:
         - `Engineering - Soft... > Software Devel... +`
         - `Engineering - So... > Quality Assuranc... +`
     - **Industry**:
       - Input: `Add industry`
       - Quick Suggested Chips:
         - `Software Product +`
         - `IT Services & Consulting +`
         - `Emerging Technologies +`
     - **Company**:
       - Input: `Add company name`
       - Scope dropdown: `Search in Current company ⌵` (options: `Current company`, `Previous company`, `Current/Previous company`)
       - Link: `+ Add Exclude Company`
     - **Designation**:
       - Toggle: `Boolean off`
       - Input: `Add designation`
       - Scope dropdown: `Search in Current designation ⌵`
     - **Notice Period / Availability to Join ⓘ**:
       - Selectable pill chips:
         - `Any` (active default)
         - `0 - 15 days +`
         - `1 month +`
         - `2 months +`
         - `3 months +`
         - `More than 3 months +`
         - `Currently serving notice period +`
  6. **Accordion 2: Education Details**:
     - **UG Qualification**:
       - Selectable pill chips: `Any UG qualification` | `Specific UG qualification` | `No UG qualification`
       - When `Specific UG qualification` is selected:
         - "Choose Course" Dropdown:
           - Input: `Type or select UG course from list`
           - Options: `Recent Courses`, `Any Engineering`, `All Courses`, `Any Computers(Degree/Diploma)`, `Any Hotel-Management`, `Any Management`, `Any Medical`
         - Year range inputs: `From ⌵` `To ⌵`
     - **PG Qualification**:
       - Selectable pill chips: `Any PG qualification` | `Specific PG qualification` | `No PG qualification`
     - Link: `+ Add PPG/Doctorate Qualification`
  7. **Accordion 3: Diversity Hiring (Badge: `New Add-on`)**:
     - **Gender**:
       - Pill chips: `All candidates` (active) | `Male candidates` | `Female candidates`
     - **Candidates with Career Break**:
       - Pill chip: `Women returning to work`
     - **Differently-abled**:
       - Input: `Select differently abled type`
       - Suggested pill chips: `Any +`, `Blindness +`, `Low Vision +`, `Hearing Impairment +`, `Speech and Language Disability +`, `Locomotor Disability +`, `+17 more`
     - **Defence Background Personnel**:
       - Suggested pill chips: `Any +`, `Army +`, `Navy +`, `Air Force +`, `Other Paramilitary Forces +`
  8. **Accordion 4: Additional Details**:
     - **Candidate Details**:
       - Category Input: `Add candidate category`
       - Age Inputs: `Min age` `to` `Max age` `Years`
     - **Work Details**:
       - Dropdowns: `Job type ⌵`, `Employment type ⌵`
       - Work Permit Dropdown:
         - Input: `Choose category`
         - Options: `United States`, `India`, `Australia`, `Bahrain`, `Bangladesh`, `Belgium`, `Canada`
  9. **Display Details**:
     - **Show**: `All candidates`, `New registrations`, `Modified candidates`
     - **Show Only**: `Verified mobile number +`, `Verified email ID +`, `Attached resume +`
  10. **Bottom Form Submission Bar**:
      - Freshness dropdown: `Active in - 6 months ⌵` (options: `3 days`, `7 days`, `15 days`, `30 days`, `2 months`, `3 months`, `6 months`)
      - Primary Action Button: `Search candidates` (solid blue `#1765e8`, px-8 py-3)
- **Right Sidebar Content**:
  - **Recent Searches**:
    - Query 1: `aws, azure, oci | infrastructure, certified, "immediate joiner" | >=4 years | Hyderabad` -> actions: `Fill this search`, `Search profiles`
    - Query 2: `IT, "rfp writer", "proposal writer" | Hyderabad` -> actions: `Fill this search`, `Search profiles`
    - Query 3: `"pre sales", presales, "pre-sales" | "software product", documentation | 2-8 years | Hyderabad` -> actions: `Fill this search`, `Search profiles`
    - Query 4: `it products | rfq | 1-5 years | Hyderabad` -> actions: `Fill this search`, `Search profiles`
  - **Saved Searches** (with `View all` link):
    - `GIS Developer` -> `"GIS Developer", esri, html, javascript` -> `Fill this search`, `10+ new profiles`
- **Interactive Triggers**:
  - Typing in keywords triggers autocomplete suggestions.
  - Clicking `Fill this search` auto-populates all form inputs with the stored query parameters.
  - Clicking `Search candidates` navigates to the Candidate Search Results page (`Cluster 6`).

---

### Screen Cluster 6: Candidate Search Results Page
- **Identifier**: `TN-047`, `TN-066`
- **Reference Image**: `Screenshot 2026-11-06 180011.png`
- **Layout Structure**:
  - Top summary header banner with AI match counter.
  - Second-level controls: freshness selector, sorting, items per page, pagination.
  - Third-level action bar: select all, bulk actions, and direct NVite callout.
  - Main results area with left filter sidebar and candidate profile cards.
- **Top Summary Banner**:
  - Icons: `👥` (user search icon) + `📊` (analytics chart) + `>`
  - Sparkle Icon + Title: `✦ AI found 15,97,293 profiles for java, Male candidates`
  - Action link: `Modify` (opens search drawer / navigates back to form)
  - Right Action Button: `Save Search` (outline button)
- **Toolbar & Pagination Controls**:
  - Left Freshness Filter: `Active in` `6 months ⌵`
  - Right Controls:
    - `Sort by:` `Relevance ⌵`
    - `Show` `40 ⌵`
    - Pagination: `|<< < Page 1 of 39933 > >>|`
- **Action Bar**:
  - Selection: `[ ] Select all`
  - Bulk Folder: `📁 Add to ⌵`
  - Reminder: `🕒 Set reminder ⌵`
  - Right Action Nudge: `Want to email candidates? Switch to NVite ⓘ` (interactive link)
- **Candidate Result Cards (Visible under modal in 180014)**:
  - Candidate Photo Avatar
  - Title: `Java Full Stack Developer`
  - Highlighted Matched Skills (yellow badge highlight): `Core Java`, `REST APIs`, `Spring Boot`
  - Actions: `View phone number`, `Call candidate`, `Verified phone & email`, `Comment`, `Save`, `Modified yesterday`.
- **Interactive Triggers**:
  - Clicking `Switch to NVite` opens the NVite Targeting Preferences Modal (`Cluster 7`).
  - Clicking `Modify` returns to the Resdex Search Form with current filters preserved.

---

### Screen Cluster 7: NVite Targeting Preferences Modal
- **Identifier**: `TN-054`
- **Reference Image**: `Screenshot 2026-11-06 180014.png`
- **Trigger**: Displayed as an elevated modal dialog over the Search Results page when clicking `Switch to NVite` or selecting candidates for outreach.
- **Modal Component Hierarchy**:
  - Backdrop: Soft blurred dark overlay (`bg-black/50`).
  - Modal Window: Centered white card (`rounded-2xl max-w-lg p-6 shadow-2xl`).
- **Header Elements**:
  - Badge: `NVite` (soft amber pill badge)
  - Headline: `Before you proceed, add these preferences for relevant targeting`
  - Close button: `✕` (top right)
- **Form Fields**:
  - **Experience ***:
    - Min Experience: `[Min experience ⌵]` (dropdown values: `0, 1, 2, 3, 4, 5...`)
    - Separator: `to`
    - Max Experience: `[Max experience]` (highlighted in red border when validation error or required)
    - Unit: `Years`
  - **Current Location of Candidate**:
    - Input: `[Add location]`
    - Checkbox: `[ ] Include candidates who prefer to relocate to above locations`
  - **Annual Salary**:
    - Min Salary: `[Min salary]`
    - Separator: `to`
    - Max Salary: `[Max salary]`
    - Unit: `Lacs`
    - Helper Note: `Ensure that this is candidate's current annual salary and not the salary you will offer them`
    - Checkbox: `[ ] Include candidates who did not mention their current salary`
- **Footer**:
  - Primary Action Button: `Update preferences` (solid blue `#1765e8`, full width or right-aligned)
- **Interactive Triggers**:
  - Entering required min/max experience enables `Update preferences`.
  - Clicking `Update preferences` transitions the flow directly to the Send NVite Wizard (`Cluster 8`).

---

### Screen Cluster 8: Send NVite Campaign Wizard & Outreach Flow
- **Identifier**: `TN-054`, `TN-068`
- **Reference Images**: `Screenshot 2026-11-06 175950.png`, `180140.png`, `180151.png`, `180154.png`
- **Layout Structure**:
  - Multi-step campaign composer with breadcrumb progress.
  - Step 0: Pre-fill / Search candidates for NVite (`175950`).
  - Step 1: Compose details & role criteria (`180140`).
  - Step 2: JD & Responsibilities preview (`180151`).
  - Step 3: Collaboration, delivery channels, AI boost & Send (`180154`).
- **Screen 8A: Send NVite Search / Pre-fill Tab** (`175950`):
  - Top Tabs: `Search candidates` | `Send NVite` (active)
  - Header: `Search candidates for NVite`
  - Subtitle: `Send your NVite to relevant candidates by adding these details`
  - Notice Banner: `'*' marked fields are mandatory` (soft blue banner)
  - Keywords Section:
    - Label: `Keywords` + purple badge `Recommended`
    - Chip: `[★ java ✕]`
  - Right Sidebar:
    - Section 1: `Use your recent NVites`
      - `Infrastructure Specialist | 5-10 years | 0.6-1.5 Lacs | Hyderabad` -> `Pre-fill search details`
      - `Us It Recruiter | 8-10 years | 4.75-9.75 Lacs | Hyderabad` -> `Pre-fill search details`
      - `Presales Coordinator | 0-5 years | 0.5-0.7 Lacs | Hyderabad` -> `Pre-fill search details`
      - `Digital Marketing Executive | 0-3 years | 1-3 Lacs | Hyderabad`
    - Section 2: `Use your recently posted jobs`
      - `Sr GIS Analyst - Database | 5-10 years | 5-15 Lacs | Hyderabad`
- **Screen 8B: Compose Details Wizard** (`180140`):
  - Breadcrumb Progress: `✈ Send NVite > 500 candidates selected > Compose details`
  - Section 1: `How would you like to proceed?`
    - Radio Option 1: `(o) Create new`
      - Subtitle: `All responses will appear as a new item in Manage Jobs and Responses`
    - Radio Option 2: `( ) Use a previous one/posted job`
      - Subtitle: `Responses will be clubbed with a previous NVite/posted job`
  - Section 2: `Compose details to be shared with candidates`:
    - Link: `Pre-fill details using a previous NVite`
    - Field 1: `Designation *`
      - Input Placeholder: `Short & specific designations get more candidate attention`
      - Value: `Infrastructure Specialist`
      - Suggestion chips: `Software Engineer`, `Software Developer`
    - Field 2: `Work mode *`
      - Dropdown: `In office ⌵` (options: `In office`, `Hybrid`, `Remote`)
    - Field 3: `Key skills *`
      - Selected Chips: `[★ java ✕]` or `[Azure Certified]`, `[AWS Certified]`, `[Oracle Certified]`
    - Field 4: `Work experience (years) *`
      - Dropdown 1: `[2 ⌵]` `to` Dropdown 2: `[6 ⌵]` (or `5 to 10`)
- **Screen 8C: Detailed JD & Compensation** (`180151`):
  - Section Header: `Your NVite details`
  - Fields Summary:
    - Designation: `Infrastructure Specialist` | Work mode: `In office`
    - Key Skills: `Azure Certified`, `AWS Certified`, `Oracle Certified`
    - Experience: `5 to 10`
    - Job Location: `Hyderabad`
    - Annual Offered Salary: `₹ 60,000 to 1.5 lacs`
  - Verbatim Job Description:
    > "We are looking for a skilled Infrastructure Specialist with strong expertise in cloud platforms such as Azure, AWS, or OCI, along with hands-on experience in networking and firewall management. The ideal candidate should possess relevant cloud certifications, excellent communication skills, and the ability to manage and support IT infrastructure operations effectively."
  - Verbatim Roles & Responsibilities:
    > "- Manage, monitor, and maintain cloud infrastructure across Azure, AWS, or Oracle Cloud Infrastructure (OCI)."  
    > "- Configure, troubleshoot, and maintain network infrastructure, including LAN, WAN, VPN, routing, and switching."  
    > "- Implement, manage, and troubleshoot firewall configurations, security policies, and access controls."
- **Screen 8D: Collaboration, Channels & AI Broadcast** (`180154`):
  - Section 1: `Collaborate with other users`
    - `Responses can be viewed and managed by`: `sheela.nancy@ispatialtec.com (Me)`
    - `Responses will be notified through email to the below users`: `No users added`
  - Section 2: `Candidates will be able to view your NVite on their`
    - Channels: `🔔 App notification` + `✉ Email` + `💻 Naukri inbox`
  - Section 3: AI Matching Expansion (Badge: `Beta`):
    - Title: `Allow Naukri to get more applies by reaching out to additional matching candidates` (green badge `No extra cost`)
    - Radio Options:
      - `( ) Yes, I am interested`
      - `( ) No, I don't require it`
  - Sticky Bottom Action Bar:
    - Left audience counter: `Reaching out to 500 candidates`
    - Right Actions:
      - Button: `Preview` (outline button)
      - Button: `Send now` (solid blue `#1765e8` button)
- **Interactive Triggers**:
  - Selecting `Pre-fill details using a previous NVite` loads pre-configured parameters.
  - Clicking `Preview` shows candidate perspective modal.
  - Clicking `Send now` broadcasts the NVite outreach to 500 candidates, updates the quota usage on the Home Dashboard (decrements NVite balance by 500), and creates a new entry under `Manage Jobs and Responses`.

---

## 3. Design Tokens & Styling System Inferred from Visuals

| Token Category | Token Name | Value / Specification | Context of Use |
| :--- | :--- | :--- | :--- |
| **Colors - Primary** | `blue-600` / Primary Action | `#1765e8` / `#1a73e8` | Main action buttons (`Search candidates`, `Send now`, `Explore our products`), active links |
| **Colors - Primary Dark** | `blue-700` / Primary Hover | `#1351be` | Hover state for primary buttons |
| **Colors - Active Tab** | `red-500` / Tab Underline | `#e63946` / `#d9383a` | Underline border for active tabs (`Jobs & Responses`, `All responses 80`, `All Jobs 70`) |
| **Colors - Background** | App Shell Canvas | `#f8fafc` / `#f4f6f8` | Page body background for high contrast with white cards |
| **Colors - Surface** | Card Surface | `#ffffff` | Elevated cards, tables, search builder containers, modals |
| **Colors - Hero Dark** | Landing Hero Surface | `#0c1021` to `#111827` | Public landing page hero background |
| **Colors - Text** | `text-primary` | `#111827` (gray-900) | Primary titles, candidate names, metric numbers |
| **Colors - Text Secondary**| `text-secondary` | `#4b5563` (gray-600) | Subtitles, field labels, metadata descriptions |
| **Colors - Text Muted** | `text-muted` | `#9ca3af` (gray-400) | Placeholders, inactive breadcrumb items, timestamps |
| **Colors - Status Green** | `emerald-600` / `teal-600` | `#059669` / `#0d9488` | `Active` status badge, `Recommended` candidate badge, `Shortlist` button |
| **Colors - Status Orange**| `amber-500` / `orange-500` | `#f59e0b` / `#ea580c` | `Hot Vacancy` badge, `NVite` modal badge |
| **Colors - Status Blue** | `blue-500` Count Pill | `#2563eb` | `33 New`, `2 New` unread response count pills |
| **Colors - Status Purple**| `violet-600` AI Accent | `#7c3aed` / `#8b5cf6` | `✦ AI found...`, `Beta` badge, `Recommended` keyword badge |
| **Typography** | Font Family | `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | Clean, modern sans-serif across all screens |
| **Typography** | Headings | 20px–24px font-bold | Screen titles (`Manage Jobs and Responses`, `Search candidates`) |
| **Typography** | Card Headings | 16px–18px font-semibold | Section headers (`Quota usage`, `Resdex Searches`, `Job Postings`) |
| **Typography** | Body Text | 13px–14px font-normal | Candidate details, table row text, input fields |
| **Typography** | Microcopy / Badges | 11px–12px font-medium | Pill tags, status badges, counter pills, SLA indicators |
| **Border Radius** | Pill Chips | `rounded-full` (`9999px`) | Filter tags, status badges, action pills (`Call from app`, `Shortlist`) |
| **Border Radius** | Cards & Panels | `rounded-xl` / `rounded-2xl` (`12px`–`16px`) | Dashboard widget cards, modal container, search form box |
| **Border Radius** | Form Controls | `rounded-lg` (`8px`) | Text inputs, dropdowns, primary buttons |
| **Elevation / Shadow** | Card Shadow | `0 1px 3px 0 rgba(0, 0, 0, 0.05)` | Clean, modern subtle shadow matching SaaS enterprise UI |
| **Elevation / Shadow** | Modal Shadow | `0 20px 25px -5px rgba(0, 0, 0, 0.15)` | Centered dialog overlays |

---

## 4. Key Interactive Triggers & Workflow Transitions

```
[Landing Page (/)]
    │
    ├── Click "Explore our products" ──► Routes to Public Catalog / Solutions
    │
    └── Click "Login with Naukri Launcher" ──► Routes to Recruiter / Employer Dashboard (/employer)
                                                        │
         ┌──────────────────────────────────────────────┴─────────────────────────────────────────────┐
         ▼                                              ▼                                             ▼
[Employer Dashboard]                            [Manage Jobs & Responses]                   [Resdex Search Form]
 (Quota usage, Postings, Webinars)               (/employer/jobs)                            (/employer/matching)
         │                                              │                                             │
         ├─► Click "View all jobs" ─────────────────────┘                                             ├─► Type keywords (e.g. "java")
         ├─► Click Job Row (e.g. "Us It Recruiter") ───┐                                              │   └─► Autocomplete dropdown opens
         │                                             │                                              ├─► Click "Search candidates"
         └─► Click Resdex Search query chip ───────────┼──────────────────────────────────────────────┤   └─► Routes to Results Page
                                                       │                                              ▼
                                                       ▼                                     [Search Results Page]
                                         [Applicant Responses View]                           (15,97,293 AI matches)
                                          (/employer/jobs/:id/responses)                              │
                                                       │                                              ├─► Click "Switch to NVite"
                                                       ├─► Click "✓ Shortlist" ──► Moves to Shortlist │   └─► Opens Preferences Modal
                                                       ├─► Click "⨂ Reject" ──► Moves to Rejected    ▼
                                                       ├─► Click "📞 Contact" ──► Reveals contacts [NVite Preferences Modal]
                                                       │                                              │
                                                       └─► Click "📱 Call from app" ──► In-app dialer └─► Click "Update preferences"
                                                                                                      ▼
                                                                                            [Send NVite Wizard]
                                                                                             (/recruiter/outreach)
                                                                                             (Compose -> JD -> Collaboration -> Send)
                                                                                                      │
                                                                                                      └─► Click "Send now"
                                                                                                          └─► Deducts 500 from NVite Quota
                                                                                                          └─► Creates new job in Manage Jobs
```

---

## 5. Current Implementation Gap Analysis

Comparing the visual specifications from the 33 screenshots against the existing code in `src/`:
1. **Landing & Authentication (`src/pages/AuthPages.tsx` / `DemoPages.tsx`)**:
   - Current implementation has generic forms for login and onboarding.
   - Missing: The dark hero design `TALENT DECODED: Decode India's largest talent pool with the power of ✦ AI` and the floating `Login with Naukri Launcher` authentication card with quick help and phone assistance.
2. **Employer / Recruiter Dashboard (`src/pages/EmployerPages.tsx` / `RecruiterPages.tsx`)**:
   - Current implementation uses mock metrics and general charts.
   - Missing: Quota usage carousel card (`4,000 CV Access`, `32,000 NVite`, `20 Hot Vacancy`), AmbitionBox Employee Choice Awards banner, `Job Postings` recent summary table, `Resdex Searches` recent & saved chips, `Resdex Folders` list (`PCB`, `Program Manager`, `sitecore`), and `Upcoming Webinars` sidebar card.
3. **Manage Jobs & Responses (`src/pages/EmployerPages.tsx` `JobsPage`)**:
   - Missing: The specific layout with left filter rail (`Active Jobs 27`, `Closed Jobs 3`, `Expired Jobs 40`; Category `NVite 52`, `Private 33`, `Hot Vacancy 21`), the `All Jobs 70` tab with red underline, and the specific cards: `Infrastructure Specialist`, `Sr GIS Analyst - Database` (144 applies, 33 new), `Us It Recruiter` (80 applies, 2 new), `IoT Engineer`.
4. **Applicant Responses View (`src/pages/EmployerPages.tsx` `PipelinePage` / new responses view)**:
   - Missing: The specific ATS layout showing `Apply Inbox (80)`, pipeline stage tabs (`All responses 80`, `Shortlisted 3`, `Maybe 0`, `Rejected 19`), NVite response breakdown (`23% app, 16% bell, 61% email`), and full candidate cards matching `M Arunkumar`, `PAWAR MUKESH`, and `Balgare Kailash`.
5. **Resdex Candidate Search Engine (`src/pages/EmployerPages.tsx` `MatchingPage` / `RecruiterPages.tsx`)**:
   - Missing: The 4-accordion advanced search builder with Boolean keywords, autocomplete dropdown with Ctrl tips, chip builder (`[★ java ✕]`), employment details (department/role, industry, company scope, notice period pills), education course selector, diversity hiring (`New Add-on`), additional details (work permit countries), and recent/saved search rail.
6. **NVite Outreach Modal & Wizard (`src/pages/EmployerPages.tsx` `CommunicationPage` / `RecruiterPages.tsx`)**:
   - Missing: The targeting preferences modal and the 3-step Send NVite composer wizard (`Create new` vs `Use previous`, JD preview for `Infrastructure Specialist`, channels, AI booster toggle, and 500 candidate reach-out).

---

## 6. Recommendations for Implementation Team

1. **Routing & Views Alignment**:
   - Ensure routes `/`, `/employer`, `/employer/jobs`, `/employer/jobs/:id/responses`, `/employer/matching`, and `/recruiter/outreach` cleanly render the reference screens.
2. **Component Library Extensions in `src/components/ui.tsx` or layout**:
   - Ensure badge styles support the exact colors: `Recommended` (teal), `NVite` (amber), `New count` (blue badge), `Active` (green).
   - Support selectable pill chips for notice period, gender, and course types.
   - Support accordion components for the search form.
3. **Data Fidelity**:
   - Seed `mockData.ts` with the exact candidates (`M Arunkumar`, `PAWAR MUKESH`, `Balgare Kailash`), jobs (`Infrastructure Specialist`, `Sr GIS Analyst`, `Us It Recruiter`), and quota stats (`4,000 CV Access`, `32,000 NVite`).
