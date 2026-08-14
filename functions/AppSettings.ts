import getAppSettings from '../appsettings';
import type { RuntimeAppSettings } from '../types/RuntimeAppSettings';

/**
 * Returns runtime application Environment Variables readable only from server-side code.
 * Environment variables read from the machine should be set in `appsettings.js`
 */
export const AppSettings = {
    get current(): RuntimeAppSettings {
        return getAppSettings();
    }
}

// Configure environment variables read in the `appsettings.js` file
// During development, use `.env.development` or `.env.local` to add environment variables
// During production (running in a container), use ONLY machine environment variables (docker -e)
