import { expect, Locator } from "@playwright/test";
import invariant from "tiny-invariant";

declare global {
  // extend playwright's expect with our custom matchers
  // https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend
  namespace PlaywrightTest {
    interface Matchers<R> {
      toMatchString: (text: string) => Promise<R>;
    }
  }
}

expect.extend({
  /**
   * Compares the text content of a locator to the string "text".
   *
   */
  async toMatchString(locator: Locator, text: string) {
    invariant(locator, "locator is required");

    let pass: boolean;

    try {
      expect(locator).toHaveText(text);
      pass = true;
    } catch (e: any) {
      pass = false;
    }

    return {
      message: () => (pass ? "yes" : "no"),
      pass,
      name: "toMatchString",
      actual: await locator.textContent(),
    };
  },
});
