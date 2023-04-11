import { useEffect, useRef, useState } from "react";
import { loadData, saveData } from "../DataHandler/DataHandler";
import { ListData } from "../TodoList/TodoList";

import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import Divider from "../Divider/Divider";
import TaskInput from "../TaskInput/TaskInput";

interface ListSelectorProps {
  setCurrentList: (listData: ListData | undefined) => void;
}

export function updateModificationDate(fetchId: number): void {
  const listData = loadData<ListData>('listData' + fetchId);

  if (listData) {
    listData.lastModification = getFormattedModificationDate();
    saveData(listData, 'listData' + fetchId);
  }
}

function getFormattedModificationDate(): string {
  const currentDate = new Date();
  return currentDate.toLocaleString();
}

export default function ListSelector({setCurrentList}: ListSelectorProps) {
  // Declares and loads state data
  const itemRef = useRef<HTMLInputElement>(null);
  const [ listsData, setListsData ] = useState(() => {
    const data = loadData<ListData[]>('allListsData');
    return data ? data : [];
  });

  // Deletion state management
  const [ askingForDeletion, setAskingForDeletion ] = useState(false);
  const [ listIndexForDeletion, setListIndexForDeletion ] = useState(-1);
  
  // Auto save on every change
  useEffect(() => {
    saveData(listsData, 'listsData');
  },[listsData])

  // Creates a new list, defaulting to 'Unnammed list'
  function createList(): void {
    // Gets the new list's title
    let newTitle = itemRef.current?.value.trim() ?? '';
    newTitle = validateTitle(newTitle.length === 0 ? 'Unnammed List' : newTitle, listsData);

    // Creates the new list
    const newList: ListData = {
      id: Date.now(),
      title: newTitle,
      lastModification: getFormattedModificationDate(),
      tasks: [],
    };

    // Adds to the state array
    setListsData([...listsData, newList]);
  }

  function validateTitle(title: string, otherNames: ListData[]): string {
    let validatedTitle = title;
    
    // Verify if there's already a list with the same name
    let occourences = 0;
    otherNames.forEach(otherName => {
      if (validatedTitle == otherName.title
        || `${validatedTitle} (${occourences})` == otherName.title) {
        occourences++;
      }
    });

    // If so, appends a counter after it
    if (occourences > 0) {
      validatedTitle = `${validatedTitle} (${occourences})`;
    }
    
    return validatedTitle;
  }

  function onDeleteRequest(list: ListData): JSX.Element | null {
    const listsDataIndex = listsData.findIndex((i) => i.id === list.id);

    // Checks if the index is valid before asking for confirmation
    if (listsDataIndex !== -1) {
      // Evokes popUp for confirmation
      setAskingForDeletion(true);
      setListIndexForDeletion(listsDataIndex);
    }

    return null;
  }

  // Deletes the list and also the content in it from Local Storage
  function deleteList(list: ListData): void {
    const listsDataIndex = listsData.findIndex((i) => i.id === list.id);
    const todoListFileData = 'listsData' + listsData[listsDataIndex].id;
  
    // Checks if the index is valid before deleting anything
    if (listsDataIndex !== -1) {
      setCurrentList(undefined);

      // Delete the list from the array
      const newListsData = [...listsData];
      newListsData.splice(listsDataIndex, 1);

      // Erase the content from Local Storage
      localStorage.removeItem(todoListFileData);

      // Reset the index for deletion
      setListIndexForDeletion(-1);
  
      // Apply the modifications
      setListsData(newListsData);
    }
  }

  function renameList(list: ListData) {
    const listIndex = listsData.findIndex((i) => i.id === list.id);
    
    let newTitle = prompt('Enter the new title for the selected list', 
      listsData[listIndex].title) ?? listsData[listIndex].title;
    if (newTitle != listsData[listIndex].title) {
      newTitle = validateTitle(newTitle, listsData);
    }
    
    let newListsData = [...listsData];
    newListsData[listIndex].title = validateTitle(newListsData[listIndex].title, listsData);
    setListsData(newListsData);
  }

  return (
    <>
      <div>
        <TaskInput
          buttonText={'New'}
          taskRef={itemRef}
          submitFunction={createList}/>

        <ul>
          {listsData.map(list =>
            <li key={list.id}>
              <button onClick={() => setCurrentList(list)}>{list.title}</button>
              {/* <span className='mini'>{list.lastModification}</span>
              <button title={`Rename ${list.title}`} onClick={() => renameList(list)}>📝</button> */}
              <button title={`Delete ${list.title}`} className='danger' onClick={() => onDeleteRequest(list)}>❌</button>
            </li>
          )}
        </ul>
      </div>

      {listIndexForDeletion != -1 ?
        <ConfirmationPopUp
          title={`Delete "${listsData[listIndexForDeletion].title}"?`}
          description={`This action cannot be undone.`}
          visible={askingForDeletion}
          setVisible={setAskingForDeletion}
          onConfirm={() => {deleteList(listsData[listIndexForDeletion])}}
          confirmLabel={'Delete'}
          dangerousConfirm={true}/>
        : <></>}
    </>
  );
}
