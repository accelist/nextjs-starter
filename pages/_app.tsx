import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import type { NextComponentType, NextPageContext } from 'next';
import Router from 'next/router';
import NProgress from 'nprogress';
import { SessionProvider } from "next-auth/react";
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '../css/index.css';

type NextComponentWithLayout = NextComponentType<NextPageContext, unknown, unknown> & {
    layout?: React.ComponentType
}

function CustomApp({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps): JSX.Element {

    const Layout = (Component as NextComponentWithLayout).layout ?? React.Fragment;
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}

// This disables the ability to perform Automatic Static Optimization... 
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
