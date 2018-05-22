import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { CalendarComponent } from 'ng-fullcalendar';
// import { Options } from 'fullcalendar';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  // calendarOptions: Options;
  // @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ngOnInit() {
    
  }

  calendarOptions: Object = {
    customButtons: {
        myCustomButton: {
            text: 'custom!',
            click: function() {
                console.log('clicked the custom button!');
            }
        }
    },
    
    header: {
      left: 'prev',
      right: 'next',

      center: 'title' // basicWeek agendaWeek agendaFourDay
    },
    views: {
      agendaFourDay: {
          type: 'agenda',
          duration: { days: 7 },
          buttonText: 'Week'
      }
    },
    height: '300px',
    fixedWeekCount : false,
    allDay: false,
    defaultDate: new Date(),
    theme: true,
    themeSystem: 'jquery-ui',
    themeName: 'dot-luv',
    editable: true,
    navLinks: true,
    eventLimit: true, // allow "more" link when too many events    
    eventSources: [
      {
        events: [
          {
              title: 'All Day Event',
              start: '2018-05-21',
              end: '2018-05-23',
              organizerEmail: 'rohan_patil@fulcrumww.com'
          },
          {
            title: 'Long Event',
            start: '2017-12-17',
            end: '2017-12-17'
          },
          {
            title: 'Test Event',
            start: '2017-12-20',
            end: '2017-12-20'
          },
          {
            title: 'Test Event2',
            start: '2017-12-02',
            end: '2017-12-02'
          }
        ]
      }
    ],
    navLinkWeekClick:(weekStart, jsEvent)=>{
      console.log('week start', weekStart.format()); // weekStart is a moment
    },
    navLinkDayClick: (date, jsEvent) => {
        console.log('day', date.format()); // date is a moment
        console.log('event-- ', jsEvent);        
    },
    eventClick: (event) => {
      if (event.title) {
        console.log('event.title-- ', event);
        return false;
      }
    },
    dayClick: (date, jsEvent, view)=> {
      console.log('Clicked on-- ', date);      
      console.log('Current view-- ', view.name);
    }
  };

  onCalendarInit($event) {
    console.log('event-- ', event);
  }

}
