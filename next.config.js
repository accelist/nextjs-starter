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
    /*
        Disable swcMinify for now
        https://github.com/vercel/next.js/issues/40889
        https://github.com/ant-design/ant-design/issues/38106
        
        index.js:235 
        
        TypeError: number 0 is not iterable (cannot read property Symbol(Symbol.iterator))
        at new Map (<anonymous>)
        at Overflow.js:173:1
        at useBatchFrameState.js:32:34
        at eD (Overflow.js:173:1)
        at P (Item.js:33:1)
        at Item.js:38:1
        at uJ (react-dom.production.min.js:241:246)
        at u1 (react-dom.production.min.js:245:114)
        at o5 (react-dom.production.min.js:285:374)
        at react-dom.production.min.js:284:398
    */
    swcMinify: false,
    // https://nextjs.org/docs/advanced-features/compiler#emotion
    compiler: {
        emotion: {
            sourceMap: true,
        },
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: getSecurityHeaders(isProd),
            },
        ]
    },
}
