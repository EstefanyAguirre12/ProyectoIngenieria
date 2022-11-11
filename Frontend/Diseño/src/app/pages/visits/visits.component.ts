import { PayloadVisit, Tenant, Visit } from "./../../core/interfaces/visits";
import { VisitsService } from "./../../core/services/visits.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { AutocompleteComponent } from "angular-ng-autocomplete";

@Component({
  selector: "app-visits",
  templateUrl: "./visits.component.html",
  styleUrls: ["./visits.component.css"],
})
export class VisitsComponent implements OnInit {
  ////////////////////////////////////////////////////////////////////////////////
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;
  ////////////////////////////////////////////////////////////////////////////////

  @ViewChild("auto") autoComplete!: AutocompleteComponent;

  editVisit: Visit = null;
  public visitList: Visit[] = [];
  public tenatList: Tenant[] = [];
  keyword: string = "data";

  public formVisit: FormGroup = new FormGroup({
    visitanteName: new FormControl(null, [Validators.required]),
    visitanteDui: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    tenantId: new FormControl(null, [Validators.required]),
    notes: new FormControl(null, [Validators.required]),
  });

  constructor(private _visitService: VisitsService) {}

  ngOnInit(): void {
    this.onLoadRegisters();
    this.onLoadTenants();
  }

  onLoadRegisters(): void {
    this._visitService.getVisits( ((this.page - 1) * this.items).toString(),
    this.items.toString()).subscribe((response) => {
      this.registerNumber = response.registers; ///////// importatne para paginacion
      this.visitList = response.data;

    });
  }

  onSaveEdit(): void {
    if (this.editVisit == null) {
      this.onCreateVisit();
    } else {
      this.onUpdateVisit();
    }
  }

  onCreateVisit(): void {
    if (this.formVisit.valid) {
      const { visitanteName, visitanteDui, date, tenantId, notes } =
        this.formVisit.getRawValue();
      let visitTemp: PayloadVisit = {
        id: null,
        name: visitanteName,
        tenantidId: tenantId.id,
        dui: visitanteDui,
        date: moment(date).format("YYYY-MM-DD"),
        note: notes,
      };
      //this.visitList.push(visitTemp);
      this._visitService.createVisit(visitTemp).subscribe((response) => {
        this.onLoadRegisters();
        this._visitService.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
      this.formVisit.reset();
    } else {
    }
  }

  onUpdateVisit(): void {
    if (this.formVisit.valid) {
      this.formVisit.controls.tenantId.setValue(
        typeof this.formVisit.controls.tenantId.value == "string"
          ? this.editVisit.tenantid
          : this.formVisit.controls.tenantId.value
      );
      const { visitanteName, visitanteDui, date, tenantId, notes } =
        this.formVisit.getRawValue();
      let visitTemp: PayloadVisit = {
        id: this.editVisit.id,
        name: visitanteName,
        tenantidId: tenantId.id,
        dui: visitanteDui,
        date: moment(date).format("YYYY-MM-DD"),
        note: notes,
      };
      this.editVisit = null;
      this.formVisit.reset();
      this._visitService.updateVisit(visitTemp).subscribe((response) => {
        this.onLoadRegisters();
        this._visitService.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
    } else {
    }
  }

  onEditVisit(visit: Visit): void {
    visit.tenantid.data = `${visit.tenantid.dui} ${visit.tenantid.firstname} ${
      visit.tenantid.lastname
    } ${moment(visit.tenantid.birthday).format("DD/MM/YYYY")}`;
    this.formVisit.controls.visitanteName.setValue(visit.name);
    this.formVisit.controls.visitanteDui.setValue(visit.dui);
    this.formVisit.controls.date.setValue(visit.date);
    this.formVisit.controls.tenantId.setValue(visit.tenantid);
    this.formVisit.controls.notes.setValue(visit.note);
    this.editVisit = visit;
  }

  onDeleteVisit(id: Number): void {
    //this.visitList = this.visitList.filter((visit) => !(visit.id == id));
    this._visitService.deleteVisit(id).subscribe((response) => {
      if (response.code === 202) {
        this.onLoadRegisters();
      }
      this._visitService.showInfo(
        response.status,
        response.code,
        response.message
      );
    });
  }

  onLoadTenants(): void {
    this._visitService.getTenantsFree().subscribe((response) => {
      this.tenatList = response.data;
      this.tenatList.map((tenant) => {
        tenant.data = `${tenant.dui} ${tenant.firstname} ${
          tenant.lastname
        } ${moment(tenant.birthday).format("DD/MM/YYYY")}`;
      });
    });
  }

  pageChanged(data: any) {
    this.page = data;
    this.onLoadRegisters();
  }

  selectEvent(item) {
    //
  }

  onChangeSearch(val: string) {
    //
  }

  onFocused(e: any): void {
    this.autoComplete.query == null ? this.autoComplete.clear() : null;
  }
}
