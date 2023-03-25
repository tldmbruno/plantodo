import { Link } from 'react-router-dom';
import Divider from '../components/Divider/Divider';
import Logo from '../components/Logo/Logo';

export default function WelcomePage() {
	return (
		<div>
			<div className='screenTall centered container'>
				<div>
					<h1 className='giga'><Logo/></h1>
					<p>The elegant note taking app</p>
					<Divider />
					<Link to='/create' className='button'>Start now</Link>
				</div>
			</div>

			<div className='screenTall centered secondaryBg container'>
				<h1>What is <Logo />?</h1>

				<p>PlanTODO is a note taking application that is designed to be fast and easy to use, with a focus on simplicity. It has the added feature of being able to randomize tasks to help users prioritize their to-do list. Here's a breakdown of the key features:</p>

				<div className='flex gap'>
					<div className='card'>
						<h2>🚀 Fast and easy to use</h2>
						<p>PlanTODO prioritizes speed and usability. This means that the app should open quickly and be intuitive to use, allowing users to quickly add and manage their tasks without getting bogged down by complicated menus or features.</p>
					</div>

					<div className='card'>
						<h2>🎨 Simple design</h2>
						<p>PlanTODO aims to keep things simple by avoiding clutter and unnecessary features. The goal is to create an app that is easy to use and navigate, without overwhelming the user with too many options.</p>
					</div>

					<div className='card'>
						<h2>🎲 Randomization</h2>
						<p>This is a unique feature of PlanTODO that sets it apart from other todonotes apps. The randomization feature allows users to randomly select a task from their list, helping them prioritize their to-do list and avoid getting stuck on one task for too long.</p>
					</div>
				</div>

				<p> Overall, PlanTODO aims to be a fast, simple, and effective todonotes app that helps users stay organized and productive. With its focus on usability and unique randomization feature, it could be a valuable tool for anyone looking to improve their productivity and manage their to-do lists more efficiently.</p>
			</div>

			<div className='screenTall centered container'>
				<h1>Stay organized</h1>
				<div className='grid gap'>
					<div className='card'>
						<h2>1. Create a new list</h2>
						<p>Insert the name and press Enter or click on the button "Create New List".</p>
					</div>
					<div className='card'>
						<h2>2. Click the name to access the list</h2>
						<p>Your new list should appear under the input bar.</p>
					</div>
					<div className='card'>
						<h2>3. Create a new item</h2>
						<p>Write some text, "Study for my exam" for example, then press Enter or click on the button "New Item".</p>
					</div>
					<div className='card'>
						<h2>4. Add some more</h2>
						<p>Repeat the third step to add more items to your list. You can mark the tasks as done by clicking the checkbox on the left of the task's name.</p>
					</div>
					<div className='card'>
						<h2>5. Not sure what to do next?</h2>
						<p>Click the randomizer button, on the top right corner.</p>
					</div>
				</div>
			</div>

			<div className='container primaryBg centered'>
				<h1>Ready to take notes?</h1>
				<Link to='/create' className='button'>Start now</Link>
			</div>
			
			<div className='container centered gap darkBg'>
				<a className='outsideLink button' href='https://github.com/tldmbruno/plantodo'>Get the Source code</a>
				<a className='outsideLink button' href='https://github.com/tldmbruno'>Follow Bruno Peres on Github</a>
				<a className='outsideLink button' href='https://www.pexels.com/@scottwebb/'>Background photo by @scottwebb</a>
			</div>
		</div>
	);
}