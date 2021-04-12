import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import type { NextComponentType, NextPageContext } from 'next';

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

export default CustomApp;
