import { FormEvent } from "react";

interface TaskInputProps {
	buttonText?: string;
	submitFunction: () => void;
	taskRef: React.RefObject<HTMLInputElement>;
}

// Form for continuous add of useRef items in a input
export function TaskInput({buttonText = 'New Item', submitFunction, taskRef}: TaskInputProps) {

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		submitFunction();
    (document.getElementById('newNoteForm') as HTMLFormElement).reset();
	}

	return (
		<form id='newNoteForm' className='flex gap noMargin halfWidth' onSubmit={onSubmit}>
			<input type='text' ref={taskRef}></input>
			<button type='submit' className='optional'>{buttonText}</button>
			<button type='submit' className='mobile'>{'+'}</button>
		</form>
	);
}