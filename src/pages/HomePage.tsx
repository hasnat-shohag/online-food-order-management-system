import { FC, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Banner from "../components/Banner";
import FoodCard from "../components/FoodCard";
import axios from "axios";
import { getBaseUrl } from "../hooks/BaseUrl";
import { getAuthToken } from "../utils/token";
import { IFoodItemsResponse } from "../models/Auth";

const HomePage: FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [foodItems, setFoodItems] = useState<IFoodItemsResponse>();

	const [categories, setCategories] = useState(["All Items"]);

	const authToken = getAuthToken();

	useEffect(() => {
		const response = async () => {
			try {
				const url = getBaseUrl() + "/store/products";
				const response = await axios.get(url, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken}`,
					},
				});
				// console.log(response.data);
				setFoodItems(response?.data);
				const Categories = response.data.map(
					(item: unknown) => item?.collection
				);
				setCategories(Categories);
				console.log(categories);
			} catch (error) {
				console.log(error);
			}
		};
		response();
	}, []);

	const uniqueCategories = [...new Set(categories)];
	console.log(uniqueCategories);

	const filteredItems =
		selectedCategory === "All"
			? foodItems
			: foodItems.filter((item) => item.collection === selectedCategory);

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
						{uniqueCategories.map((category, index) => (
							<option key={index} value={category}>
								{category}
							</option>
						))}
					</select>

					<div className="flex justify-center flex-wrap">
						{filteredItems?.map((item, index) => (
							<FoodCard
								key={index}
								id={item.id}
								title={item.title}
								category={item.collection}
								amount={item.inventory}
								price={item.unit_price}
								image={item.images[0].image}
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
