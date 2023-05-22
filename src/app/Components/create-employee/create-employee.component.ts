import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  employeeForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    joiningDate: new FormControl('',Validators.required),
    salary: new FormControl('',Validators.required),
    isManager: new FormControl('', Validators.required)
  });

  constructor(
    private dataSvc: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  f(){
    return this.employeeForm.controls;
  }


  insert(){
    if(this.employeeForm.invalid) return;

    this.employee.name=this.f()['name'].value;
    this.employee.joiningDate=this.f()['joiningDate'].value;
    this.employee.salary=this.f()['salary'].value;
    this.employee.isManager=this.f()['isManager'].value;

    try {
      this.dataSvc.createEmployee(this.employee).subscribe(
        (response) => {
          console.log(response);
          this.employeeForm.reset({});
        },
        (error) => {
          console.error('An error occurred during Employee Insert', error);
        }
      );
    } catch (error) {
      console.error('An error occurred during Employee Insert', error);
    }   
    
  }

  resetForm(){
    this.employeeForm.reset();
  }

  goToList() {
    this.router.navigate(['/employees']); 
  }

}
