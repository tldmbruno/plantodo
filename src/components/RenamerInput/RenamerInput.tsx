import { FormEvent, useRef } from "react";

interface RenamerInputProps {
  formId?: string;
  listId: number;
  currentTitle: string;
  setTitle: (listId: number, newTitle: string) => void;
}

export default function RenamerInput({formId = Math.random().toString(), listId, currentTitle, setTitle}: RenamerInputProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTitle(listId, titleRef?.current?.value ?? '');
  }

  return (
    <form id={formId} method='POST' onSubmit={handleSubmit} className='flex noPadding noMargin'>
      <input className='compact' type='text' ref={titleRef} defaultValue={currentTitle} autoFocus onBlur={handleSubmit}/>
    </form>
  );
}