import React from 'react';
import useSWR from 'swr';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { SwrFetcher } from '../functions/SwrFetcher';
import { Page } from '../types/Page';

const Index: Page = () => {
    // Request will be proxied via /api/demo/[...apiGateway].ts
    const { data, error } = useSWR('/api/demo/api/Values', SwrFetcher);

    return (
        <div>
            <Title name="About"></Title>
            <p>
                {JSON.stringify(data)}
            </p>
            <p style={{ color: 'red' }}>
                {error?.toString()}
            </p>
        </div>
    );
}

Index.layout = WithDefaultLayout;
export default Index;
