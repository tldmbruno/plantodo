import { Link } from 'react-router-dom';

import DarkToggle from '../DarkToggle/DarkToggle';
import Logo from '../Logo/Logo';

import './NavBar.css';

export default function NavBar() {
	return (
		<nav className='navBar gap'>
			<Logo />
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