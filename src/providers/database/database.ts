import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';

import { User } from '../../model/User';
@Injectable()
export class DatabaseProvider {
  window: any = window;

  constructor(
    private sqlLite: SQLite,
    private platform: Platform) {
    
  }

  createDatabase() {
    if (this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        this.sqlLite.create({
          name: 'gwala.db',
          location: 'default'
        }).then ((db: SQLiteObject) => {
          let promise1 = db.executeSql('CREATE TABLE IF NOT EXISTS GwUserProfile(id INTEGER PRIMARY KEY, firstname VARCHAR, middlename VARCHAR, surname VARCHAR, mobileno VARCHAR, email VARCHAR, phoneno VARCHAR, addrLine1 VARCHAR, addrLine2 VARCHAR, addrLine3 VARCHAR, city VARCHAR, pincode VARCHAR)', {});
          return Promise.all ([promise1]).then((res) => {
            resolve(res);
          }).catch ((e) => {
            resolve(e);
          })
        }).catch ((e) => {
          resolve(e);
        });
      })
    } else {
      let db = this.window.openDatabase('gwala.db', '1.0', 'TestDB', 1024 * 1024);
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql (
            'CREATE TABLE IF NOT EXISTS GwUserProfile(id INTEGER PRIMARY KEY, firstname VARCHAR, middlename VARCHAR, surname VARCHAR, mobileno VARCHAR, email VARCHAR, phoneno VARCHAR, addrLine1 VARCHAR, addrLine2 VARCHAR, addrLine3 VARCHAR, city VARCHAR, pincode VARCHAR)', [],
              function(){console.log('createTable:GwUserProfile');},
              function(){console.log('onError::::createDatabase');}                
          )
          resolve();
        },
        (error) => {
          console.log('onError::::createDatabase');
          console.log('onReadyTransaction');
          reject();
        });
      });
    }
  }

  insertUserDataInTable(user: User) {
    return new Promise((resolve, reject) => {
      let insertQuery = 'INSERT INTO GwUserProfile(firstname, middlename, surname, mobileno, email, addrLine1, addrLine2, addrLine3, city, pincode) VALUES(?,?,?,?,?,?,?,?,?,?)';
      let params = [user.firstName, user.middleName, user.lastName, user.phone, user.email, user.addrLine1, user.addrLine2, user.addrLine1, user.city, user.pincode];
      console.log('params-- ', params);
      if (this.platform.is('cordova')) {
        this.sqlLite.create({
          name: 'gwala.db',
          location: 'default'
        }). then((db: SQLiteObject) => {
          db.executeSql(insertQuery, params).then((res) => {
            resolve(res);
          });
        }).catch((e) => {
          resolve(e);
        });
      } else {
        let db = this.window.openDatabase('gwala.db', '1.0', 'TestDB', 1024 * 1024);
        db.transaction(
          tx => {
            tx.executeSql(insertQuery, params, 
              (success) => {
              console.log('onSuccess:insertUserDataInTable');
              resolve(success);
              },
              (error) => {
                console.log('onError:insertUserDataInTable');
                resolve(error);
              }
            )
          },
          (error) => {
            console.log('onError:tx:insertUserDataInTable');
            resolve(error);
          },
          (transaction) => {
            console.log('onReadyTransaction:insertUserDataInTable');
            resolve(transaction);
          }
        );
      }
    });
  }

}
