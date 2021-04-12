import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';

import '../src/css/index.css';

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {

    useEffect(() => {
        import('bootstrap');
    }, []);

    return (
        <Component {...pageProps} />
    );
}

export default CustomApp;
