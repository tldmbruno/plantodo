import { ChangeEvent, useState } from 'react';

import './DarkToggle.css';

export default function DarkToggle() {
	const [ isDarkTheme, setDarkTheme ] = useState(false);

	function onToggle(event: ChangeEvent) {
		setDarkTheme(!isDarkTheme);
		document.documentElement.classList.toggle('dark');
	}

	return (
		<input className='toggle' type='checkbox' checked={isDarkTheme} onChange={e => onToggle(e)}></input>
	);
}