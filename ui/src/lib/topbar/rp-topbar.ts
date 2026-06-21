import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'rp-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="rp-topbar">
      <div class="rp-topbar__title">
        <ng-content select="[topbar-leading]" />
        @if (heading()) {
          <span class="rp-topbar__heading">{{ heading() }}</span>
        }
      </div>
      <div class="rp-topbar__actions">
        <ng-content />
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        height: 60px;
        padding: 0 20px;
        background: var(--rp-surface);
        border-bottom: 1px solid var(--rp-border);
      }
      .rp-topbar__title {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .rp-topbar__heading {
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-lg);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-topbar__actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `,
  ],
})
export class RpTopbar {
  readonly heading = input<string>('');
}
