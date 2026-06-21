import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

export interface RpNavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'rp-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <aside class="rp-sidebar">
      @if (brand()) {
        <div class="rp-sidebar__brand">
          <span class="rp-sidebar__logo">{{ brandInitial() }}</span>
          <span class="rp-sidebar__brandname">{{ brand() }}</span>
        </div>
      }
      <nav class="rp-sidebar__nav">
        @for (item of items(); track item.id) {
          <button
            class="rp-sidebar__item"
            type="button"
            [class.rp-sidebar__item--active]="item.id === active()"
            (click)="active.set(item.id)"
          >
            <rp-icon [name]="item.icon" [size]="20" />
            <span>{{ item.label }}</span>
          </button>
        }
      </nav>
      <div class="rp-sidebar__footer"><ng-content /></div>
    </aside>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
      .rp-sidebar {
        display: flex;
        flex-direction: column;
        width: 248px;
        height: 100%;
        background: var(--rp-surface);
        border-right: 1px solid var(--rp-border);
        padding: 12px;
        box-sizing: border-box;
      }
      .rp-sidebar__brand {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 8px 16px;
      }
      .rp-sidebar__logo {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: var(--rp-radius-md);
        background: var(--rp-brand);
        color: var(--rp-text-on-brand);
        font-family: var(--rp-font-family-sans);
        font-weight: var(--rp-font-weight-semibold);
      }
      .rp-sidebar__brandname {
        font-family: var(--rp-font-family-sans);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-sidebar__nav {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
      }
      .rp-sidebar__item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 10px;
        border: 0;
        border-radius: var(--rp-radius-md);
        background: transparent;
        color: var(--rp-text-muted);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        cursor: pointer;
        text-align: left;
        transition: background-color 0.12s ease, color 0.12s ease;
      }
      .rp-sidebar__item:hover {
        background: var(--rp-surface-sunken);
        color: var(--rp-text);
      }
      .rp-sidebar__item--active {
        background: var(--rp-color-brand-50);
        color: var(--rp-color-brand-700);
        font-weight: var(--rp-font-weight-medium);
      }
      .rp-sidebar__footer {
        padding-top: 8px;
      }
    `,
  ],
})
export class RpSidebar {
  readonly brand = input<string>('');
  readonly items = input<RpNavItem[]>([]);
  readonly active = model<string>('');

  protected brandInitial(): string {
    return this.brand().charAt(0).toUpperCase();
  }
}
