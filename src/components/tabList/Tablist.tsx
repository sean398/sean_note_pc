import { FileMarkdownOutlined, CloseOutlined } from "@ant-design/icons";

import { useState } from "react";
import classnames from "classnames";
import "./_tablist.scss";

interface ITabList {
  list: any[];
  onTabClick: () => void;
}

const TabList = (props: ITabList) => {
  const { list } = props;
  const { onTabClick } = props;
  const [activeId, setActiveId] = useState(list[0].id);

  const handleTabClick = (id: number, e: any) => {
    if (e.button === 1) {
      //鼠标中建 delete
      return;
    }
    onTabClick();
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
            // onClick={handleTabClick.bind(null, item.id)}
            onMouseDown={handleTabClick.bind(null, item.id)}
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
