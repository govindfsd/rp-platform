import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

export type RpTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/** Internal tooltip bubble rendered into the overlay. */
@Component({
  selector: 'rp-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="rp-tooltip" role="tooltip">{{ text() }}</div>`,
  styles: [
    `
      .rp-tooltip {
        max-width: 240px;
        margin: 6px;
        padding: 6px 10px;
        background: var(--rp-color-slate-900);
        color: #fff;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-xs);
        line-height: 1.4;
        border-radius: var(--rp-radius-sm);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
        pointer-events: none;
      }
    `,
  ],
})
export class RpTooltipComponent {
  readonly text = signal('');
}

const POSITIONS: Record<RpTooltipPosition, ConnectedPosition> = {
  top: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
  bottom: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
  left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
  right: { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
};

@Directive({
  selector: '[rpTooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
    '(click)': 'hide()',
  },
})
export class RpTooltip implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly positionBuilder = inject(OverlayPositionBuilder);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly rpTooltip = input<string>('');
  readonly rpTooltipPosition = input<RpTooltipPosition>('top');
  readonly rpTooltipDelay = input<number>(120);

  private overlayRef: OverlayRef | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;

  protected readonly disabled = computed(() => !this.rpTooltip().trim());

  protected show(): void {
    if (this.disabled() || this.overlayRef?.hasAttached()) return;
    this.timer = setTimeout(() => this.attach(), this.rpTooltipDelay());
  }

  protected hide(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.overlayRef?.detach();
  }

  private attach(): void {
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        POSITIONS[this.rpTooltipPosition()],
        POSITIONS.top,
        POSITIONS.bottom,
      ]);

    this.overlayRef ??= this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const ref = this.overlayRef.attach(new ComponentPortal(RpTooltipComponent));
    ref.instance.text.set(this.rpTooltip());
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
    if (this.timer) clearTimeout(this.timer);
  }
}
