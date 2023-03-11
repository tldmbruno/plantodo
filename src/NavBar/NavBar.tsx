import { Link } from 'react-router-dom';

import DarkToggle from '../DarkToggle/DarkToggle';

import './NavBar.css';

export default function NavBar() {
	return (
		<nav className='navBar'>
			<div className='logo'>
				<Link to='/'>PlanTODO</Link>
			</div>
			<div className='categories'>
				<Link to='/'>Home</Link>
				<Link to='/about'>About</Link>
				<Link to='/git'>Git</Link>
			  <DarkToggle />
			</div>
		</nav>
	);
}