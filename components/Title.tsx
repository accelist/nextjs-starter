import React from 'react';
import Head from 'next/head';
import { AppSettings } from '../functions/AppSettings';

export const Title: React.FC<{
    children: React.ReactText
}> = ({ children }) => {
    return (
        <Head>
            <title key="title">{children} - {AppSettings.current.websiteName}</title>
        </Head>
    );
}
