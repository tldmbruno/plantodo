import { FormEvent, useEffect, useRef, useState } from 'react';

import './TodoList.css';

interface Item {
  id: number;
  text: string;
}

export default function App() {
  const itemInputRef = useRef<HTMLInputElement>(null);
  const [ todoListItems, setTodoListItems ] = useState<Item[]>([]);

  // On load: load data
  useEffect(() => {
    loadData();
  },[]);

  // Creates a new list item with a particular description
  function createListItem(description: string) {
    const newTodoListItem = {
      id: Date.now(),
      text: description.trim().length === 0 ? 'Empty note' : description
    };
      
    setTodoListItems([...todoListItems, newTodoListItem]);
  }

  // Shows all items in a particular list
  function showItems(itemList: Item[]) {
    return (
      itemList.map(item =>
        <li key={item.id}>
          <div>
            <input type='checkbox' />
            <label>{item.text}</label>
          </div>
          <div>
            <button onClick={() => editListItem(item)}>Edit</button>
            <button onClick={() => deleteListItem(item)}>Delete</button>
          </div>
        </li>
      )
    );
  }
  
  // Edits an item's content
  function editListItem(item: Item) {
    const itemIndex = todoListItems.findIndex((i) => i.id === item.id);
  
    let newTodoListItems = todoListItems.slice();
  
    newTodoListItems[itemIndex].text = prompt('Enter the new text for the selected item', newTodoListItems[itemIndex].text) ?? newTodoListItems[itemIndex].text;
    setTodoListItems(newTodoListItems);
  }
  
  // Deletes a particular list item
  function deleteListItem(item: Item) {
    const itemIndex = todoListItems.findIndex((i) => i.id === item.id);
  
    if (itemIndex !== -1) {
      const newTodoListItems = todoListItems.slice();
      newTodoListItems.splice(itemIndex, 1);
  
      setTodoListItems(newTodoListItems);
    }
  }

  // Function that happens when the form is submitted
  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    createListItem(itemInputRef.current?.value ?? '');
    (document.getElementById('newNoteForm') as HTMLFormElement).reset();
  }

  // Saves the list as a JSON file
  function saveData() {
    const data = JSON.stringify(todoListItems);
    localStorage.setItem("data", data);
  }

  // Loads the list as a JSON file
  function loadData() {
    const data = JSON.parse(localStorage.getItem("data") ?? '');
    setTodoListItems(data);
  }

  return (
    <>
      <div className='flex'>
        <div className='flex s-gap'>
          <form id='newNoteForm' onSubmit={onFormSubmit}>
            <input type='text' ref={itemInputRef}></input>
          </form>

          <button type='submit'>New Item</button>
        </div>

        <button type='button' onClick={saveData}>Save</button>
      </div>

      <ul className='list'>
        {showItems(todoListItems)}
      </ul>
    </>
  );
}