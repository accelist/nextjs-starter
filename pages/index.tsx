import React from 'react';
import { Page } from '../src/js/components/Page';
import { DefaultLayout } from '../src/js/layout/DefautLayout';
import { Title } from '../src/js/components/Title';
import Link from 'next/link';

const Index: Page = function () {
    return (
        <div>
            <Title name="Home"></Title>
            Hello World!
            <Link href="/about">
                <a>About Page</a>
            </Link>
        </div>
    );
}

Index.layout = DefaultLayout;
export default Index;
