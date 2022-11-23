import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { BedService } from "./../../core/services/bed.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Bed, Tenant, UpdateBed } from "app/core/interfaces/bed";
import * as moment from "moment";
import { AutocompleteComponent } from "angular-ng-autocomplete";

@Component({
  selector: "app-beds",
  templateUrl: "./beds.component.html",
  styleUrls: ["./beds.component.css"],
})
export class BedsComponent implements OnInit {
  ////////////////////////////////////////////////////////////////////////////////
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;
  ////////////////////////////////////////////////////////////////////////////////

  @ViewChild("auto") autoComplete!: AutocompleteComponent;

  editBed: Bed = null;
  public bedList: Bed[] = [];
  public tenatList: Tenant[] = [];
  keyword: string = "data";

  public formBed: FormGroup = new FormGroup({
    bedNumber: new FormControl(null, [Validators.required]),
    tenantId: new FormControl(null, [Validators.required]),
  });

  constructor(private _bedService: BedService) {}

  ngOnInit(): void {
    this.onLoadRegisters();
    this.onLoadTenants();
  }
  onLoadRegisters(): void {
    this._bedService
      .getBeds(((this.page - 1) * this.items).toString(), this.items.toString())
      .subscribe((response) => {
        this.registerNumber = response.totalItems; ///////// importatne para paginacion
        this.bedList = response.items;
        console.log(this.bedList);
      });
  }

  onSaveEdit(): void {
    if (this.editBed == null) {
      this.onCreateBed();
    } else {
      this.onUpdateBed();
    }
  }

  onCreateBed(): void {
    if (this.formBed.valid) {
      let bedTemp: UpdateBed = {
        id: null,
        number: this.formBed.getRawValue().bedNumber,
        tenantid: this.formBed.getRawValue().tenantId.id,
      };
      this._bedService.createBed(bedTemp).subscribe((response) => {
        this.onLoadRegisters();
      });
      this.formBed.reset();
    } else {
    }
  }

  onUpdateBed(): void {
    if (this.formBed.valid) {
      this.formBed.controls.tenantId.setValue(
        typeof this.formBed.controls.tenantId.value == "string"
          ? this.editBed.tenantid
          : this.formBed.controls.tenantId.value
      );
      let bedTemp: UpdateBed = {
        id: this.editBed.id,
        number: this.formBed.getRawValue().bedNumber,
        tenantid: this.formBed.getRawValue().tenantId.id,
      };
      this.editBed = null;
      this.formBed.reset();
      this._bedService.updateBed(bedTemp).subscribe((response) => {
        this.onLoadRegisters();
      });
    } else {
    }
  }

  onDeleteBed(id: Number): void {
    //this.bedList = this.bedList.filter((bed) => !(bed.id == id));
    this._bedService.deleteBed(id).subscribe((response) => {
      this.onLoadRegisters();
    });
  }

  onEditBed(bed: Bed): void {
    //Compare if an object is equal to a number
    let tenantTemp = this.tenatList.find((tenant) => tenant.id == bed.tenantid);
    let tenantData = `${tenantTemp.dui} ${tenantTemp.firstname} ${
      tenantTemp.lastname
    } ${moment(tenantTemp.birthday).format("DD/MM/YYYY")}`;
    this.formBed.controls.bedNumber.setValue(bed.number);
    this.formBed.controls.tenantId.setValue(tenantData);
    this.editBed = bed;
  }

  onLoadTenants(): void {
    this._bedService.getTenantsFree().subscribe((response) => {
      this.tenatList = response.items;
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

  onFocused(e: any): void {
    this.autoComplete.query == null ? this.autoComplete.clear() : null;
  }

  openPanel(e): void {}

  selectEvent(item) {
    //
  }

  onChangeSearch(val: string) {
    //
  }
}
