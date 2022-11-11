import { TreatmentGivenComponent } from "./../../pages/treatment-given/treatment-given.component";
import { ProfileComponent } from "./../../pages/profile/profile.component";
import { DonationsComponent } from "./../../pages/donations/donations.component";
import { EventsComponent } from "./../../pages/events/events.component";
import { MedicinesComponent } from "./../../pages/medicines/medicines.component";
import { TreatmentsComponent } from "./../../pages/treatments/treatments.component";
import { VisitsComponent } from "./../../pages/visits/visits.component";
import { BedsComponent } from "./../../pages/beds/beds.component";
import { TenantComponent } from "./../../pages/tenant/tenant.component";
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";
import { UsersComponent } from "app/pages/users/users.component";
import { AuthGuard } from "app/core/guards/auth.guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    //canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
   /*  component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    }, */
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "user", component: UserComponent },
      { path: "table", component: TableComponent },
      { path: "typography", component: TypographyComponent },
      { path: "icons", component: IconsComponent },
      { path: "maps", component: MapsComponent },
      { path: "notifications", component: NotificationsComponent },
      { path: "upgrade", component: UpgradeComponent },
      { path: "tenant", component: TenantComponent },
      { path: "beds", component: BedsComponent },
      { path: "visits", component: VisitsComponent },
      { path: "treatments", component: TreatmentsComponent },
      { path: "medicines", component: MedicinesComponent },
      { path: "events", component: EventsComponent },
      { path: "donations", component: DonationsComponent },
      { path: "users", component: UsersComponent },
      { path: "profile", component: ProfileComponent },
      { path: "treatments-given", component: TreatmentGivenComponent },
    ],
  },
];
