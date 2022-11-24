import { LoginComponent } from './../../layouts/login/login.component';
import { Component, Input, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Profile, Role } from "../../core/interfaces/profile";
import * as moment from "moment";
import {ProfileService} from "../../core/services/profile.service";
import { Admin } from 'app/core/interfaces/user';
import { UserService } from 'app/core/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editProfile: Profile = null;
  keyword: string = "data";
  editUser: Admin = null;
  user = localStorage.getItem('user');
  usertemp = JSON.parse(this.user);
  public formUser: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
  });

  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.onEditUser(JSON.parse(this.user));
  }

  onSaveEdit(): void {
    if (this.editProfile) {
     // this.onUpdateProfile();
    }
  }

  onUpdateUser(): void {
    if (this.formUser.valid) {
      let userTemp: Admin = {
        id: this.usertemp.admin.id,
        email: this.formUser.getRawValue().email,
        password: this.formUser.getRawValue().password,
        passwordConfirm: this.formUser.getRawValue().passwordConfirm
      };
      this._userService.updateAdmin(userTemp).subscribe((response) => {
        localStorage.removeItem("token")
        this.router.navigate(["/login"]);
      });
      this.editUser = null;
    } else {
      console.log(this.formUser.controls)

    }
  }

  onEditUser(user: any): void {
    this.formUser.controls.email.setValue(user.admin.email);
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
