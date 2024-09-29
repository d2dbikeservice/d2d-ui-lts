import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  expensesList :any= [
    {
    description:"Saluja",
    amount:400,
    date:"25 July",
    updatedBy:"Sachin"
  },
    {
    description:"Navdurga",
    amount:400,
    date:"25 July",
    updatedBy:"Nivesh"
  },
]
  dataSource:any;
  displayedColumns:string[]=["S.No.","description", "amount","date","updatedBy"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  isLoading:boolean=false
  selectedYear:any
  selectedMonth:any
  yearList=[2024, 2025]
  monthList:any=[
    {name:"Jan", value:1},
    {name:"Feb", value:2},
    {name:"March", value:3},
    {name:"April", value:4},
    {name:"May", value:5},
    {name:"June", value:6},
    {name:"July", value:7},
    {name:"Aug", value:8},
    {name:"Sept", value:9},
    {name:"Oct", value:10},
    {name:"Nov", value:11},
    {name:"Dec", value:12},
  ]

  constructor(){
    let todatDate = new Date();
    this.selectedYear = todatDate.getFullYear()
    this.selectedMonth = todatDate.getMonth() +1;

  }
  ngOnInit(): void {
      this.getExpenses()
  }



  addExpense(){

  }

  getExpenses(){
    // let result:any = res;
      // this.bookings = result.bookings
      this.dataSource = new MatTableDataSource<any>(this.expensesList)
      this.dataSource.paginator = this.paginator
      this.isLoading = false;
  }

  onYearChange(){

  }

}
