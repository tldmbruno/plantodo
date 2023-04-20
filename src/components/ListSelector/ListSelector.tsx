import { useRef, useState } from "react";
import { loadData, saveData } from "../DataHandler/DataHandler";
import { ListData, loadStorageData } from "../TodoList/TodoList";

import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import TaskInput from "../TaskInput/TaskInput";
import RenamerInput from "../RenamerInput/RenamerInput";

interface ListSelectorProps {
  setCurrentListId: (newId: number) => void;
  lists: ListData[];
  setLists: (newValue: ListData[]) => void;
}

function getFormattedModificationDate(): string {
  const currentDate = new Date();
  return currentDate.toLocaleString();
}

export default function ListSelector({setCurrentListId, lists, setLists}: ListSelectorProps) {
  // Declares and loads state data
  const itemRef = useRef<HTMLInputElement>(null);

  // Deletion state management
  const [ askingForDeletion, setAskingForDeletion ] = useState(false);
  const [ listIdForDeletion, setListIdForDeletion ] = useState(-1);

  // Rename state management
  const [ listIndexForRenaming , setListIndexForRenaming ] = useState(-1);

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
      setListIdForDeletion(listIndex);
    }

    return null;
  }

  // Deletes the list and also the content in it from Local Storage
  function deleteList(list: ListData): void {
    const listIndex = lists.findIndex((i) => i.id === list.id);
  
    // Checks if the index is valid before deleting anything
    if (listIndex !== -1) {
      // De-select current list
      setCurrentListId(-1);
      
      // Delete the list from the array
      const newListsData = [...lists];
      newListsData.splice(listIndex, 1);
      
      // Reset the index for deletion
      setListIdForDeletion(-1);
  
      // Apply the modifications
      setLists(newListsData);
      localStorage.removeItem('list-' + list.id);
    }
  }

  function renameList(listId: number, newTitle: string) {
    const updatedLists = loadStorageData();

    const listIndex = updatedLists.findIndex((i) => i.id === listId);
    const oldTitle: string = updatedLists[listIndex].title;

    if (newTitle !== oldTitle) {
      updatedLists[listIndex].title = validateTitle(newTitle, updatedLists);
      setLists(updatedLists);
      saveData(updatedLists[listIndex], 'list-' + listId);
    }

    // Reset the index for renaming
    setListIndexForRenaming(-1);
  }

  return (
    <>
      <div className='overflow sidebar screenTall'>
        <TaskInput
          buttonText={'New'}
          taskRef={itemRef}
          submitFunction={createList}/>

        <ul>
          {lists.map(list =>
            <a key={list.id} onClick={() => setCurrentListId(list.id)}>
              <li className='flex'>
                <div>
                  {list.id === listIndexForRenaming ? 
                  <RenamerInput
                    setTitle={renameList}
                    listId={list.id}
                    currentTitle={list.title}
                    />
                  : <label>{list.title}</label>
                  }
                  <span className='mini'>{list.lastModification}</span>
                </div>
                <div className='flex gap pushRight'>

                  <button
                    hidden={list.id === listIndexForRenaming}
                    title={`Rename ${list.title}`}
                    className='compact borderless'
                    onClick={(e) => {setListIndexForRenaming(list.id); e.stopPropagation()}}>
                      📝
                  </button>

                  <button
                    title={`Delete ${list.title}`}
                    className='compact borderless danger'
                    onClick={(e) => {onDeleteRequest(list); e.stopPropagation()}}>
                      ❌
                  </button>

                </div>
              </li>
            </a>
          )}
        </ul>
      </div>

      {listIdForDeletion != -1 ?
        <ConfirmationPopUp
          title={`Delete "${lists[listIdForDeletion].title}"?`}
          description={`This action cannot be undone.`}
          visible={askingForDeletion}
          setVisible={setAskingForDeletion}
          onConfirm={() => {deleteList(lists[listIdForDeletion])}}
          confirmLabel={'Delete'}
          dangerousConfirm={true}/>
        : <></>}
    </>
  );
}
