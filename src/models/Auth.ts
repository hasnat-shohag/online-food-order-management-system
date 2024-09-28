import { SESSION_STATUS } from "../constants/Global";
export interface ISession {
	session: { email: string } | null;
	status: SESSION_STATUS;
}

export interface ISignupRequest {
	username: string;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
}

export interface ILoginRequest {
	username: string;
	password: string;
}

export interface IFoodItemsResponse {
	id: number;
	title: string;
	description: string;
	slug: string;
	inventory: number;
	unit_price: number;
	price_with_tax: number;
	collection: string;
	images: {
		id: number;
		image: string;
	};
}
