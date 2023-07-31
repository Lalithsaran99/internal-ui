import React from "react";
import authRoute from "./authRoute";

export const publicRoutes = [...authRoute];

export const protectedRoutes = [
  {
    key: "home",
    path: "/home",
    component: React.lazy(() => import("views/Home")),
    authority: [],
  },
  {
    key: "employee",
    path: "/employee",
    component: React.lazy(() => import("../../views/employee")),
    authority: [],
  },

  {
    key: "employee.edit",
    path: "/employee/edit/:id",
    component: React.lazy(() => import("../../views/employee/edit-employee")),
    authority: [],
  },
  {
    key: "employee.leave",
    path: "/employee/leave/:id",
    component: React.lazy(() => import("../../views/leave/leave-calendar")),
    authority: [],
  },
  {
    key: "leave",
    path: "/leave",
    component: React.lazy(() => import("../../views/leave")),
  },
  /** Example purpose only */
  // {
  //     key: 'singleMenuItem',
  //     path: '/single-menu-view',
  //     component: React.lazy(() => import('views/demo/SingleMenuView')),
  //     authority: [],
  // },
  // {
  //     key: 'collapseMenu.item1',
  //     path: '/collapse-menu-item-view-1',
  //     component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
  //     authority: [],
  // },
  // {
  //     key: 'collapseMenu.item2',
  //     path: '/collapse-menu-item-view-2',
  //     component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
  //     authority: [],
  // },
  // {
  //     key: 'groupMenu.single',
  //     path: '/group-single-menu-item-view',
  //     component: React.lazy(() => import('views/demo/GroupSingleMenuItemView')),
  //     authority: [],
  // },
  // {
  //     key: 'groupMenu.collapse.item1',
  //     path: '/group-collapse-menu-item-view-1',
  //     component: React.lazy(() => import('views/demo/GroupCollapseMenuItemView1')),
  //     authority: [],
  // },
  // {
  //     key: 'groupMenu.collapse.item2',
  //     path: '/group-collapse-menu-item-view-2',
  //     component: React.lazy(() => import('views/demo/GroupCollapseMenuItemView2')),
  //     authority: [],
  // },
];
