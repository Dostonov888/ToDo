"use strict";

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
        this.headerButton = document.querySelector('add');
    }



    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }
    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }


    createItem(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = item.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${item.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
        `);
        if (item.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }
    addTodo(e) {
        e.preventDefault();

        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
            this.placeholder = 'Какие планы?';
        } else {
            this.input.placeholder = 'заполните строку!';
        }

    }
    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    deleteItem(target) {
        [...this.todoData].forEach((item) => {
            item.forEach((elem, i) => {
                if (target.key === elem.key) {
                    this.todoData.delete(item[i].key);
                }
            });
        });
        this.render();
    }


    completedItem() {
        [...this.todoData].forEach((item) => {
            item.forEach((elem) => {
                if (target.key === elem.key) {
                    elem.completed = !elem.completed;
                }
            });
        });

        this.render();

    }


    handler() {
        let todoContainer = document.querySelector('.todo-container');
        todoContainer.addEventListener('click', (event) => {
            let target = event.target;
            if (target.matches('.todo-complete')) {
                target = target.parentNode.parentNode;
                this.completedItem(target);
            }
            if (target.matches('.todo-remove')) {
                target = target.parentNode.parentNode;
                this.deleteItem(target);
            }


        });
    }


    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        todo.handler();
    }

}
const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();

