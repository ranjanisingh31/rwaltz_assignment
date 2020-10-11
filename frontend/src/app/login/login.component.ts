import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ServiceService, private route: Router) { }
  //icon
  public hide = true;

  //loginForm
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  //On click Login 
  login() {
    this.service.loginUser(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem("token1", res.token);
        localStorage.setItem("id", res._id);
        alert(res.message);
        this.route.navigate(['/profile']);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert(err.error.message + " Enter registered Credentials.");
            this.loginForm.reset();
          } else {
            alert(err.statusText + " Try Again!!!");
            this.loginForm.reset();
          }
        }

      }
    );
  }

  openRegister() {
    this.route.navigate(['/register']);
  }
  ngOnInit(): void {
  }

}
