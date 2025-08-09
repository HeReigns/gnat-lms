import { test, expect } from "@playwright/test";

test("Full instructor-to-student flow", async ({ page }) => {
  // Instructor login
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "instructor@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');

  // Upload SCORM
  await page.click("text=SCORM Upload");
  const scormFile = "tests/assets/sample-scorm.zip";
  await page.setInputFiles('input[type="file"]', scormFile);
  await page.click("text=Upload");
  await expect(page.locator(".course-list")).toContainText("Sample SCORM Course");

  // Logout instructor
  await page.click("text=Logout");

  // Student login
  await page.fill('input[name="email"]', "student@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');

  // Enroll & complete
  await page.click("text=Sample SCORM Course");
  await page.click("text=Enroll");
  await page.click("text=Start Course");
  await page.click("text=Mark Lesson Complete");
  await expect(page.locator(".progress-bar")).toContainText("100%");

  // Download certificate
  await page.click("text=Download Certificate");

  // Logout student
  await page.click("text=Logout");

  // Instructor grading
  await page.fill('input[name="email"]', "instructor@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.click("text=Assignments to Grade");
  await page.fill('input[name="score"]', "95");
  await page.fill('textarea[name="feedback"]', "Great work!");
  await page.click("text=Submit Grade");

  // Student sees grade
  await page.click("text=Logout");
  await page.fill('input[name="email"]', "student@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.click("text=Grades");
  await expect(page.locator(".grade-entry")).toContainText("95");
});
