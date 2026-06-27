import { OverlayRef } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/** Data injected into a dialog component. */
export const RP_DIALOG_DATA = new InjectionToken<unknown>('RP_DIALOG_DATA');

/** Handle to an open dialog; close it with an optional result. */
export class RpDialogRef<R = unknown> {
  private readonly _closed = new Subject<R | undefined>();
  readonly closed: Observable<R | undefined> = this._closed.asObservable();

  constructor(private readonly overlayRef: OverlayRef) {}

  close(result?: R): void {
    this._closed.next(result);
    this._closed.complete();
    this.overlayRef.dispose();
  }
}
