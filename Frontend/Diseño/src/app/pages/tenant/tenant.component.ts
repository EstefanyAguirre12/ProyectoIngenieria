import { TenantService } from './../../core/services/tenant.service';
import { Tenant, CreateTenant } from './../../core/interfaces/tenant';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  moduleId: module.id,
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
  page: number = 1;
  items: number = 10;
  registerNumber: number = 0;
  public tenantList: Tenant[] = [];
  keyword: string = "data";
  editTenant: Tenant = null;

  public formTenant: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    dui: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    condition: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
  });

  constructor(private _tenantService: TenantService) { }

  ngOnInit(): void {
    this.onLoadRegisters();
  }
  onLoadRegisters(): void {
    this._tenantService
    .getTenants(((this.page - 1) * this.items).toString(), this.items.toString())
    .subscribe((response) => {
      this.registerNumber = response.registers; ///////// importatne para paginacion
      this.tenantList = response.data;
    });
  }
  onSaveEdit(): void {
    if (this.editTenant == null) {
      this.onCreateTenant();
    } else {
      this.onUpdateTenant();
    }
  }

  onCreateTenant(): void {
    if (this.formTenant.valid) {
      let tenantTemp: CreateTenant = {
        firstname: this.formTenant.getRawValue().firstName,
        lastname: this.formTenant.getRawValue().lastName,
        birthday: this.formTenant.getRawValue().birthday,
        dui: this.formTenant.getRawValue().dui,
        gender: this.formTenant.getRawValue().gender,
        condition: this.formTenant.getRawValue().condition,
        status: this.formTenant.getRawValue().status
      };
      this._tenantService
      .createTenant(tenantTemp)
      .subscribe((response) => {
        this.onLoadRegisters();
        this._tenantService.showInfo(
          response.status,
          response.code,
          response.message
        );
      });
      this.formTenant.reset();
    } else {
      console.log(this.formTenant.controls)
    }
  }

  onUpdateTenant(): void {
    if (this.formTenant.valid) {
      let tenantTemp: Tenant = {
        id: this.editTenant.id,
        firstname: this.formTenant.getRawValue().firstName,
        lastname: this.formTenant.getRawValue().lastName,
        birthday: this.formTenant.getRawValue().birthday,
        dui: this.formTenant.getRawValue().dui,
        gender: this.formTenant.getRawValue().gender,
        condition: this.formTenant.getRawValue().condition,
        status: this.formTenant.getRawValue().status
      };
      this._tenantService
      .updateTenant(tenantTemp)
      .subscribe((response) => {
        this.onLoadRegisters();
        this._tenantService.showInfo(
          response.status,
          response.code,
          response.message
        );      });
      this.editTenant= null;
      this.formTenant.reset();
    } else {
      console.log(this.formTenant.controls)
    }
  }

  onEditTenant(tenant: Tenant){
    this.formTenant.controls.firstName.setValue(tenant.firstname);
    this.formTenant.controls.lastName.setValue(tenant.lastname);
    this.formTenant.controls.birthday.setValue(tenant.birthday);
    this.formTenant.controls.dui.setValue(tenant.dui);
    this.formTenant.controls.gender.setValue(tenant.gender);
    this.formTenant.controls.condition.setValue(tenant.condition);
    this.formTenant.controls.status.setValue(tenant.status);
    this.editTenant = tenant;

  }

  onDeleteTenant(id: Number): void {
    this._tenantService.deleteTenant(id).subscribe((response) => {
      if (response.code === 202) {
        this.onLoadRegisters();
      }
      this._tenantService.showInfo(
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
