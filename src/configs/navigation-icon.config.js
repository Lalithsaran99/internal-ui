import React from "react";
import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineTemplate,
  HiOutlineViewGridAdd,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineIdentification,
} from "react-icons/hi";

const navigationIcon = {
  home: <HiOutlineHome />,
  employee: <HiOutlineUser />,
  applicant: <HiOutlineIdentification />,
  leave: <HiOutlineCalendar />,
  singleMenu: <HiOutlineViewGridAdd />,
  collapseMenu: <HiOutlineTemplate />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />,
};

export default navigationIcon;
