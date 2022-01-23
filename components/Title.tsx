import React from 'react';
import Head from 'next/head';
import { AppSettings } from '../functions/AppSettings';

export const Title: React.FunctionComponent<{
    name: string
}> = function ({ name }) {
    return (
        <Head>
            <title key="title">{name} - {AppSettings.current.websiteName}</title>
        </Head>
    );
}
