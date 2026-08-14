import type { NextApiRequest, NextApiResponse } from 'next'
import { getOidcConfig } from '../../functions/oidcClient';

export default async function endSession(_req: NextApiRequest, res: NextApiResponse) {
    // https://openid.net/specs/openid-connect-session-1_0-17.html#RPLogout
    // if redirection to Next.js is required, provide id_token_hint and post_logout_redirect_uri
    const config = await getOidcConfig();
    res.redirect(302, config.serverMetadata().end_session_endpoint ?? '/');
}
