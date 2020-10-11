import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ServiceService, private route: Router) { }

  //icon
  public hide = true;

  //new registration Form
  registerForm = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ["", [Validators.minLength(8), Validators.maxLength(20)]]
  });


  create() {
    this.service.createUser(this.registerForm.value).subscribe(
      (res) => {
        alert(res.message);
        this.route.navigate(['/profile']);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert(err.error.message + " Please Create New User again!!!");
            this.registerForm.reset();
          } else {
            alert(err.statusText + " Try Again!!!");
            this.registerForm.reset();
          }
        }
      }
    );

  }

  cancel() {
    this.route.navigate(['/profile']);
  }

  edit() {
    this.service.updateUser(this.service.selectedUser['_id'], this.registerForm.value).subscribe((res) => {
      alert(res.message);
      this.route.navigate(['/profile']);
    },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert(err.error.message + " Please Create New User again!!!");
            this.registerForm.reset();
          } else {
            alert(err.statusText + " Try Again!!!");
            this.registerForm.reset();
          }
        }
      });
  }

  public option;

  ngOnInit(): void {
    this.option = this.service.option;
    if (this.option === false) {
      this.registerForm.patchValue(
        {
          name: this.service.selectedUser['name'],
          email: this.service.selectedUser['email'],
          phone: this.service.selectedUser['phone'],
        }
      );
    }
    else if (this.option === true) {
      this.registerForm.reset();
    }
    else {
      this.route.navigate(['profile']);
    }
    console.log(this.option)
  }

}
