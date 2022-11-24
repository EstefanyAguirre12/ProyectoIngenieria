import { take } from "rxjs/operators";
import { Admin, AdminResponse, CreateAdmin } from "./../../core/interfaces/user";
import { Component, OnInit } from "@angular/core";
import { UserService } from "app/core/services/user.service";
import { zip } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  ////////////////////////////////////////////////////////////////////////////////
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;
  ////////////////////////////////////////////////////////////////////////////////
  public usersList: Admin[] = [];
  public userListCreate: CreateAdmin[] = [];
  ////////////////////////////////////////////////////////////////////////////////
  keyword: string = "data";
  editUser: Admin = null;


  public formUser: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
  });

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.onLoadRegisters();
  }
  onLoadRegisters(): void {
    this._userService.getUsers().subscribe((response) => {
      this.usersList = response.items;
    });
    
    this._userService
    .getUsers(((this.page - 1) * this.items).toString(), this.items.toString())
    .subscribe((response) => {
      this.registerNumber = response.totalItems; ///////// importatne para paginacion
      this.usersList = response.items;
      console.log(this.usersList);
    });
  }
  
  onSaveEdit(): void {
    if (this.editUser == null) {
      this.onCreateUser();
    } else {
      this.onUpdateUser();
    }
  }

  onCreateUser(): void {
    if (this.formUser.valid) {
      let userTemp: CreateAdmin = {
        email: this.formUser.controls.email.value,
        password: this.formUser.controls.password.value,
        passwordConfirm: this.formUser.controls.passwordConfirm.value
      };
      console.log(this.formUser.getRawValue());
      this._userService.createUser(userTemp).subscribe((response) => {
        this.onLoadRegisters();
        this._userService.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
      this.formUser.reset();
    } else {
      console.log(this.formUser.controls)
    }
  }

  onUpdateUser(): void {
    if (this.formUser.valid) {
      let userTemp: Admin = {
        id: this.editUser.id,
        email: this.formUser.getRawValue().email,
        password: this.formUser.getRawValue().password,
        passwordConfirm: this.formUser.getRawValue().passwordConfirm
      };
      this._userService.updateAdmin(userTemp).subscribe((response) => {
        this.onLoadRegisters();
      });
      this.formUser.reset();
      this.editUser = null;
    } else {
      console.log(this.formUser.controls)

    }
  }

  onEditUser(user: Admin): void {
    this.formUser.controls.email.setValue(user.email);
    this.editUser = user;
  }

  onDeleteuser(id: Number): void {
    this.usersList = this.usersList.filter((visit) => !(visit.id == id));
    this._userService.deleteUser(id).subscribe((response) => {
      if (response.code === 202) {
        this.onLoadRegisters();
      }
      this._userService.showInfo(
        response.status,
        response.code,
        response.message
      );
    });
  }

  pageChanged(data: any) {
    console.log(data);
    this.page = data;
    this.onLoadRegisters();
  }
}
