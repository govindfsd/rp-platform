/**
 * Money formatting + minor/major unit conversion for the payment platform.
 *
 * Payment systems store amounts as integer **minor units** (e.g. cents) to
 * avoid floating-point rounding bugs. These helpers default to formatting a
 * major-unit decimal for ergonomics, but accept `{ minor: true }` to format
 * stored minor-unit integers, and provide explicit converters for money math.
 */

export type MoneyDisplay = 'symbol' | 'code' | 'name';

export interface FormatMoneyOptions {
  /** ISO 4217 currency code. Default 'MYR'. */
  currency?: string;
  /** BCP-47 locale. Default 'en-MY'. */
  locale?: string;
  /** How to render the currency. Default 'symbol' (e.g. "RM"). */
  display?: MoneyDisplay;
  /** Treat the input as integer minor units (e.g. cents). Default false. */
  minor?: boolean;
}

export const DEFAULT_CURRENCY = 'MYR';
export const DEFAULT_LOCALE = 'en-MY';

/** Minor-unit digits for a currency (2 for MYR/USD, 0 for JPY, 3 for KWD). */
export function minorUnitDigits(
  currency: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE
): number {
  const opts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).resolvedOptions();
  return opts.maximumFractionDigits ?? 2;
}

/** Integer minor units -> major-unit decimal (12345 -> 123.45 for MYR). */
export function minorToMajor(
  minor: number,
  currency: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE
): number {
  return minor / 10 ** minorUnitDigits(currency, locale);
}

/** Major-unit decimal -> integer minor units (123.45 -> 12345 for MYR). */
export function majorToMinor(
  major: number,
  currency: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE
): number {
  return Math.round(major * 10 ** minorUnitDigits(currency, locale));
}

/**
 * Format a monetary amount as a localized currency string.
 * - Default: `value` is a major-unit decimal — `formatMoney(1234.5)` -> "RM 1,234.50".
 * - `{ minor: true }`: `value` is integer minor units — `formatMoney(123450, { minor: true })` -> "RM 1,234.50".
 * - Null / undefined / empty / non-finite -> "".
 */
export function formatMoney(
  value: number | string | null | undefined,
  options: FormatMoneyOptions = {}
): string {
  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    display = 'symbol',
    minor = false,
  } = options;

  if (value == null || value === '') return '';
  const num = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(num)) return '';

  const amount = minor ? minorToMajor(num, currency, locale) : num;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: display,
  }).format(amount);
}
