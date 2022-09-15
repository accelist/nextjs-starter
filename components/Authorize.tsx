import { Spin } from "antd";
import { useSession, signIn } from "next-auth/react";
import nProgress from "nprogress";
import React, { useEffect } from "react";
import { AuthorizationContext, AuthorizationContextData, UserInfo } from "../functions/AuthorizationContext";

export const Authorize: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            nProgress.start();
            signIn('oidc');
        },
    });

    useEffect(() => {
        // this error bubbles up from [...nextauth].ts, refreshAccessToken()
        if (session?.['error'] === "RefreshAccessTokenError") {
            nProgress.start();
            signIn('oidc'); // Force sign in to hopefully resolve error
        }
    }, [session]);

    function getAccessToken(): string {
        const accessToken = session?.['accessToken'];
        if (typeof accessToken === 'string') {
            if (accessToken) {
                return accessToken;
            }
        }

        console.warn('Authorize: Access Token is empty!');
        return '';
    }

    function getUserInfo(): UserInfo {
        return {
            id: session?.user?.['id'] ?? '',
            name: session?.user?.name ?? '',
            email: session?.user?.email ?? ''
        }
    }

    if (status !== 'authenticated') {
        return (
            <div style={{
                width: '100%',
                height: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Spin size="large" tip="Loading Authentication..."></Spin>
            </div>
        )
    }

    const ctx: AuthorizationContextData = {
        accessToken: getAccessToken(),
        user: getUserInfo()
    };

    return (
        <AuthorizationContext.Provider value={ctx}>
            {children}
        </AuthorizationContext.Provider>
    );
};
