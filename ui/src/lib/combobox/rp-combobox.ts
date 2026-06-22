import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RpIcon } from '../icon/rp-icon';

export interface RpComboOption {
  label: string;
  value: unknown;
}

/** Searchable select (autocomplete) on a CDK overlay. Type to filter. */
@Component({
  selector: 'rp-combobox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OverlayModule, RpIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpCombobox),
      multi: true,
    },
  ],
  template: `
    <div
      class="rp-combo"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
      [class.rp-combo--invalid]="invalid()"
      [class.rp-combo--open]="open()"
    >
      <input
        class="rp-combo__field"
        type="text"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="query()"
        (input)="onInput($event)"
        (focus)="openPanel()"
        (blur)="onBlur()"
        (keydown.arrowDown)="move($event, 1)"
        (keydown.arrowUp)="move($event, -1)"
        (keydown.enter)="onEnter($event)"
        (keydown.escape)="close()"
      />
      @if (query() && !disabled()) {
        <button type="button" class="rp-combo__clear" aria-label="Clear" (click)="clear()">
          <rp-icon name="x" [size]="15" />
        </button>
      }
      <rp-icon class="rp-combo__chev" name="chevron-down" [size]="18" />
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayWidth]="triggerWidth()"
      [cdkConnectedOverlayPositions]="positions"
      (overlayOutsideClick)="close()"
    >
      <div class="rp-combo__panel" role="listbox">
        @for (opt of filtered(); track $index; let i = $index) {
          <button
            type="button"
            class="rp-combo__option"
            role="option"
            [class.rp-combo__option--highlight]="i === highlight()"
            (mousedown)="choose(opt); $event.preventDefault()"
            (mouseenter)="highlight.set(i)"
          >
            {{ opt.label }}
          </button>
        }
        @if (!filtered().length) {
          <div class="rp-combo__empty">No matches</div>
        }
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-combo {
        display: flex;
        align-items: center;
        gap: 6px;
        min-height: 40px;
        padding: 0 8px 0 12px;
        background: var(--rp-surface);
        border: 1px solid var(--rp-border-strong);
        border-radius: var(--rp-radius-md);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .rp-combo:focus-within,
      .rp-combo--open {
        border-color: var(--rp-brand);
        box-shadow: 0 0 0 3px
          color-mix(in srgb, var(--rp-brand) 18%, transparent);
      }
      .rp-combo--invalid {
        border-color: var(--rp-danger);
      }
      .rp-combo__field {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
      }
      .rp-combo__field::placeholder {
        color: var(--rp-text-subtle);
      }
      .rp-combo__clear {
        display: inline-flex;
        border: 0;
        background: transparent;
        color: var(--rp-text-subtle);
        cursor: pointer;
      }
      .rp-combo__clear:hover {
        color: var(--rp-text);
      }
      .rp-combo__chev {
        color: var(--rp-text-muted);
        flex-shrink: 0;
      }
    `,
    `
      .rp-combo__panel {
        margin-top: 4px;
        max-height: 280px;
        overflow-y: auto;
        background: var(--rp-surface);
        border: 1px solid var(--rp-border);
        border-radius: var(--rp-radius-md);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        padding: 4px;
      }
      .rp-combo__option {
        display: block;
        width: 100%;
        padding: 9px 10px;
        border: 0;
        border-radius: var(--rp-radius-sm);
        background: transparent;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
        text-align: left;
        cursor: pointer;
      }
      .rp-combo__option--highlight {
        background: var(--rp-surface-sunken);
      }
      .rp-combo__empty {
        padding: 10px;
        color: var(--rp-text-muted);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
      }
    `,
  ],
})
export class RpCombobox implements ControlValueAccessor {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly options = input<RpComboOption[]>([]);
  readonly placeholder = input<string>('Search…');
  readonly invalid = input<boolean>(false);
  readonly value = model<unknown>(null);

  protected readonly query = signal('');
  protected readonly open = signal(false);
  protected readonly disabled = signal(false);
  protected readonly highlight = signal(0);
  protected readonly triggerWidth = signal(0);

  protected readonly positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
  ];

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.options();
    return this.options().filter((o) => o.label.toLowerCase().includes(q));
  });

  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: unknown): void {
    this.value.set(value);
    const match = this.options().find((o) => o.value === value);
    this.query.set(match?.label ?? '');
  }
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.highlight.set(0);
    this.openPanel();
  }

  protected openPanel(): void {
    if (this.disabled()) return;
    this.triggerWidth.set(
      (this.host.nativeElement.firstElementChild as HTMLElement)?.offsetWidth ?? 0
    );
    this.open.set(true);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected choose(opt: RpComboOption): void {
    this.value.set(opt.value);
    this.query.set(opt.label);
    this.onChange(opt.value);
    this.onTouched();
    this.close();
  }

  protected clear(): void {
    this.value.set(null);
    this.query.set('');
    this.onChange(null);
  }

  protected onBlur(): void {
    this.onTouched();
    // Re-sync label to the committed value (discard partial typing)
    const match = this.options().find((o) => o.value === this.value());
    if (match) this.query.set(match.label);
    else if (!this.value()) this.query.set('');
  }

  protected move(event: Event, dir: number): void {
    event.preventDefault();
    if (!this.open()) {
      this.openPanel();
      return;
    }
    const count = this.filtered().length;
    if (count) this.highlight.set((this.highlight() + dir + count) % count);
  }

  protected onEnter(event: Event): void {
    event.preventDefault();
    const opt = this.filtered()[this.highlight()];
    if (opt) this.choose(opt);
  }
}
