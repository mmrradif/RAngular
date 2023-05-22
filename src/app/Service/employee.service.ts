import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:5230/";

  constructor(
    private http:HttpClient
  ) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(
      `${this.baseUrl}api/Employees`
      );
  }

  createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(
      `${this.baseUrl}api/Employees`, 
      employee
      );
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.baseUrl}api/Employees/${employeeId}`
      );
  }


  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.baseUrl}api/Employees/${employee.id}`,
      employee
    );
  }


  deleteEmployee(id: number): Observable<Employee>{
    return this.http.delete<Employee>(
      `${this.baseUrl}api/Employees/${id}`
      );
  }
}
