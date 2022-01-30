import axios from "axios";
import { AppSettings } from "./AppSettings";

const tenantName = AppSettings.current.azureAuthTenantName;
const policyName = AppSettings.current.azureAuthPrimaryUserFlow;

// https://docs.microsoft.com/en-us/azure/active-directory-b2c/access-tokens
const tokenEndpoint = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/token`;

interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
}

export async function tryRefreshTokens(refreshToken: unknown) {
    if (typeof refreshToken !== 'string' || !refreshToken) {
        return null;
    }

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('client_id', AppSettings.current.azureAuthClientID);
        params.append('client_secret', AppSettings.current.azureAuthClientSecret);

        const response = await axios.post<RefreshTokenResponse>(tokenEndpoint, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}
