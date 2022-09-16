import Proxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
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
    proxyReq.removeHeader('Cookie');

    // console.log('Proxying:', req.url, '-->', AppSettings.current.demoApiHost + urlRewrite);
    // console.log(proxyReq.getHeaders());
});

/**
 * Automatically append access token to request Authorization header if user is authenticated
 * @param req 
 * @returns 
 */
async function getProxyServerOptions(req: NextApiRequest): Promise<Proxy.ServerOptions> {
    // https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken
    const tokens = await getToken({ req });
    const accessToken = tokens?.['accessToken'];

    if (!accessToken) {
        return {};
    }

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
}

const apiGateway = async (req: NextApiRequest, res: NextApiResponse) => {
    const options = await getProxyServerOptions(req);

    server.web(req, res, options, (err) => {
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
