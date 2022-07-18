
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  model: any = {};
  username: string = "";
  isLoggedIn: Observable<boolean>;



  constructor(private authService: AuthService, private alertify: AlertifyService) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedIn.subscribe(res => console.log(res))
  }

  ngOnInit() {
    this.username = this.getUsername();
  }

  login() {
    this.authService.login(this.model).subscribe({
      next: () => this.alertify.success('logged in succefully'),
      error: (err) => this.alertify.error(err),
      complete: () => { this.username = this.getUsername() }
    });
  }

  logOut() {
    this.authService.logOut();
    this.alertify.message('logged out')

  }

  getUsername() {
    const name = this.authService.decodedToken?.name;
    return name ? name : 'User';
  }

}