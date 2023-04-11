import { FormEvent, useEffect } from "react";

interface TaskInputProps {
	formId?: string;
	buttonText?: string;
	submitFunction: () => void;
	taskRef: React.RefObject<HTMLInputElement>;
}

// Form for continuous add of useRef items in a input
export default function TaskInput({formId = Math.random().toString(), buttonText = 'New Item', submitFunction, taskRef}: TaskInputProps) {
	
	function onSubmit(e: FormEvent) {
		e.preventDefault();
		submitFunction();
		(document.getElementById(formId) as HTMLFormElement).reset();
	}

	return (
		<form id={formId} className='taskInput flex gap noMargin' onSubmit={onSubmit}>
			<input type='text' ref={taskRef}></input>
			<button type='submit' className='optional'>{buttonText}</button>
			<button type='submit' className='mobile'>{'+'}</button>
		</form>
	);
}