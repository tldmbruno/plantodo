import Divider from "../Divider/Divider";

import './ConfirmationPopUp.css';

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
			<div className='popUp'>
				<div className='popUpInner notTooWide'>
					<h2 className='breakableWord'>{title}</h2>
					<Divider />
					<p className='centered'>{description}</p>
					<div className='flex gap'>
						<button className='fullWidth' onClick={() => setVisible(false)}>Cancel</button>
						<button className={`${dangerousConfirm? 'danger' : ''} fullWidth notTooWide`}
							onClick={() => handleConfirm()}>{confirmLabel}</button>
					</div>
				</div>
			</div>
		</> : <></>
	);
}