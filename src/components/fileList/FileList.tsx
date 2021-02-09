import React from "react";
import { Menu } from "antd";
import { FileMarkdownOutlined } from "@ant-design/icons";
import mockData from "../../mock/filelist.json";
const { SubMenu } = Menu;

const FileList = () => {
  const { category, list } = mockData;

  const unAssignedList = list.filter((item) => !item.category);

  return (
    <div className="sn-file-list-wrapper">
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {category.length > 0 &&
          category.map((cate) => {
            const filterList = list.filter((item) => item.category === cate);
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
