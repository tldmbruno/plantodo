import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { loadData, SaveButton, saveData } from "../DataHandler/DataHandler";
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
		const newList: ListData = {
			fetchId: Date.now(),
			title: itemRef.current?.value ?? "Unnammed list"
		};

		setListsData([...listsData, newList]);
	}

	function deleteList(list: ListData) {
		const listIndex = listsData.findIndex((i) => i.fetchId === list.fetchId);
  
    if (listIndex !== -1) {
      const newList = listsData.slice();
      newList.splice(listIndex, 1);
  
      setListsData(newList);
    }
	}

	return (
		<>
			<h1>Select a list or create new one</h1>
			<div className='flex s-gap'>
				<InputItem
					buttonText={'Create new list'}
					itemRef={itemRef}
					submitFunction={createList}/>
				<SaveButton value={listsData} dataName='selectorData'/>
			</div>

			<hr></hr>

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
