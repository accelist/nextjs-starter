import React from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import Router from 'next/router';
import NProgress from 'nprogress';
import { SessionProvider } from 'next-auth/react';
import { SessionErrorHandler } from '../components/SessionErrorHandler';

// https://fontawesome.com/v5/docs/web/use-with/react#next-js
import { config } from '@fortawesome/fontawesome-svg-core';
import '../styles/globals.css';
config.autoAddCss = false;

type NextPageWithLayout = NextPage & {
    layout?: (page: React.ReactElement) => React.ReactNode;
}

type AppPropsWithLayout = AppProps<{
    session?: Session;
}> & {
    Component: NextPageWithLayout;
}

function CustomApp({
    Component,
    pageProps: { session, ...pageProps }
}: AppPropsWithLayout): JSX.Element {
    // https://nextjs.org/docs/basic-features/layouts#per-page-layouts
    const withLayout = Component.layout ?? (page => page);
    return (
        // https://next-auth.js.org/getting-started/client#sessionprovider
        <SessionProvider session={session}
            refetchInterval={120} refetchWhenOffline={false} refetchOnWindowFocus={false}>
            <SessionErrorHandler>
                {withLayout(<Component {...pageProps} />)}
            </SessionErrorHandler>
        </SessionProvider>
    );
}

NProgress.configure({
    showSpinner: false
});

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

export default CustomApp;
