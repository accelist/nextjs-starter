module.exports = {
    // add environment variables accessible via AppSettings here:
    // visible only by server-side Next.js (secrets)
    // if accessing variables required in browser-side code, use getServerSideProps
    // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
    serverRuntimeConfig: {
        backendApiHost: process.env['BACKEND_API_HOST'],
        oidcIssuer: process.env['OIDC_ISSUER'],
        oidcClientId: process.env['OIDC_CLIENT_ID'],
        oidcScope: process.env['OIDC_SCOPE'],
    },
    productionBrowserSourceMaps: true,
    swcMinify: true
}
