// boot - framework
import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {JsonPipe} from "@angular/common";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {TodoListPage} from "../pages/todo-list/todo-list";
import {TodoDetailPage} from "../pages/todo-detail/todo-detail";
import {AuthService} from "../providers/auth.service";
import {TodoService} from "../providers/todo.service";
import {Miapp2Service} from "../../node_modules/miappio-sdk/dist/miappio.sdk2";

// pages

// services


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
  providers: [AuthService, TodoService, JsonPipe, Miapp2Service]
})

export class AppModule {}
