module.exports = {
    // add environment variables accessible via AppSettings here:
    // visible only by Next.js server (secrets)
    serverRuntimeConfig: {
    },
    // visible in Browser and Next.js server (DANGER!! Public Information!)
    publicRuntimeConfig: {
        websiteName: process.env['WEBSITE_NAME'],
        azureAuthTenantName: process.env['AZURE_AD_B2C_TENANT_NAME'],
        azureAuthClientID: process.env['AZURE_AD_B2C_CLIENT_ID'],
        azureAuthPrimaryUserFlow: process.env['AZURE_AD_B2C_PRIMARY_USER_FLOW'],
        backendHost: process.env['BACKEND_HOST'],
    },
    productionBrowserSourceMaps: true,
    swcMinify: true
}
