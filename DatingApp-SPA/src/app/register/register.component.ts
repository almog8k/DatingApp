import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService, private alertify: AlertifyService) {
    console.log(authService.isLoggedIn())
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  cancel() {
    console.log('cancel');
    this.cancelRegister.emit(false);
  }

  register() {
    this.authService.register(this.model).subscribe({
      next: () => this.alertify.success('registeration successfully'),
      error: (err) => this.alertify.error(err)
    });
  }
}
