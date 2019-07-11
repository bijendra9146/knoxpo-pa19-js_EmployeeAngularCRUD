import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { shardService } from './shardService.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private _router : Router) {

  }

  ngOnInit(){

    this.goToViewPage();

  }

  goToViewPage(){
    this._router.navigate(['view-employee']);
  }

  goToInsertPage(){

    this._router.navigate(['add-employee']);
  }



}
