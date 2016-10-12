import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JsonPipe } from '@angular/common';

import { TodoService } from '../../providers/todo.service';
import { TodoDetailPage } from '../todo-detail/todo-detail';

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})
export class TodoListPage {

  visibleMultiDelete : boolean = false ;
  todosToDelete : Array<number> = [];

  constructor(
      public navCtrl: NavController,
      public todoService: TodoService,
      public jsonPipe: JsonPipe
  ) {}



    get todos() : Array<any> {
      return this.todoService.todos ;
    }

    ngOnInit() {
        this.todoService.loadTodos();
        
/*      TODO Traitement des erreurs
        this.todoService.getListTodos()
            .subscribe(code => {
                
            }) ;
*/            
    }

    gotoTodoDetail() {
        this.navCtrl.push(TodoDetailPage);
    }

    deleteTodo(index) {
        console.log('delete todo :' + index);
        this.todoService.todos.splice(index, 1);
    }

    toggleTodo(todo, index, checked) {
        this.todosToDelete.push(index);

        console.log('toggleTodo ' + checked);
        console.log(this.jsonPipe.transform(todo))
    }

    deleteTodos() {
        console.log('delete todos');
        this.visibleMultiDelete = false ;
        this.todosToDelete.forEach(
            (index) => {
                this.todoService.todos[index] = null;
            }
        )
        this.todoService.todos =
            this.todoService.todos.filter(
                (elt) => {
                    return elt != null ;
                }
            )
        this.todosToDelete = [] ;
        this.todoService.saveTodos();
    }

    press() {
        console.log('press');
        this.visibleMultiDelete = true ;
    }
}
