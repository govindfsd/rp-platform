import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type RpButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type RpButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'rp-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.rp-button-host--full]': 'full()',
  },
  template: `
    <button [type]="type()" [disabled]="disabled() || loading()" [class]="classes()">
      @if (loading()) {
        <span class="rp-btn__spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      :host(.rp-button-host--full) {
        display: flex;
        width: 100%;
      }
      .rp-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-family: var(--rp-font-family-sans);
        font-weight: var(--rp-font-weight-medium);
        border-radius: var(--rp-radius-md);
        border: 1px solid transparent;
        cursor: pointer;
        white-space: nowrap;
        transition: background-color 0.15s ease, border-color 0.15s ease,
          opacity 0.15s ease, filter 0.15s ease;
      }
      .rp-btn:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px
          color-mix(in srgb, var(--rp-brand) 30%, transparent);
      }
      .rp-btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      .rp-btn--sm {
        height: 32px;
        padding: 0 12px;
        font-size: var(--rp-font-size-sm);
      }
      .rp-btn--md {
        height: 40px;
        padding: 0 16px;
        font-size: var(--rp-font-size-base);
      }
      .rp-btn--lg {
        height: 48px;
        padding: 0 20px;
        font-size: var(--rp-font-size-lg);
      }
      .rp-btn--full {
        width: 100%;
      }
      .rp-btn--primary {
        background: var(--rp-brand);
        color: var(--rp-text-on-brand);
      }
      .rp-btn--primary:hover:not(:disabled) {
        background: var(--rp-brand-hover);
      }
      .rp-btn--secondary {
        background: var(--rp-surface);
        color: var(--rp-text);
        border-color: var(--rp-border-strong);
      }
      .rp-btn--secondary:hover:not(:disabled) {
        background: var(--rp-surface-sunken);
      }
      .rp-btn--ghost {
        background: transparent;
        color: var(--rp-brand);
      }
      .rp-btn--ghost:hover:not(:disabled) {
        background: var(--rp-surface-sunken);
      }
      .rp-btn--danger {
        background: var(--rp-danger);
        color: #fff;
      }
      .rp-btn--danger:hover:not(:disabled) {
        filter: brightness(0.95);
      }
      .rp-btn__spinner {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-top-color: transparent;
        animation: rp-spin 0.6s linear infinite;
      }
      @keyframes rp-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class RpButton {
  readonly variant = input<RpButtonVariant>('primary');
  readonly size = input<RpButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly full = input(false);

  protected readonly classes = computed(() =>
    [
      'rp-btn',
      `rp-btn--${this.variant()}`,
      `rp-btn--${this.size()}`,
      this.full() ? 'rp-btn--full' : '',
    ]
      .filter(Boolean)
      .join(' ')
  );
}
