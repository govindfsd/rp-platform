import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Native input wrapped in a token-styled shell (no framework input control).
 * The wrapper div owns the border/background/focus ring so heights stay
 * consistent across layouts; the inner <input> is transparent.
 * Implements ControlValueAccessor so it works with Angular forms.
 */
@Component({
  selector: 'rp-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpInput),
      multi: true,
    },
  ],
  template: `
    <div
      class="rp-input"
      [class.rp-input--invalid]="invalid()"
      [class.rp-input--disabled]="disabled()"
    >
      <span class="rp-input__affix rp-input__affix--prefix">
        <ng-content select="[rp-prefix]" />
      </span>
      <input
        class="rp-input__field"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.inputmode]="inputmode() || null"
        [attr.autocomplete]="autocomplete() || null"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
      <span class="rp-input__affix rp-input__affix--suffix">
        <ng-content select="[rp-suffix]" />
      </span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-input {
        display: flex;
        align-items: center;
        min-height: 40px;
        padding: 0 12px;
        background: var(--rp-surface);
        border: 1px solid var(--rp-border-strong);
        border-radius: var(--rp-radius-md);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .rp-input:focus-within {
        border-color: var(--rp-brand);
        box-shadow: 0 0 0 3px
          color-mix(in srgb, var(--rp-brand) 18%, transparent);
      }
      .rp-input--invalid {
        border-color: var(--rp-danger);
      }
      .rp-input--invalid:focus-within {
        box-shadow: 0 0 0 3px
          color-mix(in srgb, var(--rp-danger) 18%, transparent);
      }
      .rp-input--disabled {
        background: var(--rp-surface-sunken);
        opacity: 0.7;
      }
      .rp-input__field {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
      }
      .rp-input__field::placeholder {
        color: var(--rp-text-subtle);
      }
      /* Affix slots — collapse to zero width when empty */
      .rp-input__affix {
        display: inline-flex;
        align-items: center;
        color: var(--rp-text-muted);
        white-space: nowrap;
      }
      .rp-input__affix:empty {
        display: none;
      }
      .rp-input__affix--prefix {
        margin-right: 8px;
      }
      .rp-input__affix--suffix {
        margin-left: 8px;
      }
    `,
  ],
})
export class RpInput implements ControlValueAccessor {
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly invalid = input<boolean>(false);
  readonly inputmode = input<string>('');
  readonly autocomplete = input<string>('');

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
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  protected onBlur(): void {
    this.onTouched();
  }
}
