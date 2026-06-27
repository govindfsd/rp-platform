import {
  formatMoney,
  majorToMinor,
  minorToMajor,
  minorUnitDigits,
} from './money';

/** Normalise non-breaking spaces so assertions are ICU-version stable. */
const norm = (s: string) => s.replace(/\s/g, ' ');

describe('money', () => {
  describe('formatMoney', () => {
    it('formats a major-unit decimal as MYR by default', () => {
      const out = norm(formatMoney(1234.5));
      expect(out).toContain('RM');
      expect(out).toContain('1,234.50');
    });

    it('formats integer minor units when { minor: true }', () => {
      expect(norm(formatMoney(123450, { minor: true }))).toContain('1,234.50');
    });

    it('honours a currency + locale override', () => {
      const out = norm(formatMoney(1234.5, { currency: 'USD', locale: 'en-US' }));
      expect(out).toBe('$1,234.50');
    });

    it('supports currency code display', () => {
      expect(norm(formatMoney(10, { display: 'code' }))).toContain('MYR');
    });

    it('formats negative and zero amounts', () => {
      expect(norm(formatMoney(-5))).toContain('5.00');
      expect(norm(formatMoney(-5))).toContain('-');
      expect(norm(formatMoney(0))).toContain('0.00');
    });

    it('parses numeric strings', () => {
      expect(norm(formatMoney('1234.5'))).toContain('1,234.50');
    });

    it('returns "" for null / undefined / empty / non-finite', () => {
      expect(formatMoney(null)).toBe('');
      expect(formatMoney(undefined)).toBe('');
      expect(formatMoney('')).toBe('');
      expect(formatMoney('abc')).toBe('');
      expect(formatMoney(Infinity)).toBe('');
    });
  });

  describe('unit conversion', () => {
    it('reports minor-unit digits per currency', () => {
      expect(minorUnitDigits('MYR')).toBe(2);
      expect(minorUnitDigits('JPY', 'ja-JP')).toBe(0);
    });

    it('converts minor <-> major round-trip', () => {
      expect(minorToMajor(12345)).toBe(123.45);
      expect(majorToMinor(123.45)).toBe(12345);
    });

    it('majorToMinor rounds to the nearest minor unit', () => {
      expect(majorToMinor(9.999)).toBe(1000);
      expect(majorToMinor(2.004)).toBe(200);
    });

    it('handles zero-decimal currencies', () => {
      expect(majorToMinor(1000, 'JPY', 'ja-JP')).toBe(1000);
      expect(minorToMajor(1000, 'JPY', 'ja-JP')).toBe(1000);
    });
  });
});
