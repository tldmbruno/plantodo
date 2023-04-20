import { FormEvent, useRef } from "react";
import { ListData } from "../TodoList/TodoList";

interface RenamerInputProps {
  formId?: string;
  listId: number;
  currentTitle: string;
  setTitle: (listId: number, newTitle: string) => void;
  visible?: boolean;
}

export default function RenamerInput({formId = Math.random().toString(), listId, currentTitle, setTitle, visible = false}: RenamerInputProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTitle(listId, titleRef?.current?.value ?? '');
    visible = false;
  }

  return (
    <form id={formId} method='POST' onSubmit={handleSubmit} hidden={!visible} className='flex noPadding'>
      <input className='renameInput' type='text' ref={titleRef} defaultValue={currentTitle} autoFocus onBlur={handleSubmit}/>
    </form>
  );
}