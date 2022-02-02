import React, { useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../functions/msal';

export const Authorize: React.FC<{
    roles?: string[]
}> = ({ children }) => {

    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (!isAuthenticated) {
            instance.loginRedirect(loginRequest).catch(console.error);
        }
    }, [isAuthenticated, instance]);

    if (!isAuthenticated) {
        // TODO: design the redirecting page
        return (
            <div>
                Redirecting to sign in page...
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    );
}
