import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as msal from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from '@azure/msal-react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { loginRequest } from '../functions/msal';
import { AccessTokenContext, useAccessToken } from '../functions/UseAccessToken';

const CheckRoles: React.FC<{
    roles?: string[]
}> = ({ roles, children }) => {

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

function useInterval(callback: () => void, ms: number) {
    const savedCallback = useRef(() => {
        // no op
    });

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const timer = setInterval(() => {
            savedCallback.current();
        }, ms);
        return () => clearInterval(timer);
    }, [ms]);
}

export const Authorize: React.FC<{
    roles?: string[]
}> = ({ roles, children }) => {

    const { instance, inProgress, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [accessToken, setAccessToken] = useState('');
    const isReady = (inProgress === msal.InteractionStatus.None);
    const [tokenValid, setTokenValid] = useState(false);

    const acquireAccessToken = useCallback(async () => {
        // https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-acquire-token?tabs=react#acquire-a-token-with-a-redirect
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

    function checkTokenExpiration() {
        if (!accessToken) {
            return false;
        }

        const { exp } = jwtDecode<JwtPayload>(accessToken);
        if (!exp) {
            return false;
        }

        const currentTime = Date.now() / 1000;
        if (currentTime >= exp) {
            return false;
        }

        return true;
    }

    // check access token every minute
    useInterval(() => {
        if (isReady && isAuthenticated && accessToken) {
            const isValid = checkTokenExpiration();
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
