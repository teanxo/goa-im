import { MessageOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'
const { Header } = Layout;

const menuList = [
    {
        key: 'im',
        icon: <MessageOutlined />,
        label: '在线聊天',
        path: '/im'
    },
    // {
    //     key: 'my',
    //     label: '关于我们',
    //     path: '/about' 
    // }
]

const WebLayout = ({ children }) => {

    const location = useLocation()
    const selectKey = menuList.find(item => item.path === location.pathname)?.key

    return (
        <div className='Layout'>
            <Layout >
                <Header>
                    <div className="logo" />
                    <Menu className='header-menu' theme="dark" mode="horizontal" selectedKeys={[selectKey]}>
                        {menuList.map((item, index) => (
                            <Menu.Item key={item.key} style={item.style}>
                                <Link to={item.path}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Header >
                <div className='LayoutContainer'>
                    {children}
                </div>
            </Layout>
        </div>
    )
}

export default WebLayout