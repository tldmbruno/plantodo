import { useEffect, useState } from 'react';
import { loadData, saveData } from '../DataHandler/DataHandler';

import style from './DarkToggle.module.css';

export default function DarkToggle() {
	const [ isDarkTheme, setIsDarkTheme ] = useState(loadData<boolean>('darkToggleData') ?? false);

	const id = Math.random().toString();

	useEffect(() => {
		if (isDarkTheme) {
			document.documentElement.classList.add('dark');
			document.getElementById(id)?.classList.add('spin');
			document.getElementById(id)?.classList.remove('reverse-spin');
		} else {
			document.documentElement.classList.remove('dark');
			document.getElementById(id)?.classList.add('reverse-spin');
			document.getElementById(id)?.classList.remove('spin');
		}
	},[isDarkTheme]);
	
	function toggleDarkMode() {
		setIsDarkTheme(!isDarkTheme);

		// Saves data
		//   ?: (Value is being inverted because setState only applies the new value
		// 	  on re-render.)
		saveData(!isDarkTheme, 'darkToggleData');
	}

	return (
		<button title='Toggle Light/Dark Mode' className={style.darkToggle + ' borderless compact'} onClick={(() => toggleDarkMode())}>
			<div id={id}>
				{ isDarkTheme ? 	
					<span>🌙</span> : <span>🌻</span>
				}
			</div>
		</button>
	);
}