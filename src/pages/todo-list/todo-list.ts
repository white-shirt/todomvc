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

    visibleCheckDelete : boolean = false ;
    visibleButtonDelete : boolean = false ;

  constructor(
      public navCtrl: NavController,
      public todoService: TodoService
  ) {}



  get todos() : any {
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

    deleteTodos() {
        console.log('delete todos');
        this.visibleCheckDelete = false ;
        this.visibleButtonDelete = false ;
        this.todoService.todos.push({titre:'hello',description:'coucou'});
    }

    press() {
        console.log('press');
        this.visibleCheckDelete = true ;
        this.visibleButtonDelete = true ;
    }
}
