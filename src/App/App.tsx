import { useRef, useState } from 'react';
import './App.css';

interface Item {
  id: number;
  text: string;
}

export default function App() {
  const itemInputRef = useRef<HTMLInputElement>(null);
  const [ todoListItems, setTodoListItems ] = useState<Item[]>([]);

  function createListItem() {
    const newTodoListItem = { id: Date.now(), text: itemInputRef.current?.value ?? '(Blank)' };
    setTodoListItems([...todoListItems, newTodoListItem]);

    (document.getElementById('newNoteForm') as HTMLFormElement).reset();
  }

  function listItems() {
    return (
      todoListItems.map(item =>
        <li key={item.id}>
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

  function editListItem(item: Item) {
    const itemIndex = todoListItems.findIndex((i) => i.id === item.id);

    let newTodoListItems = todoListItems.slice();

    newTodoListItems[itemIndex].text = prompt('Enter the new text for the selected item', newTodoListItems[itemIndex].text) ?? newTodoListItems[itemIndex].text;
    setTodoListItems(newTodoListItems);
  }

  function deleteListItem(item: Item) {
    const itemIndex = todoListItems.findIndex((i) => i.id === item.id);

    if (itemIndex !== -1) {
      const newTodoListItems = todoListItems.slice();
      newTodoListItems.splice(itemIndex, 1);

      setTodoListItems(newTodoListItems)
    }
  }

  return (
    <>
      <form id='newNoteForm' onSubmit={e => {e.preventDefault(); createListItem()}}>
        <input type='text' ref={itemInputRef}></input>
        <button type='submit'>New Item</button>
      </form>
      <ul className='list'>
        {listItems()}
      </ul>
    </>
  );
}