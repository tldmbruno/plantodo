import { FormEvent, useRef, useState } from "react";
import { FileData, FileHandlerProps } from "../NewFileSelector/NewFileSelector";
import { getFormattedModificationDate } from "../ListSelector/ListSelector";

export default function FileController({filesData}: FileHandlerProps) {
  const newFileName = useRef('');
  const [ files, setFiles ] = useState(filesData);

  function createFile(e: FormEvent) {
		e.preventDefault();

    const newFile: FileData = {
      fetchId: Date.now(),
      name: newFileName.current,
      lastModification: getFormattedModificationDate()
    };

    setFiles([...files, newFile]);

    
    
    (document.getElementById('fileController') as HTMLFormElement).reset();
	}

	return (
		<form id='fileController' className='flex gap' onSubmit={createFile}>
			<input type='text' value={newFileName.current}></input>
			<button type='submit' className='optional'>Create</button>
			<button type='submit' className='mobile'>{'+'}</button>
		</form>
	);
}