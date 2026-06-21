import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rp-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpTextarea),
      multi: true,
    },
  ],
  template: `
    <textarea
      class="rp-textarea"
      [class.rp-textarea--invalid]="invalid()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [rows]="rows()"
      [value]="value()"
      (input)="onInput($event)"
      (blur)="onBlur()"
    ></textarea>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 12px;
        background: var(--rp-surface);
        border: 1px solid var(--rp-border-strong);
        border-radius: var(--rp-radius-md);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
        resize: vertical;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .rp-textarea:focus {
        outline: none;
        border-color: var(--rp-brand);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--rp-brand) 18%, transparent);
      }
      .rp-textarea--invalid {
        border-color: var(--rp-danger);
      }
      .rp-textarea::placeholder {
        color: var(--rp-text-subtle);
      }
    `,
  ],
})
export class RpTextarea implements ControlValueAccessor {
  readonly placeholder = input<string>('');
  readonly rows = input<number>(4);
  readonly invalid = input<boolean>(false);

  protected readonly value = signal('');
  protected readonly disabled = signal(false);

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  protected onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.value.set(value);
    this.onChange(value);
  }
  protected onBlur(): void {
    this.onTouched();
  }
}
