import { API_RESPONSE } from "./../interfaces/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { AuthLogin, AuthResponse } from "../interfaces/auth";
import { catchError, map, take, tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly _URL = "admins/auth-via-email";
  private readonly _USERS = "users.json";

  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

  onAutenticateCredentials(credentials: AuthLogin): Observable<AuthResponse> {
    let cred:any = {
      email: credentials.username,
      password: credentials.password
    }
    return this._http
      .post<AuthResponse>("https://retirement-robin.vicquemare.repl.co/api/" + this._URL, cred)
      .pipe(
        take(1),
        catchError((error) => {
          this.errorHandle(error);
          return EMPTY;
        })
      );
  }

  /*   onRegister(user: any): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(this._URL, user).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      })
    );
  }

  getUsers(): Observable<AuthResponse> {
    return this._http.get<AuthResponse>(this._URL + this._USERS).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: AuthResponse) => {
        return Response;
      })
    );
  }
 */
  onSetToken(token: string): void {
    localStorage.setItem("token", token);
    console.log("Token guardado");
    
  }

  onGetToken(): string {
    return localStorage.getItem("token") || null;
  }

  onRemoveToken(): void {
    localStorage.removeItem("token")
  }

  errorHandle(error: HttpErrorResponse) {
    this._toastr.error(error.statusText, error.status.toString());
  }
}
