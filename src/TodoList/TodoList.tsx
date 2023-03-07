import { FormEvent, useEffect, useRef, useState } from 'react';

import './TodoList.css';

interface Item {
  id: number;
  text: string;
}

export default function App() {
  const itemRef = useRef<HTMLInputElement>(null);
  const [ list, setList ] = useState<Item[]>([]);

  // On load: load data
  useEffect(() => {
    loadList();
  },[]);

  // Creates a new list item with a particular description
  function addItem(description: string) {
    // Encapsulates the item object
    const item = {
      id: Date.now(),
      text: description.trim().length === 0 ? 'Empty note' : description
    };
    
    // Adds the item to the end of the list
    setList([...list, item]);
  }

  // Shows all items in a particular list
  function renderList(itemList: Item[]) {
    return (
      itemList.map(item =>
        <li key={item.id}>
          <div>
            <input type='checkbox' />
            <label>{item.text}</label>
          </div>
          <div>
            <button onClick={() => editListItem(item)}>Edit</button>
            <button className='danger' onClick={() => deleteListItem(item)}>Delete</button>
          </div>
        </li>
      )
    );
  }
  
  // Edits an item's content
  function editListItem(item: Item) {
    const itemIndex = list.findIndex((i) => i.id === item.id);
  
    let newList = list.slice();
  
    newList[itemIndex].text = prompt('Enter the new text for the selected item', newList[itemIndex].text) ?? newList[itemIndex].text;
    setList(newList);
  }
  
  // Deletes a particular list item
  function deleteListItem(item: Item) {
    const itemIndex = list.findIndex((i) => i.id === item.id);
  
    if (itemIndex !== -1) {
      const newList = list.slice();
      newList.splice(itemIndex, 1);
  
      setList(newList);
    }
  }

  // Function that happens when the form is submitted
  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    addItem(itemRef.current?.value ?? '');
    (document.getElementById('newNoteForm') as HTMLFormElement).reset();
  }

  // Saves the list as a JSON file
  function saveList() {
    const data = JSON.stringify(list);
    localStorage.setItem("data", data);
  }

  // Loads the list as a JSON file
  function loadList() {
    const data = localStorage.getItem("data");

    if (data) {
      setList(JSON.parse(data));
    }
  }

  return (
    <>
      <div className='flex'>
        <form id='newNoteForm' className='flex s-gap no-margin' onSubmit={onFormSubmit}>
          <input type='text' ref={itemRef}></input>
          <button type='submit'>New Item</button>
        </form>

        <button type='button' onClick={saveList}>Save</button>
      </div>

      <ul className='list'>
        {renderList(list)}
      </ul>
    </>
  );
}