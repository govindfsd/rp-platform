import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

/**
 * Slide-over side sheet for detail/edit panels. Fixed to the viewport.
 *   <rp-drawer [(open)]="editing" title="Edit merchant" side="right">
 *     …form…
 *     <div rp-drawer-footer> <rp-button>Save</rp-button> </div>
 *   </rp-drawer>
 */
@Component({
  selector: 'rp-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  host: { '(keydown.escape)': 'open.set(false)' },
  template: `
    <div
      class="rp-drawer__overlay"
      [class.rp-drawer__overlay--open]="open()"
      aria-hidden="true"
      (click)="open.set(false)"
    ></div>

    <aside
      class="rp-drawer"
      [class.rp-drawer--open]="open()"
      [class.rp-drawer--left]="side() === 'left'"
      [style.width]="width()"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="title()"
    >
      <header class="rp-drawer__head">
        <span class="rp-drawer__title">{{ title() }}</span>
        <button
          type="button"
          class="rp-drawer__close"
          aria-label="Close"
          (click)="open.set(false)"
        >
          <rp-icon name="x" [size]="20" />
        </button>
      </header>

      <div class="rp-drawer__body">
        <ng-content />
      </div>

      <footer class="rp-drawer__foot">
        <ng-content select="[rp-drawer-footer]" />
      </footer>
    </aside>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .rp-drawer__overlay {
        position: fixed;
        inset: 0;
        z-index: 300;
        background: rgba(15, 23, 42, 0);
        pointer-events: none;
        transition: background 0.25s ease;
      }
      .rp-drawer__overlay--open {
        background: rgba(15, 23, 42, 0.42);
        pointer-events: auto;
      }
      .rp-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 301;
        max-width: 92vw;
        display: flex;
        flex-direction: column;
        background: var(--rp-surface);
        box-shadow: -2px 0 24px rgba(0, 0, 0, 0.16);
        transform: translateX(100%);
        transition: transform 0.26s ease;
      }
      .rp-drawer--left {
        right: auto;
        left: 0;
        transform: translateX(-100%);
        box-shadow: 2px 0 24px rgba(0, 0, 0, 0.16);
      }
      .rp-drawer--open {
        transform: translateX(0);
      }
      .rp-drawer__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 12px 14px 20px;
        border-bottom: 1px solid var(--rp-border);
        flex-shrink: 0;
      }
      .rp-drawer__title {
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-lg);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-drawer__close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border: 0;
        border-radius: var(--rp-radius-sm);
        background: transparent;
        color: var(--rp-text-muted);
        cursor: pointer;
      }
      .rp-drawer__close:hover {
        background: var(--rp-surface-sunken);
        color: var(--rp-text);
      }
      .rp-drawer__body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      .rp-drawer__foot {
        flex-shrink: 0;
      }
      .rp-drawer__foot:has([rp-drawer-footer]) {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 14px 20px;
        border-top: 1px solid var(--rp-border);
      }
    `,
  ],
})
export class RpDrawer {
  readonly open = model<boolean>(false);
  readonly side = input<'right' | 'left'>('right');
  readonly title = input<string>('');
  readonly width = input<string>('440px');

  protected readonly isLeft = computed(() => this.side() === 'left');
}
