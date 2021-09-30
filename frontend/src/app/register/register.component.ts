import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ServiceService, private route: Router) { }

  //icon
  public hide = true;

  passwordPatterRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  //new registration Form
  registerForm = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')]],
    phone: ["", [Validators.required, Validators.max(9999999999)]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.passwordPatterRegex)]]
  });

  //on click register
  add() {
    this.service.registerUser(this.registerForm.value).subscribe(
      (res) => {
        sessionStorage.setItem("token1", res.token);
        sessionStorage.setItem("id", res._id);
        this.success(res.message);
        this.route.navigate(['/profile']);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.error(err.error.message + " Please Register again!!!");

          } else {
            this.error(err.statusText + " Try Again!!!");

          }
        }
      }
    );

  }
  openLogin() {
    this.route.navigate(['/login']);
  }

  success(msg) {
    Swal.fire({
      title: msg,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#4C96D7',
      confirmButtonText: 'Ok',
      allowOutsideClick: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.registerForm.reset();
      }
    })
  }
  error(msg) {
    Swal.fire({
      title: msg,
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#4C96D7',
      confirmButtonText: 'Ok',
      allowOutsideClick: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.registerForm.reset();
      }
    })
  }

  ngOnInit(): void {
  }

}
