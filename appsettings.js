module.exports = {
    backendApiHost: process.env['BACKEND_API_HOST'] ?? '',
    oidcIssuer: process.env['OIDC_ISSUER'] ?? '',
    oidcClientId: process.env['OIDC_CLIENT_ID'] ?? '',
    oidcScope: process.env['OIDC_SCOPE'] ?? '',
};
