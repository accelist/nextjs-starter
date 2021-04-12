import React from "react";
import Head from 'next/head';
import PropTypes from 'prop-types';

export const DefaultLayout: React.FunctionComponent<{
    title: string;
    children?: React.ReactNode
}> = function (props) {
    return (
        <div>
            <Head>
                <meta key="meta-charset" charSet="utf-8" />
                <meta key="meta-viewport" name="viewport" content="width=device-width, initial-scale=1" />
                <title key="title">{props.title} - Next.js Starter</title>
            </Head>
            <header>
                {/* <NavigationBar></NavigationBar> */}
            </header>
            <main className="mb-5 mt-4 container">
                {props.children}
            </main>
            <footer>
            </footer>
        </div>
    );
}

DefaultLayout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}
