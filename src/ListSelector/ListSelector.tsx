import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { loadData, SaveButton, saveData } from "../DataHandler/DataHandler";
import Divider from "../Divider/Divider";
import { InputItem } from "../InputItem/InputItem";

interface ListData {
	fetchId: number,
	title: string,
}

export default function ListSelector() {
	// Declares and loads state data
	const itemRef = useRef<HTMLInputElement>(null);
	const [ listsData, setListsData ] = useState(() => {
		const data = loadData<ListData[]>('selectorData');
		return data ? data : [];
	});
	
	// Auto save on every change
	useEffect(() => {
		saveData(listsData, 'selectorData');
	},[listsData])

	// Creates a new list, defaulting to 'Unnammed list'
	function createList() {
		const newTitle = itemRef.current?.value.trim() ?? '';

		const newList: ListData = {
			fetchId: Date.now(),
			title: newTitle.length === 0 ? 'Unnammed List' : newTitle
		};

		// Adds to the state array
		setListsData([...listsData, newList]);
	}

	// Deletes the list and also the content in it from Local Storage
	function deleteList(list: ListData) {
		const listsDataIndex = listsData.findIndex((i) => i.fetchId === list.fetchId);
		const todoListFileData = 'todoListData' + listsData[listsDataIndex].fetchId;
  
		// Checks if the index is valid before deleting anything
    if (listsDataIndex !== -1) {
			// Delete the list from the array
      const newList = [...listsData];
      newList.splice(listsDataIndex, 1);

			// Erase the content from Local Storage
			localStorage.removeItem(todoListFileData);
  
			// Apply the modifications
      setListsData(newList);
    }
	}

	return (
		<>
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
						<Link to={'/edit/' + list.fetchId} state={list}>{list.title}</Link>
						<div>
							<button className='danger' onClick={() => deleteList(list)}>Delete</button>
						</div>
					</li>
				)}
			</ul>
		</>
	);
}
