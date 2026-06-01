export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('#email');
    this.passwordField = page.locator('#senha');
    this.loginButton = page.locator('button:has-text("ENTRAR")');
    this.signupLink = page.locator('a:has-text("cadastre-se")');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLoaded() {
    await this.page.locator('text=Login').waitFor();
  }

  async clickSignupLink() {
    await this.signupLink.click();
    await this.page.waitForURL(/cadastro/i);
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
