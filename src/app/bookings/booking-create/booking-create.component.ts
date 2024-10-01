import { Component, Inject } from "@angular/core";
import { BookingsService } from "../bookings.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { DateAdapter } from '@angular/material/core';
import { AuthService } from "../../auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector:'app-booking-create',
  templateUrl:'./booking-create.component.html',
  styleUrls:['./booking-create.component.css']

})
export class BookingCreateComponent{
  taskForm = new FormGroup({
    customerName: new FormControl('',Validators.required),
    vehicleModel: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    userEmail: new FormControl('',[Validators.required, Validators.email]),
    contact: new FormControl( '',[Validators.required, Validators.pattern('^[0-9]{10,10}$')]),
    serviceScheduledDate: new FormControl('',Validators.required),
  });
  isDialogAlwaysOepn=false

  constructor(private bookingService:BookingsService,private dialogRef: MatDialogRef<BookingCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public builder:FormBuilder,
    private toasts:ToastrService,
    private dateAdapter: DateAdapter<Date>, private authService:AuthService ){
        // this.dateAdapter.setLocale('en-GB')
  }

  ngOnInit(): void {

  }

  checkedboxChange(event:any){
    this.isDialogAlwaysOepn = event;
    console.log('this.isDialogAlwaysOepn', this.isDialogAlwaysOepn);
    
  }


  onBookService(){
    let userData = this.authService.getLoggedinDetails();
    console.log(userData, userData.userName);

    const bookingData:any={
        customerName:this.taskForm.controls.customerName.value,
          vehicleModel:this.taskForm.controls.vehicleModel.value,
          address:this.taskForm.controls.address.value,
          userEmail:this.taskForm.controls.userEmail.value,
          city:"ayodhya",
          contact:this.taskForm.controls.contact.value,
          serviceEnquiryDate:new Date(),
          serviceScheduledDate:this.taskForm.controls.serviceScheduledDate.value,
          serviceCompletedDate:'',
          status:"Enquiry",
          totalBillAmount:0,
          totalPaidAmount:0,
          isBillPaid:"",
          isNewBooking:true,
          comment:'',
          assignedMechanic:'',
          updatedBy:userData.userName,
    }
    console.log('this.taskForm', this.taskForm);

    if(this.taskForm.invalid){
      return
    }

    this.bookingService.addBooking(bookingData).subscribe(res => {
      this.toasts.success("Booking Created successfully.")
      this.taskForm.reset();
      // console.log("checked", this.taskForm.controls.isDialogAlwaysOepn.value);
      
      if(!this.isDialogAlwaysOepn){
        this.dialogRef.close();
      }
    })
  }

  addTask(){
    this.onBookService()
  }
  // updateTask(){
  //   console.log('taskForm', this.taskForm);

  //   // console.log('formData', formData);

  // }
  resetForm(){
    this.taskForm.reset()
  }

}
