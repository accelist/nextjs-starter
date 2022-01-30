import { getToken } from "next-auth/jwt";
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { AppSettings } from '../../../functions/AppSettings';

const apiGateway = async (req, res) => {
    // Great way to avoid using CORS and to transparently add Access Token to API requests
    // Proxy requests from /api/demo/... to http://localhost:5000/...
    // In real production app, place host URI in AppSettings / environment variables!
    const apiProxyOptions: Options = {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // Set ws to true if proxying WebSocket
        // Recommendation: create a dedicated API gateway for WebSocket, don't mix!
        ws: false,
        xfwd: true,
        pathRewrite: {
            '^/api/demo': '/'
        },
        logLevel: 'warn'
    };

    const secret = AppSettings.current.nextAuthSecret;
    const jwt = await getToken({ req, secret });
    const accessToken = jwt?.['accessToken'];

    if (accessToken && typeof accessToken === 'string') {
        apiProxyOptions.headers = {
            Authorization: `Bearer ${accessToken}`
        }
    }

    const apiProxy = createProxyMiddleware(apiProxyOptions);
    apiProxy(req, res, (result: unknown) => {
        if (result instanceof Error) {
            throw result;
        }

        throw new Error(`Failed to proxy request: '${req.url}'`);
    });
}

export default apiGateway;

export const config = {
    api: {
        externalResolver: true,
    },
}
