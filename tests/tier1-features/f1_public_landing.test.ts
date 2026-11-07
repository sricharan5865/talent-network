/**
 * Tier 1 Feature Tests: F1 - Public Landing & Launcher Login
 * Authoritative Source: ORIGINAL_REQUEST.md R1, PROJECT.md F1, Screenshot 175531.png
 */

import React from "react"
import { MemoryRouter } from "react-router"
import { runTest, expect, renderComponent } from "../helpers/testUtils"
import { PublicLandingPage } from "../../src/pages/resdex/PublicLandingPage"

export async function runF1Tests() {
  const SUITE = "F1: Public Landing & Launcher Login"

  await runTest(
    SUITE,
    "F1.1: Renders hero headline and TALENT DECODED eyebrow",
    1,
    "F1",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(PublicLandingPage),
        ),
      )
      expect(html).toContain("TALENT DECODED")
      expect(html).toContain(
        "Decode India’s largest talent pool with the power of",
      )
      expect(html).toContain("✦ AI")
    },
  )

  await runTest(
    SUITE,
    "F1.2: Renders 10 crore+ jobseekers and AI recruitment value props",
    1,
    "F1",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(PublicLandingPage),
        ),
      )
      expect(html).toContain("10 crore+ registered jobseekers")
      expect(html).toContain("Most advanced recruitment AI")
    },
  )

  await runTest(
    SUITE,
    'F1.3: Renders primary exploratory CTA button "Explore our products"',
    1,
    "F1",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(PublicLandingPage),
        ),
      )
      expect(html).toContain("Explore our products")
      expect(html).toContain("Looking for jobs?")
    },
  )

  await runTest(
    SUITE,
    "F1.4: Renders elevated Naukri Launcher login card with user email",
    1,
    "F1",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(PublicLandingPage),
        ),
      )
      expect(html).toContain("Your account is Naukri Launcher enabled")
      expect(html).toContain("sheela.nancy@ispatialtec.com")
      expect(html).toContain("Login with Naukri Launcher")
      expect(html).toContain("Instant Enterprise SSO")
    },
  )

  await runTest(
    SUITE,
    "F1.5: Renders quick help links and tutorial triggers",
    1,
    "F1",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(PublicLandingPage),
        ),
      )
      expect(html).toContain("QUICK HELP")
      expect(html).toContain("Haven’t set up Naukri Launcher? Download it")
      expect(html).toContain("Not sure how to use it? Watch 1-min tutorial")
    },
  )

  await runTest(
    SUITE,
    "F1.6: Renders authentication tab switcher (Sales enquiry / Register/Log in)",
    1,
    "F1",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(PublicLandingPage),
        ),
      )
      expect(html).toContain("Sales enquiry")
      expect(html).toContain("Register/Log in")
      expect(html).toContain("Create account")
    },
  )

  await runTest(
    SUITE,
    "F1.7: Renders top header utilities (offerings, phone 1800-102-5558, Buy online)",
    1,
    "F1",
    () => {
      const html = renderComponent(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(PublicLandingPage),
        ),
      )
      expect(html).toContain("Our offerings")
      expect(html).toContain("Naukri Talent Cloud")
      expect(html).toContain("1800-102-5558")
      expect(html).toContain("Buy online")
    },
  )
}
