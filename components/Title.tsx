import React from 'react';
import Head from 'next/head';

export const Title: React.FC<{
    children: string | number
}> = ({ children }) => {
    return (
        <Head>
            <title key="title">{children.toString() + '- Accelist Next.js Starter'}</title>
        </Head>
    );
}
