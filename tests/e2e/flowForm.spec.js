import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

test.describe('Signup Flow Form', () => {
  
  test('should complete full signup flow: Login → Signup → Register', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);

    // Navigate to login page and verify it loaded
    await loginPage.navigate();
    await loginPage.verifyPageLoaded();

    // Navigate to signup page
    await loginPage.clickSignupLink();
    await signupPage.verifyPageLoaded();

    // Fill and submit signup form with unique test data
    const timestamp = Date.now();
    const testName = `Test User ${timestamp}`;
    const testEmail = `user${timestamp}@example.com`;
    const testPassword = 'ValidPassword123';

    await signupPage.fillForm(testName, testEmail, testPassword, testPassword);
    await signupPage.verifyFormData(testName, testEmail, testPassword, testPassword);

    // Submit form and verify success
    await signupPage.submitForm();
    await signupPage.verifySuccessMessage();
    await signupPage.waitForNavigation();
  });

});
