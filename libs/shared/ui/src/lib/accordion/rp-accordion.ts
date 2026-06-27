import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  input,
  signal,
} from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

/**
 * Accordion container. Set [multi]="true" to allow several panels open at once.
 *   <rp-accordion>
 *     <rp-accordion-panel title="Business details"> … </rp-accordion-panel>
 *   </rp-accordion>
 */
@Component({
  selector: 'rp-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="rp-accordion"><ng-content /></div>`,
  styles: [
    `
      :host { display: block; }
      .rp-accordion {
        border: 1px solid var(--rp-border);
        border-radius: var(--rp-radius-lg);
        overflow: hidden;
      }
    `,
  ],
})
export class RpAccordion {
  readonly multi = input<boolean>(false);

  private readonly panels = new Set<RpAccordionPanel>();

  register(panel: RpAccordionPanel): void {
    this.panels.add(panel);
  }
  unregister(panel: RpAccordionPanel): void {
    this.panels.delete(panel);
  }
  /** Called when a panel opens — closes the rest unless multi. */
  notifyOpened(opened: RpAccordionPanel): void {
    if (this.multi()) return;
    for (const p of this.panels) {
      if (p !== opened) p.setOpen(false);
    }
  }
}

@Component({
  selector: 'rp-accordion-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <h3 class="rp-acc__header">
      <button
        type="button"
        class="rp-acc__trigger"
        [attr.aria-expanded]="expanded()"
        (click)="toggle()"
      >
        <span class="rp-acc__title">{{ title() }}</span>
        <rp-icon
          class="rp-acc__chev"
          [class.rp-acc__chev--open]="expanded()"
          name="chevron-down"
          [size]="18"
        />
      </button>
    </h3>
    @if (expanded()) {
      <div class="rp-acc__body" role="region">
        <ng-content />
      </div>
    }
  `,
  styles: [
    `
      :host { display: block; border-top: 1px solid var(--rp-border); }
      :host:first-of-type { border-top: 0; }
      .rp-acc__header { margin: 0; }
      .rp-acc__trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 14px 16px;
        border: 0;
        background: var(--rp-surface);
        cursor: pointer;
        font-family: var(--rp-font-family-sans);
        text-align: left;
      }
      .rp-acc__trigger:hover { background: var(--rp-surface-muted); }
      .rp-acc__title {
        font-size: var(--rp-font-size-base);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-acc__chev { color: var(--rp-text-muted); transition: transform 0.2s ease; }
      .rp-acc__chev--open { transform: rotate(180deg); }
      .rp-acc__body {
        padding: 4px 16px 16px;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
      }
    `,
  ],
})
export class RpAccordionPanel implements OnDestroy {
  private readonly accordion = inject(RpAccordion, { optional: true });

  readonly title = input<string>('');
  protected readonly expanded = signal(false);

  constructor() {
    this.accordion?.register(this);
  }

  protected toggle(): void {
    this.setOpen(!this.expanded());
    if (this.expanded()) this.accordion?.notifyOpened(this);
  }

  /** Used by the accordion to close this panel. */
  setOpen(open: boolean): void {
    this.expanded.set(open);
  }

  ngOnDestroy(): void {
    this.accordion?.unregister(this);
  }
}
