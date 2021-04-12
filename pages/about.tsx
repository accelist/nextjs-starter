import React from 'react';
import { Page } from '../src/js/Page';
import { DefaultLayout } from '../src/js/layout/DefautLayout';
import { Title } from '../src/js/components/Title';

const Index: Page = function () {
    return (
        <div>
            <Title name="About Us"></Title>
            Lorem Ipsum Dolor Sit Amet
        </div>
    );
}

Index.layout = DefaultLayout;
export default Index;
