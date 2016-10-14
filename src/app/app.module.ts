// boot - framework
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { TodoListPage } from '../pages/todo-list/todo-list';
import { TodoDetailPage } from '../pages/todo-detail/todo-detail';

// services
import { AuthService } from '../providers/auth.service';
import { TodoService } from '../providers/todo.service';
import { DataService } from '../providers/data.service';
import { MiappService } from '../providers/miapp.sdk.angular2';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TodoListPage,
    TodoDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TodoListPage,
    TodoDetailPage
  ],
  providers: [AuthService, TodoService, DataService, MiappService]
})
export class AppModule {}
