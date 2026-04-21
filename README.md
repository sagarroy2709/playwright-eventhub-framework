# Playwright EventHub Assignment

An end-to-end test automation framework built with **Playwright** and **TypeScript**, following the Page Object Model (POM) design pattern.

---

## 📁 Project Structure

```
PLAYWRIGHTEVENTHUBASSIGNMENT/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline for GitHub Actions
├── playwright-report/
│   └── index.html                  # Auto-generated HTML test report
├── src/
│   ├── config/
│   │   └── env.config.ts           # Environment configuration (base URLs, credentials)
│   ├── fixtures/
│   │   ├── auth.fixture.ts         # Authentication fixtures
│   │   ├── base.fixture.ts         # Base fixture setup
│   │   └── user.fixture.ts         # User-related fixtures
│   ├── logger/                     # Logging utilities
│   ├── pages/                      # Page Object Models
│   │   ├── CreateEventPage.po.ts
│   │   ├── DashboardPage.po.ts
│   │   ├── EventBookAndPayPage.po.ts
│   │   ├── LoginPage.po.ts
│   │   ├── MyBookingsDetailedPage.po.ts
│   │   ├── MyBookingsPage.po.ts
│   │   └── UpcomingEventsPage.po.ts
│   └── utils/                      # Helper/utility functions
├── test-results/                   # Raw test results output
├── tests/                          # Test specs
│   ├── evenhubAssignment.spec.ts
│   ├── evenhubAssignmentSelf.spec.ts
│   ├── eventHubAssignmentMultipleBooking.spec.ts
│   └── example.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts            # Playwright configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/PlaywrightEventHubAssignment.git
cd PlaywrightEventHubAssignment

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## ⚙️ Configuration

Environment settings such as base URL and credentials are managed in:

```
src/config/env.config.ts
```

Update this file (or use environment variables) before running tests.

---

## 🧪 Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/evenhubAssignment.spec.ts

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests with UI mode
npx playwright test --ui
```

---

## 📊 Viewing Reports

After a test run, open the HTML report:

```bash
npx playwright show-report
```

The report is also available at `playwright-report/index.html`.

---

## 🔄 CI/CD

This project includes a **GitHub Actions** workflow (`.github/workflows/playwright.yml`) that automatically runs tests on every push and pull request to the `main` branch.

To view results, navigate to the **Actions** tab in your GitHub repository.

---

## 🏗️ Design Patterns

| Pattern | Usage |
|---|---|
| **Page Object Model (POM)** | All page interactions are encapsulated in `src/pages/` |
| **Fixtures** | Reusable setup/teardown logic in `src/fixtures/` |
| **Environment Config** | Centralised config management via `src/config/env.config.ts` |

---

## 📦 Tech Stack

- [Playwright](https://playwright.dev/) — Browser automation
- [TypeScript](https://www.typescriptlang.org/) — Type-safe test code
- [GitHub Actions](https://github.com/features/actions) — CI/CD pipeline

---

## 📝 License

This project is for assignment/demonstration purposes.