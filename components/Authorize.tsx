import { Spin } from "antd";
import { useSession, signIn } from "next-auth/react";
import nProgress from "nprogress";
import React from "react";
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
        user: session.user as UserInfo
    };

    return (
        <AuthorizationContext.Provider value={ctx}>
            {children}
        </AuthorizationContext.Provider>
    );
};
