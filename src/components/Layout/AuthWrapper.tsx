import { Outlet, useNavigate } from "react-router-dom";

import Loader from "../Loader";
import { SESSION_STATUS } from "../../constants/Global";
import { routes } from "../../constants/Route";
import { useSession } from "../../hooks/useSession";

const AuthWrapper = () => {
	const { session, status } = useSession();
	const navigate = useNavigate();

	if (status === SESSION_STATUS.LOADING) return <Loader />;
	if (session) {
		navigate(routes.home.path);
		return;
	}

	return <Outlet />;
};

export default AuthWrapper;
