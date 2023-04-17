import { useEffect, useRef, useState } from "react";
import { loadData, saveData } from "../DataHandler/DataHandler";
import { ListData } from "../TodoList/TodoList";

import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import TaskInput from "../TaskInput/TaskInput";

interface ListSelectorProps {
  setCurrentList: (listData: ListData) => void;
}

export function updateModificationDate(fetchId: number): void {
  const listData = loadData<ListData>('appData' + fetchId);

  if (listData) {
    listData.lastModification = getFormattedModificationDate();
    saveData(listData, 'appData' + fetchId);
  }
}

function getFormattedModificationDate(): string {
  const currentDate = new Date();
  return currentDate.toLocaleString();
}

export default function ListSelector({setCurrentList}: ListSelectorProps) {
  // Declares and loads state data
  const itemRef = useRef<HTMLInputElement>(null);
  const [ lists, setLists ] = useState<ListData[]>([]);

  // Deletion state management
  const [ askingForDeletion, setAskingForDeletion ] = useState(false);
  const [ listIndexForDeletion, setListIndexForDeletion ] = useState(-1);

  function loadStorageData(): ListData[] {
    const newLists: ListData[] = [];

    // Loop through all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      // Check if the key starts with 'list-'
      if (key?.startsWith('list-')) {
        const data = loadData<ListData>(key);
        if (data) {
          newLists.push(data);
        }
      }
    }

    return newLists;
  }

  // Creates a new list, defaulting to 'Unnammed list'
  function createList(): void {
    // Gets the new list's title
    let newTitle = itemRef.current?.value.trim() ?? '';
    newTitle = validateTitle(newTitle.length === 0 ? 'Unnammed List' : newTitle, lists);

    // Creates the new list
    const newList: ListData = {
      id: Date.now(),
      title: newTitle,
      lastModification: getFormattedModificationDate(),
      tasks: [],
    };

    // Adds to the state array and saves it to localstorage
    setLists([...lists, newList]);
    saveData(newList, 'list-' + newList.id);
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
    const listIndex = lists.findIndex((i) => i.id === list.id);

    // Checks if the index is valid before asking for confirmation
    if (listIndex !== -1) {
      // Evokes popUp for confirmation
      setAskingForDeletion(true);
      setListIndexForDeletion(listIndex);
    }

    return null;
  }

  // Deletes the list and also the content in it from Local Storage
  function deleteList(list: ListData): void {
    const listIndex = lists.findIndex((i) => i.id === list.id);
  
    // Checks if the index is valid before deleting anything
    if (listIndex !== -1) {
      setCurrentList({id: 0, lastModification: '', tasks: [], title: ''});

      // Delete the list from the array
      const newListsData = [...lists];
      newListsData.splice(listIndex, 1);

      // Reset the index for deletion
      setListIndexForDeletion(-1);
  
      // Apply the modifications
      setLists(newListsData);
      localStorage.removeItem('list-' + list.id);
    }
  }

  function renameList(list: ListData) {
    const listIndex = lists.findIndex((i) => i.id === list.id);
    const oldTitle: string = lists[listIndex].title;
    
    let newTitle = prompt('Enter the new title for the selected list', oldTitle) ?? 'Unnammed List';
    
    if (newTitle != oldTitle) {
      let newLists = [...lists];
      newLists[listIndex].title = validateTitle(newTitle, lists);
      setLists(newLists);
      saveData(newLists[listIndex], 'list-' + newLists[listIndex].id);
    }
  }

  // Load data on start
  useEffect(() => {
    setLists(loadStorageData());
  }, []);

  return (
    <>
      <div className='overflow sidebar screenTall'>
        <TaskInput
          buttonText={'New'}
          taskRef={itemRef}
          submitFunction={createList}/>

        <ul>
          {lists.map(list =>
            <a key={list.id} onClick={() => setCurrentList(list)}>
              <li className='flex'>
                <div>
                  <label>{list.title}</label>
                  <span className='mini'>{list.lastModification}</span>
                </div>
                <div className='flex pushRight'>
                  <button title={`Rename ${list.title}`} className='compact borderless' onClick={(e) => {renameList(list); e.stopPropagation()}}>📝</button>
                  <button title={`Delete ${list.title}`} className='compact borderless danger' onClick={(e) => {onDeleteRequest(list); e.stopPropagation()}}>❌</button>
                </div>
              </li>
            </a>
          )}
        </ul>
      </div>

      {listIndexForDeletion != -1 ?
        <ConfirmationPopUp
          title={`Delete "${lists[listIndexForDeletion].title}"?`}
          description={`This action cannot be undone.`}
          visible={askingForDeletion}
          setVisible={setAskingForDeletion}
          onConfirm={() => {deleteList(lists[listIndexForDeletion])}}
          confirmLabel={'Delete'}
          dangerousConfirm={true}/>
        : <></>}
    </>
  );
}
