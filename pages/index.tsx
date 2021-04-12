import React from 'react';
import { DefaultLayout } from '../src/js/layout/DefautLayout';

const Index: React.FunctionComponent = function () {
    return (
        <div>Hello World!</div>
    );
}

export default function IndexPage(): JSX.Element {
    return (
        <DefaultLayout title="Home">
            <Index></Index>
        </DefaultLayout>
    );
}
