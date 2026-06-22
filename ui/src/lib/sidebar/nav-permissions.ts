import { RpNavItem } from './rp-sidebar';

/**
 * Filter a nav tree down to the items a user may see, mirroring the legacy
 * screen-level RBAC (`BackOfficeRoleScreen` → `Screen.AppRoute`).
 *
 * - A leaf is kept when it has no `appRoute` (ungated) or its `appRoute` is in
 *   `grantedRoutes`.
 * - A group is kept only when at least one of its children survives.
 *
 * Returns a new tree; the input is not mutated.
 */
export function filterNavByScreens(
  items: RpNavItem[],
  grantedRoutes: Iterable<string>
): RpNavItem[] {
  const granted = grantedRoutes instanceof Set ? grantedRoutes : new Set(grantedRoutes);

  const visit = (list: RpNavItem[]): RpNavItem[] =>
    list.reduce<RpNavItem[]>((acc, item) => {
      const children = item.children ? visit(item.children) : undefined;
      if (children && children.length) {
        acc.push({ ...item, children });
      } else if (!item.children && (!item.appRoute || granted.has(item.appRoute))) {
        acc.push(item);
      }
      return acc;
    }, []);

  return visit(items);
}
