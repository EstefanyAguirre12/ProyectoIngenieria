import { CreateTreatmentGiven, TreatmentGiven, TreatmentResponse, UpdateTreatmentGiven } from './../interfaces/treatment-given';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, EMPTY } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';
import { TreatmentGivenResponse } from '../interfaces/treatment-given';
import { environment } from 'environments/environment';
import { ActionResponse } from "../interfaces/common";

@Injectable({
  providedIn: 'root'
})
export class TreatmentGivenService {
  private readonly _URL = environment.api;
  private readonly _TREATMENTGIVEN = "treatmentGiven";
  private readonly _TREATMENTS= "treatment";

  constructor(private _http: HttpClient, private _toastr: ToastrService ) { }

  getTreatmentGiven(page: string = "0", size: string = "100"): Observable<TreatmentGivenResponse> {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    let url = `${this._URL}${this._TREATMENTGIVEN}`;
    return this._http.get<TreatmentGivenResponse>(this._URL + this._TREATMENTGIVEN,{params}).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: TreatmentGivenResponse) => {
        return Response;
      })
    );
  }
  getTreatments( page: string = "0",
  size: string = "1000"): Observable<TreatmentResponse> {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    let url = `${this._URL}${this._TREATMENTS}`;
    return this._http.get<TreatmentResponse>(url,{params}).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: TreatmentResponse) => {
        return Response;
      })
    );
  }

  createTreatmentGiven(register: UpdateTreatmentGiven): Observable<ActionResponse> {
    let url = `${this._URL}${this._TREATMENTGIVEN}`;
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

  updateTreatmentGiven(register: UpdateTreatmentGiven): Observable<ActionResponse> {
    let url = `${this._URL}${this._TREATMENTGIVEN}/${register.id}/`;
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

  deleteTreatmentGiven(id: Number): Observable<ActionResponse> {
    let url = `${this._URL}${this._TREATMENTGIVEN}/${id}/`;
    return this._http.delete<ActionResponse>(url).pipe(
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
