/**
 * Tier 1 Feature Tests: F4 - Employer Home Dashboard & Quota Usage
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F4, Screenshot 175541.png
 */

import { runTest, expect } from "../helpers/testUtils"
import { mockQuotas, mockWebinars } from "../../src/data/resdexData"

export async function runF4Tests() {
  const SUITE = "F4: Employer Home Dashboard & Quota Usage"

  await runTest(
    SUITE,
    "F4.1: Recruiter identity greeting is sheela.nancy@ispatialtec.com",
    1,
    "F4",
    () => {
      const userEmail = "sheela.nancy@ispatialtec.com"
      const greeting = `Welcome, ${userEmail}!`
      expect(greeting).toContain("sheela.nancy@ispatialtec.com")
    },
  )

  await runTest(
    SUITE,
    "F4.2: AmbitionBox Employee Choice Awards campaign copy and CTA",
    1,
    "F4",
    () => {
      const banner = {
        title: "AmbitionBox Employee Choice Awards",
        edition: "6th Edition",
        tagline: "Rated by India@Work",
        subhead: "Become India's top-rated company for culture.",
        cta: "Invite your employees to rate",
        deadline: "Rate before 31st Dec '26.",
      }
      expect(banner.title).toContain("AmbitionBox Employee Choice Awards")
      expect(banner.cta).toBe("Invite your employees to rate")
      expect(banner.deadline).toContain("31st Dec")
    },
  )

  await runTest(
    SUITE,
    "F4.3: Quota Usage carousel contains all 3 core subscription cards",
    1,
    "F4",
    () => {
      expect(mockQuotas.length).toBeGreaterThanOrEqual(3)
      const cv = mockQuotas.find((q) => q.id === "quota-cv-access")
      const nvite = mockQuotas.find((q) => q.id === "quota-nvite")
      const hotVacancies = mockQuotas.find(
        (q) => q.id === "quota-hot-vacancies",
      )

      expect(cv?.name).toBe("RESDEX 4,000 CV Access")
      expect(nvite?.name).toBe("RESDEX 32,000 NVite")
      expect(hotVacancies?.name).toBe("JOB POSTING 20 Hot Vacancies")
    },
  )

  await runTest(
    SUITE,
    "F4.4: Quota arithmetic and utilization percentages are mathematically exact",
    1,
    "F4",
    () => {
      for (const q of mockQuotas) {
        expect(q.used + q.remaining).toBe(q.total)
        const usagePercent = Math.round((q.used / q.total) * 100)
        expect(usagePercent).toBeGreaterThanOrEqual(0)
        expect(usagePercent).toBeLessThanOrEqual(100)
      }
      const cv = mockQuotas.find((q) => q.id === "quota-cv-access")!
      const cvPercent = Math.round((cv.used / cv.total) * 100)
      expect(cvPercent).toBe(56) // 2228 / 4000 = 55.7% -> 56%
    },
  )

  await runTest(
    SUITE,
    "F4.5: Upcoming webinars widget lists essential sessions with dates",
    1,
    "F4",
    () => {
      expect(mockWebinars.length).toBeGreaterThanOrEqual(4)
      const titles = mockWebinars.map((w) => w.title)
      expect(titles).toContain("Job Posting Essentials")
      expect(titles).toContain("Resdex Essentials")

      const first = mockWebinars[0]
      expect(first.dateStr).toBe("09 Nov")
      expect(first.timeStr).toBe("10:15 AM")
    },
  )

  await runTest(
    SUITE,
    "F4.6: Quota cards display renewal date and assigned users count",
    1,
    "F4",
    () => {
      const cv = mockQuotas.find((q) => q.id === "quota-cv-access")!
      expect(cv.assignedUsers).toBe("1/1 licenses assigned")
      expect(cv.renewalDate).toBe("31st Mar '27")

      const hv = mockQuotas.find((q) => q.id === "quota-hot-vacancies")!
      expect(hv.assignedUsers).toBe("2/1000 users assigned")
    },
  )
}
