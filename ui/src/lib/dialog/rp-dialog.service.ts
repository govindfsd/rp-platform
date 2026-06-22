import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RP_DIALOG_DATA, RpDialogRef } from './rp-dialog-ref';
import { RpConfirmDialog, RpConfirmData } from './rp-confirm-dialog';

export interface RpDialogConfig<D = unknown> {
  data?: D;
  width?: string;
  disableClose?: boolean;
}

/**
 * Opens themed modal dialogs on a centered CDK overlay.
 *   const ref = dialog.open(EditMerchantDialog, { data: merchant, width: '560px' });
 *   ref.closed.subscribe(result => …);
 *   const ok = await dialog.confirm({ title: 'Void transaction?', danger: true });
 */
@Injectable({ providedIn: 'root' })
export class RpDialogService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  open<T, R = unknown, D = unknown>(
    component: ComponentType<T>,
    config: RpDialogConfig<D> = {}
  ): RpDialogRef<R> {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      width: config.width,
      maxWidth: '92vw',
    });

    const dialogRef = new RpDialogRef<R>(overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: RpDialogRef, useValue: dialogRef },
        { provide: RP_DIALOG_DATA, useValue: config.data ?? null },
      ],
    });

    overlayRef.attach(new ComponentPortal(component, null, injector));

    if (!config.disableClose) {
      overlayRef.backdropClick().subscribe(() => dialogRef.close());
      overlayRef.keydownEvents().subscribe((e) => {
        if (e.key === 'Escape') dialogRef.close();
      });
    }

    return dialogRef;
  }

  /** Convenience confirm dialog → resolves true if confirmed. */
  confirm(data: RpConfirmData): Promise<boolean> {
    const ref = this.open<RpConfirmDialog, boolean, RpConfirmData>(
      RpConfirmDialog,
      { data, width: '420px' }
    );
    return firstValueFrom(ref.closed).then((r) => r === true);
  }
}
