import { FC, useEffect, useState } from "react";
import Button from "../elements/Button";

interface CartItemProps {
	id: number;
	title: string;
	amount: number;
	price: number;
}

const CartItem: FC<CartItemProps> = (props: CartItemProps) => {
	const { id, title, price, amount } = props;
	const [quantity, setQuantity] = useState<number>(1);
	const [totalCost, setTotalCost] = useState<number>(quantity * price);

	const handleIncrease = () => {
		setQuantity(quantity + 1);
	};

	const handleDecrease = () => {
		setQuantity(quantity - 1);
	};

	useEffect(() => {
		setTotalCost(quantity * price);
		console.log("firstRender");
	}, [quantity]);

	return (
		<div>
			<h2 className="flex justify-center">Shopping Cart</h2>
			<div key={id}>
				<h3>{title}</h3>
				<p>Price: {price}</p>
				<div className="flex justify-between items-center py-3">
					<Button
						customClass="px-3 py-2"
						onClick={handleDecrease}
						disabled={quantity === 1}
					>
						Decrease
					</Button>
					<p>Quantity: {quantity}</p>
					<Button
						disabled={quantity === amount}
						customClass="px-3"
						onClick={handleIncrease}
					>
						Increase
					</Button>
				</div>
			</div>

			<p>Total: {totalCost} tk</p>
		</div>
	);
};

export default CartItem;
