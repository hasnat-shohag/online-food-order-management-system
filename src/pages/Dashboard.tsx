import { FC } from "react";
import Navbar from "../components/NavBar";
import Banner from "../components/Banner";
import FoodCard from "../components/FoodCard";
import { FoodItems } from "../utils/food-items";

const HomePage: FC = () => {
	return (
		<div>
			<div>
				<Navbar />
				<Banner />
				<div className="my-10">
					<h1 className="text-4xl font-bold text-center mb-5">Products List</h1>
					<div className="flex justify-center">
						{FoodItems.map((item, index) => (
							<FoodCard
								key={index}
								title={item.title}
								price={item.price}
								image={item.image}
								catergory={item.catergory}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
