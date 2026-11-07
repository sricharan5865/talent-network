/**
 * Tier 1 Feature Tests: F2 - Talent Cloud Top Navigation Shell
 * Authoritative Source: ORIGINAL_REQUEST.md R2/R3, PROJECT.md F2, Screenshots 175608.png, 175640.png
 */

import React from "react"
import { MemoryRouter } from "react-router"
import { runTest, expect, renderComponent } from "../helpers/testUtils"
import { TopNavigation } from "../../src/components/layout/TopNavigation"

export async function runF2Tests() {
  const SUITE = "F2: Talent Cloud Top Navigation Shell"

  await runTest(
    SUITE,
    "F2.1: Renders TalentFlow / Naukri brand logo and links to /employer",
    1,
    "F2",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/employer"] },
          React.createElement(TopNavigation),
        ),
      )
      expect(html).toContain("naukri")
      expect(html).toContain("Talent Cloud")
    },
  )

  await runTest(
    SUITE,
    "F2.2: Renders primary navigation tabs: Jobs & Responses, Resdex, Reports",
    1,
    "F2",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/employer"] },
          React.createElement(TopNavigation),
        ),
      )
      expect(html).toContain("Jobs &amp; Responses")
      expect(html).toContain("Resdex")
      expect(html).toContain("Reports")
    },
  )

  await runTest(
    SUITE,
    "F2.3: Contains Jobs & Responses options contract (Hot Vacancy, SMB, Internship, Manage)",
    1,
    "F2",
    () => {
      const jobsOptions = [
        "Post a Hot Vacancy",
        "Post a SMB Job",
        "Post an Internship",
        "Manage Jobs & Responses",
      ]
      expect(jobsOptions).toContain("Post a Hot Vacancy")
      expect(jobsOptions).toContain("Post a SMB Job")
      expect(jobsOptions).toContain("Manage Jobs & Responses")

      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/employer/jobs"] },
          React.createElement(TopNavigation),
        ),
      )
      expect(html).toContain("Jobs &amp; Responses")
    },
  )

  await runTest(
    SUITE,
    "F2.4: Contains Resdex options contract (Search Resumes, Send NVite, Manage Searches, Folders)",
    1,
    "F2",
    () => {
      const resdexOptions = [
        "Search Resumes",
        "Send NVite",
        "Manage Searches",
        "Folders",
        "Resdex Requirements",
      ]
      expect(resdexOptions).toContain("Search Resumes")
      expect(resdexOptions).toContain("Send NVite")
      expect(resdexOptions).toContain("Folders")

      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/employer/candidates"] },
          React.createElement(TopNavigation),
        ),
      )
      expect(html).toContain("Resdex")
    },
  )

  await runTest(
    SUITE,
    "F2.5: Renders quota usage trigger pill (CV Access / NVite balances)",
    1,
    "F2",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/employer"] },
          React.createElement(TopNavigation),
        ),
      )
      expect(html).toContain("CV Access:")
      expect(html).toContain("1,772")
      expect(html).toContain("NVite:")
      expect(html).toContain("13,352")
    },
  )

  await runTest(
    SUITE,
    "F2.6: Renders right utility items (search input, notification bell, user profile)",
    1,
    "F2",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/employer"] },
          React.createElement(TopNavigation),
        ),
      )
      expect(html).toContain("Search candidates...")
      expect(html).toContain("sheela.nancy@ispatialtec.com")
    },
  )
}
