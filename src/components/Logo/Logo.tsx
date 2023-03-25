import { Link } from "react-router-dom";
import './Logo.css';

export default function Logo() {
	return (
		<div className='logo'>
			<Link to='/'>PlanTODO</Link>
		</div>
	);
}
