import React from 'react';
import { DefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';

const Index: Page = () => {
    return (
        <div>
            <Title name="Home"></Title>
            Hello World!
        </div>
    );
}

Index.layout = DefaultLayout;
export default Index;
