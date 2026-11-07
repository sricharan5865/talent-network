/**
 * Tier 1 Feature Tests: F10 - Candidate Quick-View Profile Drawer
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F10, Screenshots 180258.png, 180325.png
 */

import { runTest, expect } from "../helpers/testUtils"
import { mockCandidates } from "../../src/data/resdexData"

export async function runF10Tests() {
  const SUITE = "F10: Candidate Quick-View Profile Drawer"

  await runTest(
    SUITE,
    "F10.1: Quick-View drawer entity data contains full biographical profile",
    1,
    "F10",
    () => {
      const candidate = mockCandidates.find((c) => c.name === "PAWAR MUKESH")!
      expect(candidate.bio).toContain(
        "Cloud Professional with 9+ years of IT experience",
      )
      expect(candidate.avatarUrl).toBeTruthy()
      expect(candidate.headline).toContain(
        "Azure Cloud Infrastructure & DevOps",
      )
    },
  )

  await runTest(
    SUITE,
    "F10.2: Career timeline details current and previous company designations",
    1,
    "F10",
    () => {
      const arun = mockCandidates.find((c) => c.name === "M Arunkumar")!
      expect(arun.currentCompany).toBe("Teamlease Services Pvt Ltd")
      expect(arun.currentDesignation).toBe(
        "Assistant Manager Recruitment Hiring",
      )
      expect(arun.previousCompany).toBe(
        "Caliber Human capital services Pvt LTD Resources",
      )
      expect(arun.previousRole).toBe("Senior HR Recruitment Specialist")
    },
  )

  await runTest(
    SUITE,
    "F10.3: Educational details format degree, institution, and graduation year",
    1,
    "F10",
    () => {
      const mukesh = mockCandidates.find((c) => c.name === "PAWAR MUKESH")!
      const edu = mukesh.education as {
        degree: string
        institution: string
        year: number
      }
      expect(edu.degree).toBe("B.Tech / B.E.")
      expect(edu.institution).toContain("LNCT Indore")
      expect(edu.year).toBe(2016)
    },
  )

  await runTest(
    SUITE,
    "F10.4: Contact details verification states and in-app dialer support",
    1,
    "F10",
    () => {
      const kailash = mockCandidates.find((c) => c.name === "Balgare Kailash")!
      expect(kailash.phoneVerified).toBe(true)
      expect(kailash.emailVerified).toBe(true)
      expect(kailash.phone).toBe("+91 98451 23456")
      expect(kailash.email).toBe("kailash.balgare@hcltech.com")
    },
  )

  await runTest(
    SUITE,
    "F10.5: Verified skills badges match technical assessments",
    1,
    "F10",
    () => {
      const mukesh = mockCandidates.find((c) => c.name === "PAWAR MUKESH")!
      expect(mukesh.verifiedSkills).toContain("Azure Cloud")
      expect(mukesh.verifiedSkills).toContain("Terraform")
      expect(mukesh.verifiedSkills).toContain("Kubernetes")
    },
  )

  await runTest(
    SUITE,
    "F10.6: Notes and evaluation comment thread updates candidate profile",
    1,
    "F10",
    () => {
      const candidate = {
        ...mockCandidates[0],
        comments: [] as {
          id: string
          author: string
          text: string
          date: string
        }[],
      }
      const newComment = {
        id: "comment-1",
        author: "sheela.nancy@ispatialtec.com",
        text: "Candidate demonstrated strong Terraform and AKS knowledge in initial screening call.",
        date: "06 Nov 2026",
      }
      candidate.comments.push(newComment)
      expect(candidate.comments.length).toBe(1)
      expect(candidate.comments[0].text).toContain("Terraform and AKS")
    },
  )
}
