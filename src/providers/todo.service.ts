import {Injectable} from "@angular/core";
import {Miapp2Service} from "miappio-sdk/dist/miappio.sdk2";

//import { Observable } from 'rxjs/Observable' ;
//import 'rxjs/Rx';

//import * as Miappa from "../../node_modules/miappio-sdk/dist/miapp.io.js";

@Injectable()
export class TodoService {

  // Data context
  public todos: Array<{}> = [];

  // Mock
  static DATA_TEST =
    [
      {titre: 'Tache 1', description: 'bla bla bla'},
      {titre: 'Tache 2', description: 'bla bla'},
      {titre: 'Tache 3', description: 'bla bla bla bla bla bla'},
      {titre: 'Tache 4', description: 'bla bla bla bla'},
      {titre: 'Tache 5', description: 'bla bla bla bla bla bla bla bla'}
    ];

  constructor(private miappService: Miapp2Service) {
  }

  // Load todos
  loadTodos() {


    let firstInit = function (miappService: Miapp2Service) {
      for (let i = 0; i < TodoService.DATA_TEST.length; i++) {
        miappService.put(TodoService.DATA_TEST[i]);
      }
      return Promise.resolve();
    };

    //var test = Miappa;
    //let self = this;
    //debugger;
    //self.todos.push({titre: 'Tache Y', description: 'bla bla'});
    this.miappService.sync(firstInit)
      .then((msg)=> {
        this.todos = [];
        return this.miappService.findAll();
      })
      .then((allDocs)=> {
        allDocs.rows.map((r) => {
          if (r && r.doc) this.todos.push(r.doc);
        });
      })
      .catch((err)=> {
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
  saveTodo(title: String, description: String) {
    let task = {titre: title, description: description};
    this.miappService.put(task)
      .then((data) => {
        this.todos.push(data);
        this.loadTodos();
      })
      .catch((err)=> {
        alert(err);
      });
  }

  // Save todos
  saveTodos() {
    // ??
  }

}
