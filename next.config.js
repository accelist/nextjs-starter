// https://securityheaders.com/
function getSecurityHeaders(isProd) {
    const headers = [
        {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
        },
        {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
        },
        {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
        },
        {
            // https://www.permissionspolicy.com/
            key: 'Permissions-Policy',
            value: 'accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()'
        },
        {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
        }
    ];

    if (isProd) {
        headers.push(
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=31536000'
            },
            {
                // https://report-uri.com/home/generate
                // https://csp-evaluator.withgoogle.com/
                key: 'Content-Security-Policy',
                value: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; object-src 'none'`
            }
        );
    }

    return headers;
}

const isProd = process.env['NODE_ENV'] === 'production';

/** @type { import('next').NextConfig } */
const nextConfig = {
    // add environment variables accessible via AppSettings here:
    // visible only by server-side Next.js (secrets)
    // if accessing variables required in browser-side code, use getServerSideProps
    // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
    serverRuntimeConfig: require('./appsettings'),
    productionBrowserSourceMaps: true,
    reactStrictMode: true,
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: getSecurityHeaders(isProd),
            },
        ]
    },
};

module.exports = nextConfig;
