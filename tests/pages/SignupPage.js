import { expect } from '@playwright/test';

export class SignupPage {
  constructor(page) {
    this.page = page;
    this.nameField = page.locator('#nome');
    this.emailField = page.locator('#email');
    this.passwordField = page.locator('#senha');
    this.confirmPasswordField = page.locator('#confirmacaoSenha');
    this.submitButton = page.locator('button:has-text("CADASTRAR"), button:has-text("Cadastrar"), input[value="CADASTRAR"]');
    this.successMessage = page.locator('text=Usuário cadastrado com sucesso');
  }

  async verifyPageLoaded() {
    await this.page.locator('text=Criar conta').waitFor();
    await this.nameField.waitFor();
    await this.emailField.waitFor();
    await this.passwordField.waitFor();
    await this.confirmPasswordField.waitFor();
    await this.submitButton.waitFor();
  }

  async fillForm(name, email, password, confirmPassword) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(confirmPassword);
  }

  async verifyFormData(name, email, password, confirmPassword) {
    await this.nameField.waitFor();
    expect(await this.nameField.inputValue()).toBe(name);
    expect(await this.emailField.inputValue()).toBe(email);
    expect(await this.passwordField.inputValue()).toBe(password);
    expect(await this.confirmPasswordField.inputValue()).toBe(confirmPassword);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible({ timeout: 5000 });
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }
}
