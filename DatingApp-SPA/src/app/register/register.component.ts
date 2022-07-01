import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome:any;
  @Output() cancelRegister = new EventEmitter();
  model:any ={   };

  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    console.log('cancel');
  } 

  register(){
    console.log(this.model);
  } 
}
