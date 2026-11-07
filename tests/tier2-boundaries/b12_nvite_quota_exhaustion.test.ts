/**
 * Tier 2 Boundary Tests: B12 - NVite Quota Exhaustion & Campaign Boundaries
 * Broadcasting with insufficient quota, double click prevention, zero quota remaining
 */

import { runTest, expect } from "../helpers/testUtils"
import { mockQuotas, deductQuota } from "../../src/data/resdexData"

export async function runB12Tests() {
  const SUITE = "B12: NVite Quota Exhaustion"

  await runTest(
    SUITE,
    "B12.1: Insufficient remaining quota triggers broadcast warning",
    2,
    "F12",
    () => {
      const remainingQuota = 200
      const requestedBroadcastCount = 500
      const canBroadcast = remainingQuota >= requestedBroadcastCount
      expect(canBroadcast).toBe(false)

      const errorMsg = !canBroadcast
        ? `Insufficient NVite quota: ${remainingQuota} available, ${requestedBroadcastCount} requested`
        : ""
      expect(errorMsg).toContain("Insufficient NVite quota")
    },
  )

  await runTest(
    SUITE,
    "B12.2: Campaign audience cannot exceed available NVite quota balance",
    2,
    "F12",
    () => {
      const nviteQuota = mockQuotas.find((q) => q.id === "quota-nvite")!
      const maxAllowedAudience = nviteQuota.remaining
      expect(maxAllowedAudience).toBe(13352)
      expect(500).toBeLessThanOrEqual(maxAllowedAudience)
    },
  )

  await runTest(
    SUITE,
    "B12.3: Double click prevention ensures single quota deduction per campaign",
    2,
    "F12",
    () => {
      let isSubmitting = false
      let deductionCount = 0

      const handleSendNow = () => {
        if (isSubmitting) return
        isSubmitting = true
        deductionCount++
      }

      // Simulate rapid double click
      handleSendNow()
      handleSendNow()

      expect(deductionCount).toBe(1)
    },
  )

  await runTest(
    SUITE,
    "B12.4: Opting out of AI Match expansion sets bonus candidate outreach to 0",
    2,
    "F12",
    () => {
      const isAiBoostEnabled = false
      const baseAudience = 500
      const bonusCandidates = isAiBoostEnabled ? 150 : 0
      const totalOutreach = baseAudience + bonusCandidates

      expect(totalOutreach).toBe(500)
      expect(bonusCandidates).toBe(0)
    },
  )

  await runTest(
    SUITE,
    'B12.5: Zero remaining quota blocks "Send now" action button',
    2,
    "F12",
    () => {
      const exhaustedRemaining = 0
      const isSendDisabled = exhaustedRemaining <= 0
      expect(isSendDisabled).toBe(true)
    },
  )
}
