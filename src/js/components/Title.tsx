import React from 'react';
import Head from 'next/head';

export const Title: React.FunctionComponent<{
    name: string
}> = function ({ name }) {
    return (
        <Head>
            <title key="title">{name} - Next.js Starter</title>
        </Head>
    );
}
