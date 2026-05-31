# E2E Testing Strategy for Lets Soccer

Based on the website structure, here's a comprehensive E2E testing strategy:

## Website Overview
- **Login Page** (`http://localhost:8080/`): Email, Password, visibility toggle, login button
- **Signup Page** (`http://localhost:8080/pages/cadastro.html`): Name, Email, Password, Confirm Password, visibility toggles, register button

---

## Recommended E2E Test Strategy

### 1. Authentication Flow Tests

```
✅ User Registration Flow
├── Navigate to login → Click "cadastre-se" link
├── Fill signup form with valid data
├── Submit and verify redirect to dashboard/login
└── Attempt login with new credentials

❌ Registration Validation
├── Empty fields validation
├── Invalid email format rejection
├── Password mismatch (Password vs Confirm Password)
├── Duplicate email rejection
└── Password strength requirements

✅ Login Flow
├── Login with valid credentials
├── Login with invalid credentials
├── Empty field handling
└── Session persistence after login
```

### 2. UI/UX Interaction Tests

```
👁 Password Visibility Toggle
├── Click eye icon on login password field
├── Click eye icon on signup password field
├── Click eye icon on confirm password field
└── Verify password masking/unmasking

🔗 Navigation
├── Signup link on login page works
├── Back to login link on signup page (if exists)
├── Form submission redirects correctly
└── URL changes appropriately
```

### 3. Form Validation Tests

```
📋 Signup Form
├── Name field: non-empty, character validation
├── Email field: valid format (RFC 5322)
├── Password field: minimum length, strength
├── Confirm Password: matches Password field
└── Submit button: enabled/disabled based on form state

📋 Login Form
├── Email field: valid format
├── Password field: non-empty
└── Submit button: enabled/disabled based on form state
```

### 4. Security Tests

```
🔐 Data Protection
├── Passwords are masked (type="password")
├── No password in localStorage
├── No sensitive data in URLs
├── Secure form submission (HTTPS in production)
└── Password confirmation match validation
```

### 5. Cross-browser & Responsive Tests

```
🌐 Browsers
├── Chrome/Chromium
├── Firefox
├── Safari/WebKit

📱 Viewports
├── Desktop: 1280x720
├── Tablet: 768x1024
├── Mobile: 375x667
```

---

## Playwright Test Structure

```
tests/
├── e2e/
│   ├── auth/
│   │   ├── login.spec.js
│   │   └── signup.spec.js
│   ├── forms/
│   │   ├── loginValidation.spec.js
│   │   └── signupValidation.spec.js
│   ├── security/
│   │   └── passwordSecurity.spec.js
│   └── navigation/
│       └── authNavigation.spec.js
├── fixtures/
│   └── auth.js
└── data/
    └── testUsers.json
```

---

## Sample Test Cases

### Test 1: Complete Signup Flow
```bash
1. Navigate to http://localhost:8080/
2. Click "Não tem conta? Então cadastre-se!"
3. Verify on signup page
4. Fill: Name, Email, Password, Confirm Password
5. Submit form
6. Verify redirect (not on cadastro page)
7. Login with new credentials
8. Verify dashboard access
```

### Test 2: Password Visibility Toggle
```bash
1. Navigate to signup page
2. Fill password field: "MyPassword123"
3. Click eye icon → Password shows as text
4. Click eye icon → Password hides again
5. Repeat for Confirm Password field
```

### Test 3: Form Validation
```bash
1. Signup page
2. Submit empty form → Error shown
3. Enter invalid email "test" → Rejected
4. Enter password "abc" / confirm "xyz" → Mismatch error
5. Fill correctly → Form submits
```

---

## Run Commands

```bash
# Run all E2E tests
npx playwright test tests/e2e/

# Run specific test suite
npx playwright test tests/e2e/auth/signup.spec.js --ui

# Run with specific browser
npx playwright test tests/e2e/ --project=chromium

# Run with debug
npx playwright test tests/e2e/ --debug

# Generate report
npx playwright test tests/e2e/ --reporter=html
npx playwright show-report
```

---

## Key Metrics

| Category | Test Cases | Priority |
|----------|-----------|----------|
| Authentication | 6 | HIGH |
| Form Validation | 8 | HIGH |
| UI/UX | 4 | MEDIUM |
| Security | 5 | HIGH |
| Navigation | 3 | MEDIUM |
| Responsive | 6 | MEDIUM |
| **Total** | **32** | |

---

## Playwright Config Recommendations

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

**Document Created:** May 30, 2026
**Project:** Lets Soccer - Playwright E2E Tests
**Last Updated:** As referenced
