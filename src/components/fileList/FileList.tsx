import React, { useEffect, useState } from "react";
import { Menu, Button, Input } from "antd";
import { FileMarkdownOutlined, FileAddOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import FileNameItem from "../addFileItem/add-file-item.component";
import "./_fileList.scss";
import Item from "antd/lib/list/Item";

const { Search } = Input;

interface IFileList {
  list: any[];
  isShowSearch: boolean;
  onFileClick: () => void;
  udpateStoreValue: (newlist: any[]) => void;
}

const FileList = (props: IFileList) => {
  const { isShowSearch, onFileClick, list, udpateStoreValue } = props;
  const [editTabId, setEditTabId] = useState<string>("");
  const [showList, setShowList] = useState<any[]>(list);

  const onSearch = (value: string) => {
    const key = value.trim().toLocaleLowerCase();
    // if (!key) {
    //   setShowList(list);
    //   return;
    // }
    // const newSearchedList = list.filter(
    //   (item) =>
    //     item.name.toLocaleLowerCase().includes(key) ||
    //     (item.category || "").toLocaleLowerCase().includes(key)
    // );
    // setShowList(newSearchedList);
  };

  const handleAddNewFile = () => {
    const newList = _.clone(showList);

    newList.push({
      name: "",
      id: uuid(),
      isNew: true,
    });

    setShowList(newList);

    // newList.push({
    //   name: '',
    //   id: uuid(),
    //   category: null,
    // });

    // setFileLists(list);

    // store.set("list", newList);

    // setShowList(newList);

    //generate new file in local document folder
    // console.log(join(savedLocation, "sean_node_base", "test.md"));

    // writeFile(join(savedLocation, "test.md"), "### Hello World");
  };

  const handleUpdateFilename = (id: string, newName: string) => {
    const newFileList = showList.map((list) => {
      if (list.id === id) {
        list.name = newName;
      }
      return list;
    });
    udpateStoreValue(newFileList);
    console.log(
      "🚀 ~ file: FileList.tsx ~ line 102 ~ handleUpdateFilename ~ newFileList",
      newFileList
    );

    setShowList(newFileList);
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
            onClick={handleAddNewFile}
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
        {showList.map((item) => {
          return (
            <FileNameItem
              key={item.id}
              id={item.id}
              defaultLabel={item.name}
              defaultEdit={item.isNew}
              updateFilename={handleUpdateFilename}
            />
          );
        })}
      </Menu>
    </div>
  );
};

export default FileList;
