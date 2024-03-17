import { SESSION_STATUS } from "../constants/Global";
export interface ISession {
	session: { email: string } | null;
	status: SESSION_STATUS;
}

export interface ISignupRequest {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}
