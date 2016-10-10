import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TodoService } from '../../providers/todo.service';
import { TodoDetailPage } from '../todo-detail/todo-detail';

//import { AppContextService } from '../../providers/app-context.service';

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})
export class TodoListPage {

  todos : any;

  constructor(
      public navCtrl: NavController,
      public todoService: TodoService
      /* public appContextService : AppContextService */) {}

    ngOnInit() {
        this.todos = this.todoService.getListTodos();
        
/*      TODO
        this.todoService.getListTodos()
            .subscribe(data => {
                this.todos = data ;
            }) ;
*/            
    }

    addTodo() {
        //this.todos.push({titre: 'Tache Add', description: 'bla blo bla'}) ;
        this.navCtrl.push(TodoDetailPage,{todos:this.todos});
    }
}
