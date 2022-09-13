import React, { useState } from "react";
import Head from 'next/head';
import { Avatar, Col, Drawer, Layout, Menu, MenuProps, Row } from "antd";
import { faBars, faSignOut, faSignIn, faHome, faCubes, faUser, faUsers, faFlaskVial } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import { ReactCSS } from "../functions/ReactCSS";

const { Content, Sider } = Layout;

const deepNavyBlue = '#001529';
const logoHeight = 48;

const styles = ReactCSS.create({
    container: {
        minHeight: '100vh'
    },
    sidebarLogo: {
        height: logoHeight,
        padding: 8,
        margin: 16,
        color: 'white',
        background: '#333',
    },
    sidebar: {
        backgroundColor: deepNavyBlue,
        paddingBottom: 96,
    },
    topbar: {
        backgroundColor: deepNavyBlue,
        paddingLeft: 32,
        paddingRight: 32,
        paddingBottom: 16,
        paddingTop: 16,
        display: "flex",
        alignItems: 'center',
    },
    topbarLogo: {
        height: logoHeight,
        padding: 8,
        color: 'white',
        background: '#333',
    },
    content: {
        margin: 20,
        padding: 32,
        minHeight: 280,
        background: 'white'
    },
    avatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 24
    },
    helloUser: {
        color: 'white',
        marginTop: 16,
        marginBottom: 16
    }
});

const DefaultLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated, login, logout } = useOidc();
    const { oidcUser } = useOidcUser();

    // menu.key must match the router.pathname, see example below: "/dashboard"
    const [selected, setSelected] = useState([router.pathname]);

    // key must also be unique, for obvious reason
    function getMenu(): MenuProps['items'] {
        const menu: MenuProps['items'] = [];

        menu.push({
            key: '/',
            label: 'Home',
            icon: <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>,
            onClick: () => router.push('/')
        });

        menu.push(
            {
                key: '#menu-1',
                label: 'Menu 1',
                icon: <FontAwesomeIcon icon={faCubes}></FontAwesomeIcon>,
                children: [
                    {
                        key: '/dashboard',
                        label: 'Dashboard',
                        onClick: () => router.push('/dashboard')
                    },
                    {
                        key: '/sub-menu-b',
                        label: 'Sub Menu B',
                        onClick: () => router.push('/')
                    },
                    {
                        key: '/sub-menu-c',
                        label: 'Sub Menu C',
                        onClick: () => router.push('/')
                    }
                ]
            },
            {
                key: '#menu-2',
                label: 'Menu 2',
                icon: <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>,
                children: [
                    {
                        key: '/sub-menu-d',
                        label: 'Sub Menu D',
                        onClick: () => router.push('/')
                    },
                    {
                        key: '/sub-menu-e',
                        label: 'Sub Menu E',
                        onClick: () => router.push('/')
                    },
                    {
                        key: '/sub-menu-f',
                        label: 'Sub Menu F',
                        onClick: () => router.push('/')
                    }
                ]
            },
            {
                key: '#menu-3',
                label: 'Menu 3',
                icon: <FontAwesomeIcon icon={faFlaskVial}></FontAwesomeIcon>,
                children: [
                    {
                        key: '/sub-menu-g',
                        label: 'Sub Menu G',
                        onClick: () => router.push('/')
                    },
                    {
                        key: '/sub-menu-h',
                        label: 'Sub Menu H',
                        onClick: () => router.push('/')
                    },
                    {
                        key: '/sub-menu-i',
                        label: 'Sub Menu I',
                        onClick: () => router.push('/')
                    }
                ]
            }
        );

        if (isAuthenticated) {
            menu.push({
                key: '/sign-out',
                label: 'Sign out',
                icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
                onClick: () => logout()
            });
        } else {
            menu.push({
                key: '/sign-in',
                label: 'Sign in',
                icon: <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>,
                onClick: () => login()
            });
        }

        return menu;
    }

    function getUserName(): string {
        // oidc user can be null before user data is loaded, be careful
        if (oidcUser) {
            return oidcUser.name;
        }

        return '';
    }

    function renderAvatar() {
        if (isAuthenticated) {
            return (
                <div style={styles.avatarContainer}>
                    <div>
                        <Avatar size={64} icon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>} />
                    </div>
                    <div style={styles.helloUser}>
                        Hello, {getUserName()}
                    </div>
                </div>
            );
        }

        return null;
    }

    return (
        <Layout style={styles.container}>
            <Head>
                <meta key="meta-charset" charSet="utf-8" />
                <meta key="meta-viewport" name="viewport" content="width=device-width, initial-scale=1" />
                <link key="favicon" rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Sider width={240} breakpoint="lg" collapsedWidth={0} trigger={null} style={styles.sidebar}>
                    <div style={styles.sidebarLogo}>Logo</div>
                    {renderAvatar()}
                    <Menu theme="dark" mode="vertical" items={getMenu()}
                        selectedKeys={selected} onSelect={e => setSelected(e.selectedKeys)} />
                </Sider>
                <Layout>
                    <Drawer placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        <Menu className="border-0" mode="inline" items={getMenu()}
                            selectedKeys={selected} onSelect={e => setSelected(e.selectedKeys)} />
                    </Drawer>
                    <Row style={styles.topbar} className='d-lg-none'>
                        <Col flex={1}>
                            <button onClick={() => setDrawerOpen(true)} type="button" className='btn btn-outline-primary'>
                                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                            </button>
                        </Col>
                        <Col flex={1} style={styles.topbarLogo}>
                            Logo
                        </Col>
                        <Col flex={1}>
                        </Col>
                    </Row>
                    <Content style={styles.content}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export const WithDefaultLayout = (page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
