import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from "rxjs/operators";
import { environment } from '../environments/environment'
@Injectable()
export class shardService {

constructor(private _http: HttpClient){}

fetchEmployeeList(){
    var header = new HttpHeaders({
        'Content-Type' : 'application/json'
    })
 
    return this._http.get(environment.LocalHost.URL + "users" + "/" + "getEmployeeDeatils",{headers : header}).pipe(map(response =>{
      return response
   })
); 
}

deleteEmployeeItem(deleteEmployeeObject){

    var header = new HttpHeaders({
        'Content-Type' : 'application/json'
    })
 
    return this._http.post(environment.LocalHost.URL + "users" + "/" + "removeEmployeeData",deleteEmployeeObject,{headers : header}).pipe(map(response =>{
      return response
   })
); 
}

addNewRecord(insertItemObject){
    var header = new HttpHeaders({
        'Content-Type' : 'application/json'
    })
 
    return this._http.post(environment.LocalHost.URL + "users" + "/" + "insertEmployeeData",insertItemObject,{headers : header}).pipe(map(response =>{
      return response
   })
); 
}

updateRecord(updateItemObject){
    var header = new HttpHeaders({
        'Content-Type' : 'application/json'
    })
 
    return this._http.post(environment.LocalHost.URL + "users" + "/" + "updateEmployeeData",updateItemObject,{headers : header}).pipe(map(response =>{
      return response
   })
); 
}


}
