import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { SessionProvider } from 'next-auth/react';
import { SessionErrorHandler } from '../components/SessionErrorHandler';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '../styles/globals.css';

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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

    useEffect(() => {
        NProgress.configure({ showSpinner: false });

        const start = () => NProgress.start();
        const done = () => NProgress.done();

        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', done);
        Router.events.on('routeChangeError', done);
        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', done);
            Router.events.off('routeChangeError', done);
        };
    }, []);

    return (
        <SessionProvider
            session={session}
            refetchInterval={120}
            refetchWhenOffline={false}
            refetchOnWindowFocus={false}
        >
            <SessionErrorHandler>{withLayout(<Component {...pageProps} />)}</SessionErrorHandler>
        </SessionProvider>
    );
}
