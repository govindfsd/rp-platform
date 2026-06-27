import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RpIcon } from '../icon/rp-icon';

export interface RpDateRange {
  start: Date | null;
  end: Date | null;
}

interface Cell {
  date: Date;
  day: number;
  outside: boolean;
  inRange: boolean;
  isStart: boolean;
  isEnd: boolean;
}

/** Date range picker — single-month calendar selecting a start/end range. */
@Component({
  selector: 'rp-date-range-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OverlayModule, RpIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpDateRangePicker),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      class="rp-dr"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
      [class.rp-dr--open]="open()"
      [disabled]="disabled()"
      (click)="toggle()"
      (keydown.escape)="close()"
      (blur)="onTouched()"
    >
      <span class="rp-dr__value" [class.rp-dr__value--placeholder]="!hasValue()">
        {{ hasValue() ? label() : placeholder() }}
      </span>
      <rp-icon name="calendar" [size]="18" class="rp-dr__icon" />
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      (overlayOutsideClick)="close()"
    >
      <div class="rp-cal" role="dialog" aria-label="Choose date range">
        <div class="rp-cal__head">
          <button type="button" class="rp-cal__nav" aria-label="Previous month" (click)="shift(-1)">
            <rp-icon name="chevron-down" [size]="18" style="transform:rotate(90deg)" />
          </button>
          <span class="rp-cal__title">{{ monthLabel() }}</span>
          <button type="button" class="rp-cal__nav" aria-label="Next month" (click)="shift(1)">
            <rp-icon name="chevron-down" [size]="18" style="transform:rotate(-90deg)" />
          </button>
        </div>
        <div class="rp-cal__grid rp-cal__grid--dow">
          @for (d of dow; track d) { <span class="rp-cal__dow">{{ d }}</span> }
        </div>
        <div class="rp-cal__grid">
          @for (c of cells(); track c.date.getTime()) {
            <button
              type="button"
              class="rp-cal__day"
              [class.rp-cal__day--outside]="c.outside"
              [class.rp-cal__day--range]="c.inRange"
              [class.rp-cal__day--edge]="c.isStart || c.isEnd"
              (click)="pick(c)"
            >{{ c.day }}</button>
          }
        </div>
        <div class="rp-cal__foot">
          <button type="button" class="rp-cal__clear" (click)="clear()">Clear</button>
          <button type="button" class="rp-cal__apply" (click)="close()">Done</button>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host { display: block; }
      .rp-dr {
        display: flex; align-items: center; gap: 8px; width: 100%; min-height: 40px;
        padding: 0 12px; background: var(--rp-surface);
        border: 1px solid var(--rp-border-strong); border-radius: var(--rp-radius-md);
        font-family: var(--rp-font-family-sans); font-size: var(--rp-font-size-base);
        color: var(--rp-text); cursor: pointer; text-align: left;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .rp-dr:focus-visible, .rp-dr--open {
        outline: 0; border-color: var(--rp-brand);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--rp-brand) 18%, transparent);
      }
      .rp-dr__value { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .rp-dr__value--placeholder { color: var(--rp-text-subtle); }
      .rp-dr__icon { color: var(--rp-text-muted); }
    `,
    `
      .rp-cal {
        margin-top: 4px; width: 280px; background: var(--rp-surface);
        border: 1px solid var(--rp-border); border-radius: var(--rp-radius-md);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12); padding: 10px;
        font-family: var(--rp-font-family-sans);
      }
      .rp-cal__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
      .rp-cal__title { font-size: var(--rp-font-size-sm); font-weight: var(--rp-font-weight-medium); color: var(--rp-text); }
      .rp-cal__nav {
        display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px;
        border: 0; border-radius: var(--rp-radius-sm); background: transparent; color: var(--rp-text-muted); cursor: pointer;
      }
      .rp-cal__nav:hover { background: var(--rp-surface-sunken); color: var(--rp-text); }
      .rp-cal__grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
      .rp-cal__grid--dow { margin-bottom: 2px; }
      .rp-cal__dow { text-align: center; font-size: var(--rp-font-size-xs); color: var(--rp-text-subtle); padding: 4px 0; }
      .rp-cal__day {
        height: 32px; border: 0; background: transparent; color: var(--rp-text);
        font-family: var(--rp-font-family-sans); font-size: var(--rp-font-size-sm); cursor: pointer;
        border-radius: var(--rp-radius-sm);
      }
      .rp-cal__day:hover { background: var(--rp-surface-sunken); }
      .rp-cal__day--outside { color: var(--rp-text-subtle); }
      .rp-cal__day--range { background: var(--rp-color-brand-50); border-radius: 0; }
      .rp-cal__day--edge { background: var(--rp-brand); color: var(--rp-text-on-brand); border-radius: var(--rp-radius-sm); }
      .rp-cal__foot { display: flex; justify-content: space-between; margin-top: 8px; border-top: 1px solid var(--rp-border); padding-top: 8px; }
      .rp-cal__clear, .rp-cal__apply {
        border: 0; background: transparent; font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm); font-weight: var(--rp-font-weight-medium);
        cursor: pointer; padding: 4px 10px; border-radius: var(--rp-radius-sm);
      }
      .rp-cal__clear { color: var(--rp-text-muted); }
      .rp-cal__clear:hover { background: var(--rp-surface-sunken); }
      .rp-cal__apply { color: var(--rp-text-on-brand); background: var(--rp-brand); }
    `,
  ],
})
export class RpDateRangePicker implements ControlValueAccessor {
  readonly placeholder = input<string>('Select date range');
  readonly locale = input<string>('en-MY');
  readonly value = model<RpDateRange>({ start: null, end: null });

  protected readonly dow = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  protected readonly open = signal(false);
  protected readonly disabled = signal(false);

  private readonly today = new Date();
  protected readonly viewYear = signal(this.today.getFullYear());
  protected readonly viewMonth = signal(this.today.getMonth());

  protected readonly positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
  ];

  protected readonly hasValue = computed(() => !!this.value().start);

  protected readonly label = computed(() => {
    const { start, end } = this.value();
    const fmt = (d: Date) =>
      new Intl.DateTimeFormat(this.locale(), { day: '2-digit', month: 'short' }).format(d);
    if (start && end) return `${fmt(start)} – ${fmt(end)}`;
    if (start) return `${fmt(start)} – …`;
    return '';
  });

  protected readonly monthLabel = computed(() =>
    new Intl.DateTimeFormat(this.locale(), { month: 'long', year: 'numeric' }).format(
      new Date(this.viewYear(), this.viewMonth(), 1)
    )
  );

  protected readonly cells = computed<Cell[]>(() => {
    const y = this.viewYear();
    const m = this.viewMonth();
    const first = new Date(y, m, 1);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(y, m, 1 - offset);
    const { start: s, end: e } = this.value();
    const out: Cell[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const t = this.stripTime(date);
      const st = s ? this.stripTime(s) : null;
      const en = e ? this.stripTime(e) : null;
      out.push({
        date,
        day: date.getDate(),
        outside: date.getMonth() !== m,
        isStart: st != null && t === st,
        isEnd: en != null && t === en,
        inRange: st != null && en != null && t > st && t < en,
      });
    }
    return out;
  });

  private onChange: (value: RpDateRange) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  writeValue(value: RpDateRange | null): void {
    this.value.set(value ?? { start: null, end: null });
  }
  registerOnChange(fn: (value: RpDateRange) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected toggle(): void {
    this.open() ? this.close() : this.open.set(true);
  }
  protected close(): void {
    this.open.set(false);
  }
  protected shift(delta: number): void {
    const d = new Date(this.viewYear(), this.viewMonth() + delta, 1);
    this.viewYear.set(d.getFullYear());
    this.viewMonth.set(d.getMonth());
  }

  protected pick(cell: Cell): void {
    const { start, end } = this.value();
    let next: RpDateRange;
    if (!start || end) {
      next = { start: cell.date, end: null }; // begin a new range
    } else if (cell.date < start) {
      next = { start: cell.date, end: start };
    } else {
      next = { start, end: cell.date };
    }
    this.value.set(next);
    this.onChange(next);
    this.onTouched();
  }

  protected clear(): void {
    const next = { start: null, end: null };
    this.value.set(next);
    this.onChange(next);
  }

  private stripTime(d: Date): number {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }
}
