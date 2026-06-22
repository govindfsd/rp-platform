import {
  Overlay,
  OverlayRef,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Popover — a richer overlay than a tooltip (filters, info cards, forms).
 *   <button [rpPopoverTrigger]="filters">Filter</button>
 *   <rp-popover #filters> …content… </rp-popover>
 */
@Component({
  selector: 'rp-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template>
      <div class="rp-popover" role="dialog" [style.width]="width()">
        <ng-content />
      </div>
    </ng-template>
  `,
  styles: [
    `
      .rp-popover {
        background: var(--rp-surface);
        border: 1px solid var(--rp-border);
        border-radius: var(--rp-radius-md);
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.14);
        padding: 14px;
        font-family: var(--rp-font-family-sans);
        color: var(--rp-text);
      }
    `,
  ],
})
export class RpPopover {
  readonly templateRef = viewChild.required(TemplateRef);
  readonly width = input<string>('280px');
  readonly closed = output<void>();
}

@Directive({
  selector: '[rpPopoverTrigger]',
  host: {
    '[attr.aria-haspopup]': "'dialog'",
    '[attr.aria-expanded]': 'isOpen()',
    '(click)': 'toggle()',
    '(keydown.escape)': 'close()',
  },
})
export class RpPopoverTrigger implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly popover = input.required<RpPopover>({ alias: 'rpPopoverTrigger' });

  protected readonly isOpen = signal(false);
  private overlayRef: OverlayRef | null = null;
  private sub: Subscription | null = null;

  private readonly positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 6 },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 6 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -6 },
  ];

  protected toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.isOpen()) return;
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions(this.positions)
        .withPush(true),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
    this.overlayRef.attach(
      new TemplatePortal(this.popover().templateRef(), this.viewContainerRef)
    );
    this.isOpen.set(true);
    this.sub = new Subscription();
    this.sub.add(this.overlayRef.backdropClick().subscribe(() => this.close()));
    this.sub.add(this.popover().closed.subscribe(() => this.close()));
  }

  close(): void {
    if (!this.isOpen()) return;
    this.sub?.unsubscribe();
    this.sub = null;
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.isOpen.set(false);
  }

  ngOnDestroy(): void {
    this.close();
  }
}
