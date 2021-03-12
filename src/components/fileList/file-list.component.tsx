import React, { useState } from "react";
import { Menu, Button, Input } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import FileNameItem from "../addFileItem/add-file-item.component";
import fileHelper from "../../utils/fileHelper";
import {
  IFileListItem,
  IFileListEditingItem,
} from "../../interface/file-list.interface";
import "./file-list.style.scss";

const { Search } = Input;

const { join } = window.require("path");
const { remote } = window.require("electron");

interface IFileList {
  list: IFileListItem[];
  isShowSearch: boolean;
  onFileClick: (id: string) => void;
  udpateStoreValue: (newlist: any[]) => void;
}

const FileList = (props: IFileList) => {
  const { isShowSearch, onFileClick, list, udpateStoreValue } = props;
  const [activeFileId, setActiveFileId] = useState<string>("");
  const [showList, setShowList] = useState<IFileListEditingItem[]>(
    list.map((item) => ({ ...item, isNew: false }))
  );
  const savedLocation = remote.app.getPath("documents");

  const onSearch = (value: string) => {
    const key = value.trim().toLocaleLowerCase();
    if (!key) {
      setShowList(list.map((item) => ({ ...item, isNew: false })));
      return;
    }
    const newSearchedList = showList.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(key) ||
        (item.category || "").toLocaleLowerCase().includes(key)
    );
    setShowList(newSearchedList);
  };

  const handleAddNewFile = () => {
    const newList = _.clone(showList);
    newList.push({
      name: "",
      id: uuid(),
      isNew: true,
      location: join(savedLocation, ".md"),
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
    const newLocation = join(savedLocation, `${newName}.md`);
    if (isNew) {
      fileHelper.writeFile(newLocation, "");
    } else {
      const oldPath = join(savedLocation, `${newfileList[index].name}.md`);
      fileHelper.renameFile(oldPath, newLocation);
    }
    newfileList[index] = {
      ...newfileList[index],
      isNew: false,
      name: newName,
      location: newLocation,
    };
    udpateStoreValue(newfileList);
    setShowList(newfileList);
  };

  const handleDropNewItem = (id: string) => {
    const newfileList = showList.filter((item) => item.id !== id);
    setShowList(newfileList);
  };

  const handleFileClick = (id: string) => {
    setActiveFileId(id);
    onFileClick(id);
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
              isActive={activeFileId === item.id}
              onFileClick={handleFileClick}
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
