import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'rp-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rp-card" [class.rp-card--flat]="flat()">
      @if (heading() || subheading()) {
        <div class="rp-card__header">
          <div>
            @if (heading()) {
              <h3 class="rp-card__title">{{ heading() }}</h3>
            }
            @if (subheading()) {
              <p class="rp-card__subtitle">{{ subheading() }}</p>
            }
          </div>
          <ng-content select="[card-actions]" />
        </div>
      }
      <div class="rp-card__body">
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-card {
        background: var(--rp-surface);
        border: 1px solid var(--rp-border);
        border-radius: var(--rp-radius-lg);
        box-shadow: var(--rp-shadow-xs);
      }
      .rp-card--flat {
        box-shadow: none;
      }
      .rp-card__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 16px 20px;
        border-bottom: 1px solid var(--rp-border);
      }
      .rp-card__title {
        margin: 0;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-lg);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-card__subtitle {
        margin: 2px 0 0;
        font-size: var(--rp-font-size-sm);
        color: var(--rp-text-muted);
      }
      .rp-card__body {
        padding: 20px;
      }
    `,
  ],
})
export class RpCard {
  readonly heading = input<string>('');
  readonly subheading = input<string>('');
  readonly flat = input<boolean>(false);
}
