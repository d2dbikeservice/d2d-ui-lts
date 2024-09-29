import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ExpensesService } from '../expense.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  expensesList :any= []
  dataSource:any;
  displayedColumns:string[]=["S.No.","description", "amount","date","updatedBy", "actions"]
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
  totalExpense:number=0;

  constructor(private dialog:MatDialog, private expenseService:ExpensesService,private toastr:ToastrService){
    let todatDate = new Date();
    this.selectedYear = todatDate.getFullYear()
    this.selectedMonth = todatDate.getMonth() +1;

  }
  ngOnInit(): void {
      this.getExpenses()
  }



  addExpense(){
    let addDialog = this.dialog.open(AddExpenseComponent, {
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {type:"Add",
        data:null},
    });

    addDialog.afterClosed().subscribe(item =>{
        this.getExpenses()
    })

  }

  editExpense(rowData:any){
    let editDialog = this.dialog.open(AddExpenseComponent, {
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        type:"Edit",
        data:rowData
      },
    });

    editDialog.afterClosed().subscribe(item =>{
      this.getExpenses()
  })

  }

  getExpenses(){
    this.isLoading = true;
    this.totalExpense = 0;
    this.expenseService.getExpenses(this.selectedYear, this.selectedMonth).subscribe(res => {
      let result:any = res;
      this.expensesList = result.expense
      this.expensesList.map((item:any) => {
        this.totalExpense += item.amount
      })
      this.dataSource = new MatTableDataSource<any>(this.expensesList)
      this.dataSource.paginator = this.paginator
      this.isLoading = false;
      
    })
    // let result:any = res;
      // this.bookings = result.bookings

      // this.dataSource = new MatTableDataSource<any>(this.expensesList)
      // this.dataSource.paginator = this.paginator
      // this.isLoading = false;
  }

  openDeleteExpense(rowData:any){
    this.expenseService.deleteExpense(rowData._id).subscribe(res => {
      this.toastr.success("Expense Deleted Succesfully.")
      this.getExpenses()
    }, () => {
      // this.isLoading = false
    })

  }

  onYearChange(){
    this.getExpenses()

  }

}
