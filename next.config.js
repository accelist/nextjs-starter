module.exports = {
    // add environment variables accessible via AppSettings here:
    // visible only by Next.js server (secrets)
    serverRuntimeConfig: {
    },
    // visible in Browser and Next.js server (DANGER!! Public Information!)
    publicRuntimeConfig: {
        websiteName: process.env['WEBSITE_NAME'],
        backendHost: process.env['BACKEND_HOST'],
        oidcAuthority: process.env['OIDC_AUTHORITY'],
        oidcClientId: process.env['OIDC_CLIENT_ID'],
        oidcScope: process.env['OIDC_SCOPE'],
    },
    productionBrowserSourceMaps: true,
    swcMinify: true
}
