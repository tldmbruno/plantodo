import { ChangeEvent, useState } from 'react';

export default function DarkToggle() {
	const [ isDarkTheme, setDarkTheme ] = useState(false);

	function onToggle(event: ChangeEvent) {
		setDarkTheme(!isDarkTheme);
		document.documentElement.classList.toggle('dark');
	}

	return (
		<input type='checkbox' checked={isDarkTheme} onChange={e => onToggle(e)}></input>
	);
}