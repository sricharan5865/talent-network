/**
 * Centralized Resdex & Talent Cloud Data Models
 * Supporting Indian IT recruitment conventions (CTC in Lacs, Notice Periods, NVite campaigns, Quota usage)
 */

export interface CandidateEducation {
  degree: string
  institution: string
  year: number
  fieldOfStudy?: string
  qualificationLevel?: "UG" | "PG" | "Doctorate" | "Diploma"
}

export interface CandidateExperience {
  designation: string
  company: string
  duration: string
  isCurrent: boolean
  location?: string
  keyResponsibilities?: string[]
}

export interface Candidate {
  id: string
  name: string
  headline: string
  experienceYears: number
  experienceMonths: number
  currentSalaryLacs: number
  expectedSalaryLacs?: number
  noticePeriod: string
  currentLocation: string
  preferredLocations?: string[]
  currentCompany: string
  currentDesignation: string
  previousRole?: string
  previousCompany?: string
  education: CandidateEducation | string
  keySkills: string[]
  mayAlsoKnowSkills?: string[]
  verifiedSkills?: string[]
  stage: "all" | "shortlisted" | "maybe" | "rejected"
  subStatus: "new" | "viewed" | "action_pending"
  appliedDate: string
  recommendedBadge?: boolean
  avatarUrl?: string
  bio?: string
  phone?: string
  email?: string
  phoneVerified?: boolean
  emailVerified?: boolean
  hasResumeAttached?: boolean
  lastActive?: string
  source?: "NVite" | "Hot Vacancy" | "Resdex Search" | "Career Portal"
  deliveryChannel?: "Web" | "Mobile Push" | "Email"
  matchScore?: number
  gender?: "Male" | "Female" | "Other"
  diversityCategory?: string
  comments?: CandidateComment[]
}

export interface CandidateComment {
  id: string
  author: string
  text: string
  date: string
}

export interface QuotaUsage {
  id: string
  name: string
  total: number
  used: number
  remaining: number
  unit: string
  renewalDate: string
  assignedUsers?: string
  category?: "RESDEX" | "JOB POSTING"
}

export interface ResdexFolder {
  id: string
  name: string
  count: number
  updatedDate: string
  tags?: string[]
  candidateIds?: string[]
}

export interface JobRequisition {
  id: string
  title: string
  department: string
  postedDate: string
  status: "active" | "closed" | "expired"
  category: "nvite" | "private" | "hot_vacancy"
  appliesCount: number
  newApplies?: number
  cvsCount: number
  shortlistedCount?: number
  maybeCount?: number
  rejectedCount?: number
  notViewedCount?: number
  actionPendingCount?: number
  resdexRecommended?: number
  location: string
  experience: string
  postedBy?: string
  salary?: string
  description?: string
  rolesAndResponsibilities?: string[]
  skills?: string[]
  workMode?: "In office" | "Hybrid" | "Remote"
  targetCandidateCount?: number
}

export interface RecentSearchItem {
  id: string
  displayText: string
  keywords: string[]
  experienceMin?: number
  experienceMax?: number
  location?: string
  timestamp: string
  matchCount?: number
}

export interface SavedSearch {
  id: string
  name: string
  rawQuery: string
  newProfilesCount: number
  lastRunDate: string
  filters?: Record<string, unknown>
}

export interface WebinarItem {
  id: string
  dateStr: string
  timeStr: string
  title: string
  instructor?: string
}

// -------------------------------------------------------------
// MOCK DATA IMPLEMENTATION
// -------------------------------------------------------------

export const mockQuotas: QuotaUsage[] = [
  {
    id: "quota-cv-access",
    name: "RESDEX 4,000 CV Access",
    category: "RESDEX",
    total: 4000,
    used: 2228,
    remaining: 1772,
    unit: "CV Access",
    renewalDate: "31st Mar '27",
    assignedUsers: "1/1 licenses assigned",
  },
  {
    id: "quota-nvite",
    name: "RESDEX 32,000 NVite",
    category: "RESDEX",
    total: 32000,
    used: 18648,
    remaining: 13352,
    unit: "NVite",
    renewalDate: "31st Mar '27",
    assignedUsers: "1/1 licenses assigned",
  },
  {
    id: "quota-hot-vacancies",
    name: "JOB POSTING 20 Hot Vacancies",
    category: "JOB POSTING",
    total: 20,
    used: 18,
    remaining: 2,
    unit: "Hot Vacancy",
    renewalDate: "31st Mar '27",
    assignedUsers: "2/1000 users assigned",
  },
]

export const mockResdexFolders: ResdexFolder[] = [
  {
    id: "folder-pcb",
    name: "PCB",
    count: 138,
    updatedDate: "25-Jun-26",
    tags: ["Hardware", "Circuit Design"],
  },
  {
    id: "folder-pm",
    name: "Program Manager",
    count: 0,
    updatedDate: "24-Jun-26",
    tags: ["Leadership", "Agile"],
  },
  {
    id: "folder-sitecore",
    name: "sitecore",
    count: 152,
    updatedDate: "09-Sept-23",
    tags: ["CMS", "Enterprise Web"],
  },
  {
    id: "folder-office-admin",
    name: "Office administrator",
    count: 40,
    updatedDate: "09-Sept-23",
    tags: ["Operations", "Facilities"],
  },
]

export const mockRecentSearches: RecentSearchItem[] = [
  {
    id: "search-1",
    displayText:
      'aws, azure, oci | infrastructure, certified, "immediate joiner" | >=4 years | Hyderabad',
    keywords: [
      "aws",
      "azure",
      "oci",
      "infrastructure",
      "certified",
      "immediate joiner",
    ],
    experienceMin: 4,
    location: "Hyderabad",
    timestamp: "2 hours ago",
    matchCount: 1420,
  },
  {
    id: "search-2",
    displayText: 'IT, "rfp writer", "proposal writer" | Hyderabad',
    keywords: ["IT", "rfp writer", "proposal writer"],
    location: "Hyderabad",
    timestamp: "Yesterday",
    matchCount: 384,
  },
  {
    id: "search-3",
    displayText:
      '"pre sales", presales, "pre-sales" | "software product", documentation | 2-8 years | Hyderabad',
    keywords: [
      "pre sales",
      "presales",
      "pre-sales",
      "software product",
      "documentation",
    ],
    experienceMin: 2,
    experienceMax: 8,
    location: "Hyderabad",
    timestamp: "2 days ago",
    matchCount: 912,
  },
  {
    id: "search-4",
    displayText: "it products | rfq | 1-5 years | Hyderabad",
    keywords: ["it products", "rfq"],
    experienceMin: 1,
    experienceMax: 5,
    location: "Hyderabad",
    timestamp: "4 days ago",
    matchCount: 520,
  },
]

export const mockSavedSearches: SavedSearch[] = [
  {
    id: "saved-gis",
    name: "GIS Developer",
    rawQuery: '"GIS Developer", esri, html, javascript',
    newProfilesCount: 0,
    lastRunDate: "04 Nov 2026",
  },
  {
    id: "saved-java-lead",
    name: "Lead Java Engineer",
    rawQuery: "java, spring boot, microservices, aws, hyderabad",
    newProfilesCount: 12,
    lastRunDate: "03 Nov 2026",
  },
]

export const mockWebinars: WebinarItem[] = [
  {
    id: "web-1",
    dateStr: "09 Nov",
    timeStr: "10:15 AM",
    title: "Job Posting Essentials",
    instructor: "Naukri Learning Team",
  },
  {
    id: "web-2",
    dateStr: "10 Nov",
    timeStr: "10:15 AM",
    title: "Resdex Essentials",
    instructor: "Talent Cloud Academy",
  },
  {
    id: "web-3",
    dateStr: "12 Nov",
    timeStr: "10:15 AM",
    title: "Resdex Essentials",
    instructor: "Talent Cloud Academy",
  },
  {
    id: "web-4",
    dateStr: "13 Nov",
    timeStr: "10:15 AM",
    title: "Job Posting Essentials",
    instructor: "Naukri Learning Team",
  },
]

// -------------------------------------------------------------
// CORE CANDIDATES DATASET
// -------------------------------------------------------------

export const mockCandidates: Candidate[] = [
  {
    id: "pawar-mukesh",
    name: "PAWAR MUKESH",
    headline:
      "Cloud Professional with 9+ years of IT experience, including 6 years in Azure Cloud Infrastructure & DevOps automation...",
    experienceYears: 9,
    experienceMonths: 5,
    currentSalaryLacs: 13,
    expectedSalaryLacs: 18,
    noticePeriod: "Can join in 0-15d",
    currentLocation: "Bengaluru",
    preferredLocations: [
      "Pune",
      "Noida",
      "Mumbai",
      "Kolkata",
      "Chennai",
      "Gurugram",
      "Hyderabad",
    ],
    currentCompany: "TalentPull & Infrastructure Pvt Ltd",
    currentDesignation: "DevOps Engineer",
    education: {
      degree: "B.Tech / B.E.",
      institution:
        "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal , LNCT Indore",
      year: 2016,
      fieldOfStudy: "Computer Science and Engineering",
      qualificationLevel: "UG",
    },
    keySkills: [
      "CLI",
      "Key Vault",
      "ymal pipeline",
      "IaaS Services",
      "DevOps",
      "Azure Cloud",
      "Azure VM",
      "Azure Monitoring",
      "Github",
      "Terraform",
      "Load Balancing",
      "Auto Scaling",
      "Vnets",
      "Security Management",
      "Log Analytics",
      "Devsecops",
      "GCP Cloud",
      "Cloud Infrastructure",
      "ARM",
      "Aks Kubernetes",
      "Azure Paas",
    ],
    verifiedSkills: [
      "Azure Cloud",
      "Terraform",
      "Kubernetes",
      "CI/CD Pipelines",
    ],
    stage: "all",
    subStatus: "new",
    appliedDate: "4 Nov 26 from NVite",
    recommendedBadge: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    bio: "Cloud Professional with 9+ years of IT experience, including 6 years of core expertise in Azure Cloud Infrastructure, DevSecOps pipelines, AKS Kubernetes clusters, and automated Terraform configuration.",
    phone: "+91 98765 43210",
    email: "mukesh.pawar@talentpull.in",
    phoneVerified: true,
    emailVerified: true,
    hasResumeAttached: true,
    lastActive: "Active yesterday",
    source: "NVite",
    deliveryChannel: "Mobile Push",
    matchScore: 92,
    gender: "Male",
  },
  {
    id: "balgare-kailash",
    name: "Balgare Kailash",
    headline:
      "Operations & Automation Analyst | BMC Control-M Scheduler | Azure Cloud Operations specialist...",
    experienceYears: 5,
    experienceMonths: 2,
    currentSalaryLacs: 8,
    expectedSalaryLacs: 12,
    noticePeriod: "Serving notice",
    currentLocation: "Hyderabad (Lingampally)",
    preferredLocations: [
      "Mumbai",
      "Bengaluru",
      "Hyderabad",
      "Mumbai (All Areas)",
    ],
    currentCompany: "HCLTech",
    currentDesignation: "Specialist",
    education: {
      degree: "B.C.A.",
      institution: "Sastra University",
      year: 2024,
      qualificationLevel: "UG",
    },
    keySkills: [
      "Control-M",
      "Job Scheduling",
      "Private Cloud",
      "Monitoring Tools",
      "Public Cloud",
      "Monitoring",
      "Linux Administration",
      "Shell Scripting",
      "BMC Remedy",
      "Incident Management",
    ],
    verifiedSkills: ["Control-M", "Job Scheduling", "Monitoring Tools"],
    stage: "all",
    subStatus: "new",
    appliedDate: "5 Nov 26 from NVite",
    recommendedBadge: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    bio: "Operations & Automation Analyst | BMC Control-M Scheduler | Azure Cloud Operations specialist with 5+ years supporting mission-critical enterprise environments and scheduled batch workloads.",
    phone: "+91 98451 23456",
    email: "kailash.balgare@hcltech.com",
    phoneVerified: true,
    emailVerified: true,
    hasResumeAttached: true,
    lastActive: "Active today",
    source: "NVite",
    deliveryChannel: "Email",
    matchScore: 88,
    gender: "Male",
  },
  {
    id: "m-arunkumar",
    name: "M Arunkumar",
    headline:
      "6+Years of Rich Experience in Recruitment Specialist in Bulk & Niche Staffing...",
    experienceYears: 8,
    experienceMonths: 0,
    currentSalaryLacs: 8,
    expectedSalaryLacs: 11,
    noticePeriod: "1m notice",
    currentLocation: "Hyderabad (Goshamahal)",
    preferredLocations: ["Hyderabad", "Vijayawada"],
    currentCompany: "Teamlease Services Pvt Ltd",
    currentDesignation: "Assistant Manager Recruitment Hiring",
    previousCompany: "Caliber Human capital services Pvt LTD Resources",
    previousRole: "Senior HR Recruitment Specialist",
    education: {
      degree: "B.A - Bachelor of Arts",
      institution: "Government Degree College Khairtabad (A-U)",
      year: 2018,
      qualificationLevel: "UG",
    },
    keySkills: [
      "US Loan",
      "US Commercial Mortgage",
      "US Mortgage",
      "UK Recruitment",
      "International Recruitment",
      "IT Recruitment",
      "US IT Staffing",
      "US Recruitment",
      "US Process",
      "IT Staffing",
      "UK Process",
      "US Staffing",
      "US IT Recruitment",
      "UK IT Recruitment",
      "Talent Acquisition",
    ],
    verifiedSkills: [
      "US IT Staffing",
      "Talent Acquisition",
      "International Recruitment",
    ],
    stage: "all",
    subStatus: "new",
    appliedDate: "2 Nov 26 from NVite",
    recommendedBadge: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    bio: "6+Years of Rich Experience in Recruitment Specialist in Bulk & Niche Staffing across US & UK geography. Proven track record filling complex technical mandates on W2 and Corp-to-Corp contracts.",
    phone: "+91 99887 65432",
    email: "arunkumar.m@teamlease.com",
    phoneVerified: true,
    emailVerified: true,
    hasResumeAttached: true,
    lastActive: "Active today",
    source: "NVite",
    deliveryChannel: "Web",
    matchScore: 96,
    gender: "Male",
  },
  {
    id: "sunita-reddy",
    name: "Sunita Reddy",
    headline:
      "Lead Java Full Stack Architect | Spring Boot, Microservices, React & AWS Cloud",
    experienceYears: 7,
    experienceMonths: 4,
    currentSalaryLacs: 16,
    expectedSalaryLacs: 24,
    noticePeriod: "0-15 days",
    currentLocation: "Hyderabad",
    preferredLocations: ["Hyderabad", "Bengaluru", "Remote"],
    currentCompany: "Infosys Limited",
    currentDesignation: "Senior Technology Specialist",
    education: {
      degree: "B.Tech Computer Science",
      institution: "Jawaharlal Nehru Technological University (JNTU) Hyderabad",
      year: 2017,
      qualificationLevel: "UG",
    },
    keySkills: [
      "Java",
      "Core Java",
      "Spring Boot",
      "Microservices",
      "Hibernate",
      "REST APIs",
      "AWS Cloud",
      "Docker",
      "Kubernetes",
      "Kafka",
      "PostgreSQL",
      "React.js",
    ],
    verifiedSkills: ["Core Java", "Spring Boot", "Microservices", "REST APIs"],
    stage: "shortlisted",
    subStatus: "action_pending",
    appliedDate: "01 Nov 26 from NVite",
    recommendedBadge: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    bio: "Senior Java Developer with 7+ years building resilient, high-throughput financial distributed systems with Spring Boot, event-driven Kafka, and AWS cloud native microservices.",
    phone: "+91 91234 56789",
    email: "sunita.reddy@gmail.com",
    phoneVerified: true,
    emailVerified: true,
    hasResumeAttached: true,
    lastActive: "Active in 3 days",
    source: "NVite",
    deliveryChannel: "Web",
    matchScore: 95,
    gender: "Female",
    diversityCategory: "Women returning to work",
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    headline:
      "Senior IoT & Embedded Firmware Systems Specialist | RTOS & ARM Cortex",
    experienceYears: 4,
    experienceMonths: 6,
    currentSalaryLacs: 9,
    expectedSalaryLacs: 14,
    noticePeriod: "Serving notice",
    currentLocation: "Hyderabad",
    preferredLocations: ["Hyderabad", "Bengaluru", "Pune"],
    currentCompany: "Qualcomm India",
    currentDesignation: "Embedded Software Engineer",
    education: {
      degree: "B.Tech Electronics & Communication",
      institution: "Osmania University College of Engineering",
      year: 2020,
      qualificationLevel: "UG",
    },
    keySkills: [
      "IoT",
      "Embedded C",
      "RTOS",
      "ARM Cortex",
      "MQTT",
      "BLE",
      "Firmware",
      "I2C",
      "SPI",
      "Microcontrollers",
      "Embedded Linux",
    ],
    verifiedSkills: ["Embedded C", "RTOS", "ARM Cortex"],
    stage: "shortlisted",
    subStatus: "viewed",
    appliedDate: "28 Oct 26 from Job Posting",
    recommendedBadge: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    bio: "Firmware Engineer specialized in ultra-low-power IoT sensor devices, embedded Linux kernel development, and secure RTOS communication drivers.",
    phone: "+91 97654 32109",
    email: "rahul.verma@qualcomm.com",
    phoneVerified: true,
    emailVerified: true,
    hasResumeAttached: true,
    lastActive: "Active yesterday",
    source: "Hot Vacancy",
    deliveryChannel: "Mobile Push",
    matchScore: 91,
    gender: "Male",
  },
  {
    id: "kavya-nair",
    name: "Kavya Nair",
    headline:
      "Senior GIS Database Analyst & Spatial Systems Developer | ESRI, PostGIS & Python",
    experienceYears: 6,
    experienceMonths: 1,
    currentSalaryLacs: 11,
    expectedSalaryLacs: 16,
    noticePeriod: "0-15 days",
    currentLocation: "Hyderabad",
    preferredLocations: ["Hyderabad", "Chennai", "Bengaluru"],
    currentCompany: "Cyient Limited",
    currentDesignation: "Senior GIS Analyst",
    education: {
      degree: "M.Tech Geoinformatics",
      institution: "Andhra University College of Engineering",
      year: 2019,
      qualificationLevel: "PG",
    },
    keySkills: [
      "GIS Developer",
      "ESRI",
      "ArcGIS Enterprise",
      "PostGIS",
      "Python",
      "Spatial SQL",
      "QGIS",
      "GeoServer",
      "Spatial Analysis",
      "JavaScript",
    ],
    verifiedSkills: ["ESRI", "PostGIS", "Spatial SQL"],
    stage: "all",
    subStatus: "viewed",
    appliedDate: "03 Nov 26 from Job Posting",
    recommendedBadge: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    bio: "Geospatial database professional with 6+ years architecting spatial data models, automated geo-processing workflows in Python, and ESRI enterprise portal integrations.",
    phone: "+91 94321 09876",
    email: "kavya.nair@cyient.com",
    phoneVerified: true,
    emailVerified: true,
    hasResumeAttached: true,
    lastActive: "Active today",
    source: "Hot Vacancy",
    deliveryChannel: "Web",
    matchScore: 94,
    gender: "Female",
  },
  {
    id: "siddharth-verma",
    name: "Siddharth Verma",
    headline:
      "US IT Technical Recruiter & Account Lead | 10+ Years W2/C2C Full-Lifecycle Hiring",
    experienceYears: 10,
    experienceMonths: 3,
    currentSalaryLacs: 9.5,
    expectedSalaryLacs: 13,
    noticePeriod: "1m notice",
    currentLocation: "Hyderabad",
    preferredLocations: ["Hyderabad", "Noida", "Gurugram"],
    currentCompany: "Kforce Inc",
    currentDesignation: "Lead US IT Recruiter",
    education: {
      degree: "B.Sc Computer Science",
      institution: "Kakatiya University",
      year: 2014,
      qualificationLevel: "UG",
    },
    keySkills: [
      "US IT Recruitment",
      "US Staffing",
      "W2 Hiring",
      "C2C Sourcing",
      "Dice",
      "Monster",
      "Carrier",
      "Salary Negotiation",
      "Boolean Search",
      "Technical Screening",
    ],
    verifiedSkills: ["US IT Recruitment", "US Staffing", "Boolean Search"],
    stage: "shortlisted",
    subStatus: "action_pending",
    appliedDate: "24 Oct 26 from NVite",
    recommendedBadge: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80",
    bio: "Senior US staffing consultant with deep domain expertise in sourcing cleared defense engineers, cloud DevOps leads, and Java full stack specialists.",
    phone: "+91 96543 21098",
    email: "siddharth.v@kforce.com",
    phoneVerified: true,
    emailVerified: true,
    hasResumeAttached: true,
    lastActive: "Active in 2 days",
    source: "NVite",
    deliveryChannel: "Email",
    matchScore: 89,
    gender: "Male",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    headline:
      "Principal Product & Interaction Designer | Design Systems, Figma & UX Research Lead",
    experienceYears: 7,
    experienceMonths: 0,
    currentSalaryLacs: 22,
    expectedSalaryLacs: 32,
    noticePeriod: "30 days",
    currentLocation: "Bengaluru",
    preferredLocations: ["Bengaluru", "Mumbai", "Remote"],
    currentCompany: "Nexora Labs",
    currentDesignation: "Senior Product Designer",
    education: {
      degree: "B.Des Industrial & Interaction Design",
      institution: "National Institute of Design (NID) Ahmedabad",
      year: 2018,
      qualificationLevel: "UG",
    },
    keySkills: [
      "Figma",
      "Design Systems",
      "User Research",
      "Interaction Design",
      "Prototyping",
      "Usability Testing",
      "Micro-interactions",
      "Accessibility (WCAG)",
    ],
    verifiedSkills: ["Figma", "Design Systems", "User Research"],
    stage: "shortlisted",
    subStatus: "action_pending",
    appliedDate: "26 Oct 26 from Resdex",
    recommendedBadge: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    bio: "Lead product designer crafting zero-friction enterprise workflows and design systems used across millions of monthly active users.",
    phone: "+91 98111 22334",
    email: "priya.sharma@nexoralabs.com",
    phoneVerified: true,
    emailVerified: true,
    hasResumeAttached: true,
    lastActive: "Active today",
    source: "Resdex Search",
    deliveryChannel: "Web",
    matchScore: 98,
    gender: "Female",
  },
]

// -------------------------------------------------------------
// JOB REQUISITIONS DATASET
// Total: 70 jobs (Active: 27, Closed: 3, Expired: 40 | NVite: 52, Private: 33, Hot Vacancy: 21 | Me: 70)
// -------------------------------------------------------------

const primaryRequisitions: JobRequisition[] = [
  {
    id: "req-infra-01",
    title: "Infrastructure Specialist",
    department: "Cloud Infrastructure & Networks",
    postedDate: "04 Nov 2026",
    status: "active",
    category: "nvite",
    appliesCount: 59,
    newApplies: 4,
    cvsCount: 65,
    shortlistedCount: 5,
    maybeCount: 2,
    rejectedCount: 12,
    notViewedCount: 8,
    actionPendingCount: 35,
    resdexRecommended: 45,
    location: "Hyderabad",
    experience: "5-10 years",
    postedBy: "sheela.nancy@ispatialtec.com (Me)",
    salary: "₹ 60,000 to 1.5 lacs",
    workMode: "In office",
    description:
      "We are looking for a skilled Infrastructure Specialist with strong expertise in cloud platforms such as Azure, AWS, or OCI, along with hands-on experience in networking and firewall management.",
    rolesAndResponsibilities: [
      "Manage, monitor, and maintain cloud infrastructure across Azure, AWS, or Oracle Cloud Infrastructure (OCI).",
      "Configure, troubleshoot, and maintain network infrastructure, including LAN, WAN, VPN, routing, and switching.",
      "Implement, manage, and troubleshoot firewall configurations, security policies, and access controls.",
    ],
    skills: [
      "Azure Certified",
      "AWS Certified",
      "Oracle Certified",
      "Networking",
      "Firewalls",
    ],
    targetCandidateCount: 500,
  },
  {
    id: "req-gis-02",
    title: "Sr GIS Analyst - Database",
    department: "Geospatial Engineering",
    postedDate: "03 Nov 2026",
    status: "active",
    category: "hot_vacancy",
    appliesCount: 144,
    newApplies: 33,
    cvsCount: 150,
    shortlistedCount: 0,
    maybeCount: 5,
    rejectedCount: 22,
    notViewedCount: 42,
    actionPendingCount: 75,
    resdexRecommended: 150,
    location: "Hyderabad",
    experience: "5-10 years",
    postedBy: "sheela.nancy@ispatialtec.com (Me)",
    salary: "₹ 5-15 Lacs",
    workMode: "Hybrid",
    description:
      "Senior GIS Analyst with extensive database administration and spatial analysis capabilities using ESRI ArcGIS Enterprise, PostGIS, and Python automation.",
    rolesAndResponsibilities: [
      "Architect spatial database schemas and ensure optimal query indexing for multi-gigabyte shapefiles and rasters.",
      "Maintain geodatabase versioning and spatial replication pipelines.",
      "Collaborate with civil infrastructure teams to deliver interactive spatial map layers.",
    ],
    skills: [
      "GIS Developer",
      "ESRI",
      "ArcGIS",
      "PostGIS",
      "Spatial SQL",
      "Python",
    ],
    targetCandidateCount: 150,
  },
  {
    id: "req-us-rec-03",
    title: "Us It Recruiter",
    department: "Human Resources & Staffing",
    postedDate: "22 Oct 2026",
    status: "active",
    category: "nvite",
    appliesCount: 80,
    newApplies: 2,
    cvsCount: 85,
    shortlistedCount: 3,
    maybeCount: 0,
    rejectedCount: 19,
    notViewedCount: 14,
    actionPendingCount: 58,
    resdexRecommended: 120,
    location: "Hyderabad",
    experience: "8-10 years",
    postedBy: "sheela.nancy@ispatialtec.com (Me)",
    salary: "₹ 4.75-9.75 Lacs",
    workMode: "In office",
    description:
      "Seeking experienced US IT Recruiters with strong grasp of US tax terms (W2, 1099, C2C), visa categories (H1B, Green Card, US Citizen), and niche talent sourcing.",
    rolesAndResponsibilities: [
      "Source, screen, and close senior technology candidates for direct clients across the United States.",
      "Coordinate interview schedules with US hiring managers and negotiate competitive hourly bill rates.",
      "Maintain pipeline metrics and daily submission targets in the ATS.",
    ],
    skills: [
      "US IT Staffing",
      "W2/C2C",
      "Boolean Search",
      "Dice",
      "Monster",
      "Rate Negotiation",
    ],
    targetCandidateCount: 867,
  },
  {
    id: "req-iot-04",
    title: "Iot Engineer / Embedded Systems Engineer",
    department: "Hardware & IoT Innovations",
    postedDate: "15 Oct 2026",
    status: "active",
    category: "hot_vacancy",
    appliesCount: 72,
    newApplies: 2,
    cvsCount: 7,
    shortlistedCount: 7,
    maybeCount: 1,
    rejectedCount: 14,
    notViewedCount: 12,
    actionPendingCount: 40,
    resdexRecommended: 7,
    location: "Hyderabad",
    experience: "3-7 years",
    postedBy: "sheela.nancy@ispatialtec.com (Me)",
    salary: "₹ 6-12 Lacs",
    workMode: "In office",
    description:
      "Embedded firmware developer responsible for prototyping IoT telemetry nodes, wireless connectivity (BLE/WiFi), and hardware abstraction layers.",
    rolesAndResponsibilities: [
      "Write modular Embedded C/C++ firmware running on ARM Cortex microcontrollers.",
      "Implement secure MQTT and HTTPS communication protocols for device-to-cloud ingestion.",
      "Perform hardware board bring-up and analyze bus communications with oscilloscopes.",
    ],
    skills: ["IoT", "Embedded C", "RTOS", "ARM Cortex", "MQTT", "BLE"],
    targetCandidateCount: 100,
  },
  {
    id: "req-presales-05",
    title: "Presales Coordinator",
    department: "Business Solutions & Proposals",
    postedDate: "08 Oct 2026",
    status: "active",
    category: "private",
    appliesCount: 35,
    newApplies: 0,
    cvsCount: 40,
    shortlistedCount: 4,
    maybeCount: 2,
    rejectedCount: 8,
    notViewedCount: 5,
    actionPendingCount: 20,
    resdexRecommended: 25,
    location: "Hyderabad",
    experience: "0-5 years",
    postedBy: "sheela.nancy@ispatialtec.com (Me)",
    salary: "₹ 0.5-0.7 Lacs",
    workMode: "In office",
    description:
      "Coordination of technical proposals, tender document preparation (RFP/RFQ), and liaison between sales representatives and delivery teams.",
    rolesAndResponsibilities: [
      "Review enterprise RFPs and compile comprehensive response documentation.",
      "Track submission deadlines, compliance matrices, and commercial attachments.",
      "Organize proposal review workshops with leadership.",
    ],
    skills: ["Pre Sales", "RFP", "RFQ", "Proposal Writing", "Documentation"],
    targetCandidateCount: 50,
  },
]

// Generate complementary requisitions to reach realistic screenshot metrics:
// Active: 27, Closed: 3, Expired: 40 (Total 70)
// Categories: NVite: 52, Private: 33, Hot Vacancy: 21 (Total 106 cumulative tags/instances or balanced breakdown)
function generateFullRequisitions(): JobRequisition[] {
  const result: JobRequisition[] = [...primaryRequisitions]
  const titles = [
    "Cloud Security Architect",
    "Senior React & Next.js Engineer",
    "Database Administrator - PostgreSQL",
    "DevOps SRE Lead",
    "QA Automation Architect - Playwright",
    "Principal Data Scientist - NLP",
    "Business Analyst - BFSI Domain",
    "Product Marketing Manager",
    "Technical Project Manager",
    "Full Stack Java Developer",
    "Network Operations Engineer (L2)",
    "Cybersecurity Incident Handler",
    "UI/UX Design Specialist",
    "Android Mobile Engineer",
    "SAP FICO Consultant",
    "Salesforce Solution Architect",
    "Kubernetes Platform Specialist",
    "Enterprise Account Executive",
    "Scrum Master / Agile Coach",
    "Microservices Backend Engineer",
    "Python AI / ML Developer",
    "Information Security Officer",
  ]

  // Add more Active jobs up to 27 total
  while (result.filter((r) => r.status === "active").length < 27) {
    const idx = result.length + 1
    const t = titles[(idx - 1) % titles.length]
    const cat =
      idx % 3 === 0 ? "hot_vacancy" : idx % 2 === 0 ? "nvite" : "private"
    result.push({
      id: `req-active-${idx}`,
      title: `${t}`,
      department: "Technology & Solutions",
      postedDate: `${(idx % 28) + 1} Oct 2026`,
      status: "active",
      category: cat,
      appliesCount: 20 + ((idx * 7) % 65),
      newApplies: idx % 4 === 0 ? 3 : 0,
      cvsCount: 25 + ((idx * 8) % 70),
      shortlistedCount: idx % 6,
      location: idx % 2 === 0 ? "Hyderabad" : "Bengaluru",
      experience: "4-8 years",
      postedBy: "sheela.nancy@ispatialtec.com (Me)",
      salary: `₹ ${6 + (idx % 12)}-${14 + (idx % 12)} Lacs`,
      workMode:
        idx % 3 === 0 ? "Remote" : idx % 2 === 0 ? "Hybrid" : "In office",
    })
  }

  // Add Closed jobs (3 total)
  for (let i = 1; i <= 3; i++) {
    result.push({
      id: `req-closed-${i}`,
      title: `Senior Architect - ${
        i === 1 ? "AWS Migration" : i === 2 ? "Java Legacy" : "DevOps"
      }`,
      department: "Enterprise Architecture",
      postedDate: `${i * 5} Aug 2026`,
      status: "closed",
      category: i === 1 ? "nvite" : i === 2 ? "private" : "hot_vacancy",
      appliesCount: 110 + i * 15,
      cvsCount: 120 + i * 20,
      shortlistedCount: 12,
      location: "Hyderabad",
      experience: "8-14 years",
      postedBy: "sheela.nancy@ispatialtec.com (Me)",
      salary: "₹ 25-35 Lacs",
      workMode: "Hybrid",
    })
  }

  // Add Expired jobs (40 total)
  for (let i = 1; i <= 40; i++) {
    const cat = i % 2 === 0 ? "nvite" : i % 3 === 0 ? "private" : "hot_vacancy"
    result.push({
      id: `req-expired-${i}`,
      title: `${titles[i % titles.length]} (Batch Q${(i % 3) + 1})`,
      department: "Corporate Staffing",
      postedDate: `${(i % 25) + 1} Jun 2026`,
      status: "expired",
      category: cat,
      appliesCount: 45 + ((i * 3) % 40),
      cvsCount: 50 + ((i * 4) % 45),
      shortlistedCount: 2,
      location: i % 3 === 0 ? "Bengaluru" : "Hyderabad",
      experience: "2-6 years",
      postedBy: "sheela.nancy@ispatialtec.com (Me)",
      salary: "₹ 8-16 Lacs",
      workMode: "In office",
    })
  }

  return result
}

export const mockJobRequisitions: JobRequisition[] = generateFullRequisitions()

// -------------------------------------------------------------
// HELPER METHODS FOR STATEFUL SIMULATION
// -------------------------------------------------------------

/**
 * Returns candidate dataset matching optional filter criteria
 */
export function getCandidatesByStage(
  candidatesList: Candidate[] = mockCandidates,
  stage: "all" | "shortlisted" | "maybe" | "rejected" = "all",
): Candidate[] {
  if (stage === "all") return candidatesList
  return candidatesList.filter((c) => c.stage === stage)
}

/**
 * Mutates candidate stage (Shortlist / Maybe / Reject)
 */
export function updateCandidateStage(
  candidatesList: Candidate[],
  candidateId: string,
  newStage: "all" | "shortlisted" | "maybe" | "rejected",
): Candidate[] {
  return candidatesList.map((c) =>
    c.id === candidateId ? { ...c, stage: newStage } : c,
  )
}

/**
 * Simulates quota deduction when sending NVite campaign
 */
export function deductQuota(
  quotas: QuotaUsage[],
  quotaId: string,
  amount: number,
): QuotaUsage[] {
  return quotas.map((q) => {
    if (q.id === quotaId) {
      const newUsed = q.used + amount
      const newRemaining = Math.max(0, q.total - newUsed)
      return { ...q, used: newUsed, remaining: newRemaining }
    }
    return q
  })
}
