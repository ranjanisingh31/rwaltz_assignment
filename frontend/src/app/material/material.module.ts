import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";



const material = [MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatGridListModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [material]
})
export class MaterialModule { }
