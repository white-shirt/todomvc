import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TodoService } from '../../providers/todo.service';

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})
export class TodoListPage {

  todos : any;

  constructor(public navCtrl: NavController, public todoService: TodoService) {}

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
        this.todos.push({titre: 'Tache Add', description: 'bla blo bla'}) ;
    }




}
