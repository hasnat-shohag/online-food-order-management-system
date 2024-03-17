import { Outlet, useNavigate } from "react-router-dom";

import Loader from "../../components/Loader";
import { SESSION_STATUS } from "../../constants/Global";
import { routes } from "../../constants/Route";
import { useSession } from "../../hooks/useSession";

const BaseWrapper = () => {
	const { session, status } = useSession();
	const navigate = useNavigate();

	if (status === SESSION_STATUS.LOADING) return <Loader />;
	if (!session) {
		navigate(routes.login.path);
		return;
	}

	return <Outlet />;
};

export default BaseWrapper;
