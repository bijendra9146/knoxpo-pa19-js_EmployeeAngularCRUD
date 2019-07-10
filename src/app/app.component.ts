import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { shardService } from './shardService.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  showAddNewFormFlag : boolean = false;
  showAllEmployeeListFlag : boolean = true;
  deleteModelFieldFlag: boolean = false;
  showNewInsertRecordFlag : boolean = false;
  showUpdateRecordFlag : boolean = false;
  showUpdateListFlag : boolean = false;
  

  deleteModelData;
  responseArrayData;
  sucessInsertArrayData;
  sucessUpdateArrayData;
  employeeForm: FormGroup;


  constructor(private _shardService: shardService,private formBuilder: FormBuilder) {
    
  }

  ngOnInit(){
    this.getEmployeeList();

    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],      
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle : ['', Validators.required],
    });
  
  }

  
  get validateField() {
    return this.employeeForm.controls; }

  getEmployeeList(){

    this.showUpdateRecordFlag = false;
    this.showUpdateListFlag = false;
    this.showAddNewFormFlag = false;
    this.showAllEmployeeListFlag = true;
    
    var that = this;
    var responseObject;
    var arrayData;
    this._shardService.fetchEmployeeList().subscribe(function(employeeListObject){
      
      console.log("employeeList Object is ",employeeListObject)
      responseObject = employeeListObject;  

      if(responseObject.responseStatus == '000'){
        that.responseArrayData = responseObject.responseData;

      }else{
        alert("Something went wrong");
      }

    })
  }

  insertEmployeeData(){
    this.showAllEmployeeListFlag = false;
    this.showAddNewFormFlag = true;
  }

  insertNewEmployeeRecord(){
    var that = this;
    var responseObject;
    var arrayData;
    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }
    var itemObject = {
      name: this.employeeForm.value.name,     
      mobile: this.employeeForm.value.mobile,
      email: this.employeeForm.value.email,
      jobTitle : this.employeeForm.value.jobTitle,
    }

    this._shardService.addNewRecord(itemObject).subscribe(function(employeeListObject){
      
      console.log("employeeList Object is ",employeeListObject)
      responseObject = employeeListObject;  

      if(responseObject.responseStatus == '000'){
        that.showNewInsertRecordFlag = true;
        that.sucessInsertArrayData = responseObject.responseData;

      }else{
        alert("Something went wrong");
      }

    })
  }
  cancelRecord(){
    this.showUpdateRecordFlag = false;
    this.showUpdateListFlag = false;
    this.showNewInsertRecordFlag = false
    this.showAddNewFormFlag = false;
    this.showAllEmployeeListFlag = true;
  }
  selectToUpdateEmployee(alterData){
    console.log("alterData is ",alterData);
    this.showAllEmployeeListFlag = false;
    this.showUpdateRecordFlag = true;

    this.employeeForm = this.formBuilder.group({
      name: [alterData.name, Validators.required],      
      mobile: [ alterData.mobile, Validators.required],
      email: [alterData.email, [Validators.required, Validators.email]],
      jobTitle : [alterData.jobTitle, Validators.required],
    });

    // this.employeeForm.value.name = alterData.name,     
    // this.employeeForm.value.mobile = alterData.mobile,
    // this.employeeForm.value.email = alterData.email,
    // this.employeeForm.value.jobTitle = alterData.jobTitle
  }

  updateEmployeeData(){

    var that = this;
    var responseObject;
    var arrayData;
    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }
    var itemObject = {
      name: this.employeeForm.value.name,     
      mobile: this.employeeForm.value.mobile,
      email: this.employeeForm.value.email,
      jobTitle : this.employeeForm.value.jobTitle,
    }

    this._shardService.updateRecord(itemObject).subscribe(function(employeeListObject){
      
      console.log("employeeList Object is ",employeeListObject)
      responseObject = employeeListObject;  

      if(responseObject.responseStatus == '000'){
        that.showUpdateListFlag = true;
        that.sucessUpdateArrayData = responseObject.responseData;

      }else{
        alert("Something went wrong");
      }

    })


  }



  passDataToModel(employeeData){
    this.deleteModelFieldFlag = true;
    console.log("employee Data is ",employeeData);
    this.deleteModelData = employeeData;
  }

  deleteEmployeeItem(){
    var that = this;
    var responseObject;

    console.log("delete data method is ",this.deleteModelData);

    this._shardService.deleteEmployeeItem(this.deleteModelData).subscribe(function(removedDataObj){
    console.log("removedDataObj is ",removedDataObj);
      
      responseObject = removedDataObj;  

      if(responseObject.responseStatus == '000'){
        that.responseArrayData = responseObject.responseData;

      }else{
        alert("Something went wrong");
      }
    });    

  }



}
