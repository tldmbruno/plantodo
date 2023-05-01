import { useLocation } from 'react-router-dom';
import DarkToggle from '../DarkToggle/DarkToggle';
import Logo from '../Logo/Logo';

import style from './NavBar.module.css';

export default function NavBar() {
	const location = useLocation();

	function onMenuClick() {
		const sidebar = document.getElementById('sidebar');

		if (sidebar) {
			sidebar.classList.toggle('visibleOnMobile');
		}
	}

	return (
		<>
			<nav className={style.navBar + ' flex gap optional'}>
				<Logo />
				<div className='halfWidth'></div>
				<DarkToggle />
			</nav>

			<nav className={style.navBar + ' flex gap mobile'}>
				{location.pathname == '/create' &&
				<>
				<button className='compact' onClick={onMenuClick}>🌱</button>
				<br></br>
				<div className='halfWidth'></div>
				</>	
				}
				<Logo />
				<div className='halfWidth'></div>
				<DarkToggle />
			</nav>
		</>
	);
}