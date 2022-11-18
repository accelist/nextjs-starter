import React, { useState } from "react";
import Head from 'next/head';
import { Avatar, Button, ConfigProvider, Drawer, Layout, Menu, MenuProps } from "antd";
import { faBars, faSignOut, faSignIn, faHome, faCubes, faUser, faUsers, faFlaskVial } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import nProgress from "nprogress";

const { Content, Sider } = Layout;

const sidebarBackgroundColor = '#001529';
const sidebarMenuSelectedItemBackgroundColor = '#1677ff';

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
                <div className="flex flex-col items-center mt-6">
                    <div>
                        <Avatar size={64} icon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>} />
                    </div>
                    <div className="my-4 text-white">
                        Hello, {displayUserName}
                    </div>
                </div>
            );
        }

        return null;
    }

    return (
        <ConfigProvider theme={{
            components: {
                Layout: {
                    // Sidebar background color:
                    // https://github.com/ant-design/ant-design/blob/5.0.0/components/layout/style/index.tsx#L101
                    colorBgHeader: sidebarBackgroundColor
                }
            }
        }}>
            <Layout className="min-h-screen">
                <Head>
                    <meta key="meta-charset" charSet="utf-8" />
                    <meta key="meta-viewport" name="viewport" content="width=device-width, initial-scale=1" />
                    <link key="favicon" rel="icon" href="/favicon.ico" />
                </Head>

                <Sider width={240} className="pb-24 hidden lg:block">
                    <div className="h-12 p-2 m-4 text-white bg-slate-600">Logo</div>
                    {renderAvatar()}
                    <ConfigProvider theme={{
                        components: {
                            Menu: {
                                // https://github.com/ant-design/ant-design/blob/5.0.0/components/menu/style/theme.tsx#L48
                                colorItemBg: sidebarBackgroundColor,
                                // https://github.com/ant-design/ant-design/blob/5.0.0/components/menu/style/theme.tsx#L133
                                colorItemBgSelected: sidebarMenuSelectedItemBackgroundColor
                            }
                        }
                    }}>
                        <Menu theme="dark" mode="vertical" items={getMenu()}
                            selectedKeys={selected} onSelect={e => setSelected(e.selectedKeys)} />
                    </ConfigProvider>
                </Sider>
                <Drawer placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <ConfigProvider theme={{
                        components: {
                            Menu: {
                                // https://github.com/ant-design/ant-design/blob/5.0.0/components/menu/style/theme.tsx#L194
                                colorActiveBarBorderSize: 0
                            }
                        }
                    }}>
                        <Menu mode="inline" items={getMenu()}
                            selectedKeys={selected} onSelect={e => setSelected(e.selectedKeys)} />
                    </ConfigProvider>
                </Drawer>
                <Layout>
                    <div className='bg-topbar grid grid-cols-3 lg:hidden px-8 py-4 items-center'>
                        <div>
                            <Button onClick={() => setDrawerOpen(true)} type="primary">
                                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                            </Button>
                        </div>
                        <div className="h-12 p-2 text-white bg-slate-600">
                            Logo
                        </div>
                        <div></div>
                    </div>
                    <Content className="m-5 p-8 bg-white">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export const WithDefaultLayout = (page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
