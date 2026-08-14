import * as client from 'openid-client';
import { AppSettings } from './AppSettings';

/**
 * Discovers the configured OpenID Connect issuer as a public client.
 * Used by NextAuth token refresh and RP-initiated logout.
 */
export function getOidcConfig() {
    return client.discovery(
        new URL(AppSettings.current.oidcIssuer),
        AppSettings.current.oidcClientId,
        {
            token_endpoint_auth_method: 'none',
            [client.clockTolerance]: 10,
        },
        client.None(),
    );
}
