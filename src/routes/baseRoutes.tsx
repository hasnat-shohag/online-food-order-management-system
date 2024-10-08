import { createBrowserRouter } from "react-router-dom";

import AuthWrapper from "../components/Layout/AuthWrapper";
import { routes } from "../constants/Route";
import LoginPage from "../components/LoginForm";
import SignupPage from "../components/SignUpForm";
import BaseWrapper from "../components/Layout/BaseWrapper";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PublicWrapper from "../components/Layout/PublicWrapper";
import MyCart from "../pages/MyCart";
import About from "../pages/About";

const MainRoutes = createBrowserRouter([
	{
		children: [
			{
				path: routes.notFound.path,
				element: <NotFoundPage />,
			},
		],
	},
	{
		element: <PublicWrapper />,
		children: [
			{
				path: routes.home.path,
				element: <HomePage />,
			},
			// rest of the public property
			{
				path: routes.about.path,
				element: <About />,
			},
		],
	},
	{
		element: <AuthWrapper />,
		children: [
			{
				path: routes.login.path,
				element: <LoginPage />,
			},
			{
				path: routes.signup.path,
				element: <SignupPage />,
			},
		],
	},
	{
		element: <BaseWrapper />,
		children: [
			// rest of the private property
			{
				path: routes.myCart.path,
				element: <MyCart />,
			},
		],
	},
]);

export default MainRoutes;
