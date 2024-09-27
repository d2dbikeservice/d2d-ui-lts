import { Component, Inject } from "@angular/core";
import { BookingsService } from "../bookings.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { TitleCasePipe } from "@angular/common";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.css',
  providers: [TitleCasePipe]
})
export class EditBookingComponent {
  taskForm = new FormGroup({
    customerName: new FormControl('',Validators.required),
    vehicleModel: new FormControl('',Validators.required),
    userEmail: new FormControl('',[Validators.required, Validators.email]),
    address: new FormControl('',Validators.required),
    contact: new FormControl(0,[Validators.required, Validators.pattern('^[0-9]{10,10}$')]),
    status: new FormControl('',Validators.required),
    isBillPaid: new FormControl('',),
    totalBillAmount: new FormControl(0,),
    totalPaidAmount: new FormControl(0,),
    serviceEnquiryDate: new FormControl({ disabled: true, value: '' }),
    serviceScheduledDate: new FormControl('',Validators.required),
    serviceCompletedDate: new FormControl(''),
    comment: new FormControl(''),
    assignedMechanic:new FormControl('')
  });
  statusOptionsArray:any=[
    {value:"Enquiry", label:"Enquiry"},
    {value:"Need To Schedule", label:"Need To Schedule"},
    {value:"Slot Booked", label:"Slot Booked"},
    {value:"Service Completed", label:"Service Completed"},
    {value:"Complaint", label:"Complaint"},
    {value:"Pending From Customer", label:"Pending From Customer"},
    {value:"Pending From D2d", label:"Pending From D2d"},
    {value:"In Progress", label:"In Progress"},
    {value:"Cancelled", label:"Cancelled"},
  ]
  mechanicList:any=['Vaibhav', 'Amaan']

  constructor(private bookingService:BookingsService,private dialogRef: MatDialogRef<EditBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private authService:AuthService,
    public titleCasePipe: TitleCasePipe,
    public builder:FormBuilder,
    private dateAdapter: DateAdapter<Date> ){
      // this.dateAdapter.setLocale('en-GB')

  }

  ngOnInit(): void {
    let bookingData:any = this.data.data;
    this.taskForm.setValue({
    customerName: bookingData?.customerName,
    vehicleModel: bookingData?.vehicleModel,
    userEmail: bookingData?.userEmail ? bookingData?.userEmail : '',
    address: bookingData?.address,
    contact:bookingData?.contact,
    status:this.titleCasePipe.transform(bookingData?.status),
    isBillPaid: bookingData?.isBillPaid,
    totalBillAmount: bookingData?.totalBillAmount,
    totalPaidAmount: bookingData?.totalPaidAmount,
    serviceEnquiryDate:bookingData?.serviceEnquiryDate.split('T')[0],
    serviceScheduledDate:bookingData?.serviceScheduledDate.split('T')[0],
    serviceCompletedDate:bookingData?.serviceCompletedDate,
    comment:bookingData?.comment,
    assignedMechanic:bookingData?.assignedMechanic
    });


  }

  onBookService(){
    let userData = this.authService.getLoggedinDetails();
    const bookingData:any={
      id:this.data.data._id,
        customerName:this.taskForm.controls.customerName.value,
        vehicleModel:this.taskForm.controls.vehicleModel.value,
        userEmail:this.taskForm.controls?.userEmail ? this.taskForm.controls?.userEmail.value : '',
        address:this.taskForm.controls.address.value,
        city:"ayodhya",
        contact:this.taskForm.controls.contact.value,
        serviceEnquiryDate:this.taskForm.controls.serviceEnquiryDate.value,
        serviceScheduledDate:this.taskForm.controls.serviceScheduledDate.value,
        serviceCompletedDate:this.taskForm.controls.serviceCompletedDate.value,
        status:this.taskForm.controls.status.value,
        totalBillAmount:this.taskForm.controls.totalBillAmount.value,
        totalPaidAmount:this.taskForm.controls.totalPaidAmount.value,
        isBillPaid:this.taskForm.controls.isBillPaid.value,
        isNewBooking:false,
        comment:this.taskForm.controls.comment.value,
        updatedBy:userData.userName,
        assignedMechanic:this.taskForm.controls.assignedMechanic.value,

    }
    if(this.taskForm.invalid){
      return
    }

    this.bookingService.updateBooking(this.data.data._id, bookingData).subscribe(res => {
      this.dialogRef.close('edited success');
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
