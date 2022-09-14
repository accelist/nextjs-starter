import type NextConfig from '../next.config';

type PublicRuntimeConfig = typeof NextConfig['publicRuntimeConfig'];
type ServerRuntimeConfig = typeof NextConfig['serverRuntimeConfig'];
type RuntimeEnv = keyof PublicRuntimeConfig | keyof ServerRuntimeConfig;

export type RuntimeAppSettings = Record<RuntimeEnv, string>;
