import Divider from "../Divider/Divider";

export default function About() {
	return (
		<>
			<h1>Git</h1>
			<Divider />
			<ul>
				<li>
					<button className='outsideLink' onClick={() => window.location.href = 'https://github.com/tldmbruno/plantodo'}>
						Get the Source code
					</button>
				</li>
				<li>
					<button className='outsideLink' onClick={() => window.location.href = 'https://github.com/tldmbruno'}>
						Follow Bruno Peres on Github
					</button>
				</li>
				<li>
					<button className='outsideLink' onClick={() => window.location.href = 'https://www.pexels.com/@scottwebb/'}>
						Background photo by @scottwebb
					</button>
				</li>
			</ul>
		</>
	);
}