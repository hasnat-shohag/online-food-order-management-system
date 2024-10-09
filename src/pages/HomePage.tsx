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

	// Split items into discounted and non-discounted
	const discountedItems = filteredItems.filter((item) => {
		const discount = item.promotions?.[0]?.discount || 0;
		return discount > 0;
	});

	const nonDiscountedItems = filteredItems.filter((item) => {
		const discount = item.promotions?.[0]?.discount || 0;
		return discount === 0;
	});

	// Sort items based on selected sort order
	const sortItems = (items: IFoodItemsResponse[]) => {
		const sortedItems = [...items];
		if (sortOrder === "lowToHigh") {
			sortedItems.sort((a, b) => a.unit_price - b.unit_price);
		} else if (sortOrder === "highToLow") {
			sortedItems.sort((a, b) => b.unit_price - a.unit_price);
		}
		return sortedItems;
	};

	const sortedDiscountedItems = sortItems(discountedItems);
	const sortedNonDiscountedItems = sortItems(nonDiscountedItems);

	return (
		<div>
			<div className="min-h-screen">
				<Navbar />
				<Banner />
				<div className="my-10 px-4">
					<h1 className="text-4xl font-bold text-center mb-5">Products List</h1>

					{/* Filters Container */}
					<div className="flex flex-wrap items-center justify-end gap-16 mr-10">
						{/* Category Filter */}
						<div className="w-64">
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

					<div className="flex flex-col lg:flex-row">
						{/* Left Sidebar for Discounted Items */}
						<div className="lg:w-1/4 w-full p-4">
							<h2 className="text-2xl font-bold mb-4">Discounted Products</h2>
							{sortedDiscountedItems.length > 0 ? (
								<div className="space-y-4">
									{sortedDiscountedItems.map((item) => (
										<FoodCard
											key={item.id}
											id={item.id}
											title={item.title}
											category={item.collection}
											amount={item.inventory}
											price={item.unit_price}
											image={item.images[0]?.image}
											details={item.description}
											promotions={item.promotions}
										/>
									))}
								</div>
							) : (
								<p>No discounted items found.</p>
							)}
						</div>
						{/* Main Content for Non-Discounted Items */}
						<div className="lg:w-3/4 w-full p-4">
							<h2 className="text-2xl font-bold mb-4">Products</h2>
							{sortedNonDiscountedItems.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									{sortedNonDiscountedItems.map((item) => (
										<FoodCard
											key={item.id}
											id={item.id}
											title={item.title}
											category={item.collection}
											amount={item.inventory}
											price={item.unit_price}
											image={item.images[0]?.image}
											details={item.description}
											promotions={item.promotions}
										/>
									))}
								</div>
							) : (
								<p>No items found.</p>
							)}
						</div>
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
