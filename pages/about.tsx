import React from 'react';
import { DefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';

const Index: Page = () => {
    return (
        <div>
            <Title name="About Us"></Title>
            Lorem Ipsum Dolor Sit Amet
        </div>
    );
}

Index.layout = DefaultLayout;
export default Index;
