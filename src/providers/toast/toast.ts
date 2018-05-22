import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@Injectable()
export class ToastProvider {

  constructor(
    public toast: Toast,
    public platform: Platform
  ) {
    
  }

  showToast(message: string) {
    if (this.platform.is('cordova')) {
      this.toast.show(message, '3000', 'bottom').subscribe (
        toast => {
          console.log('toast');
        }
      );
    } else {
      console.log(message);
    }
  }
}
