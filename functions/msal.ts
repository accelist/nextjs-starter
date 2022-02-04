import * as msal from "@azure/msal-browser";
import { AppSettings } from "./AppSettings";

const tenantName = AppSettings.current.azureAuthTenantName;
const policyName = AppSettings.current.azureAuthPrimaryUserFlow;

const msalConfig: msal.Configuration = {
    auth: {
        clientId: AppSettings.current.azureAuthClientID,
        authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}`, // /v2.0/.well-known/openid-configuration
        knownAuthorities: [`https://${tenantName}.b2clogin.com`],
        redirectUri: '/auth/sign-in',
        postLogoutRedirectUri: '/'
    },
    cache: {
        cacheLocation: 'localStorage'
    },
};

// Add scopes here for acquiring Access Token for back-end API
// Read more: https://next-auth.js.org/providers/azure-ad-b2c
export const loginRequest: msal.RedirectRequest = {
    scopes: ['offline_access', 'openid', 'https://accelistadb2c.onmicrosoft.com/demo-api/access'],
};

export const msalInstance = new msal.PublicClientApplication(msalConfig);
