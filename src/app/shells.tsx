import type { ReactNode } from "react"
import { AppShell as Shell } from "../components/layout/AppShell"
import {
  adminNav,
  candidateNav,
  employerNav,
  recruiterNav,
} from "../components/layout/nav"

export default function AppShell({
  portal,
  children,
}: {
  portal: "employer" | "candidate" | "admin" | "recruiter"
  children: ReactNode
}) {
  return (
    <Shell
      portal={
        portal === "employer"
          ? "Employer"
          : portal === "candidate"
            ? "Candidate"
            : portal === "recruiter"
              ? "Recruiter"
              : "Platform Admin"
      }
      nav={
        portal === "employer"
          ? employerNav
          : portal === "candidate"
            ? candidateNav
            : portal === "recruiter"
              ? recruiterNav
              : adminNav
      }
    >
      {children}
    </Shell>
  )
}
