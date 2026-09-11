// src/test/procurement.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { GovBidProcurementContract, ProcurementState } from '../../contract/GovBidProcurement';

describe('Level 6: GovBid Compact ZK Procurement Contract Suite', () => {
  let contract: GovBidProcurementContract;

  beforeEach(() => {
    contract = new GovBidProcurementContract();
  });

  it('should initialize ledger state in OpenBidding state', () => {
    const state = contract.getLedgerState();
    expect(state.state).toBe(ProcurementState.OpenBidding);
    expect(state.minBidAmount).toBe(50000n);
    expect(state.maxBudgetLimit).toBe(1000000n);
    expect(state.bidsCount).toBe(70);
  });

  it('should accept valid sealed ZK bid within reserve and budget cap', async () => {
    const witness = {
      bidAmount: 500000n,
      salt: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      vendorTaxId: 'TAX-DEFENSE-101'
    };

    const res = await contract.submitSealedBid(witness, '0xqual_proof_digest');
    expect(res.success).toBe(true);
    expect(res.commitmentHash).toMatch(/^0x[a-f0-9]{64}$/);
    expect(res.txHash).toMatch(/^0x[a-f0-9]{64}$/);

    const updatedState = contract.getLedgerState();
    expect(updatedState.bidsCount).toBe(71);
    expect(updatedState.commitments.length).toBe(1);
  });

  it('should reject bid below minimum reserve price (50,000 tDUST)', async () => {
    const witness = {
      bidAmount: 30000n,
      salt: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      vendorTaxId: 'TAX-DEFENSE-102'
    };

    await expect(contract.submitSealedBid(witness, '0xqual_proof')).rejects.toThrow(
      'Bid amount fails minimum reserve price requirement'
    );
  });

  it('should reject bid exceeding maximum budget cap (1,000,000 tDUST)', async () => {
    const witness = {
      bidAmount: 1500000n,
      salt: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      vendorTaxId: 'TAX-DEFENSE-103'
    };

    await expect(contract.submitSealedBid(witness, '0xqual_proof')).rejects.toThrow(
      'Bid amount exceeds maximum project budget limit'
    );
  });

  it('should settle procurement and update winner on public ledger', async () => {
    const winnerPk = '0x03a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1';
    const winningAmount = 485000n;
    const proofDigest = '0xproof_digest_settlement_hash_1234567890';

    const res = await contract.settleProcurement(winnerPk, winningAmount, proofDigest);
    expect(res.success).toBe(true);
    expect(res.winner.winnerPublicKey).toBe(winnerPk);
    expect(res.winner.winningBidAmount).toBe(winningAmount);

    const finalState = contract.getLedgerState();
    expect(finalState.state).toBe(ProcurementState.Settled);
    expect(finalState.winner?.winningBidAmount).toBe(winningAmount);
  });
});
