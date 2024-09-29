import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpensesService } from '../expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit {
  expenseForm = new FormGroup({
    description: new FormControl('',Validators.required),
    amount: new FormControl('',Validators.required),
  });
  constructor(private expenseService:ExpensesService){

  }

  ngOnInit(): void {
      
  }

  addExpense(){
    let userData :any = localStorage.getItem('userData')
    const expenseDate = {
      description:this.expenseForm.controls.description.value,
      amount:this.expenseForm.controls.amount.value,
      date:new Date(),
      updatedBy:JSON.parse(userData).userName,
    }
    this.expenseService.addExpense(expenseDate).subscribe(res => {
      console.log(res);
      
    })

  }

  resetForm(){

  }

}
