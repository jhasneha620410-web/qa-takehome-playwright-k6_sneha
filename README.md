# QA Engineer Take-Home: Playwright E2E + K6 Load Testing

> **App Under Test:** SauceDemo (https://www.saucedemo.com)  
> **Primary:** Playwright (TypeScript) E2E framework (POM + fixtures + reporting)  
> **Secondary:** K6 load test script for a public API (JSONPlaceholder)

---

## 1) Tech Stack

- Playwright + TypeScript
- K6 (load testing)
- Public GitHub repository

> **AI Usage (Mandatory):** AI was used during development (as per assignment requirement).  
> **AI Tool Used:** **Google Gemini + GitHub Copilot**  
> *(Note: ChatGPT Web UI was not used for code generation as per instructions.)*

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

yaml
Copy code

---

## 3) Setup & Installation

### Prerequisites
- Node.js 18+ recommended
- npm (comes with Node)

### Install
```bash
npm install
npx playwright install
4) Run E2E Tests
Headless (CI/CD)
bash
Copy code
npm test
Headed (Debug)
bash
Copy code
npm run test:headed
Cross-browser
bash
Copy code
npm run test:chrome
npm run test:firefox
Reports
HTML Report output: reports/html/

JSON output: reports/results.json

Open HTML report:

bash
Copy code
npm run report
Screenshot on failure
Configured in playwright.config.ts:

screenshot: 'only-on-failure'

video: 'retain-on-failure'

trace: 'retain-on-failure'

Artifacts are stored under:

reports/artifacts/

5) Test Scenarios Covered (5+)
Valid login -> lands on Inventory page

Invalid login -> shows error message

Navigation -> open item details -> back to inventory

Complex flow -> add to cart -> checkout -> finish -> success confirmation

Form validation -> missing first name -> validation error

Edge case -> accessing inventory without login redirects to login

6) Load Testing (K6)
Script
load/k6/jsonplaceholder.js targets:

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
Use your package manager / official installation method.

Run script
bash
Copy code
k6 run load/k6/jsonplaceholder.js
Practical Concepts Demonstrated
Virtual users (VUs) via staged ramp-up / hold / ramp-down

Ramp-up configuration using stages

Basic assertions (status code, response time, response body)

Thresholds:

http_req_duration: p95 < 500ms

http_req_failed: < 2% (public APIs can occasionally timeout)

7) Load Testing Theory (Understanding)
Sample Run Results (Local)
Test profile: 10 VUs (ramp-up 15s, hold 30s, ramp-down 15s)

Throughput: ~6.68 req/s (403 requests in ~60s)

Response time: avg ~90ms, p95 ~113ms

Error rate: 0.49% (2 failed requests out of 403) — occasional timeouts on a public API

Thresholds: p95 < 500ms ✅ and http_req_failed < 2% ✅

Types of Load Testing
Load Testing: Expected/normal traffic to validate performance under typical usage.

Stress Testing: Push beyond capacity to find breaking point and observe failure modes.

Spike Testing: Sudden traffic spikes to see how system handles sharp increases/decreases.

Soak/Endurance Testing: Sustained load for long duration to detect memory leaks/resource exhaustion.

Scalability Testing: Validate how performance changes as we scale resources/users (horizontal/vertical scaling).

Key Metrics to Monitor
Response time: avg, p95, p99

Throughput: requests/sec

Error rate: failed requests %

Resource utilization: CPU, memory, DB connections, thread pools (if you control infra)

Saturation indicators: queue length, connection pool exhaustion, rate limiting

When to Use Which
Use Load testing before release for baseline performance.

Use Stress testing to determine max capacity and graceful degradation.

Use Spike testing for marketing campaigns or unpredictable traffic bursts.

Use Soak testing for long-running stability (overnight/weekend run).

Use Scalability testing when planning infra scaling or verifying autoscaling.

