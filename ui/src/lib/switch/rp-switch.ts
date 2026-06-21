import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rp-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpSwitch),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      class="rp-switch"
      [class.rp-switch--on]="checked()"
      [disabled]="disabled()"
      (click)="toggle()"
      (blur)="onTouched()"
    >
      <span class="rp-switch__thumb"></span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-switch {
        display: inline-flex;
        align-items: center;
        width: 40px;
        height: 22px;
        padding: 2px;
        border: 0;
        border-radius: var(--rp-radius-full);
        background: var(--rp-border-strong);
        cursor: pointer;
        transition: background-color 0.18s ease;
      }
      .rp-switch:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .rp-switch--on {
        background: var(--rp-brand);
      }
      .rp-switch__thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #fff;
        transition: transform 0.18s ease;
      }
      .rp-switch--on .rp-switch__thumb {
        transform: translateX(18px);
      }
    `,
  ],
})
export class RpSwitch implements ControlValueAccessor {
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
  protected toggle(): void {
    const value = !this.checked();
    this.checked.set(value);
    this.onChange(value);
  }
}
