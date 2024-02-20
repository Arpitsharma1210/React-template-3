import { tldRegex, basicEmailValidationRegex } from './tldRegex'; 

describe('Regex Tests', () => {
  it('tldRegex should match repeated characters', () => {
    const testCases = [
      '.aaa',
      '.AAA',
      '.aAa',
      '.AaA',
      '.000',
      '.111',
      '.222',
    ];

    testCases.forEach((testCase) => {
      expect(tldRegex.test(testCase)).toBe(true);
    });
  });

  it('tldRegex should not match invalid patterns', () => {
    const testCases = [
      '.aaaa',
      '.AAAA',
      '.aAAa',
      '.AaAA',
      '.0000',
      '.1111',
      '.2222',
    ];

    testCases.forEach((testCase) => {
      expect(tldRegex.test(testCase)).toBe(false);
    });
  });

  it('basicEmailValidationRegex should not match invalid email addresses', () => {
    const testCases = [
      'example@',
      '@example.com',
      'example@.com',
      'example@com',
    ];

    testCases.forEach((testCase) => {
      expect(basicEmailValidationRegex.test(testCase)).toBe(false);
    });
  });
});
