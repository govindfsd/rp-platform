import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'rp-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<hr class="rp-divider" [class.rp-divider--vertical]="vertical()" />`,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-divider {
        border: 0;
        border-top: 1px solid var(--rp-border);
        margin: 0;
      }
      .rp-divider--vertical {
        border-top: 0;
        border-left: 1px solid var(--rp-border);
        height: 100%;
        width: 0;
      }
    `,
  ],
})
export class RpDivider {
  readonly vertical = input<boolean>(false);
}
