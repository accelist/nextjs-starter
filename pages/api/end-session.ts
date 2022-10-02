import type { NextApiRequest, NextApiResponse } from 'next'
import { Issuer } from 'openid-client';
import { AppSettings } from '../../functions/AppSettings';

export default async function endSession(_req: NextApiRequest, res: NextApiResponse) {
    // https://openid.net/specs/openid-connect-session-1_0-17.html#RPLogout
    // if redirection to Next.js is required, provide id_token_hint and post_logout_redirect_uri
    const discovery = await Issuer.discover(AppSettings.current.oidcIssuer);
    res.redirect(302, discovery.metadata.end_session_endpoint ?? '/');
}
