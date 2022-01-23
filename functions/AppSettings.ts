import getConfig from 'next/config';

export interface RuntimeAppSettings {
    websiteName: string;
    nextAuthSecret: string;
    githubId: string;
    githubSecret: string;
}

export const AppSettings = {
    get current(): RuntimeAppSettings {
        const config = getConfig();
        return { ...config.publicRuntimeConfig, ...config.serverRuntimeConfig };
    }
}

// Configure environment variables read in the next.config.js file
// During development, use .env.development to add environment variables
// During production (running in a container), use machine environment variables
