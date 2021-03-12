import React, { useState } from "react";
import { Input } from "antd";
import { FileMarkdownOutlined, FileAddOutlined } from "@ant-design/icons";
import classnames from "classnames";
import "./add-file-item.style.scss";

interface IFileNameItem {
  id: string;
  isNew: boolean;
  isActive: boolean;
  defaultLabel: string;
  defaultEdit?: boolean;
  onFileClick: (id: string) => void;
  onDropNewItem: (id: string) => void;
  updateFilename: (id: string, name: string) => void;
  checkIsRepeat: (id: string, value: string) => boolean;
}

const FileNameItem: React.FC<IFileNameItem> = ({
  id,
  isNew,
  isActive,
  defaultEdit,
  defaultLabel,
  onFileClick,
  onDropNewItem,
  updateFilename,
  checkIsRepeat,
}) => {
  const [name, setName] = useState<string>(defaultLabel);
  const [isEdit, setIsEdit] = useState<boolean>(defaultEdit || false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setName(value);
    if (!value || checkIsRepeat(id, value)) {
      console.log(value);
      setIsShowAlert(true);
      return;
    }
    isShowAlert && setIsShowAlert(false);
  };

  const handleKeyDown = (e: any) => {
    const isPassEnter = e.keyCode === 13;
    if (!isPassEnter) return;
    if (!name || checkIsRepeat(id, name)) {
      setName(defaultLabel);
      isNew && onDropNewItem(id);
      return;
    }
    updateFilename(id, name);
    setIsEdit(false);
  };

  const handleChangeFileName = () => {
    setIsEdit(true);
  };

  const handleBlur = () => {
    if (!name || checkIsRepeat(id, name)) {
      setName(defaultLabel);
      isNew && onDropNewItem(id);
      return;
    }
    updateFilename(id, name);
    setIsEdit(false);
  };

  const handleFileClick = () => {
    if (isActive) return;
    onFileClick(id);
  };

  return (
    <div className="custom-file-name-item-wrapper">
      {isEdit ? (
        <div>
          <Input
            autoFocus={true}
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          {isShowAlert && (
            <div className="input-alert-message">
              {!name
                ? "A file name must be provided"
                : "File name can not be same"}
            </div>
          )}
        </div>
      ) : (
        <div
          className={classnames("show-name-wrapper", {
            active: isActive,
          })}
          onClick={handleFileClick}
          onDoubleClick={handleChangeFileName}
        >
          <FileMarkdownOutlined />
          <span>{name}</span>
        </div>
      )}
    </div>
  );
};

export default FileNameItem;
