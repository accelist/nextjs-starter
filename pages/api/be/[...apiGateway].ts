import Proxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AppSettings } from '../../../functions/AppSettings';

// Great way to avoid using CORS and making API calls from HTTPS pages to back-end HTTP servers
// Recommendation for projects in Kubernetes cluster: set target to Service DNS name instead of public DNS name
const server = Proxy.createProxyServer({
    target: AppSettings.current.backendApiHost,
    // changeOrigin to support name-based virtual hosting
    changeOrigin: true,
    xfwd: true,
    // https://github.com/http-party/node-http-proxy#proxying-websockets
    ws: false,
});

server.on('proxyReq', (proxyReq, req) => {
    // Proxy requests from /api/be/... to http://my-web-api.com/...
    const urlRewrite = req.url?.replace(new RegExp('^/api/be'), '');
    if (urlRewrite) {
        proxyReq.path = urlRewrite;
    } else {
        proxyReq.path = '/';
    }
    proxyReq.removeHeader('cookie');
    // console.log(JSON.stringify(proxyReq.getHeaders(), null, 4));
    console.log('API Proxy:', req.url, '-->', AppSettings.current.backendApiHost + urlRewrite);
});

const apiGateway = async (req: NextApiRequest, res: NextApiResponse) => {
    const startTime = new Date().getTime();

    server.web(req, res, {}, (err) => {
        if (err instanceof Error) {
            throw err;
        }

        throw new Error(`Failed to proxy request: '${req.url}'`);
    });

    res.on('finish', () => {
        const endTime = new Date().getTime();
        console.log(`API Proxy: Finished ${res.req.url} in ${endTime - startTime}ms `);
    });
}

export default apiGateway;

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false
    },
}
