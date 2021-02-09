import { Layout } from "antd";
import { useState } from "react";
import { UserProfile, FileList, TabList } from "./components";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./App.scss";
import "antd/dist/antd.css";

const { Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMDEChange = (value: string) => {
    setValue(value);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <UserProfile />
        <FileList isShowSearch={!collapsed} />
      </Sider>
      <Layout className="site-layout">
        <Content>
          <TabList />
          <SimpleMDE
            value={value}
            onChange={handleMDEChange}
            options={{ minHeight: "650px" }}
          />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default App;
