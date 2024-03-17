import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	return (
		<header className="min-h-screen flex flex-col justify-center items-center">
			<span className="text-black font-semibold text-4xl italic">
				Oops! The page you are looking for doesn't exist.
			</span>
			<Button
				customClass="px-5 mt-5 !rounded-lg hover:bg-secondary hover:text-black"
				onClick={() => navigate(-1)}
			>
				Go Back
			</Button>
		</header>
	);
};

export default NotFound;
