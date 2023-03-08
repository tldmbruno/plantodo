import { useEffect, useRef, useState } from 'react';

import { RenderList, Item } from '../RenderList/RenderList';
import { loadData, SaveButton } from '../DataHandler/DataHandler';
import { InputItem } from '../InputItem/InputItem';

import './TodoList.css';

export default function App() {
  const [ list, setList ] = useState<Item[]>([]);
  const itemRef = useRef<HTMLInputElement>(null);

  // On load: load data
  useEffect(() => {
    const data = loadData<Item>('todoListData');
    setList(data);
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

  return (
    <>
      <div className='flex'>
        <InputItem
          itemRef={itemRef}
          submitFunction={() => addItem(itemRef.current?.value ?? '')}/>

        <SaveButton dataName='todoListData' value={list}/>
      </div>

      <hr></hr>

      <RenderList
        editListItem={editListItem}
        deleteListItem={deleteListItem}
        itemList={list}/>
    </>
  );
}