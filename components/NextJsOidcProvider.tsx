import React from 'react';
import { OidcProvider } from '@axa-fr/react-oidc';
import { useRouter } from "next/router";
import { AppSettings } from '../functions/AppSettings';

export const NextJsOidcProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const router = useRouter()
    const withCustomHistory = () => {
        return {
            replaceState: (url: string) => {
                router.replace({
                    pathname: url,
                }).then(() => {
                    window.dispatchEvent(new Event('popstate'));
                });
            }
        };
    };

    const onEvent = (configurationName: string, eventName: string, data: unknown) => {
        if (configurationName === 'default') {
            if (eventName === 'refreshTokensAsync') {
                // oidc:default:token_timer {timeLeft: 231}
                return;
            }
            if (eventName === 'token_timer') {
                // oidc:default:refreshTokensAsync {message: 'wait because document is hidden'}
                return;
            }
        }
        console.log(`oidc:${configurationName}:${eventName}`, data);
    }

    return (
        <OidcProvider withCustomHistory={withCustomHistory} onEvent={onEvent} configuration={{
            authority: AppSettings.current.oidcAuthority,
            client_id: AppSettings.current.oidcClientId,
            scope: AppSettings.current.oidcScope,
            redirect_uri: `${window.location.origin}/authentication/callback`,
            silent_redirect_uri: `${window.location.origin}/authentication/silent-callback`,
        }}>
            {children}
        </OidcProvider>
    );
};
