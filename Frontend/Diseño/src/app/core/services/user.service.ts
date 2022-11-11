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
  Gender,
  GenderResponse,
  RolesResponse,
  User,
  UserPayload,
  UsersResponse,
} from "../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly _URL = environment.api;
  private readonly _USERS = "users";
  private readonly _ROLS = "role";
  private readonly _GENDER = "gender";

  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

  getUsers(page:string="0",size:string="100"): Observable<UsersResponse> {
    let params = new HttpParams();
    params = params.append("page", page );
    params = params.append("size", size);
    let url = `${this._URL}${this._USERS}`;
    return this._http.get<UsersResponse>(url, { params }).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: UsersResponse) => {
        return Response;
      })
    );
  }

  getRoles(): Observable<RolesResponse> {
    let url = `${this._URL}${this._ROLS}`;
    return this._http.get<RolesResponse>(url).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: RolesResponse) => {
        return Response;
      })
    );
  }

  getGender(): Observable<GenderResponse> {
    return this._http.get<GenderResponse>(this._URL + this._GENDER).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
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

  createUser(payload: UserPayload): Observable<ActionResponse> {
    let url = `${this._URL}${this._USERS}`;
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

  updateUser(payload: UserPayload): Observable<ActionResponse> {
    let url = `${this._URL}${this._USERS}/${payload.id}/`;
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
