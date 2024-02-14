import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { log } from 'console';


@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {

  @Input() inputformparent: string = ''
  @Output() Outputfromchild = new EventEmitter<string>();


  inputvalue!: string;
  todolist: string[] = [];
  finishedlist: string[] = []
  error: string | null = null


  onSubmit(list: NgForm) {
    const inputValue = list.value.todovalue.trim();
    if (!inputValue) {
      this.error = "Empty to-do item."
      return;
    }
    if (this.todolist.includes(inputValue)) {
      this.error = "The same to-do item already exists in the list."
      return;
    }
    this.todolist.push(inputValue);
  }

  checked(index: number) {
    console.log(index);
    const chekedvalue = this.todolist.splice(index, 1)[0]
    this.finishedlist.push(chekedvalue);
    console.log(this.finishedlist);
  }
  removetodo(index: number) {
    this.todolist.splice(index, 1)
  }
  removefinishedtodo(index: number) {
    this.finishedlist.splice(index, 1)
  }
  removetodofull() {
    this.todolist = [];
    this.finishedlist = [];
  }
  errorclear() {
    this.error = null
  }

  eventEmt() {
    this.Outputfromchild.emit("this is form child")
  }

}
