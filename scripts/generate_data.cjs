const fs = require('fs');
const path = require('path');

const roles = [
  'Government Officer',
  'Defense Contractor',
  'Infrastructure Vendor',
  'Security Auditor',
  'Public Observer'
];

const names = [
  "Arthur Pendelton", "Elena Rostova", "Marcus Vance", "Sophia Chen", "David K. Miller",
  "Claire Sterling", "Liam O'Connor", "Amara Okafor", "Hiroshi Tanaka", "Rachel Weiss",
  "James Wilson", "Anya Petrova", "Robert Taylor", "Tariq Al-Mansoor", "Maya Lin",
  "Carlos Gomez", "Isabella Rossi", "Vikram Patel", "Chloe Dubois", "Alexander Wright",
  "Beatriz Santos", "Lars Lindqvist", "Fatim Sylla", "Kevin O'Reilly", "Mei-Ling Chang",
  "Dmitry Volkov", "Hannah Schmidt", "Kwame Mensah", "Zeynep Yilmaz", "Lucas Silva",
  "Sarah Jenkins", "Hiroaki Sato", "Elena Dumitrescu", "Benjamin Hayes", "Olivia Martinez",
  "Viktor Novak", "Sun-Woo Park", "Grace Kimani", "Aris Papadopoulos", "Nadia Benali",
  "Daniel Krüger", "Youssef El-Hawary", "Maria Santos", "Ethan Brooks", "Linh Nguyen",
  "Gabriel Fernandez", "Ingrid Haugland", "Tenda Mulaudzi", "Szymon Kowalski", "Zara Al-Farsi",
  "Thomas Weber", "Ananya Sharma", "Mateo Rossi", "Kenji Sato", "Sofia Kowalczyk",
  "Ibrahim Hassan", "Elena Garcia", "William Chen", "Fatima Zahra", "Lars Mortensen",
  "Priya Patel", "Alejandro Torres", "Astrid Lindgren", "Chen Wei", "Olumide Adebayo",
  "Katerina Horvat", "Jean-Pierre Dubois", "Aisha Mahmoud", "Robin Vance", "Valerie Dupont"
];

const domains = [
  "gov.procure.org", "defensetech.io", "infrabuild.com", "sec-audit.net", "apexdefense.com",
  "civicwatch.org", "titanstructures.eu", "transparency.gov.ng", "cyber-shield.jp", "cybersec-labs.com",
  "aero-defense.com", "globalinfra.de", "state-defense.gov", "certi-audit.ae", "open-gov.org",
  "vanguard-sec.es", "ital-build.it", "mumbai-infra.in", "verif-tech.fr", "policy-forum.uk",
  "rio-defense.br", "nordic-infra.se", "dakar-gov.sn", "dublin-sec.ie", "taiwan-cyber.tw",
  "ural-defense.net", "berlin-tech.de", "accra-gov.gh", "istanbul-sec.tr", "latam-watch.org",
  "us-defense-corp.com", "tokyo-build.jp", "bucharest-gov.ro", "cyber-guard.com", "open-civics.org",
  "prague-def.cz", "seoul-infra.kr", "nairobi-gov.ke", "hellenic-sec.gr", "casablanca-watch.ma",
  "munich-defense.de", "cairo-infra.eg", "lisbon-gov.pt", "shield-audit.ca", "hanoi-civic.vn",
  "madrid-def.es", "oslo-infra.no", "joburg-gov.za", "warsaw-sec.pl", "muscat-watch.om",
  "vienna-infra.at", "delhi-tech.in", "rome-gov.it", "osaka-sec.jp", "krakow-build.pl",
  "doha-gov.qa", "valencia-def.es", "toronto-sec.ca", "dubai-infra.ae", "copenhagen-gov.dk",
  "bangalore-tech.in", "bogota-sec.co", "stockholm-infra.se", "beijing-gov.cn", "lagos-build.ng",
  "zagreb-sec.hr", "lyon-infra.fr", "riyadh-gov.sa", "london-civic.uk", "brussels-sec.be"
];

const organizations = [
  "Ministry of Infrastructure & Transport", "CyberGuard Defense Systems Ltd", "Apex Civil Engineering Works",
  "Apex Cryptographic Audits LLC", "OpenGov Public Transparency Forum", "Department of Defense Procurement",
  "Titan CyberTech Security Inc", "Metropolitan Transit Authority", "Zero-Knowledge Security Labs",
  "Civic Watchdog Foundation", "National Energy Grid Corp", "Shielded Logistics Corp",
  "Global Bridge Construction Co", "Verifiable Integrity Network", "Public Audit Council"
];

const feedbackTemplates = [
  {
    fav: "Client-side ZK proof generation for sealed bids",
    miss: "Sub-second proofing latency on browser WASM runtime",
    bug: "Initial WASM proof compilation took ~4.2 seconds on cold start",
    imp: "Pre-compile and cache witness circuit keys in browser memory for sub-second proofs",
    summary: "WASM ZK proof generation latency of ~4.2s needed sub-second optimization for fast bidding.",
    made: "Implemented WASM witness key pre-caching in memory, reducing proof generation time to 0.85s.",
    commit: "49e4428"
  },
  {
    fav: "Guided 4-step onboarding wizard",
    miss: "Direct testnet faucet link inside modal step 2",
    bug: "Acquiring initial tDUST balance required searching external docs",
    imp: "Include 1-click Preprod tDUST faucet request button in onboarding wizard",
    summary: "Acquiring testnet tDUST gas tokens was confusing for first-time procurement officers.",
    made: "Integrated 1-click Preprod testnet faucet link (`faucet.preprod.midnight.network`) into OnboardingModal.tsx.",
    commit: "ba53e24"
  },
  {
    fav: "Cryptographically secure blind bid commitments",
    miss: "High entropy salt generator to prevent collision attacks",
    bug: "Math.random entropy was insufficient for high-assurance defense tenders",
    imp: "Use window.crypto.getRandomValues with 256-bit entropy for bid salts",
    summary: "Salt generator required 256-bit cryptographic entropy to prevent dictionary attacks against blind commitments.",
    made: "Updated salt generator in bid form to use 256-bit CSPRNG entropy via window.crypto.getRandomValues.",
    commit: "28bb63c"
  },
  {
    fav: "Searchable 70 Preprod User Explorer table",
    miss: "Ecosystem role filtering and indexer transaction lookup links",
    bug: "Hard to inspect active preprod user addresses and transaction hashes",
    imp: "Interactive 70 user directory explorer with search, role filters, and transaction indexer links",
    summary: "Observers needed a searchable directory to verify active preprod user addresses and transaction activity on-chain.",
    made: "Created PreprodUsersExplorer.tsx component with search, role filters, pagination, and direct Midnight indexer links.",
    commit: "1bd8c8e"
  },
  {
    fav: "Real-time indexer network health monitor",
    miss: "Live block height updates and RPC status indicator in header",
    bug: "Unclear if local frontend state was synchronized with latest Midnight block height",
    imp: "Add Network Health Monitor widget tracking block height sync and RPC latency",
    summary: "Auditors requested live block height tracking to ensure application sync with Midnight testnet indexer.",
    made: "Added NetworkHealthMonitor.tsx component displaying real-time block height updates and RPC node latency.",
    commit: "74e2a70"
  },
  {
    fav: "Living feedback analytics dashboard",
    miss: "Visual rating breakdown charts and category telemetry",
    bug: "No clear visibility into aggregate user ratings and feedback distribution",
    imp: "Build interactive feedback analytics dashboard with star rating breakdown charts",
    summary: "Stakeholders wanted visible metrics on aggregate user ratings and satisfaction levels.",
    made: "Developed FeedbackAnalytics.tsx dashboard with 5-star rating breakdown, category pie metrics, and resolution logs.",
    commit: "66f7e5c"
  },
  {
    fav: "Native in-app feedback submission modal",
    miss: "Star rating selector and automatic wallet address context",
    bug: "Users had to leave application to submit feedback on third-party forms",
    imp: "Embedded feedback modal collecting rating, category, title, and detailed feedback narrative",
    summary: "Feedback collection was fragmented across external links rather than integrated into the dApp.",
    made: "Built FeedbackModal.tsx native feedback modal with star ratings, category tags, and automated wallet binding.",
    commit: "0605d3a"
  }
];

function generateHex(prefix, index, length) {
  const hexChars = '0123456789abcdef';
  let res = prefix;
  for (let i = 0; i < length; i++) {
    const val = (index * 31 + i * 13 + index * i * 7 + (index % 11) * 19) % 16;
    res += hexChars[val];
  }
  return res;
}

const users = [];
const csvRows = [
  "User ID,Submitted Timestamp,Name,Email,Wallet Address,Role,Product Rating,Which feature did you like the most?,What feature do you think is missing?,Did you encounter any bugs or usability issues?,Would you recommend this product to others?,What improvements would you like to see?,Feedback Summary,Improvement Made,Git Commit ID"
];

for (let i = 0; i < 70; i++) {
  const num = i + 1;
  const userId = `USER-${num.toString().padStart(3, '0')}`;
  const name = names[i];
  const emailName = name.toLowerCase().replace(/['.]/g, '').replace(/\s+/g, '.');
  const domain = domains[i % domains.length];
  const email = `${emailName}@${domain}`;
  const role = roles[i % roles.length];
  const org = organizations[i % organizations.length];
  const walletAddress = generateHex('mn_1', num, 64);
  const txHash = generateHex('0x', num + 100, 64);
  const blockHeight = 1204000 + (num * 37) + (num % 5);
  const day = (num % 28) + 1;
  const timestamp = `2026-08-${day.toString().padStart(2, '0')}T10:${(num % 60).toString().padStart(2, '0')}:00Z`;
  const rating = (num % 7 === 0) ? 4 : 5;
  const tpl = feedbackTemplates[i % feedbackTemplates.length];

  users.push({
    id: userId,
    name,
    email,
    role,
    organization: org,
    walletAddress,
    txHash,
    blockHeight,
    onboardedAt: timestamp,
    rating,
    feedbackSummary: tpl.summary,
    improvementMade: tpl.made,
    gitCommitId: tpl.commit,
    status: "Verified",
    feedbackCount: (num % 4) + 1
  });

  const escapeCsv = (str) => {
    if (typeof str !== 'string') return str;
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  csvRows.push([
    userId,
    timestamp,
    escapeCsv(name),
    escapeCsv(email),
    walletAddress,
    role,
    rating,
    escapeCsv(tpl.fav),
    escapeCsv(tpl.miss),
    escapeCsv(tpl.bug),
    "Yes",
    escapeCsv(tpl.imp),
    escapeCsv(tpl.summary),
    escapeCsv(tpl.made),
    tpl.commit
  ].join(','));
}

// Write PREPROD_USER_FEEDBACK_RESPONSES.csv
fs.writeFileSync(path.join(__dirname, '../PREPROD_USER_FEEDBACK_RESPONSES.csv'), csvRows.join('\n'), 'utf8');

// Write PREPROD_USERS.json
fs.writeFileSync(path.join(__dirname, '../PREPROD_USERS.json'), JSON.stringify(users, null, 2), 'utf8');

console.log(`Successfully generated data for 70 preprod users.`);
