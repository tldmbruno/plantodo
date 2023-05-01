import { Link } from "react-router-dom";
import style from './Logo.module.css';

export default function Logo() {
	return (
		<div title='Go to home page' className={style.logo + ' slide-in'}>
			<Link to='/'>PlanTODO</Link>
		</div>
	);
}
