import { Link } from "react-router-dom";

export default function Navigation() {
	return (
		<header
			style={{
				display: "flex",
				gap: "15px",
			}}
		>
			<Link to="/">Meals</Link>
			<Link to="/ingredients">Ingredients</Link>
		</header>
	);
}
