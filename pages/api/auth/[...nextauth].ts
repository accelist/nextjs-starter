import NextAuth from "next-auth";
import AzureADB2C from "next-auth/providers/azure-ad-b2c"
import { AppSettings } from '../../../functions/AppSettings';
import { tryRefreshTokens } from "../../../functions/TryRefreshTokens";

function isNotExpired(seconds: unknown) {
    if (typeof seconds === 'number') {
        const ms = seconds * 1000;
        if (Date.now() < ms) {
            return true;
        }
    }

    return false;
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        AzureADB2C({
            // tenantId actually refers to tenant name, not tenant ID! (e.g. [Tenant Name].onmicrosoft.com)
            tenantId: AppSettings.current.azureAuthTenantName,
            clientId: AppSettings.current.azureAuthClientID,
            clientSecret: AppSettings.current.azureAuthClientSecret,
            primaryUserFlow: AppSettings.current.azureAuthPrimaryUserFlow,
            authorization: {
                params: {
                    // add additional API Access scope here:
                    // if the scope for API Access is not provided, Access Token will not be returned!
                    // read more: https://next-auth.js.org/providers/azure-ad-b2c
                    scope: `offline_access openid https://login.accelist.com/test-api/access`
                }
            },
        }),
        // ...add more providers here
    ],
    // https://next-auth.js.org/configuration/callbacks#session-callback
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async session({ session, token, user }) {
            session['error'] = token['error'];
            // Add user roles here:
            // For example, using the access token to get user roles from the web API
            session['roles'] = ['Administrator', 'IT Manager'];
            return session
        },
        async jwt({ token, user, account }) {
            // Initial Sign In
            if (user && account) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    accessTokenExpiresAt: account.expires_at,
                    refreshToken: account.refresh_token,
                }
            }

            // Return previous token if the access token has not expired yet
            if (isNotExpired(token['accessTokenExpiresAt'])) {
                return token;
            }

            // Access token has expired, try to update it
            const rotation = await tryRefreshTokens(token['refreshToken']);
            if (rotation) {
                return {
                    ...token,
                    accessToken: rotation.access_token,
                    accessTokenExpiresAt: Date.now() + rotation.expires_in * 1000,
                    refreshToken: rotation.refresh_token,
                }
            }

            // Failed to acquire refresh token
            return {
                ...token,
                error: true,
            };
        }
    },
    // Don't forget to change these for Production!
    // Environment variable: NEXTAUTH_SECRET
    // Environment variable: NEXTAUTH_URL
    secret: AppSettings.current.nextAuthSecret
});
