// Saves the data as a JSON file
export function saveData(value: any, dataName: string): void {
	const data = JSON.stringify(value);
	localStorage.setItem(dataName, data);
}

// Loads the data as a JSON file
export function loadData<T>(dataName: string) : T | undefined{
	const data = localStorage.getItem(dataName);
	
	if (data) {
		return JSON.parse(data);
	}
	
	return undefined;
}