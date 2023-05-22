import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employees: Employee[]=[];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource(this.employees);
  columnList: string[]=['name','joiningDate','salary','isManager','actions'];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private dataSvc: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.data();
  }
  

  deleteEmployee(employeeId: number) {
    this.dataSvc.deleteEmployee(employeeId).subscribe(
      () => {    
        console.log('Employee deleted successfully.'); 
        this.data();  
      },
      (error) => {       
        console.error('An error occurred during employee deletion:', error);
      }
    );
  }


  data() {
    try {
      this.dataSvc.getEmployees().subscribe(x => {
        this.employees = x;
        this.dataSource.data = this.employees;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(x);
      });

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }



  editEmployee(employee: Employee) {
    
    this.router.navigate(['/editEmployee', employee.id]);
  }

}
