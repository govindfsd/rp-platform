import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  effect,
  input,
  viewChild,
} from '@angular/core';
import * as QRCode from 'qrcode';

export type RpQrLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * Renders a QR code (payment links, DuitNow QR payloads) onto a canvas via the
 * `qrcode` library. Colors default to the @ringgit-pay/design tokens.
 */
@Component({
  selector: 'rp-qr-code',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="rp-qr" role="img" [attr.aria-label]="ariaLabel()"></canvas>`,
  styles: [
    `
      :host { display: inline-block; line-height: 0; }
      .rp-qr { border-radius: var(--rp-radius-sm); }
    `,
  ],
})
export class RpQrCode {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  readonly value = input<string>('');
  readonly size = input<number>(176);
  readonly level = input<RpQrLevel>('M');
  readonly margin = input<number>(1);
  readonly ariaLabel = input<string>('QR code');
  /** Override module/background colors; defaults read from design tokens. */
  readonly dark = input<string>('');
  readonly light = input<string>('');

  constructor() {
    let ready = false;
    afterNextRender(() => {
      ready = true;
      this.draw();
    });
    effect(() => {
      this.value();
      this.size();
      this.level();
      this.margin();
      this.dark();
      this.light();
      if (ready) this.draw();
    });
  }

  private cssVar(name: string, fallback: string): string {
    const v = getComputedStyle(this.canvas().nativeElement)
      .getPropertyValue(name)
      .trim();
    return v || fallback;
  }

  private draw(): void {
    const value = this.value();
    const canvas = this.canvas().nativeElement;
    if (!value) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    QRCode.toCanvas(canvas, value, {
      width: this.size(),
      margin: this.margin(),
      errorCorrectionLevel: this.level(),
      color: {
        dark: this.dark() || this.cssVar('--rp-text', '#0F172A'),
        light: this.light() || this.cssVar('--rp-surface', '#FFFFFF'),
      },
    }).catch(() => undefined);
  }
}
