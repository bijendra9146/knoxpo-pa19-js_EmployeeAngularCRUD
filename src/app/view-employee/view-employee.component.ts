import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { shardService } from '../shardService.service'
import { employeeFromService }  from '../behaviourSubjects/genericEmployeeFormBehaviour.service'

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  deleteModelFieldFlag: boolean = false;
  deleteModelData;
  responseArrayData;

  constructor(private _router : Router,private _employeeFromService : employeeFromService, private _shardService: shardService) {

  }

  ngOnInit(){

    this.getEmployeeList();

  }

// getEmployeeList method is used to get all employee details in table
  getEmployeeList(){

    var that = this;
    var responseObject;
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

// selectToUpdateEmployee method is used to get perticular employee record and pass that
// record to Update employee Form.
  selectToUpdateEmployee(alterData){
    console.log("alterData is ",alterData);
    this._employeeFromService.getEmployeeFormData(alterData);
    this._router.navigate(['update-employee']);

  }

// passDataToModel method is used to pass employee data to delete waring dialog box.
  passDataToModel(employeeData){
    this.deleteModelFieldFlag = true;
    console.log("employee Data is ",employeeData);
    this.deleteModelData = employeeData;
  }

// deleteEmployeeItem is used to delete the selected record after confirmation of dialog box.
  deleteEmployeeItem(){
    var that = this;
    var responseObject;

    this._shardService.deleteEmployeeItem(this.deleteModelData).subscribe(function(removedDataObj){
      responseObject = removedDataObj;
      if(responseObject.responseStatus == '000'){
        that.responseArrayData = responseObject.responseData;
      }else{
        alert("Something went wrong");
      }
    });

  }






}
