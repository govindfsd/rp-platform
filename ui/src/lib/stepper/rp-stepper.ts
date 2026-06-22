import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

export interface RpStep {
  label: string;
  description?: string;
}

/**
 * Step indicator for multi-step flows (merchant onboarding wizard).
 * Presentational — the consumer renders the body for the active index.
 */
@Component({
  selector: 'rp-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  host: { '[class.rp-stepper--vertical]': "orientation() === 'vertical'" },
  template: `
    <ol class="rp-stepper">
      @for (step of steps(); track $index; let i = $index; let last = $last) {
        <li
          class="rp-step"
          [class.rp-step--complete]="i < active()"
          [class.rp-step--current]="i === active()"
          [class.rp-step--clickable]="clickable() && i <= active()"
          (click)="onStep(i)"
        >
          <span class="rp-step__marker">
            @if (i < active()) {
              <rp-icon name="check" [size]="15" [strokeWidth]="3" />
            } @else {
              {{ i + 1 }}
            }
          </span>
          <span class="rp-step__text">
            <span class="rp-step__label">{{ step.label }}</span>
            @if (step.description) {
              <span class="rp-step__desc">{{ step.description }}</span>
            }
          </span>
          @if (!last) {
            <span class="rp-step__bar"></span>
          }
        </li>
      }
    </ol>
  `,
  styles: [
    `
      :host { display: block; }
      .rp-stepper {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        font-family: var(--rp-font-family-sans);
      }
      .rp-step {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        padding-right: 8px;
      }
      .rp-step:last-child { flex: 0 0 auto; }
      .rp-step--clickable { cursor: pointer; }
      .rp-step__marker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--rp-surface-sunken);
        color: var(--rp-text-muted);
        border: 1px solid var(--rp-border-strong);
        font-size: var(--rp-font-size-sm);
        font-weight: var(--rp-font-weight-medium);
      }
      .rp-step--complete .rp-step__marker {
        background: var(--rp-brand);
        border-color: var(--rp-brand);
        color: var(--rp-text-on-brand);
      }
      .rp-step--current .rp-step__marker {
        background: var(--rp-color-brand-50);
        border-color: var(--rp-brand);
        color: var(--rp-color-brand-700);
      }
      .rp-step__text { display: flex; flex-direction: column; }
      .rp-step__label {
        font-size: var(--rp-font-size-sm);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text-muted);
        white-space: nowrap;
      }
      .rp-step--current .rp-step__label,
      .rp-step--complete .rp-step__label { color: var(--rp-text); }
      .rp-step__desc { font-size: var(--rp-font-size-xs); color: var(--rp-text-subtle); }
      .rp-step__bar {
        flex: 1;
        height: 1px;
        margin: 0 4px;
        background: var(--rp-border-strong);
      }
      .rp-step--complete .rp-step__bar { background: var(--rp-brand); }

      /* Vertical */
      :host(.rp-stepper--vertical) .rp-stepper { flex-direction: column; gap: 4px; }
      :host(.rp-stepper--vertical) .rp-step { align-items: flex-start; padding: 0 0 18px; }
      :host(.rp-stepper--vertical) .rp-step__bar {
        position: absolute;
        left: 13px;
        top: 30px;
        bottom: 2px;
        width: 1px;
        height: auto;
        flex: none;
        margin: 0;
      }
    `,
  ],
})
export class RpStepper {
  readonly steps = input<RpStep[]>([]);
  readonly active = model<number>(0);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly clickable = input<boolean>(false);
  readonly stepClick = output<number>();

  protected onStep(i: number): void {
    if (this.clickable() && i <= this.active()) {
      this.active.set(i);
      this.stepClick.emit(i);
    }
  }
}
