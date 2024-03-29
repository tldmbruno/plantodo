import Divider from "../Divider/Divider";

import style from './ConfirmationPopUp.module.css';

interface PropsConfirmationPopUp {
	title?: string;
	description?: string;
	visible: boolean;
	setVisible: Function;
	confirmLabel?: string;
	onConfirm: Function;
	dangerousConfirm?: boolean;
}

export default function ConfirmationPopUp(
	{
		title = 'Alert',
		description = '',
		visible,
		setVisible,
		confirmLabel = 'Confirm',
		onConfirm,
		dangerousConfirm = false
	}: PropsConfirmationPopUp) {
		
	function handleConfirm() {
		setVisible(false);
		onConfirm();
	}

	return (
		visible ? <>
			<div className='popUp' onClick={(e) => {setVisible(false); e.stopPropagation()}}>
				<div className={style.popUpInner + ' notTooWide'} onClick={(e) => e.stopPropagation()}>
					<h2 className='breakableWord'>{title}</h2>
					<Divider />
					<p className='centered'>{description}</p>
					<div className='flex gap'>
						<button className={style.confirmationButton + ` ${dangerousConfirm? 'danger' : ''} fullWidth`}
							onClick={() => handleConfirm()}>{confirmLabel}</button>
						<button className='fullWidth' onClick={() => setVisible(false)}>Cancel</button>
					</div>
				</div>
			</div>
		</> : <></>
	);
}