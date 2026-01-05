# QA Engineer Take-Home: Playwright E2E + K6 Load Testing
**App Under Test:** SauceDemo (https://www.saucedemo.com)  
**Primary:** Playwright (TypeScript) E2E framework (POM + fixtures + reporting)  
**Secondary:** K6 load test script for a public API (JSONPlaceholder)

---

## 1) Tech Stack

- Playwright + TypeScript
- K6 (load testing)
- Public GitHub repository

### AI Usage (Mandatory)
AI tools were used during development (as required by the assignment).  
**AI Tool Used:** **Google Gemini + GitHub Copilot**  
*(ChatGPT Web UI was not used for code generation as per instructions.)*

---

## 2) Project Structure

project-root/
├── tests/
│ ├── e2e/
│ │ ├── login.spec.ts
│ │ ├── navigation.spec.ts
│ │ ├── checkout.spec.ts
│ │ ├── form-validation.spec.ts
│ │ └── error-handling.spec.ts
│ └── fixtures.ts
├── pages/
│ ├── BasePage.ts
│ ├── LoginPage.ts
│ ├── InventoryPage.ts
│ ├── ItemDetailsPage.ts
│ ├── CartPage.ts
│ └── CheckoutPage.ts
├── fixtures/
│ └── test-data.json
├── utils/
│ ├── helpers.ts
│ └── constants.ts
├── load/
│ └── k6/
│ └── jsonplaceholder.js
├── playwright.config.ts
├── reports/ # generated outputs (HTML/JSON/artifacts)
└── README.md


## 3) Setup & Installation

### Prerequisites
- Node.js 18+ recommended
- npm (comes with Node)

### Install dependencies & browsers
```Run in bash
npm install
npx playwright install
4) Run E2E Tests (Playwright)
Run in headless mode (recommended for CI/CD)
Run in bash
npm test
Run in headed mode (debugging)
Run in bash
npm run test:headed
Run cross-browser (Chromium / Firefox)
Run in bash
npm run test:chrome
npm run test:firefox
Reports
HTML report: reports/html/

JSON report: reports/results.json

Open the last HTML report:
Run in bash
npm run report
Failure artifacts (auto)
Configured in playwright.config.ts:

screenshot: 'only-on-failure'

video: 'retain-on-failure'

trace: 'retain-on-failure'

Artifacts path:

reports/artifacts/

5) Test Scenarios Covered (5+)
Valid login → lands on Inventory page

Invalid login → shows error message

Navigation → open item details → back to inventory

Complex flow → add to cart → checkout → finish → success confirmation

Form validation → missing first name → validation error

Edge case → accessing inventory without login redirects to login

6) Load Testing (K6)
Script
File: load/k6/jsonplaceholder.js
Target API:

GET https://jsonplaceholder.typicode.com/posts/1

Install k6
macOS

bash
Copy code
brew install k6
Windows (Recommended)

powershell
Copy code
winget install -e --id GrafanaLabs.k6 --source winget
Linux
Use your distro package manager / official installation method.

Run load test
bash
Copy code
k6 run load/k6/jsonplaceholder.js
Practical Concepts Demonstrated
Virtual users (VUs) using staged ramp-up / hold / ramp-down

Thresholds:

http_req_duration: p95 < 500ms

http_req_failed: < 2% (public APIs may occasionally timeout)

Basic checks:

status code

response time

response body validation

7) Load Testing Theory (Understanding)
Sample Run Results (Local)
Profile: 10 VUs (ramp-up 15s, hold 30s, ramp-down 15s)

Throughput: ~6.68 req/s (403 requests in ~60s)

Response time: avg ~90ms, p95 ~113ms

Error rate: 0.49% (2 failed requests out of 403) — occasional timeouts on a public API

Thresholds: p95 < 500ms ✅ and http_req_failed < 2% ✅

Types of Load Testing
Load Testing: Validate performance under expected/normal traffic.

Stress Testing: Push beyond capacity to find breaking point and failure behavior.

Spike Testing: Sudden traffic spikes to validate recovery and stability.

Soak/Endurance Testing: Long-duration load to detect memory leaks/resource exhaustion.

Scalability Testing: Observe performance as users/resources scale (horizontal/vertical).

Key Metrics to Monitor
Response time: avg, p95, p99

Throughput: requests/sec

Error rate: failed requests %

Resource usage: CPU, memory, DB connections (if infra is available)

Saturation: queue length, connection pool exhaustion, rate limiting

When to Use Which
Load: baseline performance before release

Stress: find maximum capacity & degradation behavior

Spike: campaign traffic bursts / sudden load changes

Soak: long running stability (overnight/weekend)

Scalability: infra scaling / autoscaling validation