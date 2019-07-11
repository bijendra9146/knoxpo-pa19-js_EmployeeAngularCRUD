import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { employeeDataModel } from '../behaviourModel/employeModel'

@Injectable()

export class employeeFromService{

  private employeeDataSource = new BehaviorSubject<employeeDataModel>(null)
  observedEmployeeData = this.employeeDataSource.asObservable();

  getEmployeeFormData(employeeDataModel : employeeDataModel){
    this.employeeDataSource.next(employeeDataModel);
  }



}
