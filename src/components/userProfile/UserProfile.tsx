import React, { useState } from "react";
import classnames from "classnames";
import { Avatar, Image, Modal } from "antd";
import { user_detail } from "../../mock/userprofile";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import "./_userProfile.scss";

const UserProfile = () => {
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  const handleShowDetail = () => {
    setIsShowDetail(!isShowDetail);
  };

  return (
    <div className="sn-user-profile-warpper  sn-font-white">
      <div className="user-detail-main">
        <div className="user-photo sn-text-align">
          <Avatar
            src={
              <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
          />
        </div>
        <div className="user-name-wrapper">
          <span className="user-name sn-font-16">{user_detail.name}</span>
          <span className="show-more-icon">
            {isShowDetail ? (
              <UpOutlined onClick={handleShowDetail} />
            ) : (
              <DownOutlined onClick={handleShowDetail} />
            )}
          </span>
        </div>
      </div>

      <Modal
        visible={isShowDetail}
        mask={false}
        footer={null}
        getContainer={false}
        style={{ marginLeft: 5, top: 75 }}
        onCancel={handleShowDetail}
      >
        <div className={"user-detials sn-font-12"}>
          {user_detail.email && (
            <div className="user-email">{`email: ${user_detail.email}`}</div>
          )}
          {user_detail.more && (
            <div className="user-more">{user_detail.more}</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
