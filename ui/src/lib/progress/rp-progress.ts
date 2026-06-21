import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'rp-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rp-progress" role="progressbar" [attr.aria-valuenow]="indeterminate() ? null : clamped()">
      <span
        class="rp-progress__fill"
        [class.rp-progress__fill--indeterminate]="indeterminate()"
        [style.width.%]="indeterminate() ? null : clamped()"
      ></span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-progress {
        width: 100%;
        height: 8px;
        background: var(--rp-surface-sunken);
        border-radius: var(--rp-radius-full);
        overflow: hidden;
      }
      .rp-progress__fill {
        display: block;
        height: 100%;
        background: var(--rp-brand);
        border-radius: var(--rp-radius-full);
        transition: width 0.25s ease;
      }
      .rp-progress__fill--indeterminate {
        width: 40%;
        animation: rp-indeterminate 1.2s ease infinite;
      }
      @keyframes rp-indeterminate {
        0% {
          margin-left: -40%;
        }
        100% {
          margin-left: 100%;
        }
      }
    `,
  ],
})
export class RpProgress {
  readonly value = input<number>(0);
  readonly indeterminate = input<boolean>(false);
  protected readonly clamped = computed(() =>
    Math.max(0, Math.min(100, this.value()))
  );
}
