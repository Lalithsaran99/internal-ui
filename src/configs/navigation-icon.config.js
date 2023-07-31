import React from "react";
import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineTemplate,
  HiOutlineViewGridAdd,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";

const navigationIcon = {
  home: <HiOutlineHome />,
  employee: <HiOutlineUser />,
  leave: <HiOutlineCalendar />,
  singleMenu: <HiOutlineViewGridAdd />,
  collapseMenu: <HiOutlineTemplate />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />,
};

export default navigationIcon;
