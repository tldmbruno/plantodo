import { Link } from "react-router-dom";
import './Logo.css';

export default function Logo() {
	return (
		<div title='Go to home page' className='logo slide-in'>
			<Link to='/'>PlanTODO</Link>
		</div>
	);
}
