import { FormEvent } from "react";

interface TaskInputProps {
	formId?: string;
	buttonText?: string;
	submitFunction: () => void;
	taskRef: React.RefObject<HTMLInputElement>;
	highlighted?: boolean;
}

// Form for continuous add of useRef items in a input
export default function TaskInput({formId = Math.random().toString(), buttonText = 'Add', submitFunction, taskRef, highlighted = false}: TaskInputProps) {
	
	function onSubmit(e: FormEvent) {
		e.preventDefault();
		submitFunction();
		(document.getElementById(formId) as HTMLFormElement).reset();
	}

	return (
		<form id={formId} className='taskInput flex gap' onSubmit={onSubmit}>
			<input type='text' ref={taskRef}></input>
			<button type='submit' className={'optional ' + (highlighted ? 'primaryBg pulseGlow' : '')}>{buttonText}</button>
			<button type='submit' className={'mobile ' + (highlighted ? 'primaryBg pulseGlow' : '')}>{'+'}</button>
		</form>
	);
}