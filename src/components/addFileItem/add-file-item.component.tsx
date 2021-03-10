import React, { useState } from "react";
import { Input } from "antd";
import { FileMarkdownOutlined, FileAddOutlined } from "@ant-design/icons";
import "./add-file-item.style.scss";

interface IFileNameItem {
  id: string;
  defaultLabel: string;
  defaultEdit?: boolean;
  updateFilename: (id: string, name: string) => void;
}

const FileNameItem: React.FC<IFileNameItem> = ({
  id,
  defaultEdit,
  defaultLabel,
  updateFilename,
}) => {
  const [name, setName] = useState<string>(defaultLabel);
  const [isEdit, setIsEdit] = useState<boolean>(defaultEdit || false);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setName(value);
  };

  const handleKeyDown = (e: any) => {
    const isPassEnter = e.keyCode === 13;
    if (!isPassEnter) return;
    updateFilename(id, name);
    setIsEdit(false);
  };

  const handleChangeFileName = () => {
    setIsEdit(true);
  };

  const handleBlur = () => {
    if (!name) alert("what are you fuck doing");
    updateFilename(id, name);
    setIsEdit(false);
  };

  return (
    <div className="custom-file-name-item-wrapper">
      {isEdit ? (
        <Input
          autoFocus={true}
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="show-name-wrapper" onDoubleClick={handleChangeFileName}>
          <FileMarkdownOutlined />
          <span>{name}</span>
        </div>
      )}
    </div>
  );
};

export default FileNameItem;
