import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { AppSettings } from '../../../functions/AppSettings';

// Great way to avoid using CORS and to transparently add custom headers to API requests
// Proxy requests from /api/demo/... to http://localhost:5000/...
const apiProxyOptions: Options = {
    target: AppSettings.current.backendHost,
    changeOrigin: true,
    // Set ws to true if proxying WebSocket
    // Recommendation: create a dedicated API gateway for WebSocket, don't mix!
    // If troublesome, just hit the WebSocket endpoint directly (CORS)
    ws: false,
    xfwd: true,
    pathRewrite: {
        '^/api/demo': '/'
    },
    logLevel: 'warn'
};

const apiProxy = createProxyMiddleware(apiProxyOptions);

const apiGateway = async (req, res) => {
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
        bodyParser: false
    },
}
