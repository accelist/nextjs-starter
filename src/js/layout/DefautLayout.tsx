import React from "react";
import Head from 'next/head';

export const DefaultLayout: React.FunctionComponent = function ({ children }) {
    return (
        <div>
            <Head>
                <meta key="meta-charset" charSet="utf-8" />
                <meta key="meta-viewport" name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <header>
                HEADER GOES HERE
                {/* <NavigationBar></NavigationBar> */}
            </header>
            <main className="mb-5 mt-4 container">
                {children}
            </main>
            <footer>
            </footer>
        </div>
    );
}
