import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import type { NextComponentType, NextPageContext } from 'next';
import Router from 'next/router';
import NProgress from 'nprogress';

import '../src/css/index.css';

type NextComponentWithLayout = NextComponentType<NextPageContext, unknown, unknown> & {
    layout?: React.ComponentType
}

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {

    useEffect(() => {
        import('bootstrap');
    }, []);

    const Layout = (Component as NextComponentWithLayout).layout ?? React.Fragment;
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

export default CustomApp;
