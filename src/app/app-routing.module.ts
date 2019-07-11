import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component'
import { UpdateEmployeeComponent } from './update-employee/update-employee.component'
import { ViewEmployeeComponent } from './view-employee/view-employee.component'

const routes: Routes = [

  {path:"",component : ViewEmployeeComponent},
  {path:"add-employee",component : AddEmployeeComponent},
  {path:"update-employee",component : UpdateEmployeeComponent},
  {path:"view-employee",component : ViewEmployeeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
