import React from 'react';
import type { NextPage } from 'next'
import type { AppProps, AppContext } from 'next/app'
import App from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from '../functions/msal';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '../css/index.css';

type NextPageWithLayout = NextPage & {
    layout?: (page: React.ReactElement) => React.ReactNode;
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
}

function CustomApp({
    Component,
    pageProps
}: AppPropsWithLayout): JSX.Element {

    const withLayout = Component.layout ?? (page => page);
    return (
        <MsalProvider instance={msalInstance}>
            {withLayout(<Component {...pageProps} />)}
        </MsalProvider>
    );
}

// This disables the ability to perform Automatic Static Optimization... (Sadge)
// Causing every page in the app to be server-side rendered,
// but allowing the use of runtime configuration in Docker-based Environment!
CustomApp.getInitialProps = async (appContext: AppContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
}

NProgress.configure({
    showSpinner: false
});

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

export default CustomApp;
