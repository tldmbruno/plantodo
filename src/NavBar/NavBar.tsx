import { Link } from 'react-router-dom';

import DarkToggle from '../DarkToggle/DarkToggle';

import './NavBar.css';

export default function NavBar() {
	return (
		<nav className='navBar gap'>
			<div className='logo'>
				<Link to='/'>PlanTODO</Link>
			</div>
			<div className='halfWidth'></div>
			<div className='categories flex gap'>
				<Link to='/'>Home</Link>
				<Link to='/about'>About</Link>
				<Link to='/git'>Git</Link>
			  <DarkToggle />
			</div>
		</nav>
	);
}