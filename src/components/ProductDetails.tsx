interface ProductDetailsProps {
	id: number;
	image: string;
	title: string;
	category: string;
	price: number;
	rating?: number;
	amount: number;
	details?: string;
}

const ProductDetails: FC<ProductDetailsProps> = (
	props: ProductDetailsProps
) => {
	const { id, image, title, category, price, rating, amount, details } = props;

	return (
		<div className="p-5" key={id}>
			<h2 className="text-3xl mb-4">{title}</h2>
			<img src={image} alt={title} className="w-full h-auto mb-4" />
			<p className="text-base mb-2">Category: {category}</p>
			<p className="text-base mb-2">Price: {price} tk</p>
			<p className="text-base mb-2">Available Amount: {amount}</p>
			{details && <p>Details: {details}</p>}
			{rating && (
				<p className="text-base mb-2">
					Rating: <span className="text-yellow-500">☆</span> {rating}
				</p>
			)}
		</div>
	);
};

export default ProductDetails;
