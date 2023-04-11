import { FormEvent, useEffect, useRef, useState } from "react";
import { FileData, FileHandlerProps } from "../NewFileSelector/NewFileSelector";
import { getFormattedModificationDate } from "../ListSelector/ListSelector";
import { loadData } from "../DataHandler/DataHandler";

export default function FileController({filesData}: FileHandlerProps) {
  const [ newFileName, setNewFileName ] = useState('');
  const [ files, setFiles ] = useState(filesData);
  const onFileControllerDataChange = new CustomEvent('onFileControllerDataChange');

  useEffect(() => {
    document.addEventListener('onFileSelectorDataChange', () => setFiles(loadData<FileData[]>('filesData') ?? []));
  }, []);

  // useEffect(() => {
  //   document.dispatchEvent(onFileControllerDataChange);
  //   console.log('FileController changed');
  // }, [files])

  function createFile(e: FormEvent) {
		e.preventDefault();
    const formData = (document.getElementById('fileController') as HTMLFormElement);

    const newFile: FileData = {
      fetchId: Date.now(),
      name: newFileName,
      lastModification: getFormattedModificationDate()
    };

    setFiles([...files, newFile]);
    document.dispatchEvent(onFileControllerDataChange);
    
    (document.getElementById('fileController') as HTMLFormElement).reset();
	}

	return (
		<form id='fileController' className='flex gap' onSubmit={createFile}>
			<input type='text'></input>
			<button type='submit' className='optional'>Create</button>
			<button type='submit' className='mobile'>{'+'}</button>
		</form>
	);
}