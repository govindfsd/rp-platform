import { RpMoneyPipe } from './money.pipe';

const norm = (s: string) => s.replace(/\s/g, ' ');

describe('RpMoneyPipe', () => {
  const pipe = new RpMoneyPipe();

  it('formats major-unit values by default', () => {
    expect(norm(pipe.transform(1234.5))).toContain('1,234.50');
  });

  it('passes options through to formatMoney', () => {
    expect(norm(pipe.transform(123450, { minor: true }))).toContain('1,234.50');
    expect(norm(pipe.transform(1234.5, { currency: 'USD', locale: 'en-US' }))).toBe(
      '$1,234.50'
    );
  });

  it('returns "" for nullish input', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});
