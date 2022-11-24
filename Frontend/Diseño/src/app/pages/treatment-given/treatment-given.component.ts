import { TreatmentGivenService } from './../../core/services/treatment-given.service';
import { TreatmentGiven, CreateTreatmentGiven, Treatmentid, UpdateTreatmentGiven } from './../../core/interfaces/treatment-given';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import * as moment from 'moment';

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
      this.registerNumber = response.totalItems; ///////// importatne para paginacion
      this.treatmentGivenList = response.items;
    });
  }

  onCreateTreatmentGiven(): void {
    if (this.formTreatmentGiven.valid) {
      let treatmentGivenTemp: UpdateTreatmentGiven = {
        id: null,
        date: this.formTreatmentGiven.getRawValue().date,
        treatmentid: this.formTreatmentGiven.getRawValue().treatmentid.id
      };
      this._treatmentGivenService
        .createTreatmentGiven(treatmentGivenTemp)
        .subscribe((response) => {
          this.onLoadRegisters();
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
        treatmentid: this.formTreatmentGiven.getRawValue().treatmentid.id
      };
      this.editTreatmentGiven = null;
      this.formTreatmentGiven.reset();
      this._treatmentGivenService.updateTreatmentGiven(treatmentGivenTemp).subscribe((response) => {
        this.onLoadRegisters();
      });
    } else {
      console.log(this.formTreatmentGiven.controls)
    }
  }

  onEditTreatmentGiven(treatmentGiven: TreatmentGiven): void {
    let treatmentGivenTemp = this.treatmentList.find((treatment) => treatment.id == treatmentGiven.treatmentid);
    let treatmentGivenData = `${treatmentGivenTemp['@expand'].medicineid?.name} ${treatmentGivenTemp.dose} ${treatmentGivenTemp['@expand'].tenantid.firstname} ${treatmentGivenTemp['@expand'].tenantid.lastname}`;
    this.editTreatmentGiven = treatmentGiven;
    this.formTreatmentGiven.controls.date.setValue(moment(treatmentGiven.date).format("YYYY-MM-DD"));
    this.formTreatmentGiven.controls.treatmentid.setValue(treatmentGivenData);
  }

  onLoadTreatments(): void {
    this._treatmentGivenService.getTreatments().subscribe((response) => {
      this.treatmentList = response.items;
      let expand;
      this.treatmentList.map((treatment, i) => {
          expand=response.items[i]['@expand'];
          treatment.data = `${expand.medicineid?.name} ${treatment.dose} ${expand.tenantid.firstname} ${expand.tenantid.lastname} `;
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
      this.onLoadRegisters();
    });
  }
  pageChanged(data: any) {
    this.page = data;
    this.onLoadRegisters();
  }
}
