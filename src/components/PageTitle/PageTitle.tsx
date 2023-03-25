import { useLocation } from "react-router-dom";

export default function PageTitle() {
	const title = useLocation().state.title;
	
	return (
		<h1 className='title'>{title}</h1>
	);
}