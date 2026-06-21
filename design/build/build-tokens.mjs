import StyleDictionary from 'style-dictionary';

// Style Dictionary v5 — class-based, async, ESM.
// Builds primitive tokens into CSS custom properties + SCSS variables.
// Semantic light/dark mapping lives in src/styles/theme.css (references these primitives).
const sd = new StyleDictionary({
  source: ['libs/shared/design/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'rp',
      buildPath: 'libs/shared/design/src/styles/',
      files: [
        {
          destination: 'primitives.css',
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      prefix: 'rp',
      buildPath: 'libs/shared/design/src/styles/',
      files: [
        {
          destination: '_primitives.scss',
          format: 'scss/variables',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log('✓ @rp/design tokens built -> libs/shared/design/src/styles/');
