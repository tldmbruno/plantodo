export default function About() {
	return (
		<>
			<h1>Git</h1>
			<div className='flex'>
				<div className='flex s-gap'>
					<button onClick={() => window.location.href = 'https://github.com/tldmbruno/plantodo'}>
						Get the Source code
					</button>
					<button onClick={() => window.location.href = 'https://github.com/tldmbruno'}>
						Follow Bruno Peres on Github
					</button>
				</div>

				<span></span>
			</div>
		</>
	);
}