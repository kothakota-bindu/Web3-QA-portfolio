# Web3 QA & Automation Portfolio

Hi, I’m a QA Engineer with 6+ years of experience across manual testing, automation, and production support (QA Lead), now transitioning into **Web3 and Blockchain** as QA, 
with a focus on testing smart contracts, blockchain APIs, and frontend automation.
This repository is a **monorepo QA portfolio** showcasing how I test **modern Web3 systems end-to-end** — from smart contracts and JSON-RPC layers to UI automation with CI/CD.

The focus is on:
- Real-world testing strategies
- Clean, scalable automation frameworks
- CI-ready, production-grade setups
- Interview-defensible design decisions

---

## 🧪 Projects Overview

### 1️⃣ Playwright QA Test Suite (UI + API Automation)
📁 `playwright-qa-test-suite/`

**What it demonstrates**
- End-to-End UI testing using **Playwright + TypeScript**
- Page Object Model (POM) for maintainability
- API + UI hybrid testing
- Network interception & flakiness control
- Smoke vs regression test strategy
- CI/CD integration using GitHub Actions

**Key skills**
- Modern frontend automation
- Test stability & retries
- Cross-browser testing
- CI artifact generation (HTML reports, screenshots)

---

### 2️⃣ Hardhat QA Test Suite (Smart Contract Testing)
📁 `hardhat-qa-test-suite/`

**What it demonstrates**
- Smart contract testing using **Hardhat**
- Unit and integration tests for Solidity contracts
- Edge-case, revert, and negative-path validation
- Blockchain-specific QA mindset

**Key skills**
- Web3 protocol understanding
- On-chain state validation
- Event and revert testing
- Smart contract risk awareness

---

### 3️⃣ JSON-RPC Validation Tests
📁 `rpc-validation-tests/`

**What it demonstrates**
- Direct testing of **Ethereum JSON-RPC APIs**
- Validation of responses, errors, and edge cases
- Understanding of blockchain node interactions

**Key skills**
- Low-level blockchain testing
- API correctness & reliability
- Debugging node-level issues

---

## ⚙️ CI/CD & Automation Philosophy

- Each project has **isolated CI workflows**
- CI runs automatically on every push / PR
- Smoke tests are tagged and can be run independently
- Retries are enabled **only in CI**, never locally
- Failures generate artifacts for debugging

> “Automation is valuable only when it runs continuously and provides fast, reliable feedback.”

---

## 🧠 Testing Strategy Highlights

- **UI is never the source of truth** — backend and on-chain state are always validated
- APIs are tested independently before UI validation
- Network mocking is used to eliminate flaky dependencies
- Critical user paths are prioritized over test count

---

## 📬 Contact
If you'd like to discuss testing strategies, Web3 QA challenges, or automation design:

📧 Email: kbindu.work@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/kothakota-bindu-520575137/

---
