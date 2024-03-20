import { FC, useState } from "react";
import Button from "../elements/Button";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "./CartItem";

export interface FoodCardProps {
	id: number;
	image: string;
	title: string;
	category: string;
	price: number;
	rating: number;
	amount: number;
	restaurant_name?: string;
	customStyle?: string;
}

const FoodCard: FC<FoodCardProps> = (props: FoodCardProps) => {
	const { id, title, image, category, price, rating, amount, customStyle } =
		props;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	// const isAuthenticated = localStorage.getItem("auth_token") !== null;
	const isAuthenticated = true;

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
		// console.log("Clicked");
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className={`ring-1 p-5 rounded-lg m-5 ${customStyle}`}>
			<div className="w-[100%] h-[300px] flex justify-center">
				<img
					src={image}
					alt="image"
					className="w-[100%] h-[100%] hover:w-[99%] rounded-lg"
				/>
			</div>
			<div className="flex justify-center flex-col pt-4 rounded-md text-[#5B5B5B]">
				<h3 className="text-3xl ">{title}</h3>
				<p className="text-base">{category}</p>
				<div className="flex justify-between">
					<p className="text-gray-700">{price.toFixed(2)} tk</p>
					<p>Available Amount: {amount}</p>
					<p className="text-sm ">
						<span className="">☆</span> {rating}
					</p>
				</div>
			</div>
			<Button
				buttonVariant="secondary"
				customClass="px-5 mt-2 text-black hover:bg-gray-200"
				// onClick={handleOpenModal}
				onClick={() => handleAvailablity(amount)}
			>
				Add to Cart
			</Button>
			<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
				<CartItem amount={amount} id={id} title={title} price={price} />
			</Modal>
		</div>
	);
};

export default FoodCard;
