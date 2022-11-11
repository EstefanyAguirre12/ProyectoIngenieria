import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { AuthService } from "./core/services/auth.service";
import { JwtInterceptor } from "./core/interceptor/jwt.interceptor";

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      easeTime: 200,
      positionClass: "toast-top-right",
      progressBar: true,
      preventDuplicates: true,
      closeButton: true,
      countDuplicates: true,
      tapToDismiss: true,
    }),
    FooterModule,
    FixedPluginModule,
  ],
  providers: [
    AuthService,
    {
        provide : HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi   : true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
