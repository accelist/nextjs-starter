module.exports = {
    // add environment variables accessible via AppSettings here:
    // visible only by Next.js server (secrets)
    serverRuntimeConfig: {
        demoApiHost: process.env['DEMO_API_HOST'],
    },
    // visible in Browser and Next.js server (DANGER!! Public Information!)
    publicRuntimeConfig: {
        oidcIssuer: process.env['OIDC_ISSUER'],
        oidcClientId: process.env['OIDC_CLIENT_ID'],
        oidcScope: process.env['OIDC_SCOPE'],
    },
    productionBrowserSourceMaps: true,
    swcMinify: true
}
