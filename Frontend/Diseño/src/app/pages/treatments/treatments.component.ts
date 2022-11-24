import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { TreatmentService } from "app/core/services/treatment.service";
import { Treatment, Tenant, Medicine, UpdateTreatment } from "app/core/interfaces/treatment";
import * as moment from "moment";
import { AutocompleteComponent } from "angular-ng-autocomplete";

@Component({
  selector: "app-treatments",
  templateUrl: "./treatments.component.html",
  styleUrls: ["./treatments.component.css"],
})
export class TreatmentsComponent implements OnInit {
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;

  @ViewChild("auto") autoComplete!: AutocompleteComponent;
  @ViewChild("auto2") autoComplete2!: AutocompleteComponent;

  editTreatment: Treatment = null;
  public treatmentList: Treatment[] = [];
  public tenatList: Tenant[] = [];
  public medicineList: Medicine[] = [];
  keyword: string = "data";

  public formTreatment: FormGroup = new FormGroup({
    medicineId: new FormControl(null, [Validators.required]),
    tenantId: new FormControl(null, [Validators.required]),
    dose: new FormControl(null, [Validators.required]),
  });

  constructor(private _treatmentService: TreatmentService) {}

  ngOnInit(): void {
    this.onLoadRegisters();
    this.onLoadTenants();
    this.onLoadMedicines();
  }
  onLoadRegisters(): void {
    this._treatmentService
      .getTreatments(((this.page - 1) * this.items).toString(), this.items.toString())
      .subscribe((response) => {
        this.registerNumber = response.totalItems; ///////// importante para paginacion
        this.treatmentList = response.items;
        console.log(this.treatmentList);
      });
  }

  onSaveEdit(): void {
    if (this.editTreatment == null) {
      this.onCreateTreatment();
    } else {
      this.onUpdateTreatment();
    }
  }

  onCreateTreatment(): void {
    if (this.formTreatment.valid) {
      let treatmentTemp: UpdateTreatment = {
        id: null,
        medicineid: this.formTreatment.getRawValue().medicineId.id,
        tenantid: this.formTreatment.getRawValue().tenantId.id,
        dose: this.formTreatment.getRawValue().dose,
      };
      this._treatmentService.createTreatment(treatmentTemp).subscribe((response) => {
        this.onLoadRegisters();
      });
      this.formTreatment.reset();
    } else {
    }
  }

  onUpdateTreatment(): void {
    if (this.formTreatment.valid) {
      this.formTreatment.controls.medicineId.setValue(
        typeof this.formTreatment.controls.medicineId.value == "string"
          ? this.editTreatment.medicineid
          : this.formTreatment.controls.medicineId.value
      );
      this.formTreatment.controls.tenantId.setValue(
        typeof this.formTreatment.controls.tenantId.value == "string"
          ? this.editTreatment.tenantid
          : this.formTreatment.controls.tenantId.value
      );
      let treatmentTemp: UpdateTreatment = {
        id: this.editTreatment.id,
        medicineid: this.formTreatment.getRawValue().medicineId.id,
        tenantid: this.formTreatment.getRawValue().tenantId.id,
        dose: this.formTreatment.getRawValue().dose,
      };
      this.editTreatment = null;
      this.formTreatment.reset();
      this._treatmentService.updateTreatment(treatmentTemp).subscribe((response) => {
        this.onLoadRegisters();
      });
    } else {
    }
  }

  onDeleteTreatment(id: Number): void {
    this._treatmentService.deleteTreatment(id).subscribe((response) => {
      this.onLoadRegisters();
    });
  }

  onEditTreatment(treatment: Treatment): void { 
    let medicineTemp = this.medicineList.find((medicine) => medicine.id == treatment.medicineid);
    console.log(medicineTemp);
    let medicineData = `${medicineTemp.name} ${medicineTemp.description}`; 
    let tenantTemp = this.tenatList.find((tenant) => tenant.id == treatment.tenantid);
    let tenantData = `${tenantTemp.dui} ${tenantTemp.firstname} ${tenantTemp.lastname} ${moment(tenantTemp.birthday).format("DD/MM/YYYY")}`;
    this.editTreatment = treatment;
    this.formTreatment.controls.medicineId.setValue(medicineData);
    this.formTreatment.controls.tenantId.setValue(tenantData);
    this.formTreatment.controls.dose.setValue(treatment.dose);
  }

  onLoadTenants(): void {
    this._treatmentService.getTenantsFree().subscribe((response) => {
      this.tenatList = response.items;
      this.tenatList.map((tenant) => {
        tenant.data = `${tenant.dui} ${tenant.firstname} ${
          tenant.lastname
        } ${moment(tenant.birthday).format("DD/MM/YYYY")}`;
      });
    });
  }

  onLoadMedicines(): void {
    this._treatmentService.getMedicinesFree().subscribe((response) => {
      this.medicineList = response.items;
      this.medicineList.map((medicine) => {
        medicine.data = `${medicine.name} ${medicine.description}
        ${medicine.type} ${medicine.notes}`;
      });
    });
  }

  pageChanged(data: any) {
    this.page = data;
    this.onLoadRegisters();
  }

  onFocused(e: any): void {
    this.autoComplete.query == null ? this.autoComplete.clear() : null;
    this.autoComplete2.query == null ? this.autoComplete2.clear() : null;
  }

  openPanel(e): void {}

  selectEvent(item) {
    //
  }

  onChangeSearch(val: string) {
    //
  }
}
