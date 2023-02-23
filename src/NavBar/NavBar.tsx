import './NavBar.css';

import DarkToggle from '../DarkToggle/DarkToggle';

export default function NavBar() {
	const categories = [
		'Home',
		'Archive',
		'About',
		'Source code'
	];

	return (
		<nav className='navBar'>
			<div className='logo'>
				<span>PlanTODO</span>
			</div>
			<div className='categories'>
				{categories.map(item =>
					<div key={item}>
            <a>{item}</a>
          </div>
				)}

			  <DarkToggle />
			</div>
		</nav>
	);
}