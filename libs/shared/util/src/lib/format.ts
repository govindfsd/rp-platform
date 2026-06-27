/**
 * Locale-aware number & date formatting helpers (pure functions, usable in
 * component logic where Angular pipes can't reach). Default locale is en-MY.
 */
import { DEFAULT_LOCALE } from './money';

export interface FormatNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  /** Render as a percentage (0.25 -> "25%"). */
  percent?: boolean;
}

/** Format a number with locale grouping. Null/empty/non-finite -> "". */
export function formatNumber(
  value: number | string | null | undefined,
  options: FormatNumberOptions = {}
): string {
  const { locale = DEFAULT_LOCALE, percent = false, ...rest } = options;
  if (value == null || value === '') return '';
  const num = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(num)) return '';
  return new Intl.NumberFormat(locale, {
    style: percent ? 'percent' : 'decimal',
    ...rest,
  }).format(num);
}

export type DateInput = Date | string | number;

export interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  locale?: string;
}

/**
 * Format a date/timestamp/ISO-string. Defaults to a medium date style.
 * Null / invalid dates -> "".
 */
export function formatDate(
  value: DateInput | null | undefined,
  options: FormatDateOptions = {}
): string {
  if (value == null || value === '') return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const { locale = DEFAULT_LOCALE, ...rest } = options;
  const opts: Intl.DateTimeFormatOptions =
    Object.keys(rest).length === 0 ? { dateStyle: 'medium' } : rest;
  return new Intl.DateTimeFormat(locale, opts).format(date);
}
