import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthencated = false;
  private authListenerSubs!:Subscription

  title = 'booking-ui';

  constructor(private authService:AuthService){


  }
  ngOnInit() {
    this.authService.autoAuthUser()

    this.userIsAuthencated = this.authService.getIsAuth()
      this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthencated => {
        this.userIsAuthencated = isAuthencated
      })
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
}


}
