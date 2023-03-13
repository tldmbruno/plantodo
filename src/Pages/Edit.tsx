import ButtonBack from "../ButtonBack/ButtonBack";
import TodoList from "../TodoList/TodoList"
import TodoListTitle from "../TodoListTitle/TodoListTitle"

export default function Edit() {
	return (
		<>
			<ButtonBack />
			<TodoListTitle />
			<TodoList />
		</>
	);
}