import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import { loadData, SaveButton, saveData } from "../DataHandler/DataHandler";
import Divider from "../Divider/Divider";
import { InputItem } from "../InputItem/InputItem";

import './ListSelector.css';

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
			title: newTitle
		};

		// Adds to the state array
		setListsData([...listsData, newList]);
	}

	function onDeleteRequest(list: ListData): JSX.Element | null {
		const listsDataIndex = listsData.findIndex((i) => i.fetchId === list.fetchId);

		// Checks if the index is valid before asking for confirmation
		if (listsDataIndex !== -1) {
			<ConfirmationPopUp
				dangerousConfirm={true}
				onConfirm={() => deleteList(list)}
				title={`Are you sure you want to delete ${list.title}?`}
				description={`Once confirmed, this action can't be undone.`}
				/>
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
  
			// Apply the modifications
      setListsData(newList);
    }
	}

	return (
		<>
			<h1>Select or create your list</h1>

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
						<Link className='fileName' to={'/edit/' + list.title} state={list}>{list.title}</Link>
						<div>
							<button className='danger' onClick={() => onDeleteRequest(list)}>Delete</button>
						</div>
					</li>
				)}
			</ul>

			{/* {listsData.length > 0 ?
				<ConfirmationPopUp
					dangerousConfirm={true}
					onConfirm={() => deleteList(listsData[0])}
					title={`Are you sure you want to delete ${listsData[0].title}?`}
					description={`Once confirmed, this action can't be undone.`}
					/>
				: <></>
			} */}
		</>
	);
}
