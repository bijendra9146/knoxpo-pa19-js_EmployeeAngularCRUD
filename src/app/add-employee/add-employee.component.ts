import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { shardService } from '../shardService.service'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  showNewInsertRecordFlag: boolean = false;
  sucessInsertArrayData;
  constructor(private _shardService: shardService,private formBuilder: FormBuilder) { }

  ngOnInit() {
// I used Reactive Form for employee Registration and Updation.
  this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle : ['', Validators.required],
    });
  }

// validateField method is used for validation of form
  get validateField() {
    return this.employeeForm.controls; }

// insertNewEmployeeRecord is used for insert record
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

}
