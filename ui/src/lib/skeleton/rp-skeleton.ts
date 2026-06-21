import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'rp-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span
    class="rp-skeleton"
    [style.width]="width()"
    [style.height]="height()"
    [style.borderRadius]="radius()"
  ></span>`,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-skeleton {
        display: block;
        background: linear-gradient(
          90deg,
          var(--rp-surface-sunken) 25%,
          var(--rp-surface-muted) 37%,
          var(--rp-surface-sunken) 63%
        );
        background-size: 400% 100%;
        animation: rp-shimmer 1.4s ease infinite;
      }
      @keyframes rp-shimmer {
        0% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }
    `,
  ],
})
export class RpSkeleton {
  readonly width = input<string>('100%');
  readonly height = input<string>('16px');
  readonly radius = input<string>('var(--rp-radius-sm)');
}
