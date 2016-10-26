import { Injectable } from '@angular/core';
//import { miappService } from './miapp.sdk.angular2';

//declare var require: any
//declare var cordova: any

// ie http://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-ionic-2/
// or http://www.joshmorony.com/part-2-creating-a-multiple-user-app-with-ionic-2-pouchdb-couchdb/
//let PouchDB = require('pouchdb');
import PouchDB from 'pouchdb'
//import MiappService from './miapp.sdk.angular2'
import { MiappService } from '../providers/miapp.sdk.angular2';


/*export interface ImiappService {

  isPouchDBEmpty(): string;
  login() : string;
  putFirstUserInEmptyPouchDB() : void;
  syncPouchDb() : void;
}*/


@Injectable()
export class DataService {
  private _db;
  private _dbInitialized = false;


  constructor(private miappService : MiappService){

    this._db = new PouchDB('miapp_db', { adapter: 'websql' });
    //this._db = cordova ? new PouchDB('miapp_db', {adapter: 'websql'}) : new PouchDB('miapp_db');

  }


  // Call it on each app start
  // Set User login in DB if db empty
  // Return Promise with this._db
  initDBWithLogin(login, password) : Promise<any> {


    if (this._dbInitialized) return Promise.reject('Already initialized');
    
    //return this.miappService.login(login, password);


    return new Promise((resolve, reject) => {

    
      this.miappService.isPouchDBEmpty(this._db)
        .then( (isEmpty) => {
          if (!isEmpty) return Promise.resolve(); // already set

          return this.miappService.login(login, password);
        })
        .then( (firstUser) => {
          if (!firstUser) return Promise.resolve(); // already set

          return this.miappService.putFirstUserInEmptyPouchDB(this._db, firstUser);
        })
        .then( (ret) => {
          //if (ret) return deferred.reject(err);
          return this.miappService.syncPouchDb(this._db);
        })
        .then( (ret) => {
          //if (ret) return deferred.reject(err);
          this._dbInitialized = true;
          resolve(this._db);
        })
        .catch((err) => {
          reject(err);
        });
    });


  }

  // Sync Data
  // If empty call fnInitFirstData(this._db), should return Promise to call sync
  // Return Promise with this._db
  syncDB(fnInitFirstData) : Promise<any> {
    if (!this._dbInitialized) return Promise.reject('Not initialized');

    return new Promise(function(resolve, reject) {
      this.miappService.isPouchDBEmpty(this._db)
        .then(function (isEmpty) {
          if (isEmpty && fnInitFirstData) {
            return fnInitFirstData(this._db);
          }
          return Promise.resolve('ready to sync');
        })
        .then(function (ret) {
          return this.miappService.syncPouchDb(this._db);
        })
        .then(function (err) {
          if (err) return reject(err);
          //self.$log.log('srvDataContainer.sync resolved');
          resolve();
        })
        .catch(function (err) {
          var errMessage = err ? err : 'pb with getting data';
          //self.$log.error(errMessage);
          reject(errMessage);
        });
    });
  }


  public putOnItem(item) {
    return this.miappService.putInPouchDb(this._db, item);
  }


}
