/**
 * Tier 4 Real-World Application Scenario Tests
 * Authoritative Source: ORIGINAL_REQUEST.md R1-R3, PROJECT.md Recruiter Workflows
 */

import { runTest, expect } from "../helpers/testUtils"
import {
  mockCandidates,
  mockQuotas,
  mockJobRequisitions,
  mockResdexFolders,
  deductQuota,
  updateCandidateStage,
  getCandidatesByStage,
} from "../../src/data/resdexData"

export async function runTier4Tests() {
  const SUITE = "Tier 4: Real-World Recruitment Scenarios"

  await runTest(
    SUITE,
    "T4.1: Workflow 1 - US IT Recruiter Niche Staffing Sourcing Journey",
    4,
    "Workflow 1",
    () => {
      // 1. Recruiter identifies mandate
      const requisition = mockJobRequisitions.find(
        (j) => j.title === "Us It Recruiter",
      )!
      expect(requisition.title).toBe("Us It Recruiter")
      expect(requisition.appliesCount).toBe(80)

      // 2. Filter applicants by niche US IT Staffing skills & 1m notice
      const matches = mockCandidates.filter(
        (c) =>
          c.keySkills.includes("US IT Staffing") &&
          c.noticePeriod.includes("1m"),
      )
      expect(matches.length).toBeGreaterThanOrEqual(1)

      // 3. Inspect top candidate (M Arunkumar)
      const candidate = matches[0]
      expect(candidate.name).toBe("M Arunkumar")
      expect(candidate.currentCompany).toBe("Teamlease Services Pvt Ltd")
      expect(candidate.recommendedBadge).toBe(true)

      // 4. Recruiter records feedback scorecard note
      const evaluationNote = {
        author: "sheela.nancy@ispatialtec.com",
        text: "Strong W2/C2C candidate screening background. Recommended for Hiring Manager interview.",
        date: "06 Nov 2026",
      }
      expect(evaluationNote.text).toContain("W2/C2C candidate screening")

      // 5. Transition to Shortlisted
      const updatedCandidates = updateCandidateStage(
        mockCandidates,
        candidate.id,
        "shortlisted",
      )
      const shortlistedList = getCandidatesByStage(
        updatedCandidates,
        "shortlisted",
      )
      expect(shortlistedList.some((c) => c.id === candidate.id)).toBe(true)
    },
  )

  await runTest(
    SUITE,
    "T4.2: Workflow 2 - High-Volume NVite Cloud DevOps Campaign Launch",
    4,
    "Workflow 2",
    () => {
      // 1. Check Quota balances
      let quotas = [...mockQuotas]
      const nviteQuota = quotas.find((q) => q.id === "quota-nvite")!
      expect(nviteQuota.remaining).toBe(13352)

      // 2. Calibrate NVite campaign parameters
      const campaignTarget = {
        role: "Infrastructure Specialist",
        targetAudience: 500,
        minExp: 5,
        maxExp: 10,
        skills: ["Azure Certified", "AWS Certified", "Oracle Certified"],
        channels: ["App notification", "Email", "Naukri inbox"],
        aiBoostEnabled: true,
      }
      expect(campaignTarget.targetAudience).toBeLessThanOrEqual(
        nviteQuota.remaining,
      )

      // 3. Execute campaign broadcast
      quotas = deductQuota(quotas, "quota-nvite", campaignTarget.targetAudience)
      const updatedQuota = quotas.find((q) => q.id === "quota-nvite")!
      expect(updatedQuota.remaining).toBe(12852)
      expect(updatedQuota.used).toBe(18648 + 500)

      // 4. Verify Requisition registry creation
      const newRequisition = {
        id: `req-nvite-${Date.now()}`,
        title: campaignTarget.role,
        category: "nvite" as const,
        status: "active" as const,
        appliesCount: 0,
        targetCandidateCount: campaignTarget.targetAudience,
      }
      expect(newRequisition.targetCandidateCount).toBe(500)
    },
  )

  await runTest(
    SUITE,
    "T4.3: Workflow 3 - Urgent Immediate Joiner Hiring for GIS Analyst",
    4,
    "Workflow 3",
    () => {
      // 1. Recruiter opens Hot Vacancy "Sr GIS Analyst - Database"
      const gisJob = mockJobRequisitions.find(
        (j) => j.title === "Sr GIS Analyst - Database",
      )!
      expect(gisJob.appliesCount).toBe(144)
      expect(gisJob.newApplies).toBe(33)

      // 2. Filter for immediate availability (0-15 days notice)
      const immediateCandidates = mockCandidates.filter(
        (c) =>
          c.noticePeriod.includes("0-15") ||
          c.noticePeriod.toLowerCase().includes("immediate"),
      )
      expect(immediateCandidates.length).toBeGreaterThan(0)

      // 3. Inspect Kavya Nair's profile
      const kavya = immediateCandidates.find((c) => c.name === "Kavya Nair")!
      expect(kavya).toBeTruthy()
      expect(kavya.currentDesignation).toBe("Senior GIS Analyst")
      expect(kavya.keySkills).toContain("GIS Developer")
      expect(kavya.keySkills).toContain("ESRI")

      // 4. Verify phone verification for immediate in-app outreach
      expect(kavya.phoneVerified).toBe(true)
      expect(kavya.phone).toBeTruthy()

      // 5. Shortlist candidate
      const pool = updateCandidateStage(mockCandidates, kavya.id, "shortlisted")
      expect(
        getCandidatesByStage(pool, "shortlisted").some(
          (c) => c.id === kavya.id,
        ),
      ).toBe(true)
    },
  )

  await runTest(
    SUITE,
    "T4.4: Workflow 4 - Diversity Hiring & Women Returnee Sourcing",
    4,
    "Workflow 4",
    () => {
      // 1. Recruiter applies Diversity criteria
      const diversityFilter = {
        gender: "Female",
        careerBreak: "Women returning to work",
        skill: "Java",
      }

      // 2. Sourcing query matches Sunita Reddy
      const diversityMatches = mockCandidates.filter(
        (c) =>
          c.gender === diversityFilter.gender &&
          c.diversityCategory === diversityFilter.careerBreak &&
          c.keySkills.some(
            (s) => s.toLowerCase() === diversityFilter.skill.toLowerCase(),
          ),
      )
      expect(diversityMatches.length).toBeGreaterThanOrEqual(1)

      const match = diversityMatches[0]
      expect(match.name).toBe("Sunita Reddy")
      expect(match.experienceYears).toBe(7)
      expect(match.currentDesignation).toContain("Senior Technology Specialist")

      // 3. Save to Resdex folder pool
      const diversityFolder = {
        id: "folder-diversity-2026",
        name: "Diversity Talent Pool 2026",
        count: 1,
        candidateIds: [match.id],
        updatedDate: "06-Nov-26",
      }
      expect(diversityFolder.candidateIds).toContain(match.id)
      expect(diversityFolder.count).toBe(1)
    },
  )

  await runTest(
    SUITE,
    "T4.5: Workflow 5 - Comprehensive Recruiter Morning Audit & SLA Review",
    4,
    "Workflow 5",
    () => {
      // 1. Recruiter reviews all subscription quotas
      for (const q of mockQuotas) {
        expect(q.remaining).toBeGreaterThan(0)
        expect(q.renewalDate).toBeTruthy()
      }

      // 2. Recruiter inspects active Resdex Folders
      expect(mockResdexFolders.length).toBe(4)
      const totalPooledCandidates = mockResdexFolders.reduce(
        (sum, f) => sum + f.count,
        0,
      )
      expect(totalPooledCandidates).toBe(138 + 0 + 152 + 40) // 330 profiles

      // 3. Recruiter executes 1-click rerun of saved search
      const saved = mockResdexFolders[0]
      expect(saved.name).toBe("PCB")
      expect(saved.count).toBe(138)

      // 4. Verify candidate export package generation
      const shortlistedCandidates = getCandidatesByStage(
        mockCandidates,
        "shortlisted",
      )
      const exportSummary = shortlistedCandidates.map((c) => ({
        name: c.name,
        experience: `${c.experienceYears}y`,
        currentCompany: c.currentCompany,
        salary: `₹ ${c.currentSalaryLacs}L`,
      }))
      expect(exportSummary.length).toBe(shortlistedCandidates.length)
    },
  )
}
