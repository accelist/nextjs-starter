import { Spin } from "antd";
import { useSession, signIn } from "next-auth/react";
import nProgress from "nprogress";
import React from "react";

export const Authorize: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            nProgress.start();
            signIn('oidc');
        },
    });

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

    return (
        <>
            {children}
        </>
    );
};
