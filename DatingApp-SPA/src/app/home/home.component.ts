import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  isLoggedIn: Observable<boolean>;


  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
  }


  ngOnInit(): void {

  }

  registerToggle(): void {
    this.registerMode = true;
  }

  cnacelRegisterMode(registerMode: boolean): void {
    this.registerMode = registerMode;
  }


}
