const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (dev && isServer) {
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
