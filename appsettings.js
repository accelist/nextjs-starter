/**
 * Runtime environment variables for server-side code.
 * Getters are used so Docker/Kubernetes `-e` values are read at request time
 * instead of being captured when the module is first loaded.
 * @returns {import('./types/RuntimeAppSettings').RuntimeAppSettings}
 */
module.exports = function getAppSettings() {
    return {
        backendApiHost: process.env['BACKEND_API_HOST'] ?? '',
        oidcIssuer: process.env['OIDC_ISSUER'] ?? '',
        oidcClientId: process.env['OIDC_CLIENT_ID'] ?? '',
        oidcScope: process.env['OIDC_SCOPE'] ?? '',
    };
};
