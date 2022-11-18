import React, { useState } from 'react';
import useSWR from 'swr';
import { WithDefaultLayout } from '../../components/DefautLayout';
import { Title } from '../../components/Title';
import { Page } from '../../types/Page';
import { Table } from 'antd';
import { BackendApiUrl } from '../../functions/BackendApiUrl';
import { Authorize } from '../../components/Authorize';
import { useSwrFetcherWithAccessToken } from '../../functions/useSwrFetcherWithAccessToken';
import type { ColumnsType } from 'antd/es/table';

interface DataItem {
    type: string;
    value: number;
}

interface DataRow extends DataItem {
    rowNumber: number;
    key: React.Key;
}

const columns: ColumnsType<DataRow> = [
    {
        title: 'No.',
        dataIndex: 'rowNumber'
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title: 'Value',
        dataIndex: 'value',
    },
];

const Dashboard: React.FC = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Because <Dashboard> is inside <Authorize> we can use the access token
    // to create an SWR Fetcher with Authorization Bearer header
    const swrFetcher = useSwrFetcherWithAccessToken();

    const { data, error, isValidating } = useSWR<DataItem[]>(BackendApiUrl.test, swrFetcher);

    function dataSource(): DataRow[] {
        if (!data) {
            return [];
        }

        return data.map((item, index) => {
            const row: DataRow = {
                key: index,
                rowNumber: index + 1,
                type: item.type,
                value: item.value,
            };
            return row;
        })
    }

    return (
        <div>
            <Table dataSource={dataSource()}
                columns={columns}
                loading={isValidating}
                rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (e) => setSelectedRowKeys(e)
                }}
            />
            <pre><code>{JSON.stringify(selectedRowKeys)}</code></pre>
            <p className='text-red-600'>
                {error?.toString()}
            </p>
        </div>
    );
};

const DashboardPage: Page = () => {
    return (
        <Authorize>
            <Title>Dashboard</Title>
            <Dashboard></Dashboard>
        </Authorize>
    );
}

DashboardPage.layout = WithDefaultLayout;
export default DashboardPage;
