import { take } from "rxjs/operators";
import { Gender, Rol, User, UserPayload } from "./../../core/interfaces/user";
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

  public gender: Gender = null;
  public rol: Rol = null;
  public usersList: User[] = [];
  public roles: Rol[] = [];
  public genders: Gender[] = [];

  public formUser: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    username: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    roleid: new FormControl(null, [Validators.required]),
  });

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    zip(this._userService.getRoles(), this._userService.getGender())
      .pipe(take(1))
      .subscribe(([roles, genders]) => {
        this.roles = roles.data;
        this.genders = genders.data;
      });
    this.onLoadRegisters();
  }
  onLoadRegisters(): void {
    this._userService
      .getUsers(
        ((this.page - 1) * this.items).toString(),
        this.items.toString()
      )
      .subscribe((users) => {
        this.registerNumber = users.registers; ///////// importatne para paginacion
        this.usersList = users.data;
      });

  }

      /*  zip(
      this._userService.getUsers(((this.page-1)* this.items ).toString(),this.items.toString()),
      this._userService.getRoles(),
      this._userService.getGender()
    )
      .pipe(take(1))
      .subscribe(([users, roles, genders]) => {
        this.registerNumber = users.registers;
        this.usersList = users.data;
        console.log(users.data);
        this.roles = roles.data;
        this.genders = genders.data;
      }); */

  onSaveEdit(): void {
    if (this.formUser.controls.id.value == null) {
      console.log("Creando");
      this.onCreateUser();
    } else {
      console.log("Actualizando");
      this.onUpdateUser();
    }
  }

  onCreateUser(): void {
    console.log(this.formUser.value);
    if (this.formUser.valid) {
      const { id, username, firstname, lastname, date, gender, roleid } =
        this.formUser.getRawValue();
      let temp: UserPayload = {
        id: null,
        username: username,
        birthday: date,
        firstname: firstname,
        gender: gender,
        lastname: lastname,
        roleidId: roleid.id,
      };
      this._userService.createUser(temp).subscribe((response) => {
        this.onLoadRegisters();
        this._userService.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
      this.formUser.reset();
    } else {
    }
  }

  onUpdateUser(): void {
    if (this.formUser.valid) {
      const { id, username, firstname, lastname, date, gender, roleid } =
        this.formUser.getRawValue();
      let temp: UserPayload = {
        id: id,
        username: username,
        birthday: date,
        firstname: firstname,
        gender: gender,
        lastname: lastname,
        roleidId: roleid.id,
      };

      console.log(this.usersList);
      this.usersList = this.usersList;
      this.formUser.reset();
      this.gender = null;
      this.rol = null;
      this._userService.updateUser(temp).subscribe((response) => {
        this.onLoadRegisters();
        this._userService.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
    } else {
    }
  }

  onEditUser(user: User): void {
    this.rol = user.roleid;
    this.formUser.controls.id.setValue(user.id);
    this.formUser.controls.username.setValue(user.username);
    this.formUser.controls.firstname.setValue(user.firstname);
    this.formUser.controls.lastname.setValue(user.lastname);
    this.formUser.controls.date.setValue(user.birthday);
    this.formUser.controls.gender.setValue(user.gender);
    this.formUser.controls.roleid.setValue(user.roleid);
    const tempG: Gender = {
      name: user.gender,
    };
    this.gender = tempG;
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

  onSetGender(gender: Gender): void {
    //console.log(gender);
    this.gender = this.gender == gender ? null : gender;
    this.formUser.controls.gender.setValue(this.gender.name);
  }

  onSetRol(rol: Rol): void {
    //console.log(rol);
    this.rol = this.rol == rol ? null : rol;
    this.formUser.controls.roleid.setValue(this.rol);
  }

  pageChanged(data: any) {
    console.log(data);
    this.page = data;
    this.onLoadRegisters();
  }
}
