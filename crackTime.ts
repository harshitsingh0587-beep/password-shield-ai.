export interface CrackTimeScenario {
  label: string;
  speed: string; // e.g. "10 guesses/sec"
  guessesPerSecond: number;
  formattedTime: string;
  riskLevel: 'critical' | 'warning' | 'safe' | 'invulnerable';
}

export function formatSeconds(seconds: number): string {
  if (seconds < 1) return 'Instant (< 1 second)';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} minutes`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} hours`;
  const days = hours / 24;
  if (days < 365) return `${Math.round(days)} days`;
  const years = days / 365;
  if (years < 1000) return `${Math.round(years).toLocaleString()} years`;
  if (years < 1000000) return `${(years / 1000).toFixed(1)}k years`;
  if (years < 1000000000) return `${(years / 1000000).toFixed(1)} million years`;
  return `${(years / 1000000000).toFixed(1)} billion years`;
}

export function calculateCrackTimes(entropyBits: number, poolSize: number, length: number): CrackTimeScenario[] {
  if (entropyBits === 0 || length === 0) {
    return [
      { label: 'Online Throttled Attack', speed: '10 guesses/s', guessesPerSecond: 10, formattedTime: 'Instant', riskLevel: 'critical' },
      { label: 'Online Fast Attack', speed: '1,000 guesses/s', guessesPerSecond: 1000, formattedTime: 'Instant', riskLevel: 'critical' },
      { label: 'Offline GPU Hash Attack', speed: '10 Billion/s', guessesPerSecond: 10000000000, formattedTime: 'Instant', riskLevel: 'critical' },
      { label: 'Quantum Supercomputer Cluster', speed: '100 Trillion/s', guessesPerSecond: 100000000000000, formattedTime: 'Instant', riskLevel: 'critical' },
    ];
  }

  // Total possible combinations = poolSize^length or 2^entropyBits
  const totalCombinations = Math.pow(2, entropyBits);
  // Average combinations to crack is half of total
  const avgCombinations = totalCombinations / 2;

  const scenarios: { label: string; speedStr: string; rate: number }[] = [
    { label: 'Online Throttled Attack', speedStr: '10 guesses/s', rate: 10 },
    { label: 'Online Unthrottled Attack', speedStr: '1,000 guesses/s', rate: 1000 },
    { label: 'Offline GPU Hash Attack', speedStr: '10 Billion/s', rate: 10000000000 },
    { label: 'Quantum Supercomputer Cluster', speedStr: '100 Trillion/s', rate: 100000000000000 }
  ];

  return scenarios.map(sc => {
    const seconds = avgCombinations / sc.rate;
    const formattedTime = formatSeconds(seconds);
    let riskLevel: 'critical' | 'warning' | 'safe' | 'invulnerable' = 'critical';

    if (seconds > 31536000000) { // 1000+ years
      riskLevel = 'invulnerable';
    } else if (seconds > 31536000) { // 1+ year
      riskLevel = 'safe';
    } else if (seconds > 3600) { // 1+ hour
      riskLevel = 'warning';
    }

    return {
      label: sc.label,
      speed: sc.speedStr,
      guessesPerSecond: sc.rate,
      formattedTime,
      riskLevel
    };
  });
}
