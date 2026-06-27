import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** One-time-code input: N single-char boxes with auto-advance + paste. */
@Component({
  selector: 'rp-otp-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpOtpInput),
      multi: true,
    },
  ],
  template: `
    <div class="rp-otp" (paste)="onPaste($event)">
      @for (i of slots(); track i) {
        <input
          #box
          class="rp-otp__box rp-tabular"
          [type]="mask() ? 'password' : 'text'"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          [disabled]="disabled()"
          [value]="charAt(i)"
          (input)="onInput($event, i)"
          (keydown)="onKeydown($event, i)"
          (focus)="select($event)"
        />
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-otp {
        display: inline-flex;
        gap: 8px;
      }
      .rp-otp__box {
        width: 44px;
        height: 50px;
        text-align: center;
        font-size: var(--rp-font-size-xl);
        font-family: var(--rp-font-family-sans);
        color: var(--rp-text);
        background: var(--rp-surface);
        border: 1px solid var(--rp-border-strong);
        border-radius: var(--rp-radius-md);
        outline: 0;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .rp-otp__box:focus {
        border-color: var(--rp-brand);
        box-shadow: 0 0 0 3px
          color-mix(in srgb, var(--rp-brand) 18%, transparent);
      }
      .rp-otp__box:disabled {
        background: var(--rp-surface-sunken);
        opacity: 0.7;
      }
    `,
  ],
})
export class RpOtpInput implements ControlValueAccessor {
  readonly length = input<number>(6);
  readonly mask = input<boolean>(false);

  private readonly boxes = viewChildren<ElementRef<HTMLInputElement>>('box');
  protected readonly slots = computed(() =>
    Array.from({ length: this.length() }, (_, i) => i)
  );

  protected readonly value = signal('');
  protected readonly disabled = signal(false);

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string): void {
    this.value.set((value ?? '').slice(0, this.length()));
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

  protected charAt(i: number): string {
    return this.value()[i] ?? '';
  }

  protected onInput(event: Event, i: number): void {
    const input = event.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '').slice(-1);
    const chars = this.value().padEnd(this.length(), ' ').split('');
    chars[i] = digit || ' ';
    this.commit(chars.join('').trimEnd());
    if (digit && i < this.length() - 1) this.focusBox(i + 1);
  }

  protected onKeydown(event: KeyboardEvent, i: number): void {
    if (event.key === 'Backspace' && !this.charAt(i) && i > 0) {
      this.focusBox(i - 1);
    } else if (event.key === 'ArrowLeft' && i > 0) {
      this.focusBox(i - 1);
    } else if (event.key === 'ArrowRight' && i < this.length() - 1) {
      this.focusBox(i + 1);
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') ?? '')
      .replace(/\D/g, '')
      .slice(0, this.length());
    if (!text) return;
    this.commit(text);
    this.focusBox(Math.min(text.length, this.length() - 1));
  }

  protected select(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  private commit(next: string): void {
    this.value.set(next);
    this.onChange(next);
    this.onTouched();
  }

  private focusBox(i: number): void {
    this.boxes()[i]?.nativeElement.focus();
  }
}
