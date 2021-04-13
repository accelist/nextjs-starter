import React from 'react';
import Head from 'next/head';
import { getAppSettings } from '../AppSettings';

const { websiteName } = getAppSettings();

export const Title: React.FunctionComponent<{
    name: string
}> = function ({ name }) {
    return (
        <Head>
            <title key="title">{name} - {websiteName}</title>
        </Head>
    );
}
