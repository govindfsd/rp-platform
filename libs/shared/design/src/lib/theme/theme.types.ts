export type ThemeMode = 'light' | 'dark';

/** Per-tenant white-label overrides applied at runtime. */
export interface BrandOverride {
  /** Primary brand colour (maps to --rp-brand / --rp-color-brand-600). */
  brand?: string;
  /** Brand hover/active colour (maps to --rp-brand-hover). */
  brandHover?: string;
}
