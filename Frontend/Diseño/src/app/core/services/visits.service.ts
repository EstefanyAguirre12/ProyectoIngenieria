import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";
import { Observable, EMPTY } from "rxjs";
import { take, catchError, map } from "rxjs/operators";
import { ActionResponse } from "../interfaces/common";
import {
  PayloadVisit,
  TenantResponse,
  Visit,
  VisitsResponse,
} from "../interfaces/visits";

@Injectable({
  providedIn: "root",
})
export class VisitsService {
  private readonly _URL = environment.api;
  private readonly _VISITS = "visit";
  private readonly _TENANTS = "tenant";

  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

  getVisits(
    page: string = "0",
    size: string = "100"
  ): Observable<VisitsResponse> {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    let url = `${this._URL}${this._VISITS}`;
    return this._http
      .get<VisitsResponse>(this._URL + this._VISITS, { params })
      .pipe(
        take(1),
        catchError((error) => {
          this.errorHandle(error);
          return EMPTY;
        }),
        map((Response: VisitsResponse) => {
          return Response;
        })
      );
  }

  getTenantsFree(
    page: string = "0",
    size: string = "1000"
  ): Observable<TenantResponse> {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    let url = `${this._URL}${this._TENANTS}`;
    return this._http.get<TenantResponse>(url,{params}).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: TenantResponse) => {
        return Response;
      })
    );
  }

  deleteVisit(id: Number): Observable<ActionResponse> {
    let url = `${this._URL}${this._VISITS}/${id}/`;

    return this._http.delete<ActionResponse>(url).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: any) => {
        return Response;
      })
    );
  }

  createVisit(payload: PayloadVisit): Observable<ActionResponse> {
    let url = `${this._URL}${this._VISITS}`;
    return this._http.post<ActionResponse>(url, payload).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: any) => {
        return Response;
      })
    );
  }

  updateVisit(payload: PayloadVisit): Observable<ActionResponse> {
    let url = `${this._URL}${this._VISITS}/${payload.id}/`;
    return this._http.patch<ActionResponse>(url, payload).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: any) => {
        return Response;
      })
    );
  }

  successHandle(status: string, code: number, message: string): void {
    this._toastr.success(code + status, message);
  }

  showInfo(status: string, code: number, message: string): void {
    const success = [200, 201, 202, 203, 206, 206];
    const error = [500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511];
    const warning = [
      400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411,
    ];

    if (success.includes(code)) {
      this._toastr.success(code + "-" + status, message);
    } else if (error.includes(code)) {
      this._toastr.error(code + "-" + status, message);
    } else if (warning.includes(code)) {
      this._toastr.warning(code + "-" + status, message);
    }
  }

  errorHandle(error: HttpErrorResponse) {
    this._toastr.error(error.statusText, error.status.toString());
  }
}
