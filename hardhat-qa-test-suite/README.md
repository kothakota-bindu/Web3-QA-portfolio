# Hardhat QA Test Suite – PaymentVault

This repository showcases **Web3 QA testing project** using **Hardhat, Mocha, and Ethers.js**.

The focus of this project is **failure scenarios, security validation, and on-chain state verification**, not just happy-path testing.

---

## 🔍 What Is Being Tested

### Smart Contract
`PaymentVault.sol` — A simple ETH vault where users can:
- Deposit ETH
- Withdraw their own ETH
- Owner can pause/unpause withdrawals

---

## 🧪 Test Coverage (QA-Focused)

### ✅ Happy Path Tests
- ETH deposits update on-chain balances
- Withdrawals reduce balances correctly
- Events are emitted accurately
- Contract ETH balance is verified

### ❌ Failure & Revert Tests
- Zero ETH deposits
- Zero withdrawals
- Overdraft withdrawals
- Withdrawals when paused
- Unauthorized access attempts

### 🔐 Security & Multi-User Tests
- Balance isolation between users
- Unauthorized withdrawal prevention
- Owner access control validation
- Global pause enforcement

---

## 🧠 QA Principles Demonstrated

- UI is **not** the source of truth — on-chain state is
- Every transaction is validated after confirmation
- Tests are isolated using fresh deployments
- Exact revert reasons are asserted
- Authorization paths are explicitly tested

---

## 🛠 Tech Stack

- Solidity ^0.8.x
- Hardhat (ESM)
- Mocha + Chai
- Ethers.js

---

## ▶️ Running Tests

```bash
npm install
npx hardhat test
