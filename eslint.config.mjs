import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          // Two independent dimensions are enforced together:
          //   type:*  — architectural layer (what a project may import)
          //   scope:* — portal ownership (no cross-portal imports)
          depConstraints: [
            // ---- type: architectural layering (arch doc §1.2) ----
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:ui',
                'type:data-access',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:feature',
              // a feature may NOT import another feature
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:data-access',
                'type:domain',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:ui',
              // presentational only — no data-access
              onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
            },
            {
              sourceTag: 'type:data-access',
              // no UI in data-access
              onlyDependOnLibsWithTags: ['type:data-access', 'type:domain', 'type:util'],
            },
            {
              sourceTag: 'type:domain',
              onlyDependOnLibsWithTags: ['type:domain', 'type:util'],
            },
            {
              sourceTag: 'type:util',
              // leaf — depends on nothing but other util
              onlyDependOnLibsWithTags: ['type:util'],
            },

            // ---- scope: portal isolation (shared is importable by all) ----
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:biller',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:biller'],
            },
            {
              sourceTag: 'scope:payer',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:payer'],
            },
            {
              sourceTag: 'scope:admin',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:admin'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
