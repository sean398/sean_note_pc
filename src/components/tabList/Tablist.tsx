import mockData from "../../mock/filelist.json";
import { FileMarkdownOutlined, CloseOutlined } from "@ant-design/icons";

import { useState } from "react";
import classnames from "classnames";
import "./_tablist.scss";

const TabList = () => {
  const { list } = mockData;
  const [activeId, setActiveId] = useState(list[0].id);

  const handleTabClick = (id: number) => {
    setActiveId(id);
  };

  return (
    <div className="sn-tab-list-wrapper sn-font-white">
      {list.map((item) => {
        return (
          <div
            className={classnames("sn-tab-list-item sn-cursor-pointer", {
              active: activeId === item.id,
            })}
            key={item.id}
            data-id={item.id}
            onClick={handleTabClick.bind(null, item.id)}
          >
            <FileMarkdownOutlined />
            <span className="list-name ">{item.name}</span>
            <CloseOutlined className="sn-fl-right  sn-font-12 " />
          </div>
        );
      })}
    </div>
  );
};

export default TabList;
