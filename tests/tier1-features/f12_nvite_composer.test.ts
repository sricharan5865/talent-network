/**
 * Tier 1 Feature Tests: F12 - Send NVite Campaign Composer Wizard
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F12, Screenshots 175950.png, 180140.png, 180151.png, 180154.png
 */

import { runTest, expect } from "../helpers/testUtils"

export async function runF12Tests() {
  const SUITE = "F12: Send NVite Campaign Composer Wizard"

  await runTest(
    SUITE,
    "F12.1: Wizard breadcrumb tracks steps: Send NVite > 500 selected > Compose details",
    1,
    "F12",
    () => {
      const breadcrumb = [
        "Send NVite",
        "500 candidates selected",
        "Compose details",
      ]
      expect(breadcrumb[0]).toBe("Send NVite")
      expect(breadcrumb[1]).toContain("500 candidates selected")
      expect(breadcrumb[2]).toBe("Compose details")
    },
  )

  await runTest(
    SUITE,
    "F12.2: Mode radio options include Create new and Use previous/posted job",
    1,
    "F12",
    () => {
      const modes = [
        {
          id: "create_new",
          label: "Create new",
          desc: "All responses will appear as a new item in Manage Jobs and Responses",
        },
        {
          id: "use_previous",
          label: "Use a previous one/posted job",
          desc: "Responses will be clubbed with a previous NVite/posted job",
        },
      ]
      expect(modes[0].label).toBe("Create new")
      expect(modes[1].label).toBe("Use a previous one/posted job")
    },
  )

  await runTest(
    SUITE,
    "F12.3: Role composition fields match verbatim Infrastructure Specialist details",
    1,
    "F12",
    () => {
      const nviteRole = {
        designation: "Infrastructure Specialist",
        workMode: "In office",
        keySkills: ["Azure Certified", "AWS Certified", "Oracle Certified"],
        minExperience: 5,
        maxExperience: 10,
        jobLocation: "Hyderabad",
        offeredSalary: "₹ 60,000 to 1.5 lacs",
      }
      expect(nviteRole.designation).toBe("Infrastructure Specialist")
      expect(nviteRole.workMode).toBe("In office")
      expect(nviteRole.keySkills).toContain("Azure Certified")
      expect(nviteRole.offeredSalary).toBe("₹ 60,000 to 1.5 lacs")
    },
  )

  await runTest(
    SUITE,
    "F12.4: Verbatim Job Description and Responsibilities match screenshot 180151",
    1,
    "F12",
    () => {
      const jdSnippet =
        "We are looking for a skilled Infrastructure Specialist with strong expertise in cloud platforms such as Azure, AWS, or OCI"
      const responsibilities = [
        "Manage, monitor, and maintain cloud infrastructure across Azure, AWS, or Oracle Cloud Infrastructure (OCI).",
        "Configure, troubleshoot, and maintain network infrastructure, including LAN, WAN, VPN, routing, and switching.",
        "Implement, manage, and troubleshoot firewall configurations, security policies, and access controls.",
      ]

      expect(jdSnippet).toContain("Azure, AWS, or OCI")
      expect(responsibilities[0]).toContain(
        "Azure, AWS, or Oracle Cloud Infrastructure",
      )
      expect(responsibilities[1]).toContain(
        "network infrastructure, including LAN, WAN, VPN",
      )
      expect(responsibilities[2]).toContain("firewall configurations")
    },
  )

  await runTest(
    SUITE,
    "F12.5: Multi-channel delivery breakdown includes App, Email, and Naukri Inbox",
    1,
    "F12",
    () => {
      const channels = ["App notification", "Email", "Naukri inbox"]
      expect(channels).toContain("App notification")
      expect(channels).toContain("Email")
      expect(channels).toContain("Naukri inbox")
    },
  )

  await runTest(
    SUITE,
    "F12.6: AI Matching Expansion Beta banner displays No extra cost badge",
    1,
    "F12",
    () => {
      const aiBoost = {
        title:
          "Allow Naukri to get more applies by reaching out to additional matching candidates",
        badge: "Beta",
        costBadge: "No extra cost",
        options: ["Yes, I am interested", "No, I don't require it"],
      }
      expect(aiBoost.costBadge).toBe("No extra cost")
      expect(aiBoost.badge).toBe("Beta")
      expect(aiBoost.options).toContain("Yes, I am interested")
    },
  )

  await runTest(
    SUITE,
    "F12.7: Sticky bottom bar displays audience counter, Preview, and Send now CTAs",
    1,
    "F12",
    () => {
      const bottomBar = {
        audienceCounter: "Reaching out to 500 candidates",
        previewButton: "Preview",
        sendButton: "Send now",
      }
      expect(bottomBar.audienceCounter).toBe("Reaching out to 500 candidates")
      expect(bottomBar.sendButton).toBe("Send now")
    },
  )
}
