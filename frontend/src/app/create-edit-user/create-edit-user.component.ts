import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ServiceService, private route: Router) { }

  //icon
  public hide = true;
  img: any;
  passwordPatterRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  //new registration Form
  registerForm = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, Validators.max(9999999999)]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.passwordPatterRegex)]],
    address: ["", []],
    gender: ["", []],
    hobbies: ["", []]
  });




  cancel() {
    this.route.navigate(['/profile']);
  }

  edit() {
    this.service.updateUser(sessionStorage.getItem('id'), this.registerForm.value).subscribe((res) => {
      this.success(res.message);

    },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.error(err.error.message + " Update again!!!");

          } else {
            this.error(err.statusText + " Try Again!!!");

          }
        }
      });
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
        this.getValue();
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
  error2(msg) {
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
      }
    })
  }

  ngOnInit(): void {

    this.getValue();

  }


  getValue() {
    this.service.getUser(sessionStorage.getItem('id')).subscribe(
      (res) => {
        console.log(res)
        this.registerForm.patchValue(
          {
            name: res.name,
            email: res.email,
            phone: res.phone,
            address: res.address,
            hobbies: res.hobbies,
            gender: res.gender,
            password: res.password
          }
        );
      });
    this.service.getUserFile(sessionStorage.getItem('id')).subscribe(
      (res) => {
        console.log(res)
        this.img = res;
      });
  }

  fileUpload(files: FileList) {
    console.log(files)
    let fileInput: any = (<HTMLInputElement>document.getElementById('customFile'));

    let filePath = fileInput.value;
    let allowedExtensions = /(\.png|\.jpeg|\.jpg|\.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.error2("Sorry!! only png, jpeg, jpg, gif file type is permitted.");
      fileInput.value = '';
      return false;
    }
    else {
      let file = files[0];
      if (file.size > 1000000) {
        this.error2("File size exceeds the maximum limit 1mb.");
      }
      else {
        this.uploadFiles(file, sessionStorage.getItem("id"));
      }
    }

  }

  uploadFiles(file, user) {

    let formData = new FormData();

    formData.append('file', file, file.name);
    // console.log(formData,file.name)

    this.service.uploadFile(formData, user).subscribe(res => {
      let result: any = res;
      this.success(res.message);

    },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.error2(err.error.message + " Upload again!!!");

          } else {
            this.error2(err.statusText + " Try Again!!!");

          }
        }
      });
  }





}
