import { MedicineService } from './../../core/services/medicine.service';
import { Medicine, CreateMedicine } from './../../core/interfaces/medicine';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;
  public medicineList: Medicine[] = [];
  public medicineListCreate: CreateMedicine[] = [];
  keyword: string = "data";
  editMedicine: Medicine = null;

  public formMedicine = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    type: new FormControl("", [Validators.required]),
    notes: new FormControl(null, [Validators.required]),
  });

  constructor(private _medicineService: MedicineService) { }

  ngOnInit(): void {
    this.onLoadRegisters();
  }
  onLoadRegisters(): void {
    this._medicineService
    .getMedicines(((this.page - 1) * this.items).toString(), this.items.toString())
    .subscribe((response) => {
      this.registerNumber = response.registers; ///////// importatne para paginacion
      this.medicineList = response.data;
    });
  }

  onSaveEdit(): void {
    if (this.editMedicine == null) {
      this.onCreateMedicine();
    } else {
      this.onUpdateMedicine();
    }
  }

  onCreateMedicine(): void {
    if (this.formMedicine.valid) {
      let medicineTemp: CreateMedicine = {
        name: this.formMedicine.getRawValue().name,
        description: this.formMedicine.getRawValue().description,
        type: this.formMedicine.getRawValue().type,
        notes: this.formMedicine.getRawValue().notes
      };
      this._medicineService
      .createMedicine(medicineTemp)
      .subscribe((response) => {
        this.onLoadRegisters();
        this._medicineService.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
      this.formMedicine.reset();
    } else {
      console.log(this.formMedicine.controls)
    }
  }

  onUpdateMedicine(): void {
    if (this.formMedicine.valid) {
      let medicineTemp: Medicine = {
        id: this.editMedicine.id,
        name: this.formMedicine.getRawValue().name,
        description: this.formMedicine.getRawValue().description,
        type: this.formMedicine.getRawValue().type,
        notes: this.formMedicine.getRawValue().notes
      };
      this._medicineService.updateMedicine(medicineTemp).subscribe((response) => {
        this.onLoadRegisters();
        this._medicineService.showInfo(
          response.status,
          response.code,
          response.message
        );      });
      this.formMedicine.reset();
      this.editMedicine = null;
    } else {
      console.log(this.formMedicine.controls)

    }
  }

  onEditMedicine(medicine: Medicine): void {
    this.formMedicine.controls.name.setValue(medicine.name);
    this.formMedicine.controls.description.setValue(medicine.description);
    this.formMedicine.controls.type.setValue(medicine.type);
    this.formMedicine.controls.notes.setValue(medicine.notes);
    this.editMedicine=medicine;
  }

  onDeleteMedicine(id: number): void {
    this._medicineService.deleteMedicine(id).subscribe((response) => {
      if (response.code === 202) {
        this.onLoadRegisters();
      }
      this._medicineService.showInfo(
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
