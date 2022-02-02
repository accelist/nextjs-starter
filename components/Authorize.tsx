import React, { useContext, useEffect, useState } from 'react';
import * as msal from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../functions/msal';
import { AccessTokenContext } from './AccessTokenContext';

const CheckRoles: React.FC<{
    roles?: string[]
}> = ({ roles, children }) => {

    const accessToken = useContext(AccessTokenContext);
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
    const [accessToken, setAccessToken] = useState('');

    const isLoggedIn = Boolean(accounts[0]);
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
            if (isLoggedIn) {
                // https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-acquire-token?tabs=react#acquire-a-token-with-a-redirect
                setTokenSilently().catch(err => {
                    if (err instanceof msal.InteractionRequiredAuthError) {
                        instance.acquireTokenRedirect(loginRequestWithAccount).catch(console.error);
                    }
                    console.error(err);
                });
            } else {
                instance.loginRedirect(loginRequest).catch(console.error);
            }

        }
    }, [accounts, inProgress, instance, isLoggedIn, isReady]);

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
