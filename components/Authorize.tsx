import React, { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import * as msal from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from '@azure/msal-react';
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

export const Authorize: React.FC<{
    roles?: string[]
}> = ({ roles, children }) => {

    const { instance, inProgress, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [accessToken, setAccessToken] = useState('');
    const isReady = (inProgress === msal.InteractionStatus.None);

    useEffect(() => {
        const loginRequestWithAccount: msal.RedirectRequest = {
            ...loginRequest,
            account: accounts[0]
        };

        async function setTokenSilently() {
            const response = await instance.acquireTokenSilent(loginRequestWithAccount)
            setAccessToken(response.accessToken);
        }

        if (isReady) {
            if (isAuthenticated) {
                NProgress.start();
                // https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-acquire-token?tabs=react#acquire-a-token-with-a-redirect
                setTokenSilently().catch(err => {
                    if (err instanceof msal.InteractionRequiredAuthError) {
                        instance.acquireTokenRedirect(loginRequestWithAccount).catch(console.error);
                    } else {
                        console.error(err);
                    }
                }).then(() => NProgress.done());
            } else {
                instance.loginRedirect(loginRequest).catch(console.error);
            }

        }
    }, [accounts, instance, isAuthenticated, isReady]);

    return (
        <>
            <AuthenticatedTemplate>
                <AccessTokenContext.Provider value={accessToken}>
                    <CheckRoles roles={roles}>
                        {children}
                    </CheckRoles>
                </AccessTokenContext.Provider>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <div>
                    You need to sign in to access this page.
                </div>
            </UnauthenticatedTemplate>
        </>
    );
}
