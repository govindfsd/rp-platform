import { filterNavByScreens } from './nav-permissions';
import { RpNavItem } from './rp-sidebar';

const nav: RpNavItem[] = [
  {
    id: 'merchants',
    label: 'Merchants',
    icon: 'store',
    children: [
      { id: 'm-list', label: 'Merchant list', icon: 'list', appRoute: 'merchants/list' },
      { id: 'm-new', label: 'New merchant', icon: 'plus', appRoute: 'merchants/new' },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'users',
    children: [{ id: 'u-roles', label: 'Roles', icon: 'shield', appRoute: 'users/roles' }],
  },
  // ungated leaf (no appRoute) — always visible
  { id: 'help', label: 'Help', icon: 'info-circle' },
];

describe('filterNavByScreens', () => {
  it('keeps only children whose appRoute is granted', () => {
    const result = filterNavByScreens(nav, ['merchants/list']);
    expect(result.map((i) => i.id)).toEqual(['merchants', 'help']);
    expect(result[0].children?.map((c) => c.id)).toEqual(['m-list']);
  });

  it('drops a group when none of its children are granted', () => {
    const result = filterNavByScreens(nav, ['merchants/new']);
    expect(result.find((i) => i.id === 'users')).toBeUndefined();
  });

  it('always keeps ungated leaves (no appRoute)', () => {
    const result = filterNavByScreens(nav, []);
    expect(result.map((i) => i.id)).toEqual(['help']);
  });

  it('accepts a Set of granted routes', () => {
    const result = filterNavByScreens(nav, new Set(['users/roles']));
    expect(result.map((i) => i.id)).toEqual(['users', 'help']);
  });

  it('does not mutate the input tree', () => {
    const before = JSON.stringify(nav);
    filterNavByScreens(nav, ['merchants/list']);
    expect(JSON.stringify(nav)).toBe(before);
  });
});
