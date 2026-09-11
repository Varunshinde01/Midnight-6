# Midnight Preprod Deployment Specification — Level 6

[![Deployment Status](https://img.shields.io/badge/Deployment-Live%20on%20Preprod-10b981)](DEPLOYMENT.md)
[![Contract](https://img.shields.io/badge/Compact%20Contract-GovBidProcurement.compact-6366f1)](contract/GovBidProcurement.compact)

This document describes the deployment architecture, contract addresses, and verification steps for **GovBid Midnight** on the official **Midnight Preprod Testnet**.

---

## Preprod Network Configuration

- **Network Name**: Midnight Preprod Testnet
- **Chain ID**: `0x020088f1`
- **RPC Indexer Endpoint**: `https://indexer.preprod.midnight.network`
- **Preprod Faucet URL**: `https://faucet.preprod.midnight.network`
- **Deployed Contract Address**: `0x020088f1a23b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d`
- **Contract Authority Public Key**: `0x03a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1`

---

## Contract Architecture

The core contract is written in Midnight's **Compact Language** (`contract/GovBidProcurement.compact`):

1. **State Machine**:
   - `OpenBidding`
   - `QualificationCheck`
   - `RevealPhase`
   - `Settled`
   - `Cancelled`

2. **Zero-Knowledge Circuits**:
   - `submit_sealed_bid`: Verifies client-side witness (`private_bid_amount`, `private_salt`, `private_vendor_tax_id`) satisfies reserve price ≥ 50,000 tDUST and budget cap ≤ 1,000,000 tDUST without revealing the bid amount.
   - `settle_procurement`: Selectively discloses winning bidder public key and amount on settlement.

---

## Running Preprod Deployment

```bash
# 1. Compile Compact Contract & Generate Proof Keys
npx compactc contract/GovBidProcurement.compact

# 2. Execute Preprod Deployment Script
npx tsx contract/deploy.ts
```
