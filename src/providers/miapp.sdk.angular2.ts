import { Injectable } from '@angular/core';


declare var Miapp:any
//import * as Miapp from 'miapp.sdk.base'

@Injectable()
export class MiappService {


/*
  public isPouchDBEmpty(pouchDB) {
    console.log('MiappService isPouchDBEmpty');
    return Promise.resolve(true)
  };


  public putInPouchDb(pouchDB, data){
    console.log('MiappService putInPouchDb');
    return Promise.resolve(true)
  };
*/


        //this.$this.logger.log('SrvMiapp - init');

        miappClient = null;
        currentUser = null;

        miappId = null;
        miappVersion = null;
        miappOrgId = null;
        miappIsOffline: boolean;
        miappURI: string;
        miappSalt = 'SALT_TOKEN';

        _srvDataUniqId = 0;
        
        logger: LoggerService = new LoggerService();

    constructor() {}

    public init(miappId, miappSalt, isOffline) {

        this.miappIsOffline = this.getObjectFromLocalStorage('miappIsOffline') || false;
        this.miappURI = this.getObjectFromLocalStorage('miappURI') || 'https://miapp.io/api';

        this.miappIsOffline = (typeof isOffline === 'undefined') ? this.miappIsOffline : isOffline;

        if (!this.miappIsOffline) {
            this.miappClient = new Miapp.Client({
                orgName: 'miappio',
                appName: miappId,
                logging: true, // Optional - turn on logging, off by default
                buildCurl: false, // Optional - turn on curl commands, off by default
                URI : this.miappURI
            });
        }


        this.miappId = miappId;
        this.miappOrgId = null;
        this.miappVersion = null;

    };

    public setEndpoint(endpointURI) {
        this.miappURI = endpointURI + '/api';
        this.setObjectFromLocalStorage('miappURI',this.miappURI);
    };

    public setOffline(b) {
        this.miappIsOffline = (b == true) ? true : false;
        this.setObjectFromLocalStorage('miappIsOffline',this.miappIsOffline);
    };


    public login(login, password, updateProperties?) : Promise<any> {

        if (this.currentUser) return Promise.reject('miappServ already login');

        if ((!this.miappClient ) && !this.miappIsOffline) { //|| !CryptoJS
            return Promise.reject('miappServ not initialized');
        }

        // TODO encrypting and salt stuff
        // var encrypted = CryptoJS.AES.encrypt(password, 'SALT_TOKEN');
        //var encrypted_json_str = encrypted.toString();
        //this.logger.log('miappClient.loginMLE : '+ login+ ' / '+ encrypted_json_str);
        //var signJWT = require('webcrypto-jwt').signJWT;
        //signJWT({foo: 'bar'}, 'secret', 'HS256', function (err, token) {
          // ey...
        //  console.log(token);
        //});

        if (this.miappIsOffline) {
            var testUser = {};
            this.currentUser = testUser;
            this.currentUser.email = login;
            this.currentUser.password = password;
            this.setObjectFromLocalStorage('miappCurrentUser',this.currentUser);
            return Promise.resolve(this.currentUser);
        }

        return new Promise(function(resolve, reject) {
            this.miappClient.loginMLE(this.miappId,login,password,updateProperties,function (err, user) {
              // this.logger.log('callback done :' + err + ' user:' + user);
              if (err) {
                // Error - could not log user in
                this.logger.error('miappClient.loginMLE err : '+ err);
                reject(err);
              } else {
                // Success - user has been logged in
                this.currentUser = user;
                this.currentUser.email = login;
                this.setObjectFromLocalStorage('miappCurrentUser',this.currentUser);
                resolve(this.currentUser);
              }
            });
        });


    };


    public logoff()  : Promise<any> {

        if (!this.currentUser) return Promise.reject('miappServ not login');
        return this.deleteUser(this.currentUser._id);

    };



    public deleteUser(userIDToDelete) : Promise<any> {

        if (this.miappIsOffline) {
            return Promise.resolve(null);
        }

        if (!this.miappClient) {
            return Promise.reject('miappServ not initialized');
        }


        return new Promise(function(resolve, reject) {
            this.miappClient.deleteUserMLE(userIDToDelete,function (err) {
              // this.logger.log('deleteUserMLE callback done :' + err);
              if (err) {
                // Error - could not log user in
                return reject(err);
              } else {
                // Success - user has been logged in
                this.currentUser = null;
                this.setObjectFromLocalStorage('miappCurrentUser',this.currentUser);
                return resolve(this.currentUser);
              }
            });
        });

    };


    public syncPouchDb(pouchDB) : Promise<any> {

        this.logger.log('syncPouchDb ..');

        if (this.miappIsOffline) {
            return Promise.resolve();
        }

        var pouchdbEndpoint = this.miappClient ? this.miappClient.getEndpoint() : null;
        if (!this.currentUser || !this.currentUser.email || !pouchdbEndpoint || !pouchDB)
            return Promise.reject('DB sync impossible. Need a user logged in. (' + pouchdbEndpoint + ' -' + this.currentUser+')');

        this.logger.log('syncPouchDb call');
        return new Promise(function(resolve, reject) {
            pouchDB.sync(pouchdbEndpoint, {
                filter: function (doc) {
                  if (doc.appUser_Id == this.currentUser.email) return doc;
                }
            }).on('complete', function (info) {
              this.logger.log("db complete : " + info);
              resolve();
            }).on('error', function (err) {
              this.logger.log("db error : " + err);
              reject(err);
            }).on('change', function (info) {
              this.logger.log("db change : " + info);
            }).on('paused', function (err) {
              this.logger.log("db paused : " + err);
            }).on('active', function () {
              this.logger.log("db activate");
            }).on('denied', function (info) {
              this.logger.log("db denied : " + info);
              reject("db denied : " + info);
            });
        });

    };


    public putInPouchDb(pouchDB, data){

        if (!this.currentUser || !this.currentUser._id || !pouchDB)
            return Promise.reject('DB put impossible. Need a user logged in. (' + this.currentUser+')');

        data.miappUserId = this.currentUser._id;
        data.miappOrgId = this.miappOrgId;
        data.miappAppVersion = this.miappVersion;

        var dataId = data._id;
        if (!dataId) dataId = this.generateObjectUniqueId(this.miappId);
        delete data._id;

        return new Promise(function(resolve, reject) {
            pouchDB.put(data, dataId, function (err, response) {
                if (response && response.ok && response.id && response.rev) {
                  data._id = response.id;
                  data._rev = response.rev;
                  this.logger.log("updatedData: " + data._id + " - " + data._rev);
                  return resolve(data);
                }
                return reject(err);
            });
        });
    };



    public generateObjectUniqueId(appName? : string, type? : string, name? : string){

        //return null;
        var now = new Date();
        var simpleDate = ""+now.getFullYear()+""+now.getMonth()+""+now.getDate()+""+now.getHours()+""+now.getMinutes();//new Date().toISOString();
        var sequId = ++ this._srvDataUniqId;
        var UId = '';
        if (appName && appName.charAt(0)) UId += appName.charAt(0);
        if (type && type.length > 3) UId += type.substring(0,4);
        if (name && name.length > 3) UId += name.substring(0,4);
        UId += simpleDate+'_'+sequId;
        return UId;
    }



    public isPouchDBEmpty(pouchDB) {
      
      this.logger.log('isPouchDBEmpty ..');
      if (!pouchDB) {//if (!self.currentUser || !self.currentUser.email || !pouchDB) {
          var error = 'DB search impossible. Need a user logged in. (' + this.currentUser + ')';
          this.logger.error(error);
          return Promise.reject(error);
      }

      this.logger.log('isPouchDBEmpty call');
      return new Promise((resolve, reject) => {
        pouchDB.allDocs({
          filter: function (doc) {
            if (!this.currentUser) return doc;
            if (doc.miappUserId == this.currentUser._id) return doc;
          }
        }, (err, response) => {
          this.logger.log('isPouchDBEmpty callback');
          if (err) return reject(err);

          if (response && response.total_rows && response.total_rows > 5) return resolve(false);

          this.logger.log('isPouchDBEmpty callback: ' + response.total_rows);
          return resolve(true);

        });
      });
    };


    public putFirstUserInEmptyPouchDB(pouchDB, firstUser) {
        if (!firstUser || !this.currentUser || !this.currentUser.email || !pouchDB)
            return Promise.reject('DB put impossible. Need a user logged in. (' + this.currentUser+')');

        var loggedUser = this.currentUser;
        var firstUserId = firstUser._id;
        if (!firstUserId) firstUserId = this.currentUser._id;
        if (!firstUserId) firstUserId = this.generateObjectUniqueId(this.miappId,'user');

        firstUser.miappUserId = firstUserId;
        firstUser.miappId = this.miappId;
        firstUser.miappAppVersion = this.miappVersion;
       // delete firstUser._id;
       firstUser._id = firstUserId;
        return new Promise(function(resolve, reject) {
          pouchDB.put(firstUser, firstUserId, (err, response) => {
            if (response && response.ok && response.id && response.rev) {
              firstUser._id = response.id;
              firstUser._rev = response.rev;
              this.logger.log("firstUser: " + firstUser._id + " - " + firstUser._rev);
              return resolve(firstUser);
            }
            return reject(err);
          });
        });
    };

    //Local Storage utilities
    public setObjectFromLocalStorage(id, object){
      //if(typeof(Storage) === "undefined") return null;

      var jsonObj = JSON.stringify(object);
      // Retrieve the object from storage
      if (window.localStorage) window.localStorage.setItem(id,jsonObj);

      //this.$this.logger.log('retrievedObject: ', JSON.parse(retrievedObject));
      return jsonObj;
    }

    public getObjectFromLocalStorage(id){
      //if(typeof(Storage) === "undefined") return null;

      // Retrieve the object from storage
      var retrievedObject;
      if (window.localStorage) retrievedObject = window.localStorage.getItem(id);
      var obj = JSON.parse(retrievedObject);

      //this.$this.logger.log('retrievedObject: ', JSON.parse(retrievedObject));
      return obj;
    }
    
}

export class LoggerService {
    log(message: String) {
        console.log(message);
    }

    error(message: String) {
        alert(message)
    }
}
