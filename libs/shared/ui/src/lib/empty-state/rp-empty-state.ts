import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

@Component({
  selector: 'rp-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <div class="rp-empty">
      <span class="rp-empty__icon">
        <rp-icon [name]="icon()" [size]="28" [strokeWidth]="1.5" />
      </span>
      @if (heading()) {
        <p class="rp-empty__title">{{ heading() }}</p>
      }
      @if (description()) {
        <p class="rp-empty__desc">{{ description() }}</p>
      }
      <div class="rp-empty__action">
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 8px;
        padding: 40px 20px;
        font-family: var(--rp-font-family-sans);
      }
      .rp-empty__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        border-radius: var(--rp-radius-full);
        background: var(--rp-surface-sunken);
        color: var(--rp-text-subtle);
        margin-bottom: 4px;
      }
      .rp-empty__title {
        margin: 0;
        font-size: var(--rp-font-size-lg);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-empty__desc {
        margin: 0;
        max-width: 320px;
        font-size: var(--rp-font-size-sm);
        color: var(--rp-text-muted);
      }
      .rp-empty__action {
        margin-top: 8px;
      }
    `,
  ],
})
export class RpEmptyState {
  readonly icon = input<string>('invoice');
  readonly heading = input<string>('');
  readonly description = input<string>('');
}
