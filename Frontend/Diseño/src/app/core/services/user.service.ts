import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";
import { EMPTY, Observable } from "rxjs";
import { catchError, map, take } from "rxjs/operators";
import { ActionResponse } from "../interfaces/common";
import {
  AdminResponse, CreateAdmin, Admin
} from "../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly _URL = environment.apiAdmin;
  private readonly _USERS = "admins";

  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

  getUsers(page:string="0",size:string="100"): Observable<AdminResponse> {
    let params = new HttpParams();
    params = params.append("page", page );
    params = params.append("size", size);
    let url = `${this._URL}${this._USERS}`;
    return this._http.get<AdminResponse>(url, { params }).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: AdminResponse) => {
        return Response;
      })
    );
  }

  deleteUser(id: Number): Observable<ActionResponse> {
    let url = `${this._URL}${this._USERS}/${id}/`;

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

  createUser(register: CreateAdmin): Observable<any> {
    let url = `${this._URL}${this._USERS}`;
    return this._http.post<ActionResponse>(url, register).pipe(
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

  updateAdmin(register: Admin): Observable<any> {
    let url = `${this._URL}${this._USERS}/${register.id}/`;
    return this._http.patch<ActionResponse>(url, register).pipe(
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
