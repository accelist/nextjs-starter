import { notification } from "antd";
import { signIn, useSession } from "next-auth/react";
import nProgress from "nprogress";
import React, { useEffect } from "react";

export const SessionErrorHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session } = useSession();

    useEffect(() => {
        // this error bubbles up from [...nextauth].ts, refreshAccessToken()
        if (session?.['error'] === "RefreshAccessTokenError") {
            notification['warning']({
                message: 'Login Required',
                description: 'Your session has ended. Redirecting to login page...'
            });
            nProgress.start();
            signIn('oidc'); // Force sign in to hopefully resolve error
        }
    }, [session]);

    return (
        <>
            {children}
        </>
    );
};
