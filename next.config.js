module.exports = {
    // add environment variables accessible via AppSettings here:
    // visible only by Next.js server (secrets)
    serverRuntimeConfig: {
        nextAuthSecret: process.env['NEXTAUTH_SECRET'],
        githubId: process.env['GITHUB_ID'],
        githubSecret: process.env['GITHUB_SECRET']
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
