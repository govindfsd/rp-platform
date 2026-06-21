import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'rp-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span
    class="rp-spinner"
    role="status"
    aria-label="Loading"
    [style.width.px]="size()"
    [style.height.px]="size()"
  ></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-spinner {
        display: inline-block;
        border-radius: 50%;
        border: 2px solid var(--rp-border-strong);
        border-top-color: var(--rp-brand);
        animation: rp-spin 0.6s linear infinite;
      }
      @keyframes rp-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class RpSpinner {
  readonly size = input<number>(20);
}
