import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            'react/prop-types': 'off',
            '@next/next/no-img-element': 'off',
        },
    },
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'node_modules/**',
        'public/**',
        'next.config.js',
        'postcss.config.js',
        'appsettings.js',
    ]),
]);

export default eslintConfig;
