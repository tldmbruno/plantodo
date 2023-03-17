interface PropsConfirmationPopUp {
	title: string;
	description?: string;
	onConfirm: Function;
	onCancel?: Function;
	dangerousConfirm: boolean;
}

export default function ConfirmationPopUp({title, description, onConfirm, onCancel, dangerousConfirm = false}: PropsConfirmationPopUp) {
	return (
		<>
			<div className="popUp">
				<h1>{title}</h1>
				<p>{description}</p>
				<button onClick={() => onConfirm()} className={dangerousConfirm ? 'danger' : 'confirm'}>Confirm</button>
				<button>Cancel</button>
			</div>
		</>
	);
}