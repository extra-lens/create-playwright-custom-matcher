import { test, expect } from "@playwright/test";
import "../src";

test("Add custom matcher using expect.extend", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend");

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading").first()).toMatchString("Assertions");
});
