import React, { useState } from "react";
import Head from 'next/head';
import { SideBar } from "./Sidebar";
import { Navbar } from "./Navbar";

const DefaultLayout: React.FC = ({ children }) => {
    const [displaySidebar, setDisplaySidebar] = useState(false);

    return (
        <React.Fragment>
            <Head>
                <meta key="meta-charset" charSet="utf-8" />
                <meta key="meta-viewport" name="viewport" content="width=device-width, initial-scale=1" />
                <link key="favicon" rel="icon" href="/favicon.ico" />
            </Head>
            <div className="navbar-frame">
                <Navbar toggleSidebar={() => setDisplaySidebar(!displaySidebar)}></Navbar>
                <div className="sidebar-frame">
                    <SideBar display={displaySidebar}></SideBar>
                    <main className="container py-4">
                        {children}
                    </main>
                </div>
            </div>
        </React.Fragment>
    );
}

export const WithDefaultLayout = (page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
