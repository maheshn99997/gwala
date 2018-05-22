import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NetworkServiceProvider } from '../../providers/network-service/network-service';
import { DatabaseProvider } from '../../providers/database/database';

import { PasscodePage } from '../passcode/passcode';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  ifShowWelcome: boolean = true;
  isShowLoginForm: boolean = false;
  ifShowMoreLogin: boolean = false;
  isShowFirstDataForm: boolean = false;
  isShowSecondDataForm: boolean = false;

  @ViewChild('loginSlider') loginSlider: any;
  sliderOne: FormGroup;
  sliderTwo: FormGroup;
  sliderThree: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private network: NetworkServiceProvider,
    private toastProvider: ToastProvider,
    private facebook: Facebook,
    private platform: Platform,
    private database: DatabaseProvider,
    public formBuilder: FormBuilder,) {

      this.sliderOne = formBuilder.group({});
      this.sliderTwo = formBuilder.group({});
      this.sliderThree = formBuilder.group({});
  }

  ionViewDidLoad() {
    
  }

  ngOnInit() {
    // if(this.network.isOnline) {
    //   this.toastProvider.showToast('online!!!');
    // }
  }

  public loginWithFacebook(): void {
    console.log('clicked-- ',);
    if (this.platform.is('cordova')) {
      this.facebook.login(['public_profile', 'user_friends', 'email']).then ((resp: FacebookLoginResponse) => {
        console.log('fb login resp success-- ', resp);
        if (resp['status'] == 'connected') {
          this.toastProvider.showToast('logged in into fb');
          this.facebook.api('me?fields=id,name,email,mobile,first_name,last_name,picture.width(720).height(720).as(picture_large)', 
            []).then(data => {
              console.log('data-- ', data);
              this.database.createDatabase().then((res: any) => {
                if (this.platform.is('cordova')) {
                  if (res.length > 0) {
                    this.toastProvider.showToast('Logged in successfuly!!!');
                    this.navCtrl.push(PasscodePage);
                  }
                } else {
                  this.toastProvider.showToast('Logged in successfuly!!!');
                  this.navCtrl.push(PasscodePage);
                } 
              })
            });
        }
      }).catch(
        e => {
          console.log('fb login resp failed-- ', e);
        }
      )
    } else {
      this.navCtrl.push(PasscodePage);
    }
  }

  public moreLogin(): void {
    this.loginSlider.slideNext();
    this.loginSlider.slideNext();
  }

  public createAccount(): void {
    this.navCtrl.push(RegisterPage);
  }

  public login(): void {
    this.loginSlider.slideNext();
  }

  public loginWithFb(): void {
    this.loginWithFacebook();
  }

}
