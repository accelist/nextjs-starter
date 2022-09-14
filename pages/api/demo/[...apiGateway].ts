import Proxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AppSettings } from '../../../functions/AppSettings';

// Great way to avoid using CORS and making API calls from HTTPS pages to back-end HTTP servers
// Recommendation for projects in Kubernetes cluster: set target to Service DNS name instead of public DNS name
const server = Proxy.createProxyServer({
    target: AppSettings.current.demoApiHost,
    changeOrigin: true,
    xfwd: true,
    // https://github.com/http-party/node-http-proxy#proxying-websockets
    ws: false,
});

server.on('proxyReq', (proxyReq, req) => {
    // Proxy requests from /api/demo/... to http://my-web-api.com/...
    const urlRewrite = req.url?.replace(new RegExp('^/api/demo'), '');
    if (urlRewrite) {
        proxyReq.path = urlRewrite;
    } else {
        proxyReq.path = '/';
    }
    // console.log('Proxying:', req.url, '-->', AppSettings.current.backendHost + urlRewrite);
});

const apiGateway = async (req: NextApiRequest, res: NextApiResponse) => {
    server.web(req, res, {}, (err) => {
        if (err instanceof Error) {
            throw err;
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
