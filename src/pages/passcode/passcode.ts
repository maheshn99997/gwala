import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PincodeController } from  'ionic2-pincode-input';
import { ToastProvider } from '../../providers/toast/toast';

import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-passcode',
  templateUrl: 'passcode.html',
})
export class PasscodePage implements OnInit{

  isFirstTime: boolean = true;
  isFirstPassSet: boolean = false;
  pincodeData: string;
  isPinSet: boolean = false;
  isShowEnterText: boolean = true;
  isShowConfirmEnterText: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pincode: PincodeController,
    private toast: ToastProvider) {
  }

  ionViewDidLoad() {
    
  }

  ngOnInit() {
    if (localStorage.getItem('isPinSet') == 'true') {
      this.isPinSet = true;
      this.isShowEnterText = false;
    } else if (localStorage.getItem('isPinSet') == 'false') {
      this.isPinSet = false;
    }
    this.openPincodeDia();
  }

  public openPincodeDia() {
    let pincodeDialouge = this.pincode.create({
      title: 'Pincode',
      passSize: 4,
      pinHandler: this.handlePIN,
      hideForgotPassword: false,
      hideCancelButton: true,
      hideToolbar: true,
      enableBackdropDismiss: false,
      cssClass:''
    });
  
    pincodeDialouge.present();

    pincodeDialouge.onDidDismiss((code, status) => {
      console.log('code- ', code, ' status- ', status);
      if (status == 'forgot') {
        this.toast.showToast('forgot password');  
      }
    })
  }

  private handlePIN: (pincode: string) => Promise<any> = (pincode: string) => {
    if (!this.isPinSet) {
      if (this.isFirstTime) {
        this.pincodeData = pincode;
        this.isFirstPassSet = true;
        this.isFirstTime = false;
        console.log('this.isFirstPassSet-- ', this.isFirstPassSet);
        this.openSecondPincodeDia();
        return Promise.resolve();
      } else if (this.isFirstPassSet) {
        if (this.pincodeData == pincode) {
          localStorage.setItem('isPinSet', 'true');
          localStorage.setItem('pin', pincode);
          this.isPinSet = true;
          this.toast.showToast('pin set successfuly');  
          return Promise.resolve(this.navCtrl.push(HomePage));
        } else {
          localStorage.setItem('isPinSet', 'false');
          this.toast.showToast('pin does not match');  
          return Promise.reject('');
        }
      }
    } else if (this.isPinSet) {
      if (pincode == localStorage.getItem('pin')) {
        return Promise.resolve(this.navCtrl.push(HomePage));
      } else {
        this.toast.showToast('Wroong pin');
        return Promise.reject('');
      }
    }
  };

  public openSecondPincodeDia() {
    this.isShowEnterText = false;
    this.isShowConfirmEnterText = true;
    let pincodeDialouge = this.pincode.create({
      title: 'Pincode',
      passSize: 4,
      pinHandler: this.handlePIN,
      hideForgotPassword: false,
      hideCancelButton: true,
      hideToolbar: true,
      enableBackdropDismiss: false
    });
  
    pincodeDialouge.present();

    pincodeDialouge.onDidDismiss((code, status) => {
      console.log('code- ', code, ' status- ', status);
      if (status == 'forgot') {
        this.toast.showToast('forgot password');  
      }
    })
  }

}
