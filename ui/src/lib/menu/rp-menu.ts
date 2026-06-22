import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

/**
 * Dropdown menu panel. Provide it to a trigger:
 *   <button [rpMenuTrigger]="menu">Actions</button>
 *   <rp-menu #menu>
 *     <button rp-menu-item (click)="view()">View</button>
 *     <div rp-menu-divider></div>
 *     <button rp-menu-item danger (click)="del()">Delete</button>
 *   </rp-menu>
 */
@Component({
  selector: 'rp-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template>
      <div class="rp-menu" role="menu" [style.min-width]="width()">
        <ng-content />
      </div>
    </ng-template>
  `,
  styles: [
    `
      .rp-menu {
        background: var(--rp-surface);
        border: 1px solid var(--rp-border);
        border-radius: var(--rp-radius-md);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        padding: 4px;
        font-family: var(--rp-font-family-sans);
      }
    `,
  ],
})
export class RpMenu {
  readonly templateRef = viewChild.required(TemplateRef);
  readonly width = input<string>('200px');
  readonly closed = output<void>();

  /** Called by menu items (and the trigger) to dismiss the panel. */
  emitClose(): void {
    this.closed.emit();
  }
}

@Component({
  selector: 'button[rp-menu-item]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitem',
    type: 'button',
    class: 'rp-menu-item',
    '[class.rp-menu-item--danger]': 'danger()',
    '(click)': 'onClick()',
  },
  template: `
    <span class="rp-menu-item__icon"><ng-content select="[rp-menu-icon]" /></span>
    <ng-content />
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        gap: 9px;
        width: 100%;
        padding: 8px 10px;
        border: 0;
        border-radius: var(--rp-radius-sm);
        background: transparent;
        color: var(--rp-text);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        text-align: left;
        cursor: pointer;
        transition: background-color 0.1s ease;
      }
      :host(:hover) {
        background: var(--rp-surface-sunken);
      }
      :host(:disabled) {
        opacity: 0.5;
        cursor: not-allowed;
      }
      :host(.rp-menu-item--danger) {
        color: var(--rp-danger-text);
      }
      :host(.rp-menu-item--danger:hover) {
        background: var(--rp-danger-surface);
      }
      .rp-menu-item__icon {
        display: inline-flex;
        color: var(--rp-text-muted);
      }
      .rp-menu-item__icon:empty {
        display: none;
      }
    `,
  ],
})
export class RpMenuItem {
  private readonly menu = inject(RpMenu, { optional: true });
  readonly danger = input(false, { transform: Boolean });
  readonly keepOpen = input(false, { transform: Boolean });

  protected onClick(): void {
    if (!this.keepOpen()) this.menu?.emitClose();
  }
}

@Component({
  selector: '[rp-menu-divider]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'separator' },
  template: '',
  styles: [
    `
      :host {
        display: block;
        height: 1px;
        margin: 4px 0;
        background: var(--rp-border);
      }
    `,
  ],
})
export class RpMenuDivider {}
