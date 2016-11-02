import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Observable' ;
//import 'rxjs/Rx';

import {DataService} from "./data.service";

@Injectable()
export class TodoService {

    // Data context
    public todos : Array<{}> ;

    // Mock
    static DATA_TEST =
        [
            {titre: 'Tache 1', description: 'bla bla bla'},
            {titre: 'Tache 2', description: 'bla bla'},
            {titre: 'Tache 3', description: 'bla bla bla bla bla bla'},
            {titre: 'Tache 4', description: 'bla bla bla bla'},
            {titre: 'Tache 5', description: 'bla bla bla bla bla bla bla bla'}
        ];

    constructor(private dataService : DataService) {}

    // Load todos
    loadTodos() {

      let firstInit = function (miappService) {
        for (let i = 0; i < TodoService.DATA_TEST.length; i++) {
          miappService.putInDb(TodoService.DATA_TEST[i]);
        }
      };

        this.dataService.syncDB(firstInit)
          .then((msg)=>{
            this.todos = TodoService.DATA_TEST;
          })
          .catch((err)=>{
            alert(err);
          });
        /*
            return Observable.create(observer => {
                observer.next(DATA_TEST);
                observer.complete();
            })
        */
    }

    // Save task and synchronize context
    saveTodo(title : String, description : String) {
      let task = {titre: title, description: description};
      this.dataService.putInDB(task)
        .then((data) => {
          this.todos.push(data) ;
        })
        .catch((err)=>{
          alert(err);
        });

    }

    // Save todos
    saveTodos() {
      // ??
    }

}
