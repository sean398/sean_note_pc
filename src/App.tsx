import { Layout } from "antd";
import { useState } from "react";
import { UserProfile, FileList, TabList } from "./components";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./App.scss";
import "antd/dist/antd.css";

const { Content, Sider } = Layout;

const Store = window.require("electron-store");
const store = new Store({ name: "Files Data" });

const App = () => {
  const [fileLists, setFileLists] = useState<any[]>(store.get("list") || []);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mdeValue, setValue] = useState<string>("123");

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMDEChange = (value: string) => {
    console.log(value);

    setValue(value);
  };

  const handleFileCLick = () => {
    console.log("reset");
    const data = new Date().getTime();

    setValue(data + "");
  };
  const handleTabClick = () => {
    const data = new Date().getTime();

    setValue(data + "");
  };

  const udpateStoreValue = (newList: any[]) => {
    store.set({ list: newList });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <UserProfile />
        <FileList
          list={fileLists}
          isShowSearch={!collapsed}
          onFileClick={handleFileCLick}
          udpateStoreValue={udpateStoreValue}
        />
      </Sider>
      <Layout className="site-layout">
        <Content>
          {/* <TabList onTabClick={handleTabClick} list={fileLists} /> */}
          <SimpleMDE
            value={mdeValue}
            onChange={handleMDEChange}
            options={{ minHeight: "650px" }}
          />
        </Content>
        {/* <Footer></Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;
