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
			<button
				className='optional'
				title={totalTasks == 0 ? 'You need to first add tasks to your list.' : 'Let the app decide for you!'}
				onClick={randomizeHighlight}
				disabled={totalTasks == 0}>
					Choose randomly 🎲
			</button>

			<button
				className='mobile'
				title={totalTasks == 0 ? 'You need to first add tasks to your list.' : 'Let the app decide for you!'}
				onClick={randomizeHighlight}
				disabled={totalTasks == 0}>
					🎲
			</button>
		</>
	)
}