import { Injectable } from '@angular/core';
//import { miappService } from './miapp.sdk.angular2';

//declare var require: any
//declare var cordova: any

// ie http://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-ionic-2/
// or http://www.joshmorony.com/part-2-creating-a-multiple-user-app-with-ionic-2-pouchdb-couchdb/
//let PouchDB = require('pouchdb');
//import PouchDB from 'pouchdb'
//import MiappService from './miapp.sdk.angular2'

import { Miapp2Service } from '../../node_modules/miappio-sdk/dist/miapp.io';


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
  public dbRecordCount = 0;


  constructor(private miappService : Miapp2Service){

    // this._db = new PouchDB('miapp_db', { adapter: 'websql' });
    //this._db = cordova ? new PouchDB('miapp_db', {adapter: 'websql'}) : new PouchDB('miapp_db');

  }


  // Call it on each app start
  // Set User login in DB if db empty
  // Return Promise with this._db
  initDBWithLogin(login, password) : Promise<any> {

    if (this._dbInitialized) return Promise.reject('DB already initialized');

    return new Promise((resolve, reject) => {

      this.miappService.isDbEmpty()
        .then( (isEmpty) => {
          if (!isEmpty) return Promise.resolve(); // already set

          return this.miappService.becarefulCleanDb();
        })
        .then(() => {
          return this.miappService.login(login, password);
        })
        .then((firstUser) => {
          if (!firstUser) return Promise.resolve(); // already set

          return this.miappService.putFirstUserInEmptyDb(firstUser);
        })
        .then( (ret) => {
          //if (ret) return deferred.reject(err);
          return this.miappService.syncDb();
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
    if (!this._dbInitialized) return Promise.reject('DB not initialized');

    return new Promise( (resolve, reject) => {
      this.miappService.isDbEmpty()
        .then((isEmpty) => {
          if (isEmpty && fnInitFirstData) {
            return fnInitFirstData(this.miappService);
          }
          return Promise.resolve('ready to sync');
        })
        .then((ret) => {
          return this.miappService.syncDb();
        })
        .then( (err) => {
          if (err) return reject(err);
          //self.$log.log('srvDataContainer.sync resolved');
          return this.miappService._db.info();
        })
        .then((result) => {
          this.dbRecordCount = result.doc_count;
          resolve(this.dbRecordCount);
        })
        .catch( (err) => {
          var errMessage = err ? err : 'DB pb with getting data';
          //self.$log.error(errMessage);
          reject(errMessage);
        });
    });
  }

  //
  putInDB(item) : Promise<any> {
    if (!this._dbInitialized) return Promise.reject('DB not initialized');


    this.dbRecordCount++;
    return this.miappService.putInDb(item);
  }


}
