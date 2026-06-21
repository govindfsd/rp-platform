import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { input } from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

@Component({
  selector: 'rp-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <span class="rp-chip">
      <ng-content />
      @if (removable()) {
        <button
          class="rp-chip__remove"
          type="button"
          aria-label="Remove"
          (click)="remove.emit()"
        >
          <rp-icon name="x" [size]="14" />
        </button>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        background: var(--rp-surface-sunken);
        color: var(--rp-text);
        border-radius: var(--rp-radius-full);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
      }
      .rp-chip__remove {
        display: inline-flex;
        align-items: center;
        border: 0;
        background: transparent;
        color: var(--rp-text-muted);
        cursor: pointer;
        padding: 0;
      }
      .rp-chip__remove:hover {
        color: var(--rp-text);
      }
    `,
  ],
})
export class RpChip {
  readonly removable = input<boolean>(false);
  readonly remove = output<void>();
}
