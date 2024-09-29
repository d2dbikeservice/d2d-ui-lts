import { Injectable } from "@angular/core";
// import { Booking } from "./bookings.model";
import { Subject } from "rxjs";
import { HttpClient, HttpParams} from '@angular/common/http'
import { environment } from './../../environments/environment';


const BACKEND_URL = environment.apiUrl + "/expenses"

@Injectable({providedIn:'root'})
export class ExpensesService{

  constructor(private http:HttpClient){

  }

  getExpenses(year:any, month:any){
    const params = new HttpParams()
    .set('year',year.toString())
    .set('month',month.toString())
    return this.http.get(BACKEND_URL, {params})
  }

  addExpense(expenseData:any){
    return this.http.post(BACKEND_URL,  expenseData)
  }

  deleteExpense(id:any){
    return this.http.delete(BACKEND_URL+  '/' + id)
  }

  updateExpense(id:any, bookingData:any){
    return this.http.put(BACKEND_URL+ '/' + id, bookingData)
  }

}
