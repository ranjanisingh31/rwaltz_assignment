import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public service: ServiceService, private route: Router, private fb: FormBuilder) { }
  public users = [];
  edit(user) {
    this.service.option = false;
    this.service.selectedUser = user;
    this.route.navigate(['/profile/user']);
  }
  delete(user) {
    var answer = window.confirm(`Are you sure you want to delete "${user.name}" user?`);
    if (answer) {
      this.service.deleteUser(user._id).subscribe((res) => {
        alert(res.message);
        this.users = [];
        this.refresh();

      },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              alert(err.error.message + " Please Try deleting the user again!!!");
            } else {
              alert(err.statusText + " Try Again!!!");
            }
          }
        });
    }

  }
  create() {
    this.service.option = true;
    this.route.navigate(['/profile/user']);
  }
  public data;
  refresh() {
    this.service.getAllUser().subscribe((res) => {
      this.data = res;
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].created_by === localStorage.getItem('id')) {
          console.log(localStorage.getItem('id'))
          this.users.push(this.data[i]);
        }
      }
      console.log("user", this.users);
    },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          alert(err.error.message + " Try Again!!!");
        }
      }
    );

  }
  ngOnInit(): void {
    this.refresh();
  }
}
