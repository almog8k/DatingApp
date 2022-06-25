import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();

  }

  getValues(){
    this.http.get('http://localhost:5000/values').subscribe({
    next: (res) => this.values = res,
    error: (err) => console.log(err)
    })
  }

}
