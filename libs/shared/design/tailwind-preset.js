/**
 * @rp/design Tailwind preset.
 * Tailwind utilities resolve to the CSS custom properties emitted by the token
 * pipeline (primitives.css) + semantic theme (theme.css), so utilities stay in
 * sync with light/dark mode and per-tenant brand overrides automatically.
 *
 * Usage in an app's tailwind.config.js:
 *   module.exports = { presets: [require('@rp/design/tailwind-preset')], ... }
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--rp-color-brand-50)',
          100: 'var(--rp-color-brand-100)',
          200: 'var(--rp-color-brand-200)',
          300: 'var(--rp-color-brand-300)',
          400: 'var(--rp-color-brand-400)',
          500: 'var(--rp-color-brand-500)',
          600: 'var(--rp-color-brand-600)',
          700: 'var(--rp-color-brand-700)',
          800: 'var(--rp-color-brand-800)',
          900: 'var(--rp-color-brand-900)',
          DEFAULT: 'var(--rp-brand)',
        },
        slate: {
          50: 'var(--rp-color-slate-50)',
          100: 'var(--rp-color-slate-100)',
          200: 'var(--rp-color-slate-200)',
          300: 'var(--rp-color-slate-300)',
          400: 'var(--rp-color-slate-400)',
          500: 'var(--rp-color-slate-500)',
          600: 'var(--rp-color-slate-600)',
          700: 'var(--rp-color-slate-700)',
          800: 'var(--rp-color-slate-800)',
          900: 'var(--rp-color-slate-900)',
        },
        surface: {
          DEFAULT: 'var(--rp-surface)',
          muted: 'var(--rp-surface-muted)',
          sunken: 'var(--rp-surface-sunken)',
        },
        content: {
          DEFAULT: 'var(--rp-text)',
          muted: 'var(--rp-text-muted)',
          subtle: 'var(--rp-text-subtle)',
        },
        border: {
          DEFAULT: 'var(--rp-border)',
          strong: 'var(--rp-border-strong)',
        },
        success: 'var(--rp-success)',
        warning: 'var(--rp-warning)',
        danger: 'var(--rp-danger)',
        info: 'var(--rp-info)',
      },
      borderRadius: {
        sm: 'var(--rp-radius-sm)',
        md: 'var(--rp-radius-md)',
        lg: 'var(--rp-radius-lg)',
        xl: 'var(--rp-radius-xl)',
        full: 'var(--rp-radius-full)',
      },
      boxShadow: {
        xs: 'var(--rp-shadow-xs)',
        sm: 'var(--rp-shadow-sm)',
        md: 'var(--rp-shadow-md)',
        lg: 'var(--rp-shadow-lg)',
      },
      fontFamily: {
        sans: ['var(--rp-font-family-sans)'],
        mono: ['var(--rp-font-family-mono)'],
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
    },
  },
};
