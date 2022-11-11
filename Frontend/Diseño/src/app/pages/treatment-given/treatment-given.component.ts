import { TreatmentGivenService } from './../../core/services/treatment-given.service';
import { TreatmentGiven, CreateTreatmentGiven, Treatmentid, UpdateTreatmentGiven } from './../../core/interfaces/treatment-given';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-treatment-given',
  templateUrl: './treatment-given.component.html',
  styleUrls: ['./treatment-given.component.css']
})
export class TreatmentGivenComponent implements OnInit {
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;
  @ViewChild("auto") autoComplete!: AutocompleteComponent;

  public treatmentGivenList: TreatmentGiven[] = [];
  public treatmentList: Treatmentid[] = [];
  keyword: string = "data";
  editTreatmentGiven: TreatmentGiven = null;

  public formTreatmentGiven = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    treatmentid: new FormControl(null, [Validators.required]),
  });
  constructor(private _treatmentGivenService: TreatmentGivenService) { }

  ngOnInit(): void {
    this.onLoadRegisters();
    this.onLoadTreatments();
  }

  onSaveEdit(): void {
    if (this.editTreatmentGiven == null) {
      this.onCreateTreatmentGiven();
    } else {
      this.onUpdateTreatmentGiven();
    }
  }
  onLoadRegisters(): void {
    this._treatmentGivenService
    .getTreatmentGiven(((this.page - 1) * this.items).toString(), this.items.toString())
    .subscribe((response) => {
      this.registerNumber = response.registers; ///////// importatne para paginacion
      this.treatmentGivenList = response.data;
    });
  }

  onCreateTreatmentGiven(): void {
    if (this.formTreatmentGiven.valid) {
      let treatmentGivenTemp: UpdateTreatmentGiven = {
        id: null,
        date: this.formTreatmentGiven.getRawValue().date,
        treatmentidId: this.formTreatmentGiven.getRawValue().treatmentid.id
      };
      this._treatmentGivenService
        .createTreatmentGiven(treatmentGivenTemp)
        .subscribe((response) => {
          this.onLoadRegisters();
          this._treatmentGivenService.showInfo(
            response.status,
            response.code,
            response.message
          );
        });
      this.formTreatmentGiven.reset();
    } else {
      console.log(this.formTreatmentGiven.controls)
    }
  }

  onUpdateTreatmentGiven(): void {
    if (this.formTreatmentGiven.valid) {
      this.formTreatmentGiven.controls.treatmentid.setValue(
        typeof this.formTreatmentGiven.controls.treatmentid.value == "string"
          ? this.editTreatmentGiven.treatmentid
          : this.formTreatmentGiven.controls.treatmentid.value
      );
      let treatmentGivenTemp: UpdateTreatmentGiven = {
        id: this.editTreatmentGiven.id,
        date: this.formTreatmentGiven.getRawValue().date,
        treatmentidId: this.formTreatmentGiven.getRawValue().treatmentid.id
      };
      this.editTreatmentGiven = null;
      this.formTreatmentGiven.reset();
      this._treatmentGivenService.updateTreatmentGiven(treatmentGivenTemp).subscribe((response) => {
        this.onLoadRegisters();
        this._treatmentGivenService.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
    } else {
      console.log(this.formTreatmentGiven.controls)
    }
  }

  onEditTreatmentGiven(treatmentGiven: TreatmentGiven): void {
    treatmentGiven.treatmentid.data = `${treatmentGiven.treatmentid.medicineid.name} ${treatmentGiven.treatmentid.dose} ${treatmentGiven.treatmentid.tenantid.firstname}
    ${treatmentGiven.treatmentid.tenantid.lastname}`;
    this.formTreatmentGiven.controls.date.setValue(treatmentGiven.date);
    this.formTreatmentGiven.controls.treatmentid.setValue(treatmentGiven.treatmentid);
    this.editTreatmentGiven = treatmentGiven;
  }

  onLoadTreatments(): void {
    this._treatmentGivenService.getTreatments().subscribe((response) => {
      this.treatmentList = response.data;
      this.treatmentList.map((treatment) => {
        treatment.data = `${treatment.medicineid?.name} ${treatment.dose} ${treatment.tenantid.firstname}
        ${treatment.tenantid.lastname} `;
      });
    });
  }

  selectEvent(item) {
    //console.log("item", item);
  }

  onChangeSearch(val: string) {
    //console.log("val", val);
  }

  onFocused(e) {
    this.autoComplete.query == null ? this.autoComplete.clear() : null;
  }

  onDeleteTreatmentGiven(id: number): void {
    this._treatmentGivenService.deleteTreatmentGiven(id).subscribe((response) => {
      if (response.code === 202) {
        this.onLoadRegisters();
      }
      this._treatmentGivenService.showInfo(
        response.status,
        response.code,
        response.message
      );
    });
  }
  pageChanged(data: any) {
    this.page = data;
    this.onLoadRegisters();
  }
}
