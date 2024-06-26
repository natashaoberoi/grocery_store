import { ErrorHandler, Injectable, Injector, ApplicationRef, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';
import { EvsError } from './../model/evsError';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonDataService } from './common-data.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  appRef: any;

  constructor(
    private injector: Injector) {
    super();
  }

  handleError(error: Error) {
    const loaderService = this.injector.get(LoaderService);
    const router = this.injector.get(Router);
    const zone = this.injector.get(NgZone);
    const appRef = this.injector.get(ApplicationRef);
    const commonDataService = this.injector.get(CommonDataService);

    loaderService.hideLoader();

    if (error instanceof EvsError) {
      // Display notifications only if it is a known error i.e. ImmPortError and enabled
      console.log(error.displayMessage);
      error.displayMessage = error.displayMessage + '. Please contact the  NCI helpdesk';
      if (error.displayNotification) {
        this.notifyError(error.displayMessage);
      }
    } else {
      //console.log('error***' + error.message);

      zone.run(() => {
        commonDataService.changeMessage(error);
        router.navigateByUrl('error');
      });
    }
    super.handleError(error);
  }

  notifyError(displayMessage: string) {
    const notificationService = this.injector.get(NotificationService);
    const appRef = this.injector.get(ApplicationRef);
    const zone = this.injector.get(NgZone);
    zone.run(() => {
      notificationService.notify(
        {
          severity: 'error',
          summary: 'Sorry, something went wrong.',
          detail: displayMessage,
          sticky: true,
          closable: true
        }
      );
      // setTimeout( function() {
      //   appRef.tick();
      // });
    });
  }

}
