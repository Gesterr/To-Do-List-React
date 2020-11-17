import React, { Component } from 'react';
import ToDoItems from './ToDoItems';
import './ToDoList.css';

export default class ToDoList extends Component {
  constructor(props){
    super(props);

    this.state={
      items:[]
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(){
    /* Создаётся переменная с именем itemArray для хранения текущего значения объекта state элементов */
    var itemArray = this.state.items;
    /* Если он пуст, то ничего не происходит.
    Если элемент ввода содержит некоторый текст, мы добавляем этот текст к элементу itemArray */
    if(this._inputElement.value !== ""){
      /* Фактически, тут добавляется объект, который содержит как введенный текст, так и 
      уникальное значение ключа, установленное в соотве. с текущим временем */
      itemArray.unshift({
        text:this._inputElement.value,
        key: Date.now()
      });
      /* Тут просто присваивание */
      this.setState({
        items:itemArray
      });
      /* Очистка поля ввода */
      this._inputElement.value="";
    }

    console.log(itemArray);

    event.preventDefault();
  }

  deleteItem(key){
    /* Тут передаётся ключ из элемента, по которому щёлкнули мышью, и сверяем этот ключ
    со всеми элементами, которые были сохранены, с помощью метода filter */
    var filtredItems = this.state.items.filter(function(item) {
      return (item.key !== key);
    });
    /* Создаётся новый массив, кроме удаляемого */
    this.setState({
      items:filtredItems
    });
  }

  render() {
    return (
      <div className="toDoListMain">
          <div className="header">
            {/* Отслеживаем событие submit в самой форме и вызываем метод addItem,
            когда событие наступило */}
            <form onSubmit={this.addItem}>
              {/* В листинге показано, что мы сохраняем ссылку на элемент input в соответсвующим
              образом названном свойстве _inputElemet. 
              Теперь появилась возможность получить доступ к элементу input, обратившись к свойству _inputElement*/}
              <input placeholder="Введите задачу" ref={(a)=>this._inputElement = a}></input>
              <button type="submite">Добавить</button>
            </form>
          </div>
          <ToDoItems entries={this.state.items} delete={this.deleteItem}/>
      </div>
    );
  }
}