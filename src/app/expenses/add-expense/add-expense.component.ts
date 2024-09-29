import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpensesService } from '../expense.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  rowData:any
  constructor(private expenseService:ExpensesService,
    private dialogRef: MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,){
    this.rowData = this.data;
    console.log('this.rowData', this.rowData);
    
  }

  ngOnInit(): void {
    if(this.rowData.type == "Edit"){
      this.expenseForm.setValue({
        description: this.rowData?.data.description,
        amount: this.rowData?.data.amount,
        });
    }
      
  }

  addExpense(){
    let userData :any = localStorage.getItem('userData')
    const expenseDate = {
      description:this.expenseForm.controls.description.value,
      amount:this.expenseForm.controls.amount.value,
      date:new Date(),
      updatedBy:JSON.parse(userData).userName,
    }
    if(this.rowData.type == "Add"){
      this.expenseService.addExpense(expenseDate).subscribe(res => {
        this.dialogRef.close()      
      })

    }else{
      this.expenseService.updateExpense(this.rowData.data._id, expenseDate).subscribe(res => {
        this.dialogRef.close()  
      })

    }

  }

  // updateExpense(){
  //   let userData :any = localStorage.getItem('userData')
  //   const expenseDate = {
  //     description:this.expenseForm.controls.description.value,
  //     amount:this.expenseForm.controls.amount.value,
  //     date:new Date(),
  //     updatedBy:JSON.parse(userData).userName,
  //   }
  

  // }

  resetForm(){

  }

}
