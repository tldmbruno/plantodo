import Divider from '../Divider/Divider';
import Logo from '../Logo/Logo';
import '../PaintCanvas/PaintCanvas'
import PaintCanvas from '../PaintCanvas/PaintCanvas';

export default function About() {
	return (
		<>
			<h1>About</h1>
			
			<Divider />

			<p><Logo /> is a simple yet useful note taking web application. It's unusual features, however, will allow the user to express themselves better with additional functionality. Those tools are currently under development.</p>
			<p>To compensate, I will allow you to make a drawing below if you want. Give it a try.</p>

			<PaintCanvas />
		</>
	);
}