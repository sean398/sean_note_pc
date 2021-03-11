import React, { useEffect, useState } from "react";
import { Menu, Button, Input } from "antd";
import { FileMarkdownOutlined, FileAddOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import FileNameItem from "../addFileItem/add-file-item.component";
import fileHelper from "../../utils/fileHelper";
import "./_fileList.scss";

const { Search } = Input;

const { join } = window.require("path");
const { remote } = window.require("electron");

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
  const savedLocation = remote.app.getPath("documents");

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
  };

  const handleCheckRepeat = (id: string, value: string) => {
    return (
      showList.findIndex((item) => item.id !== id && item.name === value) !== -1
    );
  };

  const handleUpdateFilename = (id: string, newName: string) => {
    const newfileList = _.clone(showList);
    const index = newfileList.findIndex((item) => item.id === id);
    if (index === -1) return;
    const isNew = newfileList[index].isNew;
    if (isNew) {
      fileHelper.writeFile(join(savedLocation, `${newName}.md`), "");
    } else {
      const oldPath = join(savedLocation, `${newfileList[index].name}.md`);
      const newPath = join(savedLocation, `${newName}.md`);
      fileHelper.renameFile(oldPath, newPath);
    }
    newfileList[index] = { ...newfileList[index], isNew: false, name: newName };
    udpateStoreValue(newfileList);
    setShowList(newfileList);
  };

  const handleDropNewItem = (id: string) => {
    const newfileList = showList.filter((item) => item.id !== id);
    setShowList(newfileList);
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
              isNew={item.isNew}
              checkIsRepeat={handleCheckRepeat}
              defaultLabel={item.name}
              defaultEdit={item.isNew}
              updateFilename={handleUpdateFilename}
              onDropNewItem={handleDropNewItem}
            />
          );
        })}
      </Menu>
    </div>
  );
};

export default FileList;
