import NextAuth, { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt";
import { Issuer } from 'openid-client';
import { custom } from 'openid-client';
import { AppSettings } from "../../../functions/AppSettings"
import { UserInfo } from "../../../functions/AuthorizationContext";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT & { refreshToken?: string }) {
    try {
        if (!token.refreshToken) {
            throw new Error('Refresh token is empty!');
        }

        const discovery = await Issuer.discover(AppSettings.current.oidcIssuer);

        const client = new discovery.Client({
            client_id: AppSettings.current.oidcClientId,
            token_endpoint_auth_method: 'none',
        });

        client[custom.clock_tolerance] = 10; // to allow a 10 second skew

        // console.log('NextAuth refreshing token: ', token.refreshToken);
        const update = await client.refresh(token.refreshToken);

        return {
            ...token,
            accessToken: update.access_token,
            accessTokenExpires: calculateExpireAtMilliseconds(update.expires_at),
            refreshToken: update.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (err) {
        console.log('NextAuth error when refreshing token: ', err);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

function calculateExpireAtMilliseconds(expireAtSeconds: number | undefined) {
    if (!expireAtSeconds) {
        // assume it will expire in 60 seconds
        return Date.now() + 60 * 1000;
    }

    return expireAtSeconds * 1000;
}

function hasNotExpired(expireAtSeconds: unknown): boolean {
    if (typeof expireAtSeconds !== 'number') {
        return false;
    }

    if (!expireAtSeconds) {
        return false;
    }

    return (Date.now() < expireAtSeconds);
}

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "oidc",
            name: "OpenID Connect",
            type: "oauth",
            wellKnown: AppSettings.current.oidcIssuer + '/.well-known/openid-configuration',
            client: {
                token_endpoint_auth_method: 'none'
            },
            clientId: AppSettings.current.oidcClientId,
            authorization: {
                params: {
                    scope: AppSettings.current.oidcScope,
                }
            },
            checks: ["pkce", "state"],
            idToken: true,
            userinfo: {
                async request(context) {
                    // idToken: true makes next-auth parse user info from id_token
                    // this code below makes next-auth query the user info endpoint instead
                    if (context.tokens.access_token) {
                        return await context.client.userinfo(context.tokens.access_token)
                    }
                    return {};
                }
            },
            async profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                }
            },
        }
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            // Initial sign in
            if (account && user) {
                // console.log(JSON.stringify(account, null, 4));
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: calculateExpireAtMilliseconds(account.expires_at),
                    refreshToken: account.refresh_token,
                    user,
                }
            }

            // Return previous token if the access token has not expired yet
            // console.log(Date.now(), accessTokenExpires);
            if (hasNotExpired(token['accessTokenExpires'])) {
                // console.log('Token not expired yet');
                return token;
            }

            // console.log('Token has expired');
            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token['user'] as UserInfo;
            session['accessToken'] = token['accessToken'];
            session['error'] = token['error'];
            return session
        }
    },
}

export default NextAuth(authOptions)

// generate new NEXTAUTH_SECRET for production
// https://generate-secret.vercel.app/32
