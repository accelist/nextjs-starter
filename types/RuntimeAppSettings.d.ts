import type NextConfig from '../next.config';

type ServerRuntimeConfig = typeof NextConfig['serverRuntimeConfig'];
type RuntimeEnv = keyof ServerRuntimeConfig;

/**
 * The `RuntimeAppSettings` register values from `serverRuntimeConfig` in `next.config.js`
 * but assumes that all Environment Variables are provided (not null / undefined).
 * It is the developer's responsibility and / or the infrastructure deployment team responsibility
 * to ensure that the Environment Variables are provided through Kubernetes or Docker `env`
 */
export type RuntimeAppSettings = Record<RuntimeEnv, string>;
