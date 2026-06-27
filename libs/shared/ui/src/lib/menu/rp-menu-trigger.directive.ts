import {
  Overlay,
  OverlayRef,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RpMenu } from './rp-menu';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
];

@Directive({
  selector: '[rpMenuTrigger]',
  host: {
    '[attr.aria-haspopup]': "'menu'",
    '[attr.aria-expanded]': 'isOpen()',
    '(click)': 'toggle()',
    '(keydown.escape)': 'close()',
  },
})
export class RpMenuTrigger implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly menu = input.required<RpMenu>({ alias: 'rpMenuTrigger' });

  protected readonly isOpen = signal(false);
  private overlayRef: OverlayRef | null = null;
  private sub: Subscription | null = null;

  protected toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.isOpen()) return;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(POSITIONS)
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(
      this.menu().templateRef(),
      this.viewContainerRef
    );
    this.overlayRef.attach(portal);
    this.isOpen.set(true);

    this.sub = new Subscription();
    this.sub.add(this.overlayRef.backdropClick().subscribe(() => this.close()));
    this.sub.add(this.menu().closed.subscribe(() => this.close()));
  }

  close(): void {
    if (!this.isOpen()) return;
    this.sub?.unsubscribe();
    this.sub = null;
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.isOpen.set(false);
  }

  ngOnDestroy(): void {
    this.close();
  }
}
