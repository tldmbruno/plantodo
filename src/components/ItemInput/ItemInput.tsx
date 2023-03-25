import { FormEvent } from "react";

interface PropsInputItem {
	buttonText?: string;
	submitFunction: () => void;
	itemRef: React.RefObject<HTMLInputElement>;
}

// Form for continuous add of useRef items in a input
export function InputItem({buttonText = 'New Item', submitFunction, itemRef}: PropsInputItem) {

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		submitFunction();
    (document.getElementById('newNoteForm') as HTMLFormElement).reset();
	}

	return (
		<form id='newNoteForm' className='flex gap noMargin halfWidth' onSubmit={onSubmit}>
			<input type='text' ref={itemRef}></input>
			<button type='submit'>{buttonText}</button>
		</form>
	);
}