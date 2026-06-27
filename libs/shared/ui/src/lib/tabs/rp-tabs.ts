import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

export interface RpTabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'rp-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rp-tabs" role="tablist">
      @for (tab of tabs(); track tab.id) {
        <button
          class="rp-tabs__tab"
          role="tab"
          type="button"
          [class.rp-tabs__tab--active]="tab.id === active()"
          [attr.aria-selected]="tab.id === active()"
          (click)="active.set(tab.id)"
        >
          {{ tab.label }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-tabs {
        display: flex;
        gap: 4px;
        border-bottom: 1px solid var(--rp-border);
      }
      .rp-tabs__tab {
        position: relative;
        border: 0;
        background: transparent;
        padding: 10px 14px;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text-muted);
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }
      .rp-tabs__tab:hover {
        color: var(--rp-text);
      }
      .rp-tabs__tab--active {
        color: var(--rp-brand);
        border-bottom-color: var(--rp-brand);
        font-weight: var(--rp-font-weight-medium);
      }
    `,
  ],
})
export class RpTabs {
  readonly tabs = input<RpTabItem[]>([]);
  readonly active = model<string>('');
}
