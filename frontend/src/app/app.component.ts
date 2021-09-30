import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public service: ServiceService) { }
  data: any = {};
  img: any;
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    if (this.service.loggedIn) {
      this.service.getUser(sessionStorage.getItem('id')).subscribe(
        (res) => {
          console.log(res)
          this.data = res;
        });
      this.service.getUserFile(sessionStorage.getItem('id')).subscribe(
        (res) => {
          console.log(res)
          this.img = res;
        });
    }

  }


}
