import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent }, { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, { path: 'profile/user', component: CreateEditUserComponent, canActivate: [AuthGuard] }, {
  path: "**", redirectTo: "/profile"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
