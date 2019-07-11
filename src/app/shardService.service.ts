import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from "rxjs/operators";
import { environment } from '../environments/environment'
@Injectable()
export class shardService {

constructor(private _http: HttpClient){}
// below service is used to fetch all employee records.
fetchEmployeeList(){
    var header = new HttpHeaders({
        'Content-Type' : 'application/json'
    })

    return this._http.get(environment.LocalHost.URL + "users" + "/" + "getEmployeeDeatils",{headers : header}).pipe(map(response =>{
      return response
   })
);
}

// below service is used to delete perticular employee record.
deleteEmployeeItem(deleteEmployeeObject){

    var header = new HttpHeaders({
        'Content-Type' : 'application/json'
    })

    return this._http.post(environment.LocalHost.URL + "users" + "/" + "removeEmployeeData",deleteEmployeeObject,{headers : header}).pipe(map(response =>{
      return response
   })
);
}

// below service is used to insert perticular employee record.
addNewRecord(insertItemObject){
    var header = new HttpHeaders({
        'Content-Type' : 'application/json'
    })

    return this._http.post(environment.LocalHost.URL + "users" + "/" + "insertEmployeeData",insertItemObject,{headers : header}).pipe(map(response =>{
      return response
   })
);
}

// below service is used to update perticular employee record.
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
