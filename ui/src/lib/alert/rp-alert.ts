import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

export type RpAlertVariant = 'info' | 'success' | 'warning' | 'danger';

const ICON_BY_VARIANT: Record<RpAlertVariant, string> = {
  info: 'info-circle',
  success: 'check-circle',
  warning: 'alert-triangle',
  danger: 'alert-circle',
};

@Component({
  selector: 'rp-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <div [class]="classes()" role="alert">
      <span class="rp-alert__icon"><rp-icon [name]="iconName()" [size]="18" /></span>
      <div class="rp-alert__content">
        @if (heading()) {
          <p class="rp-alert__title">{{ heading() }}</p>
        }
        <div class="rp-alert__body"><ng-content /></div>
      </div>
      @if (dismissible()) {
        <button class="rp-alert__close" type="button" aria-label="Dismiss" (click)="dismiss.emit()">
          <rp-icon name="x" [size]="16" />
        </button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-alert {
        display: flex;
        gap: 10px;
        padding: 12px 14px;
        border-radius: var(--rp-radius-md);
        font-family: var(--rp-font-family-sans);
        border: 1px solid transparent;
      }
      .rp-alert__content {
        flex: 1;
        font-size: var(--rp-font-size-sm);
      }
      .rp-alert__title {
        margin: 0 0 2px;
        font-weight: var(--rp-font-weight-medium);
      }
      .rp-alert__body {
        color: inherit;
        opacity: 0.9;
      }
      .rp-alert__close {
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        opacity: 0.7;
        padding: 0;
      }
      .rp-alert__close:hover {
        opacity: 1;
      }
      .rp-alert--info {
        background: var(--rp-info-surface);
        color: var(--rp-info-text);
        border-color: color-mix(in srgb, var(--rp-info) 25%, transparent);
      }
      .rp-alert--success {
        background: var(--rp-success-surface);
        color: var(--rp-success-text);
        border-color: color-mix(in srgb, var(--rp-success) 25%, transparent);
      }
      .rp-alert--warning {
        background: var(--rp-warning-surface);
        color: var(--rp-warning-text);
        border-color: color-mix(in srgb, var(--rp-warning) 25%, transparent);
      }
      .rp-alert--danger {
        background: var(--rp-danger-surface);
        color: var(--rp-danger-text);
        border-color: color-mix(in srgb, var(--rp-danger) 25%, transparent);
      }
    `,
  ],
})
export class RpAlert {
  readonly variant = input<RpAlertVariant>('info');
  readonly heading = input<string>('');
  readonly dismissible = input<boolean>(false);
  readonly dismiss = output<void>();

  protected readonly iconName = computed(() => ICON_BY_VARIANT[this.variant()]);
  protected readonly classes = computed(() => `rp-alert rp-alert--${this.variant()}`);
}
