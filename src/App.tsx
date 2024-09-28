import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import MainRoutes from "./routes/baseRoutes";

function App() {
	return (
		<Suspense>
			<RouterProvider router={MainRoutes} />
		</Suspense>
	);
}

export default App;
