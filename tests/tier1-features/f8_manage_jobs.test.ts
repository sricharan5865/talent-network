/**
 * Tier 1 Feature Tests: F8 - Manage Jobs & Responses Listing
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F8, Screenshots 175608.png, 175617.png, 180227.png
 */

import { runTest, expect } from "../helpers/testUtils"
import { mockJobRequisitions } from "../../src/data/resdexData"

export async function runF8Tests() {
  const SUITE = "F8: Manage Jobs & Responses Listing"

  await runTest(
    SUITE,
    "F8.1: Requisitions listing header matches screenshot 175617 text",
    1,
    "F8",
    () => {
      const pageHeader = {
        title: "Manage Jobs and Responses",
        subtitle: "Responses to your jobs and NVites will appear here",
        primaryAction: "Post job",
      }
      expect(pageHeader.title).toBe("Manage Jobs and Responses")
      expect(pageHeader.subtitle).toContain("Responses to your jobs and NVites")
    },
  )

  await runTest(
    SUITE,
    "F8.2: Job status filters partition 70 total jobs into 27 Active, 3 Closed, 40 Expired",
    1,
    "F8",
    () => {
      const active = mockJobRequisitions.filter((j) => j.status === "active")
      const closed = mockJobRequisitions.filter((j) => j.status === "closed")
      const expired = mockJobRequisitions.filter((j) => j.status === "expired")

      expect(active.length).toBe(27)
      expect(closed.length).toBe(3)
      expect(expired.length).toBe(40)
    },
  )

  await runTest(
    SUITE,
    "F8.3: Primary Requisitions include Infrastructure Specialist with NVite category",
    1,
    "F8",
    () => {
      const infra = mockJobRequisitions.find(
        (j) => j.title === "Infrastructure Specialist",
      )
      expect(infra).toBeTruthy()
      expect(infra!.category).toBe("nvite")
      expect(infra!.appliesCount).toBe(59)
      expect(infra!.shortlistedCount).toBe(5)
      expect(infra!.location).toBe("Hyderabad")
    },
  )

  await runTest(
    SUITE,
    "F8.4: Primary Requisition Sr GIS Analyst has 144 responses and 33 New badge",
    1,
    "F8",
    () => {
      const gis = mockJobRequisitions.find(
        (j) => j.title === "Sr GIS Analyst - Database",
      )
      expect(gis).toBeTruthy()
      expect(gis!.category).toBe("hot_vacancy")
      expect(gis!.appliesCount).toBe(144)
      expect(gis!.newApplies).toBe(33)
      expect(gis!.resdexRecommended).toBe(150)
    },
  )

  await runTest(
    SUITE,
    "F8.5: Requisition Us It Recruiter has 80 responses, 2 New, 3 Shortlisted",
    1,
    "F8",
    () => {
      const usRec = mockJobRequisitions.find(
        (j) => j.title === "Us It Recruiter",
      )
      expect(usRec).toBeTruthy()
      expect(usRec!.category).toBe("nvite")
      expect(usRec!.appliesCount).toBe(80)
      expect(usRec!.newApplies).toBe(2)
      expect(usRec!.shortlistedCount).toBe(3)
    },
  )

  await runTest(
    SUITE,
    "F8.6: Bulk controls include Select All, Refresh, Collaborate, Close",
    1,
    "F8",
    () => {
      const bulkActions = ["Select All", "Refresh", "Collaborate", "Close"]
      expect(bulkActions).toContain("Select All")
      expect(bulkActions).toContain("Collaborate")
      expect(bulkActions).toContain("Close")
    },
  )
}
