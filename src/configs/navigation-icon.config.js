import React from "react";
import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineTemplate,
  HiOutlineViewGridAdd,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi";

const navigationIcon = {
  home: <HiOutlineHome />,
  contact: <HiOutlineUser />,
  singleMenu: <HiOutlineViewGridAdd />,
  collapseMenu: <HiOutlineTemplate />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />,
};

export default navigationIcon;
