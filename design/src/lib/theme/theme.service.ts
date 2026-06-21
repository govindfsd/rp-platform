import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { BrandOverride, ThemeMode } from './theme.types';

const STORAGE_KEY = 'rp-theme';

/**
 * Central theme controller for the platform.
 * - light/dark mode (persisted, respects OS preference on first load)
 * - per-tenant white-label brand override
 *
 * Reads/writes the `data-theme` attribute on <html>; semantic CSS variables
 * in theme.css switch off that attribute.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  private readonly _mode = signal<ThemeMode>(this.readInitialMode());
  readonly mode = this._mode.asReadonly();
  readonly isDark = computed(() => this._mode() === 'dark');

  constructor() {
    effect(() => {
      const mode = this._mode();
      this.doc.documentElement.setAttribute('data-theme', mode);
      try {
        this.doc.defaultView?.localStorage?.setItem(STORAGE_KEY, mode);
      } catch {
        // storage unavailable (private mode / SSR) — ignore
      }
    });
  }

  setMode(mode: ThemeMode): void {
    this._mode.set(mode);
  }

  toggle(): void {
    this._mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  /** Apply a tenant's brand colours at runtime (white-label). */
  applyBrand(brand: BrandOverride): void {
    const root = this.doc.documentElement;
    if (brand.brand) {
      root.style.setProperty('--rp-brand', brand.brand);
      root.style.setProperty('--rp-color-brand-600', brand.brand);
    }
    if (brand.brandHover) {
      root.style.setProperty('--rp-brand-hover', brand.brandHover);
    }
  }

  /** Revert to the default design-system brand. */
  clearBrand(): void {
    const root = this.doc.documentElement;
    root.style.removeProperty('--rp-brand');
    root.style.removeProperty('--rp-brand-hover');
    root.style.removeProperty('--rp-color-brand-600');
  }

  private readInitialMode(): ThemeMode {
    try {
      const saved = this.doc.defaultView?.localStorage?.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      const prefersDark = this.doc.defaultView?.matchMedia?.(
        '(prefers-color-scheme: dark)'
      ).matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }
}
