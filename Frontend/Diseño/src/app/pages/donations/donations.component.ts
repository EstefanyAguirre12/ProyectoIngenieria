import { DonationService } from './../../core/services/donation.service';
import { CreateDonation, Donation } from './../../core/interfaces/donation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;
  public donationList: Donation[] = [];
  public donationListCreate: CreateDonation[] = [];
  keyword:  string = "data";
  donationEdit: Donation = null;

  public formDonation: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl("", [Validators.required]),
    amout: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    notes: new FormControl(null, [Validators.required]),
  });

  constructor(private _donationServie: DonationService) { }

  ngOnInit(): void {
    this.onLoadRegisters();
  }

  onLoadRegisters(): void {
    this._donationServie.getDonations().subscribe((response) => {
      this.donationList = response.data;
      console.log(response);
    });
    this._donationServie
    .getDonations(((this.page - 1) * this.items).toString(), this.items.toString())
    .subscribe((response) => {
      this.registerNumber = response.registers; ///////// importatne para paginacion
      this.donationList = response.data;
    });
  }
  onSaveEdit(): void {
    if (this.donationEdit == null) {
      this.onCreateDonation();
    } else {
      this.onUpdateDonation();
    }
  }

  onCreateDonation(): void {
    if (this.formDonation.valid) {
      let donationTemp: CreateDonation = {
        name: this.formDonation.getRawValue().name,
        type: this.formDonation.getRawValue().type,
        amout: this.formDonation.getRawValue().amout,
        date: this.formDonation.getRawValue().date,
        notes: this.formDonation.getRawValue().notes
      };
      this._donationServie
      .createDonation(donationTemp)
      .subscribe((response) => {
        this.onLoadRegisters();
        this._donationServie.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
      this.formDonation.reset();
    } else {
      console.log(this.formDonation.controls)
    }
  }

  onUpdateDonation(): void {
    if (this.formDonation.valid) {
      let donationTemp: Donation = {
        id: this.donationEdit.id,
        name: this.formDonation.getRawValue().name,
        type: this.formDonation.getRawValue().type,
        amout: this.formDonation.getRawValue().amout,
        date: this.formDonation.getRawValue().date,
        notes: this.formDonation.getRawValue().notes
      };
      this._donationServie.updateDonation(donationTemp).subscribe((response) => {
        this.onLoadRegisters();
        this._donationServie.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
      this.formDonation.reset();
      this.donationEdit = null;
    } else {
      console.log(this.formDonation.controls)
    }
  }

  onEditDonation(donation: Donation): void {
    this.formDonation.controls.name.setValue(donation.name);
    this.formDonation.controls.type.setValue(donation.type);
    this.formDonation.controls.amout.setValue(donation.amout);
    this.formDonation.controls.date.setValue(donation.date);
    this.formDonation.controls.notes.setValue(donation.notes);
    this.donationEdit = donation;
  }
  onDeleteDonation(id: number): void {
    this._donationServie.deleteDonation(id).subscribe((response) => {
      if (response.code === 202) {
        this.onLoadRegisters();
      }
      this._donationServie.showInfo(
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
