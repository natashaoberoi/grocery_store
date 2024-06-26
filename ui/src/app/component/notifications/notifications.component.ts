import { Component, OnInit, OnDestroy } from '@angular/core';

import { NotificationService } from './../../service/notification.service';
import { Subscription } from 'rxjs';
import { MessageService} from 'primeng/api';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  stickNotification: Boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.notificationService.getNotificationChangeSubject()
    .subscribe(notification => {
      if (notification != null) {
        this.messageService.add(
          {
            severity: notification.severity,
            summary: notification.summary,
            detail: notification.detail,
            sticky: notification.sticky,
            closable: notification.closable
          }
        );

      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
