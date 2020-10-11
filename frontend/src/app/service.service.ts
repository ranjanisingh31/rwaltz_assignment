import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { user } from "./interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private route: Router, private http: HttpClient) { }
  // private base_url = "http://localhost:3000/api/v1/";
  private base_url = "https://biz2credit-assignment.herokuapp.com/api/v1/";

  public userName: string = '';
  public userEmail: string = '';
  public userType: string = '';
  public option;
  public selectedUser = {};

  //register
  registerUser(userData): Observable<user> {
    return this.http.post<user>(this.base_url + "users", userData);
  }
  createUser(userData): Observable<user> {
    var data = userData;
    data['created_by'] = localStorage.getItem('id');
    console.log("data", data)
    return this.http.post<user>(this.base_url + "users", data);
  }
  //sigin 
  loginUser(userData): Observable<user> {
    return this.http.post<user>(this.base_url + "session", userData);
  }
  //get data of a user
  getAllUser(): Observable<user> {
    return this.http.get<user>(this.base_url + "users");
  }
  //update user
  updateUser(id, data): Observable<user> {
    return this.http.put<user>(this.base_url + "users/" + id, data);
  }
  //delete user
  deleteUser(id): Observable<user> {
    return this.http.delete<user>(this.base_url + "users/" + id);
  }
  //returns boolean value, checks token exist or not
  loggedIn() {
    return !!localStorage.getItem('token1');

  }
  //remove token & navigate to login page
  loggedOut() {
    localStorage.removeItem("token1");
    localStorage.removeItem("id");
    this.route.navigate(['/login']);
  }
  //get stored token
  getToken() {
    return localStorage.getItem('token1');
  }

}
