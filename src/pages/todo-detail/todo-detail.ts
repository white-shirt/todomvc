import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {TodoService} from '../../providers/todo.service';

@Component({
    selector: 'page-todo-detail',
    templateUrl: 'todo-detail.html'
})
export class TodoDetailPage {

    todo = {
        titre: 'default',
        description: 'default'
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, public todoService: TodoService) { }

    public validateAddTodo() {
        this.todoService.saveTodo(this.todo.titre,this.todo.description);
        this.navCtrl.pop();
    }

    public cancel() : void {
        this.navCtrl.pop();
    }  
}