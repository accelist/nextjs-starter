module.exports = {
    serverRuntimeConfig: {},
    // add environment variables accessible via AppSettings here:
    publicRuntimeConfig: {
        websiteName: process.env['websiteName']
    },
    productionBrowserSourceMaps: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (dev && isServer) {
            const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
            config.plugins.push(new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: [
                        'pages/**/*.{ts,tsx,js,jsx}',
                        'src/**/*.{ts,tsx,js,jsx}',
                    ]
                }
            }));
        }

        // Important: return the modified config
        return config
    },
}
