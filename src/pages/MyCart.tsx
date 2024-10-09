import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import axios from "axios";
import Button from "../elements/Button";

interface Product {
	id: number;
	title: string;
	unit_price: number;
}

interface Item {
	id: number;
	product: Product;
	quantity: number;
	total_price: number;
}

interface CartData {
	id: string;
	items: Item[];
	total_price: number;
}

const MyCart: React.FC = () => {
	const [cartData, setCartData] = useState<CartData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchCartData();
	}, []);

	const fetchCartData = () => {
		// Fetch data from the server
		const cartId = localStorage.getItem("cartId");
		axios
			.get(`http://127.0.0.1:8000/store/carts/${cartId}`)
			.then((response) => {
				const cartData: CartData = {
					id: response.data.id,
					items: response.data.items,
					total_price: response.data.total_price,
				};
				setCartData(cartData);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching cart data:", error);
				setLoading(false);
			});
	};

	const handleDeleteItem = (itemId: number) => {
		const cartId = localStorage.getItem("cartId");
		axios
			.delete(`http://127.0.0.1:8000/store/carts/${cartId}/items/${itemId}/`)
			.then(() => {
				fetchCartData();
			})
			.catch((error) => {
				console.error("Error deleting cart item:", error);
			});
	};

	return (
		<>
			<Navbar />
			<div className="max-w-2xl mx-auto p-4 mt-5 min-h-dvh">
				{/* <h1 className="text-[28px]">My Cart Page</h1> */}
				{loading ? (
					<div className="text-center py-10">Loading...</div>
				) : (!cartData || cartData.items.length === 0) === true ? (
					<div className="text-center py-10">No items in the cart.</div>
				) : (
					<>
						{cartData && cartData.items.length > 0 ? (
							<>
								<h2 className="text-2xl font-bold mb-6">My Cart</h2>
								{cartData.items.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between border-b py-4"
									>
										<div>
											<h3 className="text-lg font-semibold">
												{item.product.title}
											</h3>
											<p className="text-sm text-gray-600">
												Unit Price: ${item.product.unit_price.toFixed(2)}
											</p>
											<p className="text-sm text-gray-600">
												Quantity: {item.quantity}
											</p>
										</div>
										<div className="flex items-center">
											<p className="text-lg font-semibold mr-4">
                      ৳ {item.total_price.toFixed(2)}
											</p>
										</div>
										<button
											onClick={() => handleDeleteItem(item.id)}
											className="text-white hover:text-gray-700 bg-blue-400 font-bold p-2 rounded-md"
										>
											Delete
										</button>
									</div>
								))}
								<div className="flex items-center justify-between mt-6">
									<h3 className="text-xl font-bold">Total:</h3>
									<p className="text-xl font-bold pl-24">
										৳ {cartData.total_price.toFixed(2)}
									</p>
									<Button className="bg-green-500 p-2 rounded-md hover:bg-green-600 text-white font-semibold">
										Place Order
									</Button>
								</div>
							</>
						) : (
							<div className="text-center py-10">Your cart is empty.</div>
						)}
					</>
				)}
			</div>
			{/* Footer */}
			<div className="flex justify-center py-5 bg-gray-200">
				<p>All rights reserved by ICE-19 Lab-4.</p>
			</div>
		</>
	);
};

export default MyCart;
