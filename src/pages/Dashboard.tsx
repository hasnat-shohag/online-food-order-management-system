import { FC } from "react";
import Navbar from "../components/NavBar";
import Banner from "../components/Banner";

const HomePage: FC = () => {
	return (
		<div>
			<div>
				<Navbar />
				<Banner />
			</div>
		</div>
	);
};

export default HomePage;
