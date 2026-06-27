import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RpIcon } from '../icon/rp-icon';

/** Search field: leading icon, clear button, debounced `(search)` output. */
@Component({
  selector: 'rp-search-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpSearchInput),
      multi: true,
    },
  ],
  template: `
    <div class="rp-search" [class.rp-search--disabled]="disabled()">
      <rp-icon class="rp-search__icon" name="search" [size]="16" />
      <input
        class="rp-search__field"
        type="search"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
      @if (value()) {
        <button type="button" class="rp-search__clear" aria-label="Clear" (click)="clear()">
          <rp-icon name="x" [size]="15" />
        </button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-search {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 40px;
        padding: 0 8px 0 12px;
        background: var(--rp-surface);
        border: 1px solid var(--rp-border-strong);
        border-radius: var(--rp-radius-md);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .rp-search:focus-within {
        border-color: var(--rp-brand);
        box-shadow: 0 0 0 3px
          color-mix(in srgb, var(--rp-brand) 18%, transparent);
      }
      .rp-search--disabled {
        background: var(--rp-surface-sunken);
        opacity: 0.7;
      }
      .rp-search__icon {
        color: var(--rp-text-muted);
        flex-shrink: 0;
      }
      .rp-search__field {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
      }
      .rp-search__field::-webkit-search-cancel-button {
        display: none;
      }
      .rp-search__field::placeholder {
        color: var(--rp-text-subtle);
      }
      .rp-search__clear {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border: 0;
        border-radius: var(--rp-radius-sm);
        background: transparent;
        color: var(--rp-text-subtle);
        cursor: pointer;
        flex-shrink: 0;
      }
      .rp-search__clear:hover {
        color: var(--rp-text);
        background: var(--rp-surface-sunken);
      }
    `,
  ],
})
export class RpSearchInput implements ControlValueAccessor, OnDestroy {
  readonly placeholder = input<string>('Search…');
  readonly debounce = input<number>(300);
  readonly search = output<string>();

  protected readonly value = signal('');
  protected readonly disabled = signal(false);
  private timer: ReturnType<typeof setTimeout> | null = null;

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
    this.emitDebounced(v);
  }

  protected clear(): void {
    this.value.set('');
    this.onChange('');
    this.emitDebounced('');
  }

  private emitDebounced(v: string): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.search.emit(v), this.debounce());
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
