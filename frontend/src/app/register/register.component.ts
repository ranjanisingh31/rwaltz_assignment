import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ServiceService, private route: Router) { }

  //icon
  public hide = true;

  //new registration Form
  registerForm = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });

  //on click register
  add() {
    this.service.registerUser(this.registerForm.value).subscribe(
      (res) => {
        localStorage.setItem("token1", res.token);
        localStorage.setItem("id", res._id);
        alert(res.message);
        this.route.navigate(['/profile']);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert(err.error.message + " Please Register again!!!");
            this.registerForm.reset();
          } else {
            alert(err.statusText + " Try Again!!!");
            this.registerForm.reset();
          }
        }
      }
    );

  }
  openLogin() {
    this.route.navigate(['/login']);
  }


  ngOnInit(): void {
  }

}
