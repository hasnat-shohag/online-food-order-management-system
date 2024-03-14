import { FC } from "react";

interface FoodCardProps {
	image: string;
	title: string;
	category: string;
	price: number;
	rating: number;
	restaurant_name?: string;
	customStyle?: string;
}

const FoodCard: FC<FoodCardProps> = (props: FoodCardProps) => {
	const { title, image, category, price, rating, customStyle } = props;

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
					<p className="text-sm ">
						<span className="">☆</span> {rating}
					</p>
				</div>
			</div>
			<button className="bg-gray-700 text-white px-5 py-2 rounded-md">
				Add to Cart
			</button>
		</div>
	);
};

export default FoodCard;
