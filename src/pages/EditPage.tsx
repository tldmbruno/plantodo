import BackButton from "../components/BackButton/BackButton";
import TodoList from "../components/TodoList/TodoList"
import PageTitle from "../components/PageTitle/PageTitle";

export default function EditPage() {
	return (
		<div className='container'>
			<BackButton />
			<PageTitle />
			<TodoList />
		</div>
	);
}