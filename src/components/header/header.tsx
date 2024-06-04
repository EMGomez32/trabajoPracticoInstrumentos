import React from "react";
import { Layout, Menu } from "antd";

import Rutas from "../../routes/Routes";
import { Link } from "react-router-dom";
const { Header } = Layout;

const HeaderLayout: React.FC = () => {
    return (
        <Layout>
            <Header className="antd-header" style={{ display: 'flex', alignItems: 'center', width: "100%", backgroundColor: '#123456' }}>
                
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#123456' }}
                >
                    <Menu.Item key="1">
                    <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Link to="/dondeEstamos">Donde Estamos</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/productos">Productos</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Rutas />
        </Layout>
    );
};

export default HeaderLayout;