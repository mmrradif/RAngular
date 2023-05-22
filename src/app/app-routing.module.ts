import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeeComponent } from './Components/view-employee/view-employee.component';
import { CreateEmployeeComponent } from './Components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';

const routes: Routes = [
  {path:'employees', component:ViewEmployeeComponent,pathMatch:'full'},
  {path:'createEmployee', component:CreateEmployeeComponent},
  { path: 'editEmployee/:id', component: EditEmployeeComponent },
  
  {path:'**', component:ViewEmployeeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
