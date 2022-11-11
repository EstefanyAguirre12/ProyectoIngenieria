import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {EMPTY, Observable} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {ProfileResponse, UpdateProfile} from "../interfaces/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly _URL = "assets/mockapi/";
  private readonly _USERS = "user.json";


  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

  getProfile(): Observable<ProfileResponse> {
    return this._http.get<ProfileResponse>(this._URL + this._USERS).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: ProfileResponse) => {
        return Response;
      })
    );
  }

  updateProfile(profile: UpdateProfile): Observable<any> {
    return this._http.put(this._URL, profile).pipe(
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

  errorHandle(error: HttpErrorResponse) {
    this._toastr.error(error.statusText, error.status.toString());
  }

}
