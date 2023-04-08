import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import { loadData, saveData } from "../DataHandler/DataHandler";
import Divider from "../Divider/Divider";
import { InputItem } from "../ItemInput/ItemInput";

interface ListData {
  fetchId: number;
  title: string;
  lastModification: string;
}

export function updateModificationDate(fetchId: number): void {
  const listsData = loadData<ListData[]>('selectorData') ?? [];
  const listsDataIndex = listsData.findIndex((i) => i.fetchId === fetchId);

  listsData[listsDataIndex].lastModification = getFormattedModificationDate();

  saveData(listsData, 'selectorData');
}

function getFormattedModificationDate(): string {
  const currentDate = new Date();
  return currentDate.toLocaleString();
}

export default function ListSelector() {
  // Declares and loads state data
  const itemRef = useRef<HTMLInputElement>(null);
  const [ listsData, setListsData ] = useState(() => {
    const data = loadData<ListData[]>('selectorData');
    return data ? data : [];
  });

  // Deletion state management
  const [ askingForDeletion, setAskingForDeletion ] = useState(false);
  const [ listIndexForDeletion, setListIndexForDeletion ] = useState(-1);
  
  // Auto save on every change
  useEffect(() => {
    saveData(listsData, 'selectorData');
  },[listsData])

  // Creates a new list, defaulting to 'Unnammed list'
  function createList(): void {
    // Gets the new list's title
    let newTitle = itemRef.current?.value.trim() ?? '';
    newTitle = newTitle.length === 0 ? 'Unnammed List' : newTitle;

    // Verify if there's already a list with the same name
    let occourences = 0;
    listsData.forEach(list => {
      if (list.title == newTitle ||
          list.title == `${newTitle} (${occourences})`) {
        occourences++;
      }
    });

    // If so, renames it appropriately
    if (occourences > 0) {
      newTitle = `${newTitle} (${occourences})`;
    }

    // Creates the new list
    const newList: ListData = {
      fetchId: Date.now(),
      title: newTitle,
      lastModification: getFormattedModificationDate()
    };

    // Adds to the state array
    setListsData([...listsData, newList]);
  }

  function onDeleteRequest(list: ListData): JSX.Element | null {
    const listsDataIndex = listsData.findIndex((i) => i.fetchId === list.fetchId);

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
    const listsDataIndex = listsData.findIndex((i) => i.fetchId === list.fetchId);
    const todoListFileData = 'todoListData' + listsData[listsDataIndex].fetchId;
  
    // Checks if the index is valid before deleting anything
    if (listsDataIndex !== -1) {
      // Delete the list from the array
      const newList = [...listsData];
      newList.splice(listsDataIndex, 1);

      // Erase the content from Local Storage
      localStorage.removeItem(todoListFileData);

      // Reset the index for deletion
      setListIndexForDeletion(-1);
  
      // Apply the modifications
      setListsData(newList);
    }
  }

  return (
    <>
      <h1 className='title'>Select or create your list</h1>

      <div className='flex gap'>
        <InputItem
          buttonText={'Create new list'}
          itemRef={itemRef}
          submitFunction={createList}/>
      </div>

      <Divider />

      <ul className='list'>
        {listsData.map(list =>
          <li key={list.fetchId}>
            <Link className='fullWidth flex' to={'/edit/' + list.title} state={list}>
              <div>
                <span className='breakableWord'>{list.title}</span>
              </div>
            </Link>
            <div className='visibleOnParentHover'>
                <span className='mini optional borderless'>{list.lastModification}</span>
                <button title={`Delete ${list.title}`} className='danger borderless' onClick={() => onDeleteRequest(list)}>❌</button>
            </div>
          </li>
        )}
      </ul>
      
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
