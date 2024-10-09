import { FC, useState } from "react";
import Button from "../elements/Button";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "./CartItem";
import ProductDetails from "./ProductDetails";
import "../assets/styles/FoodCard.css";
import axios from "axios";

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
	} = props;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(1);
	const navigate = useNavigate();
	// console.log(details);

	const isAuthenticated = localStorage.getItem("auth_token") !== null;

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
		<div className={`ring-1 p-5 rounded-lg m-5 ${customStyle} w-[20%]`}>
			<div className="w-[100%] h-[300px] flex justify-center">
				<img
					src={image}
					alt="image"
					className="w-[100%] h-[100%] hover-image rounded-lg"
				/>
			</div>
			<div className="flex justify-center flex-col pt-4 rounded-md text-[#5B5B5B]">
				<h3 className="text-3xl ">{title}</h3>
				<p className="text-base">{category}</p>
				<div className="flex justify-between">
					<p className="text-gray-700">{price} tk</p>
					<p>Available Amount: {amount}</p>
					<p className="text-sm ">
						<span className="">☆</span> {rating}
					</p>
				</div>
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
					price={price}
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
				/>
			</Modal>
		</div>
	);
};

export default FoodCard;
