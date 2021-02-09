import { Layout, Breadcrumb } from "antd";
import { useState } from "react";
import { UserProfile, FileList, TabList } from "./components";
import "./App.scss";
import "antd/dist/antd.css";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <UserProfile />
        <FileList />
      </Sider>
      <Layout className="site-layout">
        <Content>
          <TabList />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
