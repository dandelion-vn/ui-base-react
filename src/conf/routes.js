import React from 'react';
import {pathConstant} from "@src/constant";
import {Auth, Cms} from "@src/app/layout";
import {Account, Application, Call, Dashboard, Login, Product, Ticket} from "@src/app/page";


export const routes = [
  {
    exact: false,
    path: pathConstant.AUTH,
    component: Auth,
    routes: [
      {
        exact: true,
        path: pathConstant.SIGN_IN,
        component: Login,
      }
    ]
  },
  {
    exact: false,
    path: pathConstant.CMS,
    auth: true,
    component: Cms,
    routes: [
      {
        exact: true,
        path: pathConstant.DASHBOARD,
        component: Dashboard,
      },
      {
        exact: true,
        path: pathConstant.CALL,
        component: Call,
      },
      {
        exact: true,
        path: pathConstant.TICKET,
        component: Ticket,
      },
      {
        exact: true,
        path: pathConstant.APPLICATION,
        component: Application,
      },
      {
        exact: true,
        path: pathConstant.PRODUCT,
        component: Product,
      },
      {
        exact: true,
        path: pathConstant.ACCOUNT,
        component: Account,
      }
    ]
  }
];
