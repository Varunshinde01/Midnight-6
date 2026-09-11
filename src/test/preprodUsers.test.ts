// src/test/preprodUsers.test.ts
import { describe, it, expect } from 'vitest';
import { PREPROD_USERS, PREPROD_USER_ROLE_COUNTS, PREPROD_STATS } from '../data/preprodUsers';

describe('Level 6: 70 Preprod Users Directory Verification', () => {
  it('should contain exactly 70 verifiable preprod users', () => {
    expect(PREPROD_USERS.length).toBe(70);
    expect(PREPROD_STATS.totalUsers).toBe(70);
  });

  it('should verify all wallet addresses follow Midnight preprod format (mn_1...)', () => {
    PREPROD_USERS.forEach((user) => {
      expect(user.walletAddress).toMatch(/^mn_1[a-f0-9]{64}$/);
    });
  });

  it('should verify all transaction hashes follow 0x 64-hex format', () => {
    PREPROD_USERS.forEach((user) => {
      expect(user.txHash).toMatch(/^0x[a-f0-9]{64}$/);
    });
  });

  it('should verify all wallet addresses are 100% unique', () => {
    const addresses = PREPROD_USERS.map(u => u.walletAddress);
    const uniqueAddresses = new Set(addresses);
    expect(uniqueAddresses.size).toBe(70);
  });

  it('should verify correct distribution across 5 ecosystem roles', () => {
    const totalRoleSum = Object.values(PREPROD_USER_ROLE_COUNTS).reduce((a, b) => a + b, 0);
    expect(totalRoleSum).toBe(70);

    expect(PREPROD_USER_ROLE_COUNTS['Government Officer']).toBeGreaterThan(0);
    expect(PREPROD_USER_ROLE_COUNTS['Defense Contractor']).toBeGreaterThan(0);
    expect(PREPROD_USER_ROLE_COUNTS['Infrastructure Vendor']).toBeGreaterThan(0);
    expect(PREPROD_USER_ROLE_COUNTS['Security Auditor']).toBeGreaterThan(0);
    expect(PREPROD_USER_ROLE_COUNTS['Public Observer']).toBeGreaterThan(0);
  });

  it('should verify all user status entries are Verified', () => {
    PREPROD_USERS.forEach((user) => {
      expect(user.status).toBe('Verified');
    });
  });
});
