import { Injectable } from '@angular/core';
//import { AppContextService } from './app-context.service';

//import { Observable } from 'rxjs/Observable' ;
//import 'rxjs/Rx';

@Injectable()
export class TodoService {

    static DATA_TEST = 
        [
            {titre: 'Tache 1', description: 'bla bla bla'},
            {titre: 'Tache 2', description: 'bla bla'},
            {titre: 'Tache 3', description: 'bla bla bla bla bla bla'},
            {titre: 'Tache 4', description: 'bla bla bla bla'},
            {titre: 'Tache 5', description: 'bla bla bla bla bla bla bla bla'}
        ];

    constructor(/*private appContextService : AppContextService*/) {}

    getListTodos() {
    //    this.appContextService.todos = TodoService.DATA_TEST ;
        return TodoService.DATA_TEST;
    /*     
        return Observable.create(observer => {
            observer.next(DATA_TEST);
            observer.complete();
        })
    */
    }

    saveTodo(title : String, description : String) {
  //      this.appContextService.todos.push({title: title,description:description});
    }

}