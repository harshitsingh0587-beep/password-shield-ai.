export interface DiversityMetrics {
  lowercase: number;
  uppercase: number;
  digits: number;
  symbols: number;
  characterPoolSize: number;
}

export interface EntropyResult {
  bits: number;
  poolSize: number;
  length: number;
  uniquenessScore: number; // 0 to 100
  diversity: DiversityMetrics;
}

export function calculateEntropy(password: string): EntropyResult {
  if (!password) {
    return {
      bits: 0,
      poolSize: 0,
      length: 0,
      uniquenessScore: 0,
      diversity: { lowercase: 0, uppercase: 0, digits: 0, symbols: 0, characterPoolSize: 0 }
    };
  }

  let poolSize = 0;
  let lowercase = 0;
  let uppercase = 0;
  let digits = 0;
  let symbols = 0;

  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (/[a-z]/.test(char)) lowercase++;
    else if (/[A-Z]/.test(char)) uppercase++;
    else if (/[0-9]/.test(char)) digits++;
    else symbols++;
  }

  if (lowercase > 0) poolSize += 26;
  if (uppercase > 0) poolSize += 26;
  if (digits > 0) poolSize += 10;
  if (symbols > 0) poolSize += 33; // Standard special characters count

  const length = password.length;
  // Entropy E = L * log2(R)
  const bits = poolSize > 0 ? Math.round(length * Math.log2(poolSize) * 10) / 10 : 0;

  // Uniqueness score based on unique character ratio and entropy density
  const uniqueCharCount = new Set(password).size;
  const uniqueRatio = uniqueCharCount / length;
  const uniquenessScore = Math.min(100, Math.round((uniqueRatio * 60) + Math.min(40, (bits / 128) * 40)));

  return {
    bits,
    poolSize,
    length,
    uniquenessScore,
    diversity: {
      lowercase,
      uppercase,
      digits,
      symbols,
      characterPoolSize: poolSize
    }
  };
}
