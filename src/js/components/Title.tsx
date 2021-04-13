import React from 'react';
import Head from 'next/head';
import { getAppSettings } from '../AppSettings';

const appSettings = getAppSettings();

export const Title: React.FunctionComponent<{
    name: string
}> = function ({ name }) {
    return (
        <Head>
            <title key="title">{name} - {appSettings.websiteName}</title>
        </Head>
    );
}
