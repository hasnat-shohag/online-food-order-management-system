import { FC, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Banner from "../components/Banner";
import FoodCard from "../components/FoodCard";
import axios from "axios";
import { getBaseUrl } from "../hooks/BaseUrl";
import { getAuthToken } from "../utils/token";
import { IFoodItemsResponse } from "../models/Auth";
import Select from "react-select";

const HomePage: FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [sortOrder, setSortOrder] = useState<string>("default");
	const [foodItems, setFoodItems] = useState<IFoodItemsResponse[]>([]);
	const [categories, setCategories] = useState<string[]>([]);

	const authToken = getAuthToken();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const url = getBaseUrl() + "/store/products";
				const response = await axios.get(url, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken}`,
					},
				});
				setFoodItems(response.data);

				// Extract unique categories from the data
				const categorySet = new Set(
					response.data.map((item: any) => item?.collection)
				);
				setCategories(Array.from(categorySet));
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	// Options for category filter
	const categoryOptions = [
		{ value: "All", label: "All Items" },
		...categories.map((category) => ({
			value: category,
			label: category,
		})),
	];

	// Options for sort filter
	const sortOptions = [
		{ value: "default", label: "Default" },
		{ value: "lowToHigh", label: "Price: Low to High" },
		{ value: "highToLow", label: "Price: High to Low" },
	];

	// Filter items based on selected category
	const filteredItems =
		selectedCategory === "All"
			? foodItems
			: foodItems.filter((item) => item?.collection === selectedCategory);

	// Sort items based on selected sort order
	const sortedItems = [...filteredItems];
	if (sortOrder === "lowToHigh") {
		sortedItems.sort((a, b) => a.unit_price - b.unit_price);
	} else if (sortOrder === "highToLow") {
		sortedItems.sort((a, b) => b.unit_price - a.unit_price);
	}

	return (
		<div>
			<div className="min-h-dvh">
				<Navbar />
				<Banner />
				<div className="my-10">
					<h1 className="text-4xl font-bold text-center mb-5">Products List</h1>
					<div className="flex flex-wrap items-center justify-start ml-20 mb-5">
						{/* Filters Container */}
						<div className="flex justify-between w-full pl-14 pr-32">
							{/* Category Filter */}
							<div className="w-64 mr-5">
								<label
									htmlFor="category-select"
									className="block text-gray-700 font-medium mb-2"
								>
									Filter by Category
								</label>
								<Select
									inputId="category-select"
									options={categoryOptions}
									defaultValue={categoryOptions[0]}
									onChange={(selectedOption) =>
										setSelectedCategory(selectedOption?.value || "All")
									}
									isSearchable
									placeholder="Select Category"
								/>
							</div>
							{/* Sort Filter */}
							<div className="w-64">
								<label
									htmlFor="sort-select"
									className="block text-gray-700 font-medium mb-2"
								>
									Sort by Price
								</label>
								<Select
									inputId="sort-select"
									options={sortOptions}
									defaultValue={sortOptions[0]}
									onChange={(selectedOption) =>
										setSortOrder(selectedOption?.value || "default")
									}
									isSearchable
									placeholder="Select Sorting"
								/>
							</div>
						</div>
					</div>

					<div className="flex justify-center flex-wrap">
						{sortedItems.length > 0 ? (
							sortedItems.map((item, index) => (
								<FoodCard
									key={index}
									id={item?.id}
									title={item?.title}
									category={item?.collection}
									amount={item?.inventory}
									price={item?.unit_price}
									image={item?.images[0]?.image}
									details={item?.description}
								/>
							))
						) : (
							<div>
								<h1 className="text-2xl font-bold text-center mt-10">
									No items found!
								</h1>
							</div>
						)}
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
