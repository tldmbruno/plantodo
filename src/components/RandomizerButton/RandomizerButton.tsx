interface PropsButtonRandomizer {
	onRandomize: (index: number) => void;
	totalItems: number;
}

export default function ButtonRandomizer({onRandomize, totalItems}: PropsButtonRandomizer) {
	// Randomizes an array and returns the index of that selected item
	function randomizeHighlight() {
		const randomIndex = Math.floor(Math.random() * totalItems);
		onRandomize(randomIndex);
	}

	return (
		<button onClick={randomizeHighlight}>Choose randomly 🎲</button>
	)
}