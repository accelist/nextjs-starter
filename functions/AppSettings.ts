import getConfig from 'next/config';

/**
 * Defines the combined runtime application environment variables.
 */
export interface RuntimeAppSettings {
    websiteName: string;
    azureAuthTenantName: string;
    azureAuthClientID: string;
    azureAuthPrimaryUserFlow: string;
    backendHost: string;
}

/**
 * Returns a combined runtime application environment variables.
 * Environment variables read from the machine should be set in `next.config.js`
 */
export const AppSettings = {
    get current(): RuntimeAppSettings {
        const config = getConfig();
        return { ...config.publicRuntimeConfig, ...config.serverRuntimeConfig };
    }
}

// Configure environment variables read in the next.config.js file
// During development, use .env.development or .env.local to add environment variables
// During production (running in a container), use machine environment variables (docker -e)
