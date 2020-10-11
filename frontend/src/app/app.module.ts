import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServiceService } from "./service.service";
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./token-interceptor.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreateEditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ServiceService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
