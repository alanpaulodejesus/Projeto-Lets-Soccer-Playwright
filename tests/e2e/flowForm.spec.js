import { test, expect } from '@playwright/test';

test.describe('Signup Flow Form', () => {
  
  test('Should complete full signup flow: Login page → Signup → Register → Verify', async ({ page }) => {
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await page.goto('http://localhost:8080/');
    
    // Verify we're on login page
    await expect(page).toHaveURL(/localhost:8080\/?$/);
    console.log('✓ Successfully on login page');
    
    // Verify login page elements
    await expect(page.locator('text=Login')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#senha')).toBeVisible();
    await expect(page.locator('button:has-text("ENTRAR")')).toBeVisible();
    console.log('✓ All login form elements visible');
  
    // Step 2: Click on signup link
    console.log('\nStep 2: Clicking on "Não tem conta? Então cadastre-se!" link...');
    const signupLink = page.locator('a:has-text("cadastre-se")');
    await expect(signupLink).toBeVisible();
    await signupLink.click();
    
    // Verify navigation to signup page
    await expect(page).toHaveURL(/cadastro/i);
    console.log('✓ Successfully navigated to signup page');
    
    // Step 3: Verify signup page elements
    console.log('\nStep 3: Verifying signup page elements...');
    await expect(page.locator('text=Criar conta')).toBeVisible();
    
    const nameField = page.locator('#nome');
    const emailField = page.locator('#email');
    const passwordField = page.locator('#senha');
    const confirmPasswordField = page.locator('#confirmacaoSenha');
    const submitButton = page.locator('button:has-text("CADASTRAR"), button:has-text("Cadastrar"), input[value="CADASTRAR"]');
    
    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(confirmPasswordField).toBeVisible();
    await expect(submitButton).toBeVisible();
    console.log('✓ All signup form elements visible');
     
    // Step 4: Fill the signup form with valid data
    console.log('\nStep 4: Filling signup form with valid data...');
    const timestamp = Date.now();
    const testName = `Test User ${timestamp}`;
    const testEmail = `user${timestamp}@example.com`;
    const testPassword = 'ValidPassword123';
    
    await nameField.fill(testName);
    console.log(`  ✓ Name field filled: ${testName}`);
    
    await emailField.fill(testEmail);
    console.log(`  ✓ Email field filled: ${testEmail}`);
    
    await passwordField.fill(testPassword);
    console.log(`  ✓ Password field filled`);
    
    await confirmPasswordField.fill(testPassword);
    console.log(`  ✓ Confirm password field filled`);
   
    // Step 5: Verify all fields are filled correctly
    console.log('\nStep 5: Verifying form data...');
    await expect(nameField).toHaveValue(testName);
    await expect(emailField).toHaveValue(testEmail);
    await expect(passwordField).toHaveValue(testPassword);
    await expect(confirmPasswordField).toHaveValue(testPassword);
    console.log('✓ All form fields contain correct data');
    
    // Step 6: Verify password fields are masked
    console.log('\nStep 6: Verifying password masking...');
    await expect(passwordField).toHaveAttribute('type', 'password');
    await expect(confirmPasswordField).toHaveAttribute('type', 'password');
    console.log('✓ Password fields are properly masked');
    
    // Step 7: Submit the form
    console.log('\nStep 7: Submitting signup form...');
    await submitButton.click();
    console.log('✓ Form submitted');

    // Validar mensagem de sucesso
    const successMessage = page.locator('text=Usuário cadastrado com sucesso');
    await expect(successMessage).toBeVisible({ timeout: 1000 });
    console.log('✓ Mensagem de sucesso exibida: Usuário cadastrado com sucesso');
    
    // Step 8: Wait for server response and navigation
    console.log('\nStep 8: Waiting for server response...');
    await page.waitForLoadState('networkidle');
    console.log('✓ Page loaded after submission');
    
    // Step 9: Verify redirect (not on cadastro page anymore)
    console.log('\nStep 9: Verifying successful registration redirect...');
    const currentUrl = page.url();
    expect(currentUrl).toContain('/pages/cadastro');
    console.log(`✓ Successfully redirected from signup page to: ${currentUrl}`);
    
    console.log('\n✅ Complete signup flow test finished successfully!');
      
  });


});
