import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Observable, EMPTY } from "rxjs";
import { take, catchError, map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { ActionResponse } from '../interfaces/common';
import { Event, EventResponse, CreateEvent, UpdateEvent } from "../interfaces/event";


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly _URL = environment.api;
  private readonly _EVENT = "event";

  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

  getEvents(page: string = "0", size: string = "100"): Observable<EventResponse> {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    let url = `${this._URL}${this._EVENT}`;
    return this._http.get<EventResponse>(url,{params}).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: EventResponse) => {
        return Response;
      })
    );
  }

  deleteEvent(id: Number): Observable<ActionResponse> {
    let url = `${this._URL}${this._EVENT}/${id}/`;
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

  createEvent(register: UpdateEvent): Observable<ActionResponse> {
    let url = `${this._URL}${this._EVENT}`;
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

  updateEvent(register: UpdateEvent): Observable<ActionResponse> {
    let url = `${this._URL}${this._EVENT}/${register.id}/`;
    return this._http.put<ActionResponse>(url, register).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
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
