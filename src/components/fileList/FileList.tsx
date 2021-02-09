import React, { useState } from "react";
import { Menu, Button, Input } from "antd";
import { FileMarkdownOutlined, FileAddOutlined } from "@ant-design/icons";
import mockData from "../../mock/filelist.json";
import "./_fileList.scss";
const { SubMenu } = Menu;
const { Search } = Input;

interface IFileList {
  isShowSearch: boolean;
}

const FileList = (props: IFileList) => {
  const { category, list } = mockData;
  const { isShowSearch } = props;

  const [showList, setShowList] = useState(list);

  const unAssignedList = showList.filter((item) => !item.category);

  const onSearch = (value: string) => {
    const key = value.trim().toLocaleLowerCase();
    if (!key) {
      setShowList(list);
      return;
    }
    const newSearchedList = list.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(key) ||
        (item.category || "").toLocaleLowerCase().includes(key)
    );
    setShowList(newSearchedList);
  };

  return (
    <div className="sn-file-list-wrapper">
      {isShowSearch && (
        <>
          <Button
            className="sn-add-file-button"
            type="primary"
            shape="round"
            icon={<FileAddOutlined />}
            size="middle"
          >
            Add File
          </Button>
          <Search
            allowClear={true}
            onSearch={onSearch}
            style={{ width: "90%", margin: 10 }}
            placeholder="input search text"
          />
        </>
      )}
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {category.length > 0 &&
          category.map((cate) => {
            const filterList = showList.filter(
              (item) => item.category === cate
            );
            return (
              <SubMenu key={`${cate}file_list_category`} title={cate}>
                {filterList.map((item) => {
                  return (
                    <Menu.Item
                      key={item.id + "file_list"}
                      icon={<FileMarkdownOutlined />}
                    >
                      {item.name}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })}
        {unAssignedList.length > 0 &&
          unAssignedList.map((item) => {
            return (
              <Menu.Item
                key={item.id + "file_list"}
                icon={<FileMarkdownOutlined />}
              >
                {item.name}
              </Menu.Item>
            );
          })}
      </Menu>
    </div>
  );
};

export default FileList;
