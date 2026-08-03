import { EntropyResult } from './entropy';
import { PatternCheckResult } from './patterns';

export interface AIDiagnosis {
  overallAssessment: string;
  securityScore: number; // 0 - 100
  threatTier: 'Extreme Risk' | 'High Vulnerability' | 'Moderate Strength' | 'Strong Defense' | 'Military Grade';
  weaknessReasons: string[];
  personalizedImprovements: string[];
  predictedVulnerabilities: {
    attackVector: string;
    risk: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
  }[];
  memorableAlternatives: string[];
}

export function generateAIDiagnosis(
  password: string,
  entropy: EntropyResult,
  patterns: PatternCheckResult,
  dictionaryMatch: { found: boolean; word?: string }
): AIDiagnosis {
  if (!password) {
    return {
      overallAssessment: 'Awaiting password input for AI threat modeling and real-time vulnerability inspection.',
      securityScore: 0,
      threatTier: 'Extreme Risk',
      weaknessReasons: ['No password entered yet.'],
      personalizedImprovements: ['Enter a password above to begin offline security analysis.'],
      predictedVulnerabilities: [],
      memorableAlternatives: []
    };
  }

  const weaknessReasons: string[] = [];
  const personalizedImprovements: string[] = [];
  const predictedVulnerabilities: AIDiagnosis['predictedVulnerabilities'] = [];

  // Length check
  if (password.length < 8) {
    weaknessReasons.push(`Critically short length (${password.length} chars). Under 8 characters is vulnerable to instant brute force.`);
    personalizedImprovements.push('Extend password to at least 14-16 characters or convert into a 4-word passphrase.');
    predictedVulnerabilities.push({
      attackVector: 'Brute-Force Computation',
      risk: 'Critical',
      description: 'Attackers can test all possible combinations in less than a second using basic consumer hardware.'
    });
  } else if (password.length < 12) {
    weaknessReasons.push(`Moderate length (${password.length} chars). Modern GPU clusters can crack 8-11 character passwords rapidly.`);
    personalizedImprovements.push('Add 4+ characters to increase search space exponentially.');
  }

  // Dictionary check
  if (dictionaryMatch.found) {
    weaknessReasons.push(`Contains dictionary term or common credential pattern: "${dictionaryMatch.word}"`);
    personalizedImprovements.push('Remove dictionary words and replace them with randomly selected words or unique symbol combinations.');
    predictedVulnerabilities.push({
      attackVector: 'Dictionary & Wordlist Attack',
      risk: 'Critical',
      description: 'Automated tools (John the Ripper, Hashcat) test breached wordlists first, cracking this within seconds.'
    });
  }

  // Patterns check
  if (patterns.hasSequential) {
    weaknessReasons.push('Contains predictable sequential character runs (e.g. 1234, abcd).');
    personalizedImprovements.push('Scramble or separate sequential numbers and alphabetical runs.');
  }
  if (patterns.hasRepeated) {
    weaknessReasons.push('Contains repeated character clusters (e.g. "aaa" or "111").');
    personalizedImprovements.push('Eliminate consecutive duplicate characters.');
  }
  if (patterns.hasKeyboardPattern) {
    weaknessReasons.push('Contains physical keyboard pattern walks (e.g., QWERTY, ASDF).');
    personalizedImprovements.push('Avoid adjacent key movements on standard QWERTY keyboards.');
    predictedVulnerabilities.push({
      attackVector: 'Rule-Based Mask Attack',
      risk: 'High',
      description: 'Crackers apply spatial keyboard rules to easily detect QWERTY movements.'
    });
  }
  if (patterns.hasYearPattern) {
    weaknessReasons.push('Contains 4-digit calendar year pattern.');
    personalizedImprovements.push('Avoid using birth years or current dates in credentials.');
  }

  // Character diversity check
  const div = entropy.diversity;
  const typesUsed = (div.lowercase > 0 ? 1 : 0) + (div.uppercase > 0 ? 1 : 0) + (div.digits > 0 ? 1 : 0) + (div.symbols > 0 ? 1 : 0);
  if (typesUsed < 3) {
    weaknessReasons.push(`Low character diversity (${typesUsed} of 4 character sets used).`);
    personalizedImprovements.push('Mix uppercase letters, lowercase letters, numbers, and special symbols (!@#$%).');
  }

  // Calculate composite score (0 - 100)
  let score = 0;

  // Length weight up to 45 pts
  score += Math.min(45, (password.length / 16) * 45);

  // Entropy weight up to 35 pts
  score += Math.min(35, (entropy.bits / 100) * 35);

  // Diversity weight up to 20 pts
  score += typesUsed * 5;

  // Deductions
  if (dictionaryMatch.found) score -= 40;
  if (patterns.hasSequential) score -= 15;
  if (patterns.hasRepeated) score -= 10;
  if (patterns.hasKeyboardPattern) score -= 20;
  if (patterns.hasYearPattern) score -= 10;

  score = Math.max(0, Math.min(100, Math.round(score)));

  // Threat Tier
  let threatTier: AIDiagnosis['threatTier'] = 'Extreme Risk';
  if (score >= 90) threatTier = 'Military Grade';
  else if (score >= 75) threatTier = 'Strong Defense';
  else if (score >= 50) threatTier = 'Moderate Strength';
  else if (score >= 25) threatTier = 'High Vulnerability';

  if (score >= 80 && weaknessReasons.length === 0) {
    weaknessReasons.push('No obvious vulnerability detected. Excellent entropy distribution.');
    personalizedImprovements.push('Maintain password uniqueness across all services using a password manager.');
  }

  // Generate 3 memorable strong alternative suggestions based on input
  const cleanInput = password.replace(/[^a-zA-Z0-9]/g, '');
  const prefix = cleanInput ? cleanInput.substring(0, 4) : 'Cyber';
  const memorableAlternatives = [
    `${prefix.toUpperCase()}#99!ShieldX7`,
    `Orbit-${prefix.toLowerCase()}-Quantum$2026`,
    `Vortex#${prefix}*HyperSec99`
  ];

  const overallAssessment = score >= 75
    ? `AI Risk Assessment: Highly Secure. The password demonstrates high entropy (${entropy.bits} bits) and resists dictionary & brute-force attack vectors.`
    : score >= 45
    ? `AI Risk Assessment: Moderate Security. Needs enhancement. While non-trivial, it remains vulnerable to targeted GPU cluster attacks.`
    : `AI Risk Assessment: Critical Vulnerability Detected. This password can be compromised almost instantly by automated hacker toolkits. Urgent upgrade recommended.`;

  return {
    overallAssessment,
    securityScore: score,
    threatTier,
    weaknessReasons,
    personalizedImprovements,
    predictedVulnerabilities,
    memorableAlternatives
  };
}

// AI Chatbot Knowledge Base Responder
export function getShieldBotResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();

  if (query.includes('nist') || query.includes('guideline') || query.includes('standard')) {
    return `ShieldBot AI: NIST SP 800-63B guidelines recommend prioritizing password length (minimum 8 chars, preferably 14+) over complex character composition rules. They also mandate checking passwords against breached databases, allowing spaces, and eliminating mandatory 90-day periodic rotations unless a breach is confirmed.`;
  }
  if (query.includes('passphrase') || query.includes('memorable')) {
    return `ShieldBot AI: Passphrases combine 4-5 random words (e.g. "correct-horse-battery-staple"). They are vastly easier for humans to remember while offering massive entropy (60-80+ bits), making them virtually uncrackable by brute-force computers.`;
  }
  if (query.includes('manager') || query.includes('store')) {
    return `ShieldBot AI: Always use an offline or zero-knowledge encrypted password manager (like Bitwarden or 1Password). Never reuse the same password across multiple sites!`;
  }
  if (query.includes('entropy') || query.includes('bit')) {
    return `ShieldBot AI: Entropy measures password unpredictability in bits. Formula: E = Length * log2(Pool Size). Passwords with 60+ bits are considered secure, and 80+ bits provide military-grade defense against supercomputer attacks.`;
  }
  if (query.includes('mfa') || query.includes('2fa') || query.includes('two factor')) {
    return `ShieldBot AI: Multi-Factor Authentication (MFA) adds a crucial secondary defense layer. Even if your password is stolen, an attacker cannot gain access without your hardware key (YubiKey) or TOTP authenticator app.`;
  }

  return `ShieldBot AI: Great question! To maximize security: 1) Aim for 14+ characters or a 4-word passphrase, 2) Never reuse credentials, 3) Enable 2FA/MFA, and 4) Use our offline Password Shield analyzer to check entropy before creating new credentials.`;
}
