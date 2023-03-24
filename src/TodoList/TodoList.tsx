import { useEffect, useRef, useState } from 'react';

import { RenderList, Item } from '../RenderList/RenderList';
import { loadData, saveData } from '../DataHandler/DataHandler';
import { InputItem } from '../InputItem/InputItem';
import { useLocation } from 'react-router-dom';

import ButtonRandomizer from '../ButtonRandomizer/ButtonRandomizer';
import Divider from '../Divider/Divider';

import './TodoList.css';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';
import { updateModificationDate } from '../ListSelector/ListSelector';

// Function that returns a new list after moving one item from it
function moveListItem(list: Item[], fromIndex: number, toIndex: number): Item[] {
  const selectedItem = list[fromIndex];

  const newList = [...list];

  // Aborts if the destination is outside the array's scope
  if (toIndex < 0 || toIndex >= list.length) {
    return newList;
  }

  newList.splice(fromIndex, 1);
  newList.splice(toIndex, 0, selectedItem);

  return newList;
}

export default function App() {
  // LocalStorage identification
  const listFile = useLocation();
  const fileId: number = listFile.state.fetchId;
  const fileData: string = 'todoListData' + fileId;
  
  // Declares and loads state data
  const itemRef = useRef<HTMLInputElement>(null);
  const [ list, setList ] = useState<Item[]>(() => {
    const data = loadData<Item[]>(fileData);
		return data ? data : [];
  });
  
  // Creates a new list item with a particular description
  function addItem(description: string) {
    // Encapsulates the item object
    const item = {
      id: Date.now(),
      text: description.trim().length === 0 ? 'Empty note' : description,
      highlighted: false
    };
    
    // Adds the item to the end of the list
    setList([...list, item]);
  }
  
  function deleteListItem(item: Item) {
    const newList = list.filter((i) => i.id !== item.id);
    setList(newList);
  }

  // Edits an item's text property via browser's prompt
  function editListItem(item: Item) {
    const itemIndex = list.findIndex((i) => i.id === item.id);
  
    const newList = [...list];
  
    newList[itemIndex].text = prompt('Enter the new text for the selected item', newList[itemIndex].text) ?? newList[itemIndex].text;

    setList(newList);
  }

  function onRandomize(index: number) {
    const newList = [...list];

    newList.map(item => item.highlighted = false);
    newList[index].highlighted = true;

    setList(newList);
  }

  function toggleHighlighted(item: Item) {
    setList(prevState => {
      return prevState.map(i => {
        if (i.id === item.id) {
          return {
            ...i,
            highlighted: !i.highlighted
          }
        }
        return i;
      })
    });
  }

  function onMove(item: Item, toRelativeIndex: number) {
    const itemIndex = list.findIndex((i) => i.id === item.id);
    
    setList(moveListItem(list, itemIndex, itemIndex + toRelativeIndex));
  }

  // Auto save on every change
  useEffect(() => {
    updateModificationDate(listFile.state.fetchId);
    saveData(list, fileData);
  },[list])
  
  return (
    <>
      <div className='flex'>
        <InputItem
          itemRef={itemRef}
          submitFunction={() => addItem(itemRef.current?.value ?? '')}/>

        <div className='flex gap'>
          <ButtonRandomizer 
            onRandomize={onRandomize}
            totalItems={list.length}/>
        </div>
      </div>

      <Divider />

      <RenderList
        toggleHighlighted={toggleHighlighted}
        moveListItem={onMove}
        editListItem={editListItem}
        deleteListItem={deleteListItem}
        itemList={list}/>
    </>
  );
}