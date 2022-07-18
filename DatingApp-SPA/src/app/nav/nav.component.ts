
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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



  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) {
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
      complete: () => {
        this.username = this.getUsername();
        this.router.navigate(['/members']);
      }
    });
  }

  logOut() {
    this.authService.logOut();
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  getUsername() {
    const name = this.authService.decodedToken?.name;
    return name ? name : 'User';
  }

}