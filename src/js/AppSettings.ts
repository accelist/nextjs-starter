import getConfig from 'next/config';

export interface AppSettings {
    websiteName: string;
}

export function getAppSettings(): AppSettings {
    const config = getConfig();
    return config.publicRuntimeConfig;
}

// Configure environment variables read in the next.config.js file
// During development, use .env.development to add environment variables
// During production (running in a container), use machine environment variables
