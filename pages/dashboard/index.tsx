import React, { useState } from 'react';
import useSWR from 'swr';
import { WithDefaultLayout } from '../../components/DefautLayout';
import { Title } from '../../components/Title';
import { useAuthorizedSwrFetcher } from '../../functions/useAuthorizedSwrFetcher';
import { Page } from '../../types/Page';
import { OidcSecure } from '@axa-fr/react-oidc';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const rows: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const Dashboard: React.FC = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Because <Dashboard> is inside <OidcSecure> we can use the access token
    // to create an SWR Fetcher with Authorization Bearer header
    const swrFetcher = useAuthorizedSwrFetcher();

    // Request will be proxied via /api/demo/[...apiGateway].ts
    const { data, error } = useSWR('/api/demo/api/Values', swrFetcher);

    return (
        <div>
            <Table
                rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (e) => setSelectedRowKeys(e)
                }}
                columns={columns}
                dataSource={rows}
            />
            <pre><code>{JSON.stringify(selectedRowKeys)}</code></pre>
            <pre><code>{JSON.stringify(data)}</code></pre>
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
