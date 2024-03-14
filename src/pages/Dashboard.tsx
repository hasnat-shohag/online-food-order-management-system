import { FC, useState } from "react";
import Navbar from "../components/NavBar";
import Banner from "../components/Banner";
import FoodCard from "../components/FoodCard";
import { FoodItems } from "../utils/food-items";

const HomePage: FC = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");

	const filteredItems =
		selectedCategory === "All"
			? FoodItems
			: FoodItems.filter((item) => item.category === selectedCategory);

	return (
		<div>
			<div>
				<Navbar />
				<Banner />
				<div className="my-10">
					<h1 className="text-4xl font-bold text-center mb-5">Products List</h1>
					<select
						className="ml-8 px-5 py-3 rounded-sm outline-none"
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="All">All Items</option>
						<option value="Pasta">Pasta</option>
						<option value="Salad">Salad</option>
						<option value="Burger">Burger</option>
						{/* Add more options based on your categories */}
					</select>
					<div className="flex justify-center flex-wrap">
						{filteredItems.map((item, index) => (
							<FoodCard
								key={index}
								title={item.title}
								price={item.price}
								image={item.image}
								category={item.category}
								rating={item.rating}
								customStyle="w-[30%]"
							/>
						))}
					</div>
				</div>
			</div>
			{/* Footer */}
			<div className="flex justify-center py-5 bg-gray-200">
				<p>All rights reserved by ICE-19 Lab-4.</p>
			</div>
		</div>
	);
};

export default HomePage;
