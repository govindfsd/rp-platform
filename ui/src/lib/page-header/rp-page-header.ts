import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'rp-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="rp-pageheader">
      <div class="rp-pageheader__text">
        <h1 class="rp-pageheader__title">{{ heading() }}</h1>
        @if (subheading()) {
          <p class="rp-pageheader__subtitle">{{ subheading() }}</p>
        }
      </div>
      <div class="rp-pageheader__actions">
        <ng-content />
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-pageheader {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        padding-bottom: 16px;
      }
      .rp-pageheader__title {
        margin: 0;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-2xl);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-pageheader__subtitle {
        margin: 4px 0 0;
        font-size: var(--rp-font-size-sm);
        color: var(--rp-text-muted);
      }
      .rp-pageheader__actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `,
  ],
})
export class RpPageHeader {
  readonly heading = input<string>('');
  readonly subheading = input<string>('');
}
