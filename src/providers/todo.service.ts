import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Observable' ;
//import 'rxjs/Rx';

@Injectable()
export class TodoService {

    // Data context
    todos : Array<{}> ;

    // Mock
    static DATA_TEST = 
        [
            {titre: 'Tache 1', description: 'bla bla bla'},
            {titre: 'Tache 2', description: 'bla bla'},
            {titre: 'Tache 3', description: 'bla bla bla bla bla bla'},
            {titre: 'Tache 4', description: 'bla bla bla bla'},
            {titre: 'Tache 5', description: 'bla bla bla bla bla bla bla bla'}
        ];

    constructor() {}

    // Load todos
    loadTodos() {
        // TODO Call persistence
        this.todos = TodoService.DATA_TEST;
        /*     
            return Observable.create(observer => {
                observer.next(DATA_TEST);
                observer.complete();
            })
        */
    }

    // Save todo and synchronize context
    saveTodo(title : String, description : String) {
        // TODO Call persistence
        this.todos.push({titre: title, description: description}) ;
    }

    saveTodos() {
        // TODO Call persistence
    }

}