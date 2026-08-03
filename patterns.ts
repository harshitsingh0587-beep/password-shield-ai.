// Pattern recognition for keyboard spatial walks, sequential chars, repetition, and years

const KEYBOARD_ROWS = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
  '1234567890',
  '~!@#$%^&*()_+'
];

export interface PatternCheckResult {
  hasSequential: boolean;
  hasRepeated: boolean;
  hasKeyboardPattern: boolean;
  hasYearPattern: boolean;
  detectedPatterns: string[];
}

export function detectPatterns(password: string): PatternCheckResult {
  const lower = password.toLowerCase();
  const detectedPatterns: string[] = [];

  // 1. Repeated character detection (3 or more same consecutive chars e.g. "aaa", "111")
  let hasRepeated = false;
  if (/(.)\1{2,}/i.test(password)) {
    hasRepeated = true;
    detectedPatterns.push('Repeated character sequence detected (e.g. "aaa", "111")');
  }

  // 2. Sequential character detection (e.g. "1234", "abcd", "dcba", "4321")
  let hasSequential = false;
  const sequentialRegex = /(0123|1234|2345|3456|4567|5678|6789|7890|abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz)/i;
  const reverseSeqRegex = /(3210|4321|5432|6543|7654|8765|9876|dcba|edcb|fedc|gfed|hgfe|ihgf|jihg|kjih|lkji|mlkj|nmlk|onml|ponm|qpon|rqpo|srqp|tsrq|utsr|vuts|wvut|xwvu|yxwv|zyxw)/i;

  if (sequentialRegex.test(lower) || reverseSeqRegex.test(lower)) {
    hasSequential = true;
    detectedPatterns.push('Sequential character run detected (e.g. "1234", "abcd", "dcba")');
  }

  // 3. Keyboard spatial pattern detection
  let hasKeyboardPattern = false;
  for (const row of KEYBOARD_ROWS) {
    for (let i = 0; i <= row.length - 4; i++) {
      const sub = row.substring(i, i + 4);
      const revSub = sub.split('').reverse().join('');
      if (lower.includes(sub) || lower.includes(revSub)) {
        hasKeyboardPattern = true;
        detectedPatterns.push(`Keyboard pattern detected: "${sub}"`);
        break;
      }
    }
    if (hasKeyboardPattern) break;
  }

  // 4. Year pattern detection (1900 - 2029)
  let hasYearPattern = false;
  const yearMatch = lower.match(/(19[5-9]\d|20[0-2]\d)/);
  if (yearMatch) {
    hasYearPattern = true;
    detectedPatterns.push(`Calendar year detected: "${yearMatch[0]}"`);
  }

  return {
    hasSequential,
    hasRepeated,
    hasKeyboardPattern,
    hasYearPattern,
    detectedPatterns
  };
}
