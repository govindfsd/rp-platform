import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Inline-SVG icon. Uses a small built-in registry (stroke icons, 24x24).
 * Swappable for the full Tabler set later without changing the API.
 * Pass a registry `name`, or a custom `paths` array of SVG path `d` strings.
 */
export const RP_ICONS: Record<string, string[]> = {
  dashboard: ['M4 4h7v7H4z', 'M13 4h7v4h-7z', 'M13 11h7v9h-7z', 'M4 14h7v6H4z'],
  invoice: [
    'M14 3v4a1 1 0 0 0 1 1h4',
    'M5 3h9l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2',
    'M9 12h6',
    'M9 16h6',
  ],
  link: [
    'M10 13a5 5 0 0 0 7 0l1-1a5 5 0 0 0-7-7l-1 1',
    'M14 11a5 5 0 0 0-7 0l-1 1a5 5 0 0 0 7 7l1-1',
  ],
  mandate: [
    'M4 9l3-3 3 3',
    'M7 6v6a4 4 0 0 0 4 4h6',
    'M20 15l-3 3-3-3',
    'M17 18v-6a4 4 0 0 0-4-4H7',
  ],
  bank: ['M3 21h18', 'M5 21V10', 'M19 21V10', 'M3 10l9-6 9 6', 'M9 21v-6h6v6'],
  settings: [
    'M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6',
    'M12 3v2M12 19v2M5 12H3M21 12h-2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18',
  ],
  users: [
    'M9 11a3 3 0 1 0 0-6a3 3 0 0 0 0 6',
    'M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1',
    'M16 5.1a3 3 0 0 1 0 5.8',
    'M21 20v-1a5 5 0 0 0-3-4.5',
  ],
  shield: ['M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z', 'M9 12l2 2 4-4'],
  chart: ['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M20 20H3'],
  bell: ['M6 10a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6', 'M10 20a2 2 0 0 0 4 0'],
  search: ['M11 4a7 7 0 1 0 0 14a7 7 0 0 0 0-14', 'M20 20l-3.5-3.5'],
  menu: ['M4 7h16M4 12h16M4 17h16'],
  x: ['M6 6l12 12M18 6L6 18'],
  check: ['M5 12l5 5L20 7'],
  plus: ['M12 5v14M5 12h14'],
  'chevron-down': ['M6 9l6 6 6-6'],
  'chevron-right': ['M9 6l6 6-6 6'],
  'arrow-left': ['M19 12H5', 'M11 6l-6 6 6 6'],
  logout: ['M9 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3', 'M16 17l5-5-5-5', 'M21 12H9'],
  eye: [
    'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7',
    'M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6',
  ],
  edit: ['M4 20h4l10-10-4-4L4 16v4', 'M13.5 6.5l4 4'],
  trash: [
    'M4 7h16',
    'M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2',
    'M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12',
  ],
  download: ['M12 4v10', 'M8 12l4 4 4-4', 'M5 19h14'],
  dots: ['M12 5v.01', 'M12 12v.01', 'M12 19v.01'],
  'alert-circle': ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18', 'M12 8v5', 'M12 16v.01'],
  'check-circle': ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18', 'M8 12l3 3 5-5'],
  'info-circle': ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18', 'M12 8v.01', 'M11 12h1v5h1'],
  'alert-triangle': ['M12 4l9 16H3z', 'M12 10v4', 'M12 17v.01'],
};

@Component({
  selector: 'rp-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
        color: inherit;
      }
    `,
  ],
})
export class RpIcon {
  readonly name = input<string>('');
  readonly size = input<number>(20);
  readonly strokeWidth = input<number>(2);
  /** Custom paths override the registry name. */
  readonly customPaths = input<string[] | null>(null);

  protected readonly paths = computed(
    () => this.customPaths() ?? RP_ICONS[this.name()] ?? []
  );
}
