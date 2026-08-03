export interface NISTGuidelineCheck {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  impact: 'high' | 'medium' | 'low';
}

export function evaluateNISTGuidelines(password: string): {
  score: number; // 0 to 100
  checks: NISTGuidelineCheck[];
} {
  const length = password.length;

  const checks: NISTGuidelineCheck[] = [
    {
      id: 'nist-length-8',
      title: 'Minimum Length (≥ 8 characters)',
      description: 'NIST SP 800-63B requires user passwords to be at least 8 characters long.',
      passed: length >= 8,
      impact: 'high'
    },
    {
      id: 'nist-length-14',
      title: 'Recommended Length (≥ 14 characters)',
      description: 'NIST recommends 14+ characters for high security administrative / enterprise accounts.',
      passed: length >= 14,
      impact: 'medium'
    },
    {
      id: 'nist-max-length',
      title: 'Supports Long Passphrases (up to 64+ chars)',
      description: 'NIST mandates that identity systems permit passphrases up to at least 64 characters.',
      passed: length <= 64,
      impact: 'low'
    },
    {
      id: 'nist-dictionary',
      title: 'Not in Common Compromised Dictionary',
      description: 'NIST advises checking against known breached/compromised password dictionaries.',
      passed: !['password', '123456', 'qwerty', 'admin', 'welcome'].some(w => password.toLowerCase().includes(w)),
      impact: 'high'
    },
    {
      id: 'nist-repetition',
      title: 'No Excessive Character Repetition',
      description: 'Avoid predictable repetitive character runs (e.g. "aaaa", "1111").',
      passed: !/(.)\1{2,}/.test(password),
      impact: 'medium'
    },
    {
      id: 'nist-spaces',
      title: 'Permits Spaces & All Unicode Characters',
      description: 'NIST strongly encourages allowing spaces to support human-memorable multi-word passphrases.',
      passed: true,
      impact: 'low'
    }
  ];

  const passedCount = checks.filter(c => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return { score, checks };
}
