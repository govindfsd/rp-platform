import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

export type RpStatTrend = 'up' | 'down' | 'flat';

@Component({
  selector: 'rp-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <div class="rp-stat">
      <div class="rp-stat__top">
        <span class="rp-stat__label">{{ label() }}</span>
        @if (icon()) {
          <span class="rp-stat__icon"><rp-icon [name]="icon()" [size]="18" /></span>
        }
      </div>
      <div class="rp-stat__value rp-tabular">{{ value() }}</div>
      @if (delta()) {
        <div class="rp-stat__delta" [class]="'rp-stat__delta--' + trend()">
          {{ delta() }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-stat {
        background: var(--rp-surface);
        border: 1px solid var(--rp-border);
        border-radius: var(--rp-radius-lg);
        padding: 16px 18px;
      }
      .rp-stat__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .rp-stat__label {
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
        color: var(--rp-text-muted);
      }
      .rp-stat__icon {
        color: var(--rp-text-subtle);
      }
      .rp-stat__value {
        margin-top: 6px;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-2xl);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-stat__delta {
        margin-top: 4px;
        font-size: var(--rp-font-size-xs);
        font-weight: var(--rp-font-weight-medium);
      }
      .rp-stat__delta--up {
        color: var(--rp-success-text);
      }
      .rp-stat__delta--down {
        color: var(--rp-danger-text);
      }
      .rp-stat__delta--flat {
        color: var(--rp-text-muted);
      }
    `,
  ],
})
export class RpStatCard {
  readonly label = input<string>('');
  readonly value = input<string>('');
  readonly delta = input<string>('');
  readonly trend = input<RpStatTrend>('flat');
  readonly icon = input<string>('');
}
