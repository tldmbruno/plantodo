import { useState } from "react";

export interface FileData {
  fetchId: number;
  name: string;
  lastModification: string;
}

export interface FileHandlerProps {
  filesData: FileData[];
}

export default function FileSelector({filesData}: FileHandlerProps) {
  const [ files, setFiles ] = useState(filesData);

  function onFileClick() {
    console.log('onFileClick');
  }

  function deleteFile() {
    console.log('deleteFile');
  }

  function renameFile() {
    console.log('renameFile');
  }

  return (
    <ul>
      {files.map((file, index) => <li key={index} onClick={onFileClick}>file.name</li>)}
    </ul>
  );
}