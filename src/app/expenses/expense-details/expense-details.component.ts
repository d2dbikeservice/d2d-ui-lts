import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrl: './expense-details.component.css'
})
export class ExpenseDetailsComponent implements OnInit {
  expenseArray:any
  expenseDetailedArray:any=[]

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,){
    this.expenseArray = this.data.data;
  }

  ngOnInit(): void {
    this.createDetailsArray()   
  }

  createDetailsArray(){
    this.expenseDetailedArray = this.expenseArray.reduce((acc:any, curr:any) => {
      const found = acc.find((item:any) => item.description === curr.description);
      if (found) {
          found.amount += curr.amount;
      } else {
          acc.push({ description: curr.description, amount: curr.amount });
      }
      return acc;
    }, []);  
  }
}
