import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../model/User';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';
import { HomePage } from '../home/home';
import { PasscodePage } from '../passcode/passcode';
import { WebServiceProvider } from '../../providers/webservice/webservice';
import { ConstantProvider } from '../../providers/constant/constant';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  @ViewChild('signupSlider') signupSlider: any;
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  
  submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public database: DatabaseProvider,
    public toast: ToastProvider,
    public webService: WebServiceProvider,
    public constant: ConstantProvider,
    public loading: LoadingController,
    public platform: Platform) {
      
      this.slideOneForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z]*'), Validators.required])],
        phone: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern(''), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern(''), Validators.required])]
      });

      this.slideTwoForm = formBuilder.group({
        addrLine1: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(10), Validators.pattern('[0-9a-zA-Z ]*'), Validators.required])],
        addrLine2: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(10), Validators.pattern('[0-9a-zA-Z ]*'), Validators.required])],
        city: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z]*'), Validators.required])],
        pincode: ['', Validators.compose([Validators.maxLength(6), Validators.minLength(6), Validators.pattern(''), Validators.required])]
      });
  }

  ngOnInit() {

  }

  public next(): void {
    this.signupSlider.slideNext();
  } 

  public previous(): void {
    this.signupSlider.slidePrevious();
  }

  public save(): void {
    let loading = this.loading.create({content: 'Please wait..'});
    loading.present();
    let user = new User();
    if(!this.slideOneForm.valid){
      this.submitAttempt = true;
      this.signupSlider.slideTo(0);
      loading.dismiss();
    }
    else if(!this.slideTwoForm.valid){
      this.submitAttempt = true;
      this.signupSlider.slideTo(1);
      loading.dismiss();
    }
    else {
      this.submitAttempt = false;
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
        user.firstName = this.slideOneForm.value.firstName;
        user.middleName = '';
        user.lastName = this.slideOneForm.value.lastName;
        user.email = this.slideOneForm.value.email;
        user.phone = this.slideOneForm.value.phone;
        user.addrLine1 = this.slideTwoForm.value.addrLine1;
        user.addrLine2 = this.slideTwoForm.value.addrLine2;
        user.addrLine3 = '';
        user.city = this.slideTwoForm.value.city;
        user.pincode = this.slideTwoForm.value.pincode;

        let userJson = {
          'firstName': user.firstName,
          'lastName': user.lastName,
          'phoneNumber': Number.parseInt(user.phone),
          'email': user.email,
          'flatNoBuidlingName':user.addrLine1,
          'streetName': user.addrLine2,
          'area': user.addrLine1,
          'landmark': user.addrLine2,
          'pincode': Number.parseInt(user.pincode),
          'city': user.city,
          'state': user.city
        }

        console.log('userJson---- ', userJson);

        let url = this.constant.baseAppUrl + this.constant.registerUser;
        this.webService.callPostService(url, userJson)
          .subscribe (
            data => {
              console.log('data-- ', data);
              if (data['status'] == 'success') {
                this.insertDataIntoDb(user).then((resp: any) => {
                  if (resp.flag) {
                    loading.dismiss();
                    this.toast.showToast('Registration successful!!!');
                    this.navCtrl.push(PasscodePage);
                  } else {
                    loading.dismiss();
                    this.toast.showToast('Data stroring into db failed');
                  }
                });
              }
            },
            error => {
              loading.dismiss();
              console.log('error-- ', error);
              this.toast.showToast('web service failed');
            }
          )
    }
  }

  public insertDataIntoDb(user: User) {
    return new Promise((resolve, reject) => {
      let resp = {
        flag: false,
        message: ''
      }
      this.database.insertUserDataInTable(user).then(
        success => {
          resp = {
            flag: true,
            message: 'data saved successfuly'
          }
          if (this.platform.is('cordova')) {
            if (success['insertId'] > 0 && success['insertId'] != null) {
              console.log('success--- ', success);
              this.toast.showToast('Registration Successful!!!');
              resolve(resp);
            }
          } else {
            console.log('success--- ', success);
            resolve(resp);
          }
        },
        error => {
          console.log('error--- ', error);
          resp = {
            flag: false,
            message: 'Problem with data storing'
          }
          resolve(resp);
        }
      )
    });
  }

  public goBack(): void {
    this.navCtrl.pop();
  }
}
