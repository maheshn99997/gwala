// Ionic Native providers
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { SQLite } from '@ionic-native/sqlite';

//App Providers
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { ToastProvider } from '../providers/toast/toast';
import { DatabaseProvider } from '../providers/database/database';
import { ConstantProvider } from '../providers/constant/constant';
import { WebServiceProvider } from '../providers/webservice/webservice';

//pages
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PasscodePage } from '../../src/pages/passcode/passcode';
import { HomePage } from '../../src/pages/home/home';

//app modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PincodeInputModule } from  'ionic2-pincode-input';
import { LoginPageModule } from '../../src/pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from "ap-angular2-fullcalendar";
// import { FullCalendarModule } from 'ng-fullcalendar';

export const PROVIDERS = [
    // Ionic native specific providers    
    SplashScreen,
    StatusBar,
    Network,
    Toast,
    Facebook,
    SQLite,
    //App Providers
    NetworkServiceProvider,
    ToastProvider,
    DatabaseProvider,
    ConstantProvider,
    WebServiceProvider
  ];

  export const MODULES = [
    BrowserModule,
    BrowserAnimationsModule,
    PincodeInputModule,
    HttpClientModule,
    CalendarModule
  ];

  export const ENTRYCOMPONENTS = [
    LoginPageModule
  ]

  export const PAGES = [
    MyApp,    
    LoginPage,
    RegisterPage,
    PasscodePage,
    HomePage
  ];

  export const DIRECTIVES = [
    
  ];