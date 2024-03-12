import { FC } from "react";
import bannerimage from "../assets/images/bannerimage.png";

const Banner: FC = () => {
	return (
		<div className="flex justify-around py-20 items-center">
			{/* left */}
			<div className="">
				<h2 className="font-bold text-[60px] mb-3">
					Food delivery from Rajshahi’s <br /> best restaurants
				</h2>
				<p className="text-gray-600">
					Experience the convenience of ABC's food delivery service. <br />
					Get real-time updates on your order and enjoy our delicious meals.{" "}
					<br />
					Stay satisfied, stay delighted.
				</p>
			</div>
			{/* right */}
			<div className="w-[400px]">
				<img src={bannerimage} alt="bannerimage" className="w-[100%]" />
			</div>
		</div>
	);
};

export default Banner;
