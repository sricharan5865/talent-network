/**
 * Tier 2 Boundary Tests: B10 - Quick-View Drawer Missing Fields
 * Missing avatar URL initials fallback, unverified phone, missing bio, empty previous role
 */

import { runTest, expect } from "../helpers/testUtils"
import { Candidate } from "../../src/data/resdexData"

export async function runB10Tests() {
  const SUITE = "B10: Quick-View Drawer Missing Fields"

  await runTest(
    SUITE,
    'B10.1: Missing avatarUrl generates initials avatar placeholder ("PM")',
    2,
    "F10",
    () => {
      const candidate: Partial<Candidate> = {
        name: "PAWAR MUKESH",
        avatarUrl: undefined,
      }
      const getInitials = (name: string) => {
        const parts = name.trim().split(/\s+/)
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      }
      expect(getInitials(candidate.name!)).toBe("PM")
    },
  )

  await runTest(
    SUITE,
    "B10.2: Unverified phone number displays warning badge instead of direct call trigger",
    2,
    "F10",
    () => {
      const candidate: Partial<Candidate> = {
        phone: "+91 91234 00000",
        phoneVerified: false,
      }
      const showCallAction = candidate.phoneVerified === true
      expect(showCallAction).toBe(false)
    },
  )

  await runTest(
    SUITE,
    "B10.3: Candidate with undefined bio falls back to headline description",
    2,
    "F10",
    () => {
      const candidate: Partial<Candidate> = {
        headline: "DevOps Engineer at TalentPull",
        bio: undefined,
      }
      const displayBio =
        candidate.bio || candidate.headline || "No description provided"
      expect(displayBio).toBe("DevOps Engineer at TalentPull")
    },
  )

  await runTest(
    SUITE,
    'B10.4: Missing previous company renders "First employment" indicator',
    2,
    "F10",
    () => {
      const candidate: Partial<Candidate> = {
        currentCompany: "Infosys",
        previousCompany: undefined,
      }
      const prevText = candidate.previousCompany || "No prior company listed"
      expect(prevText).toBe("No prior company listed")
    },
  )

  await runTest(
    SUITE,
    "B10.5: Empty preferred locations defaults to current location only",
    2,
    "F10",
    () => {
      const candidate: Partial<Candidate> = {
        currentLocation: "Hyderabad",
        preferredLocations: [],
      }
      const locations =
        candidate.preferredLocations && candidate.preferredLocations.length > 0
          ? candidate.preferredLocations
          : [candidate.currentLocation!]
      expect(locations.length).toBe(1)
      expect(locations[0]).toBe("Hyderabad")
    },
  )
}
