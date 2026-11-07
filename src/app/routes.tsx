import { Navigate, Outlet, createBrowserRouter } from "react-router"
import AppShell from "./shells"
import { LoginPage, SimpleAuthPage } from "../pages/AuthPages"
import { PublicLandingPage } from "../pages/resdex/PublicLandingPage"
import { EmployerDashboardView } from "../pages/resdex/EmployerDashboardView"
import { EmployeeFlowApp } from "../pages/EmployeeFlow"
import {
  CandidateProfilePage,
  CandidatesPage,
  CommunicationPage,
  CreateJobPage,
  EmployerDashboard,
  GenericEmployerPage,
  InterviewsPage,
  JobsPage,
  MatchingPage,
  PipelinePage,
} from "../pages/EmployerPages"
import {
  CandidateApplicationsPage,
  CandidateDashboard,
  CandidateProfileSelfPage,
  GenericCandidatePage,
  MarketplacePage,
} from "../pages/CandidatePages"
import {
  AdminDashboard,
  AgentManagementPage,
  GenericAdminPage,
} from "../pages/AdminPages"
import { OnboardingDemo } from "../pages/DemoPages"
import {
  ApplicationStudioPage,
  CompanyIntelligencePage,
  OpportunityRadarPage,
} from "../pages/CandidateFeaturePages"
import { UxAnalysisPage } from "../pages/UxAnalysisPage"
import { AnalyticsPage } from "../pages/AnalyticsPage"
import { SettingsPage } from "../pages/SettingsPage"
import { ResumeBuilderPage } from "../pages/ResumeBuilderPage"
import { InterviewCenterPage } from "../pages/InterviewCenterPage"
import { CareerAssistantPage } from "../pages/CareerAssistantPage"
import { RecruiterDashboard } from "../pages/RecruiterPages"

const employerGeneric = (title: string) => () => (
  <GenericEmployerPage title={title} />
)
const candidateGeneric = (title: string) => () => (
  <GenericCandidatePage title={title} />
)
const adminGeneric = (title: string) => () => <GenericAdminPage title={title} />
const recruiterGeneric = (title: string) => () => (
  <GenericEmployerPage title={title} />
)

export const router = createBrowserRouter([
  { path: "/", element: <EmployeeFlowApp /> },
  { path: "/employee", element: <EmployeeFlowApp /> },
  { path: "/landing", element: <PublicLandingPage /> },
  { path: "/employer/login", element: <PublicLandingPage /> },
  { path: "/candidate/login", element: <LoginPage type="candidate" /> },
  {
    path: "/employer/register",
    element: <SimpleAuthPage kind="register" portal="employer" />,
  },
  {
    path: "/candidate/register",
    element: <SimpleAuthPage kind="register" portal="candidate" />,
  },
  {
    path: "/employer/forgot",
    element: <SimpleAuthPage kind="forgot" portal="employer" />,
  },
  {
    path: "/candidate/forgot",
    element: <SimpleAuthPage kind="forgot" portal="candidate" />,
  },
  {
    path: "/naukri-dashboard",
    element: (
      <AppShell portal="employer">
        <EmployerDashboardView />
      </AppShell>
    ),
  },
  {
    path: "/employer/onboarding",
    element: <OnboardingDemo portal="employer" />,
  },
  {
    path: "/candidate/onboarding",
    element: <OnboardingDemo portal="candidate" />,
  },
  {
    path: "/employer",
    element: <EmployeeFlowApp />,
  },
  {
    path: "/employer/*",
    element: <EmployeeFlowApp />,
  },
  {
    path: "/candidate",
    element: <EmployeeFlowApp />,
  },
  {
    path: "/candidate/*",
    element: <EmployeeFlowApp />,
  },
  {
    path: "/admin",
    element: <EmployeeFlowApp />,
  },
  {
    path: "/admin/*",
    element: <EmployeeFlowApp />,
  },
  {
    path: "/recruiter",
    element: (
      <AppShell portal="recruiter">
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <RecruiterDashboard /> },
      { path: "mandates", element: <RecruiterDashboard /> },
      { path: "clients", element: <RecruiterDashboard /> },
      { path: "sourcing", element: <RecruiterDashboard /> },
      { path: "crm", element: <CandidatesPage /> },
      { path: "outreach", element: <RecruiterDashboard /> },
      { path: "shortlists", element: <RecruiterDashboard /> },
      { path: "placements", element: <RecruiterDashboard /> },
      { path: "performance", element: <AnalyticsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/candidate" replace /> },
])
