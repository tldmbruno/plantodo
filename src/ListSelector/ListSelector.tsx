import { useEffect, useRef, useState } from "react";
import { loadData, SaveButton } from "../DataHandler/DataHandler";
import { InputItem } from "../InputItem/InputItem";

interface ListData {
	fetchId: number,
	title: string,
}

export default function ListSelector() {
	const [ listsData, setListsData ] = useState<ListData[]>([]);
	const itemRef = useRef<HTMLInputElement>(null);

	// On load: load data
  useEffect(() => {
    const data = loadData<ListData>('selectorData');
		setListsData(data);
  },[]);

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
						<label>{list.title}</label>
						<button className='danger' onClick={() => deleteList(list)}>Delete</button>
					</li>
				)}
			</ul>
		</>
	);
}
