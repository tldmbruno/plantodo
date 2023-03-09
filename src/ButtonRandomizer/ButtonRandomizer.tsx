import { Item } from "../RenderList/RenderList"

interface PropsButtonRandomizer {
	itemState: Item[];
	setItemState: Function;
}

// Randomizes an array and returns the index of that selected item
function randomizeHighlight(itemState: Item[], setItemState: Function): void {
	const randomIndex = Math.floor(Math.random() * itemState.length);

	const newItemState = itemState.slice();

	newItemState.map(item => item.highlighted = false);
	newItemState[randomIndex].highlighted = true;

	setItemState(newItemState);

	
}

export default function ButtonRandomizer({itemState, setItemState}: PropsButtonRandomizer) {
	return (
		<button onClick={() => randomizeHighlight(itemState, setItemState)}>Choose randomly 🎲</button>
	)
}