import React, { useCallback, useEffect, useState } from 'react';
import * as msal from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../functions/msal';
import { AccessTokenContext, useAccessToken } from '../functions/useAccessToken';
import { checkTokenExpiration } from '../functions/checkTokenExpiration';
import { useInterval } from '../functions/useInterval';

/**
 * TODO: Implement logic for checking roles against the back-end Web API
 * @param param0 accepts roles `string[]` and React `children` props. 
 * @returns React Element
 */
const CheckRoles: React.FC<{
    roles?: string[]
}> = ({ roles, children }) => {

    // `useAuthorizedAxios` or `useAuthorizedSwr` may be also used here
    // Alternative suggestion: To simplify logic, instead of returning the entire user roles like this example, 
    // The Web API can just return `true` if the role is authorized for the user.
    // Example: GET http://demo.accelist.com/api/check-roles?r=Administrator&r=IT%20Manager
    const accessToken = useAccessToken();
    const [ready, setReady] = useState(false);
    const [userRoles, setUserRoles] = useState<string[]>([]);

    useEffect(() => {
        if (accessToken) {
            // TODO: Get user roles from back-end Web API using Access Token
            setUserRoles(['Administrator', 'IT Manager']);
            setReady(true);
        }
    }, [accessToken]);

    // TODO: Design In-Process Authorizing / Busy / Loading Page
    if (!ready) {
        return (<></>);
    }

    let authorized = false;

    if (roles) {
        const roleMatches = roles.filter(role => userRoles.includes(role));
        authorized = Boolean(roleMatches?.[0]);
    }

    // TODO: Design 500 Forbidden page
    if (!authorized) {
        return (
            <div>
                You are not allowed to access this page.
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    );
}

/**
 * Component enabling authentication and authorization function.
 * If user is not authenticated, they will be redirected to the login page.
 * If user is authenticated, token will be checked for validity and passed to children components using `AccessTokenContext`.
 * If access token is not valid, it will be refreshed automatically.
 * @param param0 accepts roles `string[]` and React `children` props.
 * @returns React Element
 */
export const Authorize: React.FC<{
    roles?: string[]
}> = ({ roles, children }) => {

    const { instance, inProgress, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [accessToken, setAccessToken] = useState('');
    const isReady = (inProgress === msal.InteractionStatus.None);
    const [tokenValid, setTokenValid] = useState(false);

    /**
     * The pattern for acquiring tokens for APIs with MSAL.js is to first attempt a silent token request by using the `acquireTokenSilent` method.
     * When this method is called, the library first checks the cache in browser storage (offline) to see if a valid token exists and returns it.
     * When no valid token is in the cache, it attempts to use its refresh token to get the token. (5 minutes before expiration)
     * If the refresh token's 24-hour lifetime has expired, MSAL.js will open a hidden iframe to silently request a new authorization code, which it will exchange for a new, valid refresh token. 
     * More often, failures are due to the browser blocking 3rd party cookies, which prevents the use of hidden iframes to continue authenticating the user.
     * If `acquireTokenSilent` fails, fallback to `acquireTokenRedirect`. 
     * This method will initiate a full-frame redirect and the response will be handled when returning to the application. 
     * When this component is rendered after returning from the redirect, `acquireTokenSilent` should now succeed as the tokens will be pulled from the cache.
     * https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-acquire-token?tabs=react#acquire-a-token-with-a-redirect 
     */
    const acquireAccessToken = useCallback(async () => {
        const loginRequestWithAccount: msal.RedirectRequest = {
            ...loginRequest,
            account: accounts[0]
        };
        try {
            const response = await instance.acquireTokenSilent(loginRequestWithAccount)
            setAccessToken(response.accessToken);
            setTokenValid(true);
        } catch (err) {
            try {
                if (err instanceof msal.InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect(loginRequestWithAccount);
                } else {
                    console.error(err);
                }
            } catch (err2) {
                console.error(err2);
            }
        }
    }, [instance, accounts]);

    useEffect(() => {
        if (isReady) {
            if (isAuthenticated) {
                acquireAccessToken();
            } else {
                instance.loginRedirect(loginRequest).catch(console.error);
            }

        }
    }, [isReady, isAuthenticated, acquireAccessToken, instance]);

    // check access token every minute
    useInterval(() => {
        if (isReady && isAuthenticated && accessToken) {
            const isValid = checkTokenExpiration(accessToken);
            setTokenValid(isValid);
            acquireAccessToken();
        }
    }, 60 * 1000);

    return (
        <>
            <AuthenticatedTemplate>
                {
                    tokenValid &&
                    <AccessTokenContext.Provider value={accessToken}>
                        <CheckRoles roles={roles}>
                            {children}
                        </CheckRoles>
                    </AccessTokenContext.Provider>
                }
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <div>
                    You need to sign in to access this page.
                </div>
            </UnauthenticatedTemplate>
        </>
    );
}
