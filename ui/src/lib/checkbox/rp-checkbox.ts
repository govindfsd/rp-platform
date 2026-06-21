import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RpIcon } from '../icon/rp-icon';

@Component({
  selector: 'rp-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpCheckbox),
      multi: true,
    },
  ],
  template: `
    <label class="rp-checkbox" [class.rp-checkbox--disabled]="disabled()">
      <span class="rp-checkbox__box" [class.rp-checkbox__box--checked]="checked()">
        @if (checked()) {
          <rp-icon name="check" [size]="14" [strokeWidth]="3" />
        }
      </span>
      <input
        type="checkbox"
        class="rp-checkbox__native"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="toggle($event)"
        (blur)="onTouched()"
      />
      <ng-content />
    </label>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-checkbox {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
        user-select: none;
      }
      .rp-checkbox--disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .rp-checkbox__native {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      .rp-checkbox__box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 1px solid var(--rp-border-strong);
        border-radius: var(--rp-radius-sm);
        background: var(--rp-surface);
        color: var(--rp-text-on-brand);
        transition: background-color 0.12s ease, border-color 0.12s ease;
      }
      .rp-checkbox__box--checked {
        background: var(--rp-brand);
        border-color: var(--rp-brand);
      }
      .rp-checkbox__native:focus-visible + .rp-checkbox__box {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--rp-brand) 25%, transparent);
      }
    `,
  ],
})
export class RpCheckbox implements ControlValueAccessor {
  protected readonly checked = signal(false);
  protected readonly disabled = signal(false);

  private onChange: (value: boolean) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  protected toggle(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.checked.set(value);
    this.onChange(value);
  }
}
