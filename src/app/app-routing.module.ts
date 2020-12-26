import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { COMMON_CONST } from "@common/constants/common.contant";
import { CanActivateRouteGuard } from "./auth/can-activate-route.guard";

const routes: Routes = [
  {
    path: "customers",
    loadChildren: () =>
      import("./customers/customers.module").then(m => m.CustomersModule),
    data: {
      breadcrumps: ["Customers"],
      screens: [COMMON_CONST.SCREENS.CUSTOMER]
    },
    canActivate: [CanActivateRouteGuard]
  },
  // {
  //   path: 'rfq',
  //   loadChildren: () => import('./rfq/rfq.module').then((m) => m.RfqModule),
  //   data: {
  //     breadcrumps: ['Request for Quotation'],
  //     screens: [COMMON_CONST.SCREENS.RFQ]
  //   },
  //   canActivate: [CanActivateRouteGuard]
  // },
  // {
  //   path: 'items',
  //   loadChildren: () =>
  //     import('./items/items.module').then((m) => m.ItemsModule),
  //   data: {
  //     breadcrumps: ['Settings', 'Items'],
  //     screens: [COMMON_CONST.SCREENS.ITEM_MASTER]
  //   },
  //   canActivate: [CanActivateRouteGuard]
  // },
  // {
  //   path: 'process',
  //   loadChildren: () =>
  //     import('./process/process.module').then((m) => m.ProcessModule),
  //   data: {
  //     breadcrumps: ['Settings', 'Process'],
  //     screens: [COMMON_CONST.SCREENS.PROCESS_MASTER]
  //   },
  //   canActivate: [CanActivateRouteGuard]
  // },
  // {
  //   path: 'categories',
  //   loadChildren: () =>
  //     import('./categories/categories.module').then((m) => m.CategoriesModule),
  //   data: {
  //     breadcrumps: ['Settings', 'Categories'],
  //     screens: [COMMON_CONST.SCREENS.CATEGORY_MASTER]
  //   },
  //   canActivate: [CanActivateRouteGuard]
  // },
  // {
  //   path: 'processitems',
  //   loadChildren: () =>
  //     import('./processitems/processitems.module').then(
  //       (m) => m.ProcessitemsModule
  //     ),
  //   data: {
  //     breadcrumps: ['Settings', 'Process', ['Items']],
  //     screens: [COMMON_CONST.SCREENS.PROCESS_ITEMS]
  //   },
  //   canActivate: [CanActivateRouteGuard]
  // },
  // {
  //   path: 'quotation',
  //   loadChildren: () =>
  //     import('./quotation/quotation.module').then((m) => m.QuotationModule),
  //   data: {
  //     breadcrumps: ['Quotation'],
  //     screens: [COMMON_CONST.SCREENS.QUOTATION]
  //   },
  //   canActivate: [CanActivateRouteGuard]
  // },
  // {
  //   path: 'customerorders',
  //   loadChildren: () =>
  //     import('./customerorders/customerorders.module').then((m) => m.CustomerordersModule),
  //   data: {
  //     breadcrumps: ['Customer Orders'],
  //     screens: [COMMON_CONST.SCREENS.CUSTOMER_ORDER]
  //   },
  //   canActivate: [CanActivateRouteGuard]
  // },
  // {
  //   path: 'estimation',
  //   loadChildren: () =>
  //     import('./estimation/estimation.module').then((m) => m.EstimationModule),
  //   data: {
  //     breadcrumps: ['Estimation'],
  //     screens: [COMMON_CONST.SCREENS.ESTIMATION, COMMON_CONST.SCREENS.BOQ]
  //   },
  //   canActivate: [CanActivateRouteGuard]
  // },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    data: {
      breadcrumps: ["Dashboard"],
      screens: []
    },
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
