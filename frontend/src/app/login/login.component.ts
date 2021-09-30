import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';

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
    email: ["", [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')]],
    password: ["", [Validators.required]]
  });

  //On click Login 
  login() {
    this.service.loginUser(this.loginForm.value).subscribe(
      (res) => {
        sessionStorage.setItem("token1", res.token);
        sessionStorage.setItem("id", res._id);
        this.success(res.message);

      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.error(err.error.message + " Enter registered Credentials.");

          } else {
            this.error(err.statusText + " Try Again!!!");

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
        // this.loginForm.reset();
        this.route.navigate(['/profile']);
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
        this.loginForm.reset();
      }
    })
  }

}
