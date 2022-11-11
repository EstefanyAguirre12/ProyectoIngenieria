import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";
import { TenantComponent } from "../../pages/tenant/tenant.component";
import { BedsComponent } from "../../pages/beds/beds.component";
import { VisitsComponent } from "../../pages/visits/visits.component";
import { TreatmentsComponent } from "../../pages/treatments/treatments.component";
import { MedicinesComponent } from "../../pages/medicines/medicines.component";
import { DonationsComponent } from "../../pages/donations/donations.component";
import { EventsComponent } from "../../pages/events/events.component";
import { UsersComponent } from "../../pages/users/users.component";
import { ProfileComponent } from "../../pages/profile/profile.component";
import { TreatmentGivenComponent } from "app/pages/treatment-given/treatment-given.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule,
    NgxPaginationModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    TenantComponent,
    BedsComponent,
    VisitsComponent,
    TreatmentsComponent,
    MedicinesComponent,
    DonationsComponent,
    EventsComponent,
    UsersComponent,
    ProfileComponent,
    TreatmentGivenComponent,
  ],
})
export class AdminLayoutModule {}
