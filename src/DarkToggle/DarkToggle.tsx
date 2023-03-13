import { useEffect, useState } from 'react';
import { loadData, saveData } from '../DataHandler/DataHandler';

import './DarkToggle.css';

export default function DarkToggle() {
	const [ isDarkTheme, setIsDarkTheme ] = useState(loadData<boolean>('darkToggleData') ?? false);

	useEffect(() => {
		if (isDarkTheme) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	},[isDarkTheme]);
	
	function toggleDarkMode() {
		setIsDarkTheme(!isDarkTheme);

		// Saves data
		//   ?: (Value keeps being inverted because setState only applies the new value
		// 	  on re-render.)
		saveData(!isDarkTheme, 'darkToggleData');
	}

	return (
		<button className='emojiButton' onClick={(() => toggleDarkMode())}>
			{ isDarkTheme ? 
				<span>🌙</span>
				: <span>🌻</span>
			}
		</button>
	);
}