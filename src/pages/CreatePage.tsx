import { loadData } from "../components/DataHandler/DataHandler";
import FileController from "../components/NewFileController/NewFileController";
import FileSelector, { FileData } from "../components/NewFileSelector/NewFileSelector";

export default function CreatePage() {
	return (
		<>
			<FileController filesData={loadData<FileData[]>('filesData') ?? []}/>
			<div className='container'>
				<FileSelector filesData={loadData<FileData[]>('filesData') ?? []}/>
			</div>
		</>
	);
}