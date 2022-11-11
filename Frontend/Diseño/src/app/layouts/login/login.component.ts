import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  ///////////////////////////////////////////////////////////////////////////////
  /* constructor  */

  constructor(private _authService: AuthService,private router:Router) {}
  loginForm!: FormGroup;

  ///////////////////////////////////////////////////////////////////////////////
  /* implements  */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ///////////////////////////////////////////////////////////////////////////////
  /* Methods */
  onSendLoginForm(): void {
    this._authService
      .onAutenticateCredentials(this.loginForm.getRawValue())
      .subscribe((Response) => {
        console.log(Response);
        this._authService.onSetToken(Response.data.token);
        this.router.navigate(["/dashboard"]);
      });
  }
}
