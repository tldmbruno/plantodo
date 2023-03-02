import { useRef, useState } from 'react';

import './TodoList.css';

interface Item {
  id: number;
  text: string;
}

export default function App() {
  const itemInputRef = useRef<HTMLInputElement>(null);
  const [ todoListItems, setTodoListItems ] = useState<Item[]>([]);

  // Creates a new list item with a particular description
  function createListItem(description: string) {
    const newTodoListItem = {
      id: Date.now(),
      text: description.trim().length === 0 ? 'Empty note' : description
    };
      
    setTodoListItems([...todoListItems, newTodoListItem]);
  
    (document.getElementById('newNoteForm') as HTMLFormElement).reset();
  }

  // Shows all items in a particular list
  function showItems(itemList: Item[]) {
    return (
      itemList.map(item =>
        <li key={item.id}>
          <div>
            <input type='checkbox' />
          </div>
          <div>   
            <span>{item.text}</span>
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

  return (
    <>
      <form id='newNoteForm' onSubmit={e => {
          e.preventDefault();
          createListItem(itemInputRef.current?.value ?? '')}}>
        <input type='text' ref={itemInputRef}></input>
        <button type='submit'>New Item</button>
      </form>
      <ul className='list'>
        {showItems(todoListItems)}
      </ul>
    </>
  );
}