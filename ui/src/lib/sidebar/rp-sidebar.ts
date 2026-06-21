import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

export interface RpNavItem {
  id: string;
  label: string;
  icon: string;
  children?: RpNavItem[];
}

@Component({
  selector: 'rp-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  host: {
    '(document:click)': 'onDocClick($event)',
    '(keydown.escape)': 'closeFlyout()',
  },
  template: `
    <aside class="rp-sidebar">
      <nav class="rp-sidebar__nav" aria-label="Main navigation">
        @for (item of items(); track item.id) {
          <button
            class="rp-sidebar__item"
            type="button"
            [class.rp-sidebar__item--active]="isActive(item)"
            [attr.aria-current]="isActive(item) ? 'page' : null"
            [attr.aria-haspopup]="item.children?.length ? 'true' : null"
            [attr.aria-expanded]="item.children?.length ? flyoutId() === item.id : null"
            [title]="item.label"
            (click)="onItemClick(item, $event)"
          >
            <rp-icon [name]="item.icon" [size]="20" />
            <span class="rp-sidebar__label">{{ item.label }}</span>
            @if (item.children?.length) {
              <span class="rp-sidebar__child-dot" aria-hidden="true"></span>
            }
          </button>
        }
      </nav>

      <div class="rp-sidebar__footer">
        <ng-content />
      </div>

      @if (flyoutItem()) {
        <div
          class="rp-sidebar__flyout"
          role="menu"
          [attr.aria-label]="flyoutItem()!.label + ' submenu'"
        >
          <div class="rp-sidebar__flyout-heading">{{ flyoutItem()!.label }}</div>
          @for (child of flyoutItem()!.children!; track child.id) {
            <button
              class="rp-sidebar__flyout-item"
              type="button"
              role="menuitem"
              [class.rp-sidebar__flyout-item--active]="child.id === active()"
              (click)="onChildClick(child, $event)"
            >
              <rp-icon [name]="child.icon" [size]="15" />
              {{ child.label }}
            </button>
          }
        </div>
      }
    </aside>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        position: relative;
        z-index: 20;
      }
      .rp-sidebar {
        width: 80px;
        height: 100%;
        background: var(--rp-surface);
        border-right: 1px solid var(--rp-border);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 0;
        box-sizing: border-box;
        position: relative;
      }
      .rp-sidebar__nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        flex: 1;
        width: 100%;
        padding: 0 6px;
      }
      .rp-sidebar__item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 68px;
        padding: 9px 4px 7px;
        border: 0;
        border-radius: 10px;
        background: transparent;
        color: var(--rp-text-muted);
        cursor: pointer;
        transition: background-color 0.12s ease, color 0.12s ease;
      }
      .rp-sidebar__item:hover {
        background: var(--rp-surface-sunken);
        color: var(--rp-text);
      }
      .rp-sidebar__item--active {
        background: var(--rp-color-brand-50);
        color: var(--rp-color-brand-600);
      }
      .rp-sidebar__item--active:hover {
        background: var(--rp-color-brand-100);
        color: var(--rp-color-brand-700);
      }
      .rp-sidebar__label {
        font-family: var(--rp-font-family-sans);
        font-size: 10.5px;
        font-weight: 500;
        text-align: center;
        line-height: 1.18;
        width: 100%;
        /* Wrap only at spaces ("Direct debit" -> 2 lines); never break a word */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow-wrap: normal;
        word-break: normal;
        min-height: 25px;
      }
      .rp-sidebar__child-dot {
        position: absolute;
        top: 7px;
        right: 7px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--rp-color-brand-400);
      }
      .rp-sidebar__footer {
        padding: 8px 6px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }
      /* Flyout sub-nav panel */
      .rp-sidebar__flyout {
        position: absolute;
        left: 80px;
        top: 0;
        bottom: 0;
        width: 190px;
        background: var(--rp-surface);
        border-right: 1px solid var(--rp-border);
        box-shadow: 4px 0 16px rgba(0, 0, 0, 0.07);
        border-radius: 0 10px 10px 0;
        display: flex;
        flex-direction: column;
        padding: 16px 0 8px;
        z-index: 100;
      }
      .rp-sidebar__flyout-heading {
        font-family: var(--rp-font-family-sans);
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--rp-text-subtle);
        padding: 0 14px 8px;
      }
      .rp-sidebar__flyout-item {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 9px 14px;
        border: 0;
        background: transparent;
        color: var(--rp-text-muted);
        font-family: var(--rp-font-family-sans);
        font-size: 13px;
        cursor: pointer;
        text-align: left;
        width: 100%;
        transition: background-color 0.1s ease, color 0.1s ease;
      }
      .rp-sidebar__flyout-item:hover {
        background: var(--rp-surface-sunken);
        color: var(--rp-text);
      }
      .rp-sidebar__flyout-item--active {
        color: var(--rp-color-brand-700);
        background: var(--rp-color-brand-50);
        font-weight: 500;
      }
      .rp-sidebar__flyout-item--active:hover {
        background: var(--rp-color-brand-100);
      }
    `,
  ],
})
export class RpSidebar {
  private readonly elRef = inject(ElementRef);

  readonly items = input<RpNavItem[]>([]);
  readonly active = model<string>('');

  protected readonly flyoutId = signal<string | null>(null);

  protected readonly flyoutItem = computed(() => {
    const id = this.flyoutId();
    if (!id) return null;
    return this.items().find((item) => item.id === id) ?? null;
  });

  protected isActive(item: RpNavItem): boolean {
    if (item.id === this.active()) return true;
    return item.children?.some((c) => c.id === this.active()) ?? false;
  }

  protected onItemClick(item: RpNavItem, event: MouseEvent): void {
    event.stopPropagation();
    if (item.children?.length) {
      this.flyoutId.set(this.flyoutId() === item.id ? null : item.id);
    } else {
      this.active.set(item.id);
      this.flyoutId.set(null);
    }
  }

  protected onChildClick(child: RpNavItem, event: MouseEvent): void {
    event.stopPropagation();
    this.active.set(child.id);
    this.flyoutId.set(null);
  }

  protected closeFlyout(): void {
    this.flyoutId.set(null);
  }

  protected onDocClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target as Node)) {
      this.flyoutId.set(null);
    }
  }
}
