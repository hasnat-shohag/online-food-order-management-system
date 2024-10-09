import { FC, useState } from "react";
import Button from "../elements/Button";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "./CartItem";
import ProductDetails from "./ProductDetails";
import axios from "axios";
import "../assets/styles/Banner.css";

export interface FoodCardProps {
	id: number;
	image: string;
	title: string;
	category: string;
	price: number;
	rating?: number;
	amount: number;
	details?: string;
	restaurant_name?: string;
	customStyle?: string;
	promotions?: { discount: number }[];
}

const FoodCard: FC<FoodCardProps> = (props: FoodCardProps) => {
	const {
		id,
		title,
		image,
		category,
		price,
		rating,
		amount,
		customStyle,
		details,
		promotions,
	} = props;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(1);
	const navigate = useNavigate();

	const isAuthenticated = localStorage.getItem("auth_token") !== null;

	// Calculate discounted price if promotions are present
	const discount =
		promotions && promotions.length > 0 ? promotions[0].discount : 0;
	const discountedPrice = price - (price * discount) / 100;

	const handleOpenModal = () => {
		if (isAuthenticated) {
			setIsModalOpen(true);
		} else {
			navigate("/auth/login");
		}
	};

	const handleAvailablity = (amount: number) => {
		if (amount > 0) {
			handleOpenModal();
		} else {
			toast.warn("Out of stock");
		}
	};

	const handleCloseModal = () => {
		const isCardIdAvailable = localStorage.getItem("cartId");
		if (!isCardIdAvailable) {
			axios
				.post("http://127.0.0.1:8000/store/carts/")
				.then((res) => {
					localStorage.setItem("cartId", res.data.id.toString());
				})
				.catch((error) => {
					console.error("Error creating cart:", error);
				});
		}

		setTimeout(() => {
			const cartId = localStorage.getItem("cartId");
			if (cartId) {
				axios
					.post(`http://127.0.0.1:8000/store/carts/${cartId}/items/`, {
						product_id: id,
						quantity: quantity,
					})
					.then((res) => {
						console.log("res data: ", res.data);
					})
					.catch((error) => {
						console.error("Error creating cart item:", error);
					});
			}
		}, 100);

		setIsModalOpen(!isModalOpen);
	};

	const handleChangeQuantity = (quantity: number) => {
		setQuantity(quantity);
		console.log(quantity);
	};

	const handleOpenDetailsModal = () => {
		setIsDetailsModalOpen(true);
	};

	const handleCloseDetailsModal = () => {
		setIsDetailsModalOpen(false);
	};

	return (
		<div className={`ring-1 p-5 rounded-lg m-5 ${customStyle} w-[400px]`}>
			<div className="w-full h-48 flex justify-center">
				<img
					src={image}
					alt="image"
					className="w-full h-full object-cover rounded-lg banner"
				/>
			</div>
			<div className="flex flex-col pt-4 text-gray-700">
				<h3 className="text-xl font-bold">{title}</h3>
				<p className="text-sm">{category}</p>
				<div className="flex justify-between items-center mt-2">
					{discount > 0 ? (
						<>
							<p className="text-red-500 font-bold">
								{discountedPrice.toFixed(2)} tk
							</p>
							<p className="text-gray-500 line-through">{price} tk</p>
						</>
					) : (
						<p className="font-bold">{price} tk</p>
					)}
					{rating && (
						<p className="text-sm">
							<span className="">☆</span> {rating}
						</p>
					)}
				</div>
				{discount > 0 && (
					<p className="text-green-600 font-medium">Save {discount}%!</p>
				)}
				<p className="text-sm mt-2">Available Amount: {amount}</p>
			</div>
			<div className="flex justify-between font-semibold mt-2">
				<Button
					buttonVariant="secondary"
					customClass="px-5 mt-2 text-black hover:bg-gray-200"
					onClick={() => handleAvailablity(amount)}
				>
					Add to Cart
				</Button>
				<Button
					customClass="px-5 mt-2 text-black hover:bg-gray-200"
					buttonVariant="secondary"
					onClick={handleOpenDetailsModal}
				>
					See Details
				</Button>
			</div>
			<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
				<CartItem
					amount={amount}
					id={id}
					title={title}
					price={discount > 0 ? discountedPrice : price}
					onQuantityChange={handleChangeQuantity}
				/>
			</Modal>
			<Modal
				isOpen={isDetailsModalOpen}
				onClose={handleCloseDetailsModal}
				closeButton="Close"
			>
				<ProductDetails
					id={id}
					image={image}
					title={title}
					category={category}
					price={price}
					rating={rating}
					amount={amount}
					details={details}
					promotions={promotions}
				/>
			</Modal>
		</div>
	);
};

export default FoodCard;
