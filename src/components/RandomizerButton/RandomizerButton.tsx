interface PropsButtonRandomizer {
	onRandomize: (index: number) => void;
	totalTasks: number;
}

export default function RandomizerButton({onRandomize, totalTasks}: PropsButtonRandomizer) {
	// Randomizes an array and returns the index of that selected item
	function randomizeHighlight() {
		const randomIndex = Math.floor(Math.random() * totalTasks);
		onRandomize(randomIndex);
	}

	return (
		<>
			<button className='optional' onClick={randomizeHighlight}>Choose randomly 🎲</button>
			<button className='mobile' onClick={randomizeHighlight}>🎲</button>
		</>
	)
}