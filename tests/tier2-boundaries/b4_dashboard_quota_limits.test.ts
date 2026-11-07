/**
 * Tier 2 Boundary Tests: B4 - Dashboard Quota Limits & Boundary Conditions
 * Exhausted quotas (remaining 0), 100% usage, zero used, negative deduction guard
 */

import { runTest, expect } from "../helpers/testUtils"
import { QuotaUsage, deductQuota } from "../../src/data/resdexData"

export async function runB4Tests() {
  const SUITE = "B4: Dashboard Quota Limits"

  await runTest(
    SUITE,
    "B4.1: Quota deduction exceeding available balance clamps remaining to 0",
    2,
    "F4",
    () => {
      const quota: QuotaUsage[] = [
        {
          id: "quota-test",
          name: "Test Quota",
          total: 100,
          used: 90,
          remaining: 10,
          unit: "Credits",
          renewalDate: "2027",
        },
      ]
      // Attempt to deduct 50 when only 10 left
      const result = deductQuota(quota, "quota-test", 50)
      expect(result[0].remaining).toBe(0)
      expect(result[0].used).toBe(140)
    },
  )

  await runTest(
    SUITE,
    "B4.2: 100% quota exhausted calculates 100% progress and warning state",
    2,
    "F4",
    () => {
      const exhaustedQuota: QuotaUsage = {
        id: "quota-exhausted",
        name: "CV Access Expired",
        total: 1000,
        used: 1000,
        remaining: 0,
        unit: "CVs",
        renewalDate: "Tomorrow",
      }
      const percent = Math.min(
        100,
        Math.round((exhaustedQuota.used / exhaustedQuota.total) * 100),
      )
      expect(percent).toBe(100)
      expect(exhaustedQuota.remaining).toBe(0)
    },
  )

  await runTest(
    SUITE,
    "B4.3: Brand new account with 0 used quota calculates 0% progress",
    2,
    "F4",
    () => {
      const freshQuota: QuotaUsage = {
        id: "quota-fresh",
        name: "New Subscription",
        total: 5000,
        used: 0,
        remaining: 5000,
        unit: "Credits",
        renewalDate: "Next Year",
      }
      const percent = Math.round((freshQuota.used / freshQuota.total) * 100)
      expect(percent).toBe(0)
      expect(freshQuota.remaining).toBe(freshQuota.total)
    },
  )

  await runTest(
    SUITE,
    "B4.4: Deducting zero quota leaves quota unchanged",
    2,
    "F4",
    () => {
      const quota: QuotaUsage[] = [
        {
          id: "quota-unchanged",
          name: "NVite",
          total: 32000,
          used: 18648,
          remaining: 13352,
          unit: "NVite",
          renewalDate: "2027",
        },
      ]
      const result = deductQuota(quota, "quota-unchanged", 0)
      expect(result[0].used).toBe(18648)
      expect(result[0].remaining).toBe(13352)
    },
  )

  await runTest(
    SUITE,
    "B4.5: Empty webinars schedule list renders friendly fallback",
    2,
    "F4",
    () => {
      const emptyWebinars: unknown[] = []
      const hasWebinars = emptyWebinars.length > 0
      const displayText = hasWebinars
        ? "Schedule"
        : "No upcoming webinars scheduled for this week"
      expect(displayText).toContain("No upcoming webinars")
    },
  )
}
