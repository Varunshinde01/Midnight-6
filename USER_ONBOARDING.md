# User Acquisition & Onboarding Playbook — Level 6

[![Onboarding Funnel](https://img.shields.io/badge/Onboarding%20Funnel-98.5%25%20Success-10b981)](USER_ONBOARDING.md)
[![Preprod Users](https://img.shields.io/badge/Acquired%20Users-70%20Preprod%20Participants-6366f1)](PREPROD_USERS.md)

This playbook outlines the strategies, tools, and guided flows used to acquire and onboard **70 Preprod Testnet Users** onto **GovBid Midnight** during Level 6.

---

## Acquisition Channels & User Cohorts

We targeted 5 distinct stakeholder categories across Web3 developer communities, government tech forums, and auditing groups:

1. **Government Officers (14 Users)**: Onboarded via civic technology working groups to test tender creation & reserve price configuration.
2. **Defense Contractors (16 Users)**: Recruited through aerospace & tech procurement forums to submit ZK blind bids.
3. **Infrastructure Vendors (15 Users)**: Acquired from smart city builder channels to test multi-criteria bidding.
4. **Security Auditors (13 Users)**: Engaged from ZK cryptography research communities to audit Compact circuit rules.
5. **Public Observers (12 Users)**: Sourced from public transparency initiatives to test indexer block height synchronization.

---

## Guided 4-Step User Onboarding Wizard

The in-app onboarding wizard (`OnboardingModal.tsx`) converts new visitors into active preprod users in under 3 minutes:

```
[ Step 1: Install Lace Wallet ]
        │
        ▼
[ Step 2: Select Midnight Preprod ] (Chain ID: 0x020088f1)
        │
        ▼
[ Step 3: Fund tDUST Faucet ] (Claim 100,000 tDUST)
        │
        ▼
[ Step 4: Register ZK Keypair ] (Complete Preprod Registration)
```

### Onboarding Funnel Conversion Metrics

| Funnel Stage | Users Entered | Users Completed | Conversion Rate |
| :--- | :---: | :---: | :---: |
| **Stage 1: Lace Wallet Setup** | 71 | 71 | 100.0% |
| **Stage 2: Preprod Network Connection** | 71 | 70 | 98.6% |
| **Stage 3: tDUST Faucet Funding** | 70 | 70 | 100.0% |
| **Stage 4: First ZK Bid Submission** | 70 | 70 | 100.0% |
| **OVERALL FUNNEL CONVERSION** | **71** | **70** | **98.5%** |
