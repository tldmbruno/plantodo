import { loadData } from "../components/DataHandler/DataHandler";
import Divider from "../components/Divider/Divider";
import ListSelector from "../components/ListSelector/ListSelector";
import FileController from "../components/NewFileController/NewFileController";
import FileSelector, { FileData } from "../components/NewFileSelector/NewFileSelector";
import TodoList from "../components/TodoList/TodoList";

export default function CreatePage() {
	return (
		<>
			{/* <FileController filesData={loadData<FileData[]>('filesData') ?? []}/>
			<div className='container'>
				<FileSelector filesData={loadData<FileData[]>('filesData') ?? []}/>
			</div> */}
      <ListSelector/>
      {/* <Divider/>
      <TodoList/> */}
		</>
	);
}