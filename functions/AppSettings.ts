import getConfig from 'next/config';

export interface RuntimeAppSettings {
    websiteName: string;
    azureAuthTenantName: string;
    azureAuthClientID: string;
    azureAuthPrimaryUserFlow: string;
}

/**
 * Returns a combined runtime application environment variables.
 */
export const AppSettings = {
    get current(): RuntimeAppSettings {
        const config = getConfig();
        return { ...config.publicRuntimeConfig, ...config.serverRuntimeConfig };
    }
}

// Configure environment variables read in the next.config.js file
// During development, use .env.development to add environment variables
// During production (running in a container), use machine environment variables
