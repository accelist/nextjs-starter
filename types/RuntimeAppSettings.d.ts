import type NextConfig from '../next.config';

type ServerRuntimeConfig = typeof NextConfig['serverRuntimeConfig'];
type RuntimeEnv = keyof ServerRuntimeConfig;

export type RuntimeAppSettings = Record<RuntimeEnv, string>;
