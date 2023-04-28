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
		<form id={formId} className='taskInput flex' onSubmit={onSubmit}>
			<input type='text' className='mergeRight noMargin' ref={taskRef}></input>
			<button type='submit' className={'mergeLeft optional ' + (highlighted ? 'primaryBg pulseGlow' : '')}>{buttonText}</button>
			<button type='submit' className={'mergeLeft mobile ' + (highlighted ? 'primaryBg pulseGlow' : '')}>{'+'}</button>
		</form>
	);
}