import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type RpBadgeVariant =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

@Component({
  selector: 'rp-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="classes()"><ng-content /></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-badge {
        display: inline-flex;
        align-items: center;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-xs);
        font-weight: var(--rp-font-weight-medium);
        line-height: 1.4;
        padding: 3px 10px;
        border-radius: var(--rp-radius-full);
        white-space: nowrap;
      }
      .rp-badge--neutral {
        background: var(--rp-surface-sunken);
        color: var(--rp-text-muted);
      }
      .rp-badge--brand {
        background: var(--rp-color-brand-50);
        color: var(--rp-color-brand-700);
      }
      .rp-badge--success {
        background: var(--rp-success-surface);
        color: var(--rp-success-text);
      }
      .rp-badge--warning {
        background: var(--rp-warning-surface);
        color: var(--rp-warning-text);
      }
      .rp-badge--danger {
        background: var(--rp-danger-surface);
        color: var(--rp-danger-text);
      }
      .rp-badge--info {
        background: var(--rp-info-surface);
        color: var(--rp-info-text);
      }
    `,
  ],
})
export class RpBadge {
  readonly variant = input<RpBadgeVariant>('neutral');

  protected readonly classes = computed(
    () => `rp-badge rp-badge--${this.variant()}`
  );
}
