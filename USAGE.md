# User Operating Guide — GovBid Midnight Level 6

This guide provides instructions for participating in government procurement, submitting sealed ZK bids, and navigating the 70 Preprod Users Directory.

---

## 1. Connecting Your Wallet

1. Click **Connect Lace Wallet** in the top navigation bar.
2. Approve the connection prompt in your Midnight Lace Wallet extension.
3. Ensure your wallet is connected to **Midnight Preprod Testnet** (Chain ID: `0x020088f1`).

---

## 2. Submitting a Sealed ZK Bid

1. Navigate to the **Procurement Portal** tab.
2. Enter your **Private Bid Amount** (tDUST) and **Vendor Tax ID**.
3. Click **Submit Sealed ZK Bid**.
4. The client-side WASM engine will generate a zero-knowledge witness proof asserting:
   - Your bid amount is ≥ minimum reserve price (50,000 tDUST).
   - Your bid amount is ≤ maximum budget cap (1,000,000 tDUST).
   - SHA-256 commitment hash is recorded on-chain.
5. Receive your verifiable transaction hash and inspect it on the Midnight Indexer.

---

## 3. Navigating the 70 Preprod Users Explorer

1. Switch to the **70 Preprod Users Explorer** tab.
2. Filter users by role: *Government Officer, Defense Contractor, Infrastructure Vendor, Security Auditor, Public Observer*.
3. Search by User ID, name, organization, or wallet address.
4. Click the clipboard icon to copy wallet addresses or click the indexer link to view on-chain tx details.

---

## 4. Submitting Product Feedback

1. Click **Feedback (4.9 ★)** in the header.
2. Select your role and category.
3. Provide a satisfaction rating and narrative.
4. Submit your response to update the living telemetry matrix.
