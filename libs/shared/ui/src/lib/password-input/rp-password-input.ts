import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RpIcon } from '../icon/rp-icon';

/** Password field with a show/hide toggle. */
@Component({
  selector: 'rp-password-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpPasswordInput),
      multi: true,
    },
  ],
  template: `
    <div
      class="rp-pwd"
      [class.rp-pwd--invalid]="invalid()"
      [class.rp-pwd--disabled]="disabled()"
    >
      <input
        class="rp-pwd__field"
        [type]="visible() ? 'text' : 'password'"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.autocomplete]="autocomplete()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
      <button
        type="button"
        class="rp-pwd__toggle"
        [attr.aria-label]="visible() ? 'Hide password' : 'Show password'"
        [attr.aria-pressed]="visible()"
        (click)="visible.set(!visible())"
      >
        <rp-icon [name]="visible() ? 'eye-off' : 'eye'" [size]="18" />
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-pwd {
        display: flex;
        align-items: center;
        min-height: 40px;
        padding: 0 6px 0 12px;
        background: var(--rp-surface);
        border: 1px solid var(--rp-border-strong);
        border-radius: var(--rp-radius-md);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .rp-pwd:focus-within {
        border-color: var(--rp-brand);
        box-shadow: 0 0 0 3px
          color-mix(in srgb, var(--rp-brand) 18%, transparent);
      }
      .rp-pwd--invalid {
        border-color: var(--rp-danger);
      }
      .rp-pwd--disabled {
        background: var(--rp-surface-sunken);
        opacity: 0.7;
      }
      .rp-pwd__field {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
      }
      .rp-pwd__field::placeholder {
        color: var(--rp-text-subtle);
      }
      .rp-pwd__toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: 0;
        border-radius: var(--rp-radius-sm);
        background: transparent;
        color: var(--rp-text-muted);
        cursor: pointer;
      }
      .rp-pwd__toggle:hover {
        color: var(--rp-text);
      }
    `,
  ],
})
export class RpPasswordInput implements ControlValueAccessor {
  readonly placeholder = input<string>('');
  readonly invalid = input<boolean>(false);
  readonly autocomplete = input<string>('current-password');

  protected readonly value = signal('');
  protected readonly visible = signal(false);
  protected readonly disabled = signal(false);

  private onChange: (value: string) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

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
    const v = (event.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }
}
