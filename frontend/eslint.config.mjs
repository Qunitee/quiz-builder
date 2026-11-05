import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import boundaries from 'eslint-plugin-boundaries';

const allowLayerToImport = (layer, ...layers) => ({
  from: { element: { type: layer } },
  allow: { to: { element: { types: layers } } },
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'boundaries/root-path': import.meta.dirname,
      'boundaries/ignore': ['next.config.ts'],
      'boundaries/elements': [
        { type: 'app', pattern: 'app', partialMatch: false },
        {
          type: 'widget',
          pattern: 'widgets/*',
          capture: ['name'],
          partialMatch: false,
        },
        {
          type: 'feature',
          pattern: 'features/*',
          capture: ['name'],
          partialMatch: false,
        },
        {
          type: 'entity',
          pattern: 'entities/*',
          capture: ['name'],
          partialMatch: false,
        },
        { type: 'shared', pattern: 'shared', partialMatch: false },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            allowLayerToImport('app', 'widget', 'feature', 'entity', 'shared'),
            allowLayerToImport('widget', 'feature', 'entity', 'shared'),
            allowLayerToImport('feature', 'entity', 'shared'),
            allowLayerToImport('entity', 'shared'),
            allowLayerToImport('shared', 'shared'),
          ],
        },
      ],
      'boundaries/no-unknown-dependencies': 'error',
      'boundaries/no-unknown-files': 'error',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
