import { LoginTokenGuard } from './core/guards/login-token.guard';
import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "login",
    canActivate: [LoginTokenGuard],
    loadChildren: () =>
      import("./layouts/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "**",
    redirectTo: "login",
  },
];
