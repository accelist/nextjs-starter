import React, { useState } from "react";
import Head from 'next/head';
import { Avatar, Button, Col, Drawer, Layout, Menu, MenuProps, Row } from "antd";
import { faBars, faSignOut, faSignIn, faHome, faCubes, faUser, faUsers, faFlaskVial } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { css } from '@emotion/react';
import { useSession, signIn, signOut } from "next-auth/react";
import nProgress from "nprogress";

const { Content, Sider } = Layout;

const deepNavyBlue = '#001529';
const logoHeight = 48;

// https://emotion.sh/docs/best-practices
const styles = {
    sidebarLogo: css({
        height: logoHeight,
        padding: 8,
        margin: 16,
        color: 'white',
        background: '#333',
    }),
    sidebar: css({
        backgroundColor: deepNavyBlue,
        paddingBottom: 96,
    }),
    topbar: css({
        backgroundColor: deepNavyBlue,
        paddingLeft: 32,
        paddingRight: 32,
        paddingBottom: 16,
        paddingTop: 16,
        alignItems: 'center',
    }),
    topbarLogo: css({
        height: logoHeight,
        padding: 8,
        color: 'white',
        background: '#333',
    }),
    content: css({
        margin: 20,
        padding: 32,
        minHeight: 280,
        background: 'white'
    }),
    avatarContainer: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 24
    }),
    helloUser: css({
        color: 'white',
        marginTop: 16,
        marginBottom: 16
    })
};

const DefaultLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

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

        if (status === 'authenticated') {
            menu.push({
                key: '/sign-out',
                label: 'Sign out',
                icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
                onClick: () => {
                    nProgress.start();
                    signOut();
                    // HINT: use this method call if need to end SSO server authentication session:
                    // signOut({
                    //     callbackUrl: '/api/end-session'
                    // });
                }
            });
        } else {
            menu.push({
                key: '/sign-in',
                label: 'Sign in',
                icon: <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>,
                onClick: () => {
                    nProgress.start();
                    signIn('oidc');
                }
            });
        }

        return menu;
    }

    const displayUserName = session?.user?.name;

    function renderAvatar() {
        if (status === 'authenticated') {
            return (
                <div css={styles.avatarContainer}>
                    <div>
                        <Avatar size={64} icon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>} />
                    </div>
                    <div css={styles.helloUser}>
                        Hello, {displayUserName}
                    </div>
                </div>
            );
        }

        return null;
    }

    return (
        <Layout className="min-h-screen">
            <Head>
                <meta key="meta-charset" charSet="utf-8" />
                <meta key="meta-viewport" name="viewport" content="width=device-width, initial-scale=1" />
                <link key="favicon" rel="icon" href="/favicon.ico" />
            </Head>
            <Sider width={240} breakpoint="lg" collapsedWidth={0} trigger={null} css={styles.sidebar}>
                <div css={styles.sidebarLogo}>Logo</div>
                {renderAvatar()}
                <Menu theme="dark" mode="vertical" items={getMenu()}
                    selectedKeys={selected} onSelect={e => setSelected(e.selectedKeys)} />
            </Sider>
            <Drawer placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Menu className="border-0" mode="inline" items={getMenu()}
                    selectedKeys={selected} onSelect={e => setSelected(e.selectedKeys)} />
            </Drawer>
            <Layout>
                <Row css={styles.topbar} className='flex lg:hidden'>
                    <Col flex={1}>
                        <Button onClick={() => setDrawerOpen(true)} type='primary'>
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        </Button>
                    </Col>
                    <Col flex={1} css={styles.topbarLogo}>
                        Logo
                    </Col>
                    <Col flex={1}>
                    </Col>
                </Row>
                <Content css={styles.content}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export const WithDefaultLayout = (page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
