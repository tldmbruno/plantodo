import { useLocation } from "react-router-dom";

export default function TodoListTitle() {
	const title = useLocation().state.title;
	
	return (
		<h1>{title}</h1>
	);
}