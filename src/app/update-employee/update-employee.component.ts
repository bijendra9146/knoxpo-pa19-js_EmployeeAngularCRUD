import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { shardService } from '../shardService.service'
import { employeeFromService }  from '../behaviourSubjects/genericEmployeeFormBehaviour.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  showUpdateListFlag : boolean = false;
  sucessUpdateArrayData;

  constructor(private _router : Router,private _shardService: shardService,private _employeeFromService : employeeFromService,private formBuilder: FormBuilder) { }

  ngOnInit() {

    // _employeeFromService is a rxjs behaviour subject service which used to get data from its siblings component.
    // below code is used to get data of employee for update process.
    this._employeeFromService.observedEmployeeData.subscribe((updateObservedObject)=>{
      console.log("updateObserved Object is ",updateObservedObject);
// I used Reactive Form for employee Registration and Updation.
      this.employeeForm = this.formBuilder.group({
        name: [updateObservedObject.name, Validators.required],
        mobile: [updateObservedObject.mobile, Validators.required],
        email: [updateObservedObject.email, [Validators.required, Validators.email]],
        jobTitle : [updateObservedObject.jobTitle, Validators.required],
      });

    });
  }

// validateField method is used for validation of form
  get validateField() {
    return this.employeeForm.controls; }


// updateEmployeeData is used for update record
  updateEmployeeData(){

    var that = this;
    var responseObject;

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

cancelRecord(){
  this._router.navigate(['view-employee']);
}
}
