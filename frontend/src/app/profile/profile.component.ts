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




  ngOnInit(): void {
  }
}
