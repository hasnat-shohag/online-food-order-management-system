import { FC } from "react";

interface FoodCardProps {
	image: string;
	title: string;
	catergory: string;
	price: number;
	rating: number;
	restaurant_name?: string;
}

const FoodCard: FC<FoodCardProps> = (props: FoodCardProps) => {
	const { title, image, catergory, price, rating } = props;

	return (
		<div className="ring-1 p-5 rounded-lg">
			<div className="h-[180px] p-5 ">
				<img src={image} alt="image" className="h-[100%]" />
			</div>
			<div className="flex justify-center flex-col pt-4 rounded-md text-[#5B5B5B]">
				<h3 className="text-3xl ">{title}</h3>
				<p className="text-base">{catergory}</p>
				<p className="text-3xl ">{rating}</p>
				<p className="text-gray-700">{price.toFixed(2)} tk</p>
			</div>
		</div>
	);
};

export default FoodCard;
