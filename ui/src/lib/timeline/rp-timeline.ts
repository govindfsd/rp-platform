import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

export type RpTimelineVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Vertical activity timeline (payment history, mandate lifecycle, audit trail).
 *   <rp-timeline>
 *     <rp-timeline-item title="Payment received" time="10:24" icon="check"
 *        variant="success">RM 1,200 via FPX</rp-timeline-item>
 *   </rp-timeline>
 */
@Component({
  selector: 'rp-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="rp-timeline"><ng-content /></div>`,
  styles: [
    `
      :host { display: block; }
      .rp-timeline { display: flex; flex-direction: column; }
    `,
  ],
})
export class RpTimeline {}

@Component({
  selector: 'rp-timeline-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  host: { '[class]': "'rp-tli--' + variant()" },
  template: `
    <div class="rp-tli">
      <div class="rp-tli__rail">
        <span class="rp-tli__dot">
          @if (icon()) { <rp-icon [name]="icon()" [size]="13" [strokeWidth]="2.5" /> }
        </span>
        <span class="rp-tli__line"></span>
      </div>
      <div class="rp-tli__body">
        <div class="rp-tli__head">
          <span class="rp-tli__title">{{ title() }}</span>
          @if (time()) { <span class="rp-tli__time">{{ time() }}</span> }
        </div>
        <div class="rp-tli__content"><ng-content /></div>
      </div>
    </div>
  `,
  styles: [
    `
      :host { display: block; }
      .rp-tli { display: flex; gap: 12px; }
      .rp-tli__rail { display: flex; flex-direction: column; align-items: center; }
      .rp-tli__dot {
        display: inline-flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; flex-shrink: 0; border-radius: 50%;
        background: var(--rp-surface-sunken); color: var(--rp-text-muted);
        border: 2px solid var(--rp-surface);
        box-shadow: 0 0 0 1px var(--rp-border-strong);
      }
      .rp-tli__line { flex: 1; width: 2px; background: var(--rp-border); margin: 2px 0; min-height: 8px; }
      :host(:last-child) .rp-tli__line { display: none; }
      .rp-tli__body { padding-bottom: 18px; font-family: var(--rp-font-family-sans); }
      .rp-tli__head { display: flex; align-items: baseline; gap: 8px; }
      .rp-tli__title { font-size: var(--rp-font-size-sm); font-weight: var(--rp-font-weight-medium); color: var(--rp-text); }
      .rp-tli__time { font-size: var(--rp-font-size-xs); color: var(--rp-text-subtle); }
      .rp-tli__content { font-size: var(--rp-font-size-sm); color: var(--rp-text-muted); margin-top: 2px; }
      .rp-tli__content:empty { display: none; }

      :host(.rp-tli--success) .rp-tli__dot { background: var(--rp-success-surface); color: var(--rp-success); box-shadow: 0 0 0 1px var(--rp-success); }
      :host(.rp-tli--warning) .rp-tli__dot { background: var(--rp-warning-surface); color: var(--rp-warning); box-shadow: 0 0 0 1px var(--rp-warning); }
      :host(.rp-tli--danger) .rp-tli__dot { background: var(--rp-danger-surface); color: var(--rp-danger); box-shadow: 0 0 0 1px var(--rp-danger); }
      :host(.rp-tli--info) .rp-tli__dot { background: var(--rp-info-surface); color: var(--rp-info); box-shadow: 0 0 0 1px var(--rp-info); }
    `,
  ],
})
export class RpTimelineItem {
  readonly title = input<string>('');
  readonly time = input<string>('');
  readonly icon = input<string>('');
  readonly variant = input<RpTimelineVariant>('default');

  protected readonly variantClass = computed(() => this.variant());
}
