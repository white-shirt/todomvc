import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {TodoService} from '../../providers/todo.service';

@Component({
    selector: 'page-todo-detail',
    templateUrl: 'todo-detail.html'
})
export class TodoDetailPage {

    todo = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, public todoService: TodoService) { }

    public validateAddTodo() {
        this.navParams.get('todos').push(this.todo);
        this.navCtrl.pop();

        // TODO Persistence
        // todoService.saveTodo()
    }

    public cancel() : void {
        this.navCtrl.pop();
    }  
}