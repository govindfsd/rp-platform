import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RpIcon } from '../icon/rp-icon';

/** Drag-and-drop / click file upload. Model value is the selected File[]. */
@Component({
  selector: 'rp-file-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpFileUpload),
      multi: true,
    },
  ],
  template: `
    <div
      class="rp-up"
      [class.rp-up--over]="dragOver()"
      [class.rp-up--disabled]="disabled()"
      role="button"
      tabindex="0"
      (click)="pick()"
      (keydown.enter)="pick()"
      (keydown.space)="pick(); $event.preventDefault()"
      (dragover)="onDragOver($event)"
      (dragleave)="dragOver.set(false)"
      (drop)="onDrop($event)"
    >
      <rp-icon name="upload" [size]="24" />
      <div class="rp-up__text">
        <strong>{{ label() }}</strong>
        <span>{{ hint() }}</span>
      </div>
      <input
        #input
        type="file"
        class="rp-up__native"
        [accept]="accept()"
        [multiple]="multiple()"
        [disabled]="disabled()"
        (change)="onSelect($event)"
      />
    </div>

    @if (files().length) {
      <ul class="rp-up__list">
        @for (f of files(); track f.name + f.size) {
          <li class="rp-up__item">
            <rp-icon name="file" [size]="16" />
            <span class="rp-up__name">{{ f.name }}</span>
            <span class="rp-up__size">{{ sizeText(f.size) }}</span>
            <button type="button" class="rp-up__remove" aria-label="Remove" (click)="remove(f)">
              <rp-icon name="x" [size]="15" />
            </button>
          </li>
        }
      </ul>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-up {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 22px;
        border: 1.5px dashed var(--rp-border-strong);
        border-radius: var(--rp-radius-lg);
        background: var(--rp-surface-muted);
        color: var(--rp-text-muted);
        cursor: pointer;
        text-align: center;
        transition: border-color 0.15s ease, background-color 0.15s ease;
      }
      .rp-up:hover,
      .rp-up--over {
        border-color: var(--rp-brand);
        background: var(--rp-color-brand-50);
      }
      .rp-up--disabled {
        opacity: 0.6;
        pointer-events: none;
      }
      .rp-up__text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
      }
      .rp-up__text strong {
        color: var(--rp-text);
        font-weight: var(--rp-font-weight-medium);
      }
      .rp-up__native {
        display: none;
      }
      .rp-up__list {
        list-style: none;
        margin: 10px 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .rp-up__item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        background: var(--rp-surface);
        border: 1px solid var(--rp-border);
        border-radius: var(--rp-radius-md);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
        color: var(--rp-text);
      }
      .rp-up__name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rp-up__size {
        color: var(--rp-text-muted);
        flex-shrink: 0;
      }
      .rp-up__remove {
        display: inline-flex;
        border: 0;
        background: transparent;
        color: var(--rp-text-subtle);
        cursor: pointer;
        flex-shrink: 0;
      }
      .rp-up__remove:hover {
        color: var(--rp-danger);
      }
    `,
  ],
})
export class RpFileUpload implements ControlValueAccessor {
  readonly accept = input<string>('');
  readonly multiple = input<boolean>(false);
  readonly label = input<string>('Click to upload or drag and drop');
  readonly hint = input<string>('PDF, PNG or JPG up to 10MB');
  readonly filesChange = output<File[]>();

  private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('input');
  protected readonly files = signal<File[]>([]);
  protected readonly dragOver = signal(false);
  protected readonly disabled = signal(false);

  private onChange: (value: File[]) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: File[] | null): void {
    this.files.set(value ?? []);
  }
  registerOnChange(fn: (value: File[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected pick(): void {
    this.inputEl().nativeElement.click();
  }

  protected onSelect(event: Event): void {
    const list = (event.target as HTMLInputElement).files;
    if (list) this.add(Array.from(list));
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(true);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
    const list = event.dataTransfer?.files;
    if (list) this.add(Array.from(list));
  }

  protected remove(file: File): void {
    this.commit(this.files().filter((f) => f !== file));
  }

  protected sizeText(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  }

  private add(incoming: File[]): void {
    const next = this.multiple() ? [...this.files(), ...incoming] : incoming.slice(0, 1);
    this.commit(next);
  }

  private commit(next: File[]): void {
    this.files.set(next);
    this.onChange(next);
    this.onTouched();
    this.filesChange.emit(next);
  }
}
