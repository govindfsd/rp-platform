import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

/** Standalone pager. `page` is 1-based; total page count = ceil(total/pageSize). */
@Component({
  selector: 'rp-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <nav class="rp-pg" aria-label="Pagination">
      @if (showRange()) {
        <span class="rp-pg__range rp-tabular">{{ rangeText() }}</span>
      }
      <div class="rp-pg__pages">
        <button
          type="button"
          class="rp-pg__btn rp-pg__btn--arrow"
          aria-label="Previous page"
          [disabled]="page() <= 1"
          (click)="go(page() - 1)"
        >
          <rp-icon name="chevron-right" [size]="16" style="transform:rotate(180deg)" />
        </button>

        @for (item of items(); track $index) {
          @if (item === -1) {
            <span class="rp-pg__ellipsis">…</span>
          } @else {
            <button
              type="button"
              class="rp-pg__btn rp-tabular"
              [class.rp-pg__btn--active]="item === page()"
              [attr.aria-current]="item === page() ? 'page' : null"
              (click)="go(item)"
            >
              {{ item }}
            </button>
          }
        }

        <button
          type="button"
          class="rp-pg__btn rp-pg__btn--arrow"
          aria-label="Next page"
          [disabled]="page() >= pageCount()"
          (click)="go(page() + 1)"
        >
          <rp-icon name="chevron-right" [size]="16" />
        </button>
      </div>
    </nav>
  `,
  styles: [
    `
      :host { display: block; }
      .rp-pg {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        font-family: var(--rp-font-family-sans);
      }
      .rp-pg__range { font-size: var(--rp-font-size-sm); color: var(--rp-text-muted); }
      .rp-pg__pages { display: flex; align-items: center; gap: 4px; margin-left: auto; }
      .rp-pg__btn {
        min-width: 32px;
        height: 32px;
        padding: 0 8px;
        border: 1px solid transparent;
        border-radius: var(--rp-radius-sm);
        background: transparent;
        color: var(--rp-text);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
        cursor: pointer;
        transition: background-color 0.12s ease, border-color 0.12s ease;
      }
      .rp-pg__btn:hover:not(:disabled):not(.rp-pg__btn--active) {
        background: var(--rp-surface-sunken);
      }
      .rp-pg__btn--active {
        background: var(--rp-color-brand-50);
        border-color: var(--rp-brand);
        color: var(--rp-color-brand-700);
        font-weight: var(--rp-font-weight-medium);
      }
      .rp-pg__btn--arrow { color: var(--rp-text-muted); }
      .rp-pg__btn:disabled { opacity: 0.4; cursor: not-allowed; }
      .rp-pg__ellipsis { padding: 0 4px; color: var(--rp-text-subtle); }
    `,
  ],
})
export class RpPagination {
  readonly total = input<number>(0);
  readonly pageSize = input<number>(10);
  readonly page = model<number>(1);
  readonly showRange = input<boolean>(true);
  /** Neighbours shown either side of the current page. */
  readonly siblings = input<number>(1);

  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize()))
  );

  protected readonly rangeText = computed(() => {
    const total = this.total();
    if (!total) return '0 of 0';
    const from = (this.page() - 1) * this.pageSize() + 1;
    const to = Math.min(this.page() * this.pageSize(), total);
    return `${from}–${to} of ${total}`;
  });

  /** Page items with -1 used as an ellipsis marker. */
  protected readonly items = computed<number[]>(() => {
    const count = this.pageCount();
    const current = this.page();
    const sib = this.siblings();
    const pages = new Set<number>([1, count]);
    for (let i = current - sib; i <= current + sib; i++) {
      if (i >= 1 && i <= count) pages.add(i);
    }
    const sorted = [...pages].sort((a, b) => a - b);
    const out: number[] = [];
    let prev = 0;
    for (const p of sorted) {
      if (p - prev > 1) out.push(-1);
      out.push(p);
      prev = p;
    }
    return out;
  });

  protected go(target: number): void {
    const clamped = Math.min(this.pageCount(), Math.max(1, target));
    if (clamped !== this.page()) this.page.set(clamped);
  }
}
