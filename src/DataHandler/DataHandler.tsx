// Saves the data as a JSON file
export function saveData(value: any, dataName: string): void {
	const data = JSON.stringify(value);
	localStorage.setItem(dataName, data);
}

// Loads the data as a JSON file
export function loadData<T extends any>(dataName: string) : T | null{
	const data = localStorage.getItem(dataName);
	
	if (data) {
		return JSON.parse(data);
	}
	
	return null;
}

// Save Button to quickly allocate data through localStorage
interface PropsSaveButton {
	value: any;
	dataName: string;
}

export function SaveButton({value, dataName}: PropsSaveButton) {
	return (
		<button type='button' onClick={() => saveData(value, dataName)}>Save</button>
	);
}