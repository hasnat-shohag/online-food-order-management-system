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
			<div className="max-w-5xl mx-auto p-4 mt-5 min-h-dvh">
				{loading ? (
					<div className="text-center py-10">Loading...</div>
				) : !cartData || cartData.items.length === 0 ? (
					<div className="text-center py-10">No items in the cart.</div>
				) : (
					<>
						<h2 className="text-2xl font-bold mb-6">My Cart</h2>
						{cartData.items.map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between py-4 border-b border-gray-200"
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
								<div className="flex items-center space-x-6">
									<p className="text-lg font-semibold">
										৳ {item.total_price.toFixed(2)}
									</p>
									<Button
										onClick={() => handleDeleteItem(item.id)}
										className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
									>
										Delete
									</Button>
								</div>
							</div>
						))}
						<div className="flex items-center justify-between mt-6">
							<h3 className="text-xl font-bold">Total:</h3>
							<div className="flex items-center space-x-6">
								<p className="text-xl font-bold">
									৳ {cartData.total_price.toFixed(2)}
								</p>
								<Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md">
									Place Order
								</Button>
							</div>
						</div>
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
