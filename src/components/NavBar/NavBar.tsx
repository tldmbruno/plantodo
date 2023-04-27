import { useLocation } from 'react-router-dom';
import DarkToggle from '../DarkToggle/DarkToggle';
import Logo from '../Logo/Logo';

import './NavBar.css';

export default function NavBar() {
	const location = useLocation();

	function onMenuClick() {
		const sidebar = document.getElementById('sidebar');

		if (sidebar) {
			sidebar.classList.toggle('visibleOnMobile');
		}
	}

	return (
		<nav className='navBar flex gap'>
			{location.pathname == '/create' &&
			<button className='mobile compact' onClick={onMenuClick}>🍔</button>
			}
			<Logo />
			<div className='halfWidth'></div>
			<DarkToggle />
		</nav>
	);
}