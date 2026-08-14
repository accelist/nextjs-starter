import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ProgressProvider } from '@bprogress/next/pages';
import { SessionErrorHandler } from '../components/SessionErrorHandler';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '../styles/globals.css';

type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    layout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps<{ session?: Session }> & {
    Component: NextPageWithLayout;
};

export default function CustomApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const withLayout = Component.layout ?? ((page) => page);

    return (
        <ProgressProvider
            height="2px"
            color="limegreen"
            options={{ showSpinner: false }}
        >
            <SessionProvider
                session={session}
                refetchInterval={120}
                refetchWhenOffline={false}
                refetchOnWindowFocus={false}
            >
                <SessionErrorHandler>{withLayout(<Component {...pageProps} />)}</SessionErrorHandler>
            </SessionProvider>
        </ProgressProvider>
    );
}
