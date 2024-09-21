import { Component, Inject, OnInit } from '@angular/core';
import { BookingsService } from './../bookings.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-booking',
  templateUrl: './delete-booking.component.html',
  styleUrl: './delete-booking.component.css'
})
export class DeleteBookingComponent implements OnInit {
  rowData:any
  constructor(private bookingService:BookingsService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private deleteDialog:MatDialogRef<DeleteBookingComponent>
  ){

  }

  ngOnInit(): void {
    this.rowData = this.data.data

  }

  onDelete(){
    // this.isLoading = true;
    this.bookingService.deleteBooking(this.rowData._id).subscribe(res => {
      // this.getBookings()
      this.deleteDialog.close("deleted success");
    }, () => {
      // this.isLoading = false
    })
  }

  closeDelete(){
    this.deleteDialog.close("deleted closed");
  }

}
