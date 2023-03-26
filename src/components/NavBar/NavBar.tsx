import DarkToggle from '../DarkToggle/DarkToggle';
import Logo from '../Logo/Logo';

import './NavBar.css';

export default function NavBar() {
	return (
		<nav className='navBar flex gap'>
			<Logo />
			<div className='halfWidth'></div>
			<DarkToggle />
		</nav>
	);
}