import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { PAGES, MODULES, PROVIDERS, DIRECTIVES, ENTRYCOMPONENTS} from './app.import';

import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp,
    PAGES,
    DIRECTIVES
  ],

  imports: [
    MODULES,
    IonicModule.forRoot(MyApp)
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    PAGES
  ],

  providers: [
    PROVIDERS,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule {}
