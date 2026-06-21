import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type RpTagColor = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'rp-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="classes()"><ng-content /></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-tag {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        border-radius: var(--rp-radius-sm);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-xs);
        font-weight: var(--rp-font-weight-medium);
        border: 1px solid transparent;
      }
      .rp-tag--neutral {
        background: var(--rp-surface-sunken);
        color: var(--rp-text-muted);
      }
      .rp-tag--brand {
        background: var(--rp-color-brand-50);
        color: var(--rp-color-brand-700);
      }
      .rp-tag--success {
        background: var(--rp-success-surface);
        color: var(--rp-success-text);
      }
      .rp-tag--warning {
        background: var(--rp-warning-surface);
        color: var(--rp-warning-text);
      }
      .rp-tag--danger {
        background: var(--rp-danger-surface);
        color: var(--rp-danger-text);
      }
      .rp-tag--info {
        background: var(--rp-info-surface);
        color: var(--rp-info-text);
      }
    `,
  ],
})
export class RpTag {
  readonly color = input<RpTagColor>('neutral');
  protected readonly classes = computed(() => `rp-tag rp-tag--${this.color()}`);
}
