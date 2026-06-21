import { formatDate, formatNumber } from './format';

const norm = (s: string) => s.replace(/\s/g, ' ');

describe('formatNumber', () => {
  it('groups with locale separators', () => {
    expect(formatNumber(1234567.89, { locale: 'en-US' })).toBe('1,234,567.89');
  });

  it('clamps fraction digits', () => {
    expect(formatNumber(3.14159, { locale: 'en-US', maximumFractionDigits: 2 })).toBe('3.14');
  });

  it('formats percentages', () => {
    expect(formatNumber(0.25, { locale: 'en-US', percent: true })).toBe('25%');
  });

  it('returns "" for null / empty / non-finite', () => {
    expect(formatNumber(null)).toBe('');
    expect(formatNumber('')).toBe('');
    expect(formatNumber('abc')).toBe('');
    expect(formatNumber(NaN)).toBe('');
  });
});

describe('formatDate', () => {
  it('formats a Date with the default medium style', () => {
    expect(formatDate(new Date('2026-06-21T00:00:00Z'), { locale: 'en-US', timeZone: 'UTC' })).toContain(
      '2026'
    );
  });

  it('accepts ISO strings and timestamps', () => {
    expect(formatDate('2026-06-21', { locale: 'en-US', timeZone: 'UTC' })).toContain('2026');
    expect(formatDate(0, { locale: 'en-US', timeZone: 'UTC' })).toContain('1970');
  });

  it('respects explicit DateTimeFormat options', () => {
    const out = norm(
      formatDate('2026-06-21', { locale: 'en-US', year: 'numeric', month: 'long', timeZone: 'UTC' })
    );
    expect(out).toBe('June 2026');
  });

  it('returns "" for null / empty / invalid dates', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate('')).toBe('');
    expect(formatDate('not-a-date')).toBe('');
  });
});
