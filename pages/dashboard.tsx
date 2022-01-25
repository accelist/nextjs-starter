import React from 'react';
import { Authorize } from '../components/Authorize';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';

const Index: Page = () => {
    return (
        <Authorize roles={['Administrator', 'Operation']}>
            <div>
                <Title name="Dashboard"></Title>
                You have Administrator or Operation roles
            </div>
        </Authorize>
    );
}

Index.layout = WithDefaultLayout;
export default Index;
