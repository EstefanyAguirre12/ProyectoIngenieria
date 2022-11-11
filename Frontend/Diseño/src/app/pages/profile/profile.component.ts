import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Profile, Role } from "../../core/interfaces/profile";
import * as moment from "moment";
import {ProfileService} from "../../core/services/profile.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editProfile: Profile = null;

  public formProfile: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    roleId: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  })

  constructor(private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.onEditProfile
  }

  onSaveEdit(): void {
    if (this.editProfile) {
     // this.onUpdateProfile();
    }
  }

  onEditProfile(profile: Profile): void {
    this.formProfile.controls.title.setValue(profile.firstname);
    this.formProfile.controls.description.setValue(profile.lastname);
    this.formProfile.controls.date.setValue(profile.birthday);
    this.formProfile.controls.notes.setValue(profile.gender);
    this.formProfile.controls.notes.setValue(profile.roleid);
    this.formProfile.controls.notes.setValue(profile.username);
    this.formProfile.controls.notes.setValue(profile.password);
    this.editProfile = profile;
  }

  /*onUpdateProfile(): void {
    if (this.formProfile.valid) {
      this.formProfile.controls.roleId.setValue(
        typeof this.formProfile.controls.roleId.value == "string"
          ? this.editProfile.roleid
          : this.formProfile.controls.roleId.value
      );
      let profileTemp: Profile = {
        id: this.editProfile.id,
        firstname: this.formProfile.getRawValue().firstname,
        lastname: this.formProfile.getRawValue().lastname,
        birthday: this.formProfile.getRawValue().birthday,
        gender: this.formProfile.getRawValue().gender,
        roleid: this.formProfile.getRawValue().roleid,
        username: this.formProfile.getRawValue().username,
        password: this.formProfile.getRawValue().password,
      };
      this.bedList.map((bed) => {
        if (bed.id == profileTemp.id) {
          bed.number = profileTemp.number;
          bed.tenantid = profileTemp.tenantid;
        }
      });
      this.editBed = null;
      this.formBed.reset();
      this._bedService.updateBed(profileTemp).subscribe((response) => {
        console.log(response);
      });
    } else {
    }
  }*/

}
