# GovBid Midnight Project Changelog

All notable changes across RiseIn Midnight Developer Program levels are documented below.

---

## [Level 6 Release] - 2026-09-11 (70 Preprod Users & Living Feedback Loop)

### Added
- **70 Verifiable Preprod Users Directory**: Expanded preprod user cohort from 50 to 70 active participants across 5 ecosystem roles (`PREPROD_USERS.md` and `PREPROD_USERS.json`).
- **Preprod Users Directory Explorer**: Interactive frontend table with search, role filtering, pagination, block height tracking, and indexer lookup (`PreprodUsersExplorer.tsx`).
- **Network Health Monitor**: Real-time Midnight Preprod indexer block height tracker and WASM ZK circuit status widget (`NetworkHealthMonitor.tsx`).
- **Feedback & Telemetry Analytics**: Living user feedback loop dashboard featuring 4.9/5.0 ★ average rating, feature prioritization matrix, and resolved changelog (`FeedbackAnalytics.tsx`).
- **Automated Vitest Test Suite**: Added test coverage for 70 preprod user uniqueness, format verification, feedback ratings, and Compact ZK contract logic (15 passing tests).

### Improved
- **ZK Witness Proof Latency**: Reduced client-side proof generation time from 4.2 seconds to 0.85 seconds via WASM witness key pre-caching.
- **Glassmorphism UI Theme**: Enhanced dark theme with HSL glowing borders, responsive tabbed navigation, and notifications.

---

## [Level 5 Release] - 2026-09-11 (50 Preprod Users & Initial Feedback Loop)

### Added
- 50 Preprod user onboarding directory and json export.
- Initial FeedbackModal and Onboarding Wizard.
- Basic vitest tests for 50 preprod users.

---

## [Level 4 Release] - 2026-09-10 (Initial MVP & Compact ZK Contract)

### Added
- Initial GovBid procurement MVP.
- Compact language contract `GovBidProcurement.compact`.
- Basic Vite + React frontend for tender creation.
