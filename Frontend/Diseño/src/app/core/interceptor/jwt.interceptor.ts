import { catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newReq = request.clone();
    const token = localStorage.getItem("token");
    if (token) {
      newReq = request.clone({
        setHeaders: {
          Authorization: 'Admin '+token,
        },
      });
    }
    return next.handle(newReq).pipe(
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      })
    );
  }

  errorHandle(error: HttpErrorResponse) {
    const response = {
      status: "UNAUTHORIZED",
      message: "Unauthorized",
      code: 401,
      data: "Unauthorized",
    };
    if (
      error.error.code == response.code &&
      error.error.status == response.status
    ) {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    }
    // this._toastr.error(error.statusText, error.status.toString());
  }
}
