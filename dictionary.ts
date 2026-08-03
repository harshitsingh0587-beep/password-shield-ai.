// Comprehensive offline dictionary of common password targets
export const TOP_COMMON_PASSWORDS = new Set([
  '123456', 'password', '123456789', '12345678', '12345', '1234567', '1234', 'qwerty',
  '111111', '123123', 'admin', 'welcome', 'login', 'p@ssword', 'p@ssw0rd', 'password123',
  'iloveyou', 'sunshine', 'princess', 'football', 'monkey', 'charlie', 'donald', 'shadow',
  'master', 'michael', 'jordan', 'superman', 'harley', 'trustno1', 'password1', '1234567890',
  'abc123', 'pass123', 'admin123', 'letmein', 'default', 'root', 'toor', 'system',
  'changeit', 'password!#', 'welcome1', 'guest', 'starwars', 'dragon', 'baseball',
  '987654321', '654321', '000000', '123321', 'asdfghjkl', 'zxcvbnm', 'qwertz', 'azerty'
]);

export const COMMON_DICTIONARY_WORDS = [
  'admin', 'access', 'secret', 'secure', 'shield', 'system', 'cyber', 'network',
  'server', 'database', 'crypto', 'shadow', 'falcon', 'matrix', 'hacker', 'vector',
  'login', 'master', 'control', 'super', 'hyper', 'digital', 'global', 'future'
];

export function checkDictionaryWord(password: string): { found: boolean; word?: string } {
  const lower = password.toLowerCase();
  
  if (TOP_COMMON_PASSWORDS.has(lower)) {
    return { found: true, word: lower };
  }

  for (const word of COMMON_DICTIONARY_WORDS) {
    if (lower.includes(word)) {
      return { found: true, word };
    }
  }

  return { found: false };
}
