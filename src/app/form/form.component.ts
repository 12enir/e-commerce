import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

const DATA_KEY:string = "data_key";
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  saveData(data:string) {
    localStorage[DATA_KEY] = JSON.stringify(data);
  }

}
