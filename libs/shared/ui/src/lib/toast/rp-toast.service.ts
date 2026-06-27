import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject, signal } from '@angular/core';
import { RpToastContainer } from './rp-toast-container';

export type RpToastType = 'success' | 'error' | 'info' | 'warning';

export interface RpToast {
  id: number;
  type: RpToastType;
  message: string;
  action?: { label: string; run: () => void };
}

export interface RpToastOptions {
  /** Auto-dismiss after ms. 0 = sticky. Default 4000. */
  duration?: number;
  action?: { label: string; run: () => void };
}

/**
 * Global toast notifications. Inject and call:
 *   toast.success('Merchant approved');
 *   toast.error('Could not void transaction', { duration: 0 });
 */
@Injectable({ providedIn: 'root' })
export class RpToastService {
  private readonly overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;
  private seq = 0;

  readonly toasts = signal<RpToast[]>([]);

  success(message: string, opts?: RpToastOptions): void {
    this.show('success', message, opts);
  }
  error(message: string, opts?: RpToastOptions): void {
    this.show('error', message, opts);
  }
  info(message: string, opts?: RpToastOptions): void {
    this.show('info', message, opts);
  }
  warning(message: string, opts?: RpToastOptions): void {
    this.show('warning', message, opts);
  }

  show(type: RpToastType, message: string, opts?: RpToastOptions): void {
    this.ensureContainer();
    const id = ++this.seq;
    this.toasts.update((list) => [...list, { id, type, message, action: opts?.action }]);
    const duration = opts?.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private ensureContainer(): void {
    if (this.overlayRef) return;
    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy: this.overlay
        .position()
        .global()
        .top('16px')
        .right('16px'),
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    this.overlayRef.attach(new ComponentPortal(RpToastContainer));
  }
}
