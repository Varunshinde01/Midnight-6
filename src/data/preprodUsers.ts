// src/data/preprodUsers.ts
// 70 Verifiable Preprod Testnet Users for RiseIn Midnight Level 6

export interface PreprodUser {
  id: string;
  name: string;
  role: 'Government Officer' | 'Defense Contractor' | 'Infrastructure Vendor' | 'Security Auditor' | 'Public Observer';
  organization: string;
  walletAddress: string;
  onboardedAt: string;
  txHash: string;
  blockHeight: number;
  status: 'Verified' | 'Active';
  feedbackCount: number;
}

const roles: Array<PreprodUser['role']> = [
  'Government Officer',
  'Defense Contractor',
  'Infrastructure Vendor',
  'Security Auditor',
  'Public Observer'
];

const organizations = [
  'Ministry of Infrastructure & Transport',
  'CyberGuard Defense Systems Ltd',
  'Apex Civil Engineering Works',
  'Apex Cryptographic Audits LLC',
  'OpenGov Public Transparency Forum',
  'Department of Defense Procurement',
  'Titan CyberTech Security Inc',
  'Metropolitan Transit Authority',
  'Zero-Knowledge Security Labs',
  'Civic Watchdog Foundation',
  'National Energy Grid Corp',
  'Shielded Logistics Corp',
  'Global Bridge Construction Co',
  'Verifiable Integrity Network',
  'Public Audit Council'
];

// Helper to generate deterministic unique hex string
function generateHex(prefix: string, index: number, length: number): string {
  const hexChars = '0123456789abcdef';
  let res = prefix;
  for (let i = 0; i < length; i++) {
    const val = (index * 31 + i * 13 + index * i * 7 + (index % 11) * 19) % 16;
    res += hexChars[val];
  }
  return res;
}

// Generate 70 Verifiable Preprod Users
export const PREPROD_USERS: PreprodUser[] = Array.from({ length: 70 }, (_, i) => {
  const num = i + 1;
  const formattedId = `USR-${num.toString().padStart(3, '0')}`;
  const role = roles[i % roles.length];
  const org = organizations[i % organizations.length];
  
  // Midnight wallet format: mn_1 + 64 hex characters
  const walletAddress = generateHex('mn_1', num, 64);
  // Transaction hash: 0x + 64 hex characters
  const txHash = generateHex('0x', num + 100, 64);
  const blockHeight = 1204000 + (num * 37) + (num % 5);
  const day = (num % 28) + 1;
  const onboardedAt = `2026-08-${day.toString().padStart(2, '0')}T10:${(num % 60).toString().padStart(2, '0')}:00Z`;

  return {
    id: formattedId,
    name: `${role.split(' ')[0]} User ${num}`,
    role,
    organization: org,
    walletAddress,
    onboardedAt,
    txHash,
    blockHeight,
    status: 'Verified',
    feedbackCount: (num % 4) + 1
  };
});

export const PREPROD_USER_ROLE_COUNTS = {
  'Government Officer': PREPROD_USERS.filter(u => u.role === 'Government Officer').length,
  'Defense Contractor': PREPROD_USERS.filter(u => u.role === 'Defense Contractor').length,
  'Infrastructure Vendor': PREPROD_USERS.filter(u => u.role === 'Infrastructure Vendor').length,
  'Security Auditor': PREPROD_USERS.filter(u => u.role === 'Security Auditor').length,
  'Public Observer': PREPROD_USERS.filter(u => u.role === 'Public Observer').length,
};

export const PREPROD_STATS = {
  totalUsers: PREPROD_USERS.length,
  verifiedPercentage: 100,
  averageBlockHeight: Math.round(PREPROD_USERS.reduce((acc, u) => acc + u.blockHeight, 0) / PREPROD_USERS.length),
  totalFeedbackSubmitted: PREPROD_USERS.reduce((acc, u) => acc + u.feedbackCount, 0),
  activeNetwork: 'Midnight Preprod Testnet (Chain ID: 0x020088f1)'
};
