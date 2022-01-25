module.exports = {
    // add environment variables accessible via AppSettings here:
    // visible only by Next.js server (secrets)
    serverRuntimeConfig: {
        nextAuthSecret: process.env['NEXTAUTH_SECRET'],
        azureAuthTenantName: process.env['AZURE_AD_B2C_TENANT_NAME'],
        azureAuthClientID: process.env['AZURE_AD_B2C_CLIENT_ID'],
        azureAuthClientSecret: process.env['AZURE_AD_B2C_CLIENT_SECRET'],
        azureAuthPrimaryUserFlow: process.env['AZURE_AD_B2C_PRIMARY_USER_FLOW'],
    },
    // visible in Browser and Next.js server (DANGER!! Public Information!)
    publicRuntimeConfig: {
        websiteName: process.env['WEBSITE_NAME']
    },
    productionBrowserSourceMaps: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (dev && isServer) {
            const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
            config.plugins.push(new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: [
                        '**/*.{ts,tsx,js,jsx}',
                    ]
                }
            }));
        }

        // Important: return the modified config
        return config
    },
}
