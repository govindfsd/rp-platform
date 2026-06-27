# rp-platform

Shared RinggitPay design system + utilities. Publishes to a private registry:

| Package | Path |
| --- | --- |
| `@rp/ui` | `libs/shared/ui` |
| `@rp/design` | `libs/shared/design` |
| `@rp/util` | `libs/shared/util` |

History was extracted from the original Nx monorepo via `git subtree`
(split → add under `libs/shared/`), so per-file history is preserved.

## Build

```sh
npm install
npm run tokens     # generate design tokens
npm run build      # nx build ui, design, util  → dist/libs/shared/*
```

## Publish

Set the private registry + `NPM_TOKEN` in `.npmrc` / CI secrets, then run the
`Release` GitHub workflow (currently **disabled** via an `if: false` guard).
