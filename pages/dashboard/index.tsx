import React from 'react';
import useSWR from 'swr';
import { WithDefaultLayout } from '../../components/DefautLayout';
import { Title } from '../../components/Title';
import { useAuthorizedSwrFetcher } from '../../functions/useAuthorizedSwrFetcher';
import { Page } from '../../types/Page';
import { OidcSecure } from '@axa-fr/react-oidc';

const Dashboard: React.FC = () => {

    // Because <Dashboard> is inside <Authorize> we can use the access token
    // to create an SWR Fetcher with Authorization Bearer header
    const swrFetcher = useAuthorizedSwrFetcher();

    // Request will be proxied via /api/demo/[...apiGateway].ts
    const { data, error } = useSWR('/api/demo/api/Values', swrFetcher);

    return (
        <div>
            <p>You have Administrator or Operation roles</p>
            <p>
                {JSON.stringify(data)}
            </p>
            <p style={{ color: 'red' }}>
                {error?.toString()}
            </p>
        </div>
    );
};

const DashboardPage: Page = () => {
    return (
        <OidcSecure>
            <Title>Dashboard</Title>
            <Dashboard></Dashboard>
        </OidcSecure>
    );
}

DashboardPage.layout = WithDefaultLayout;
export default DashboardPage;
