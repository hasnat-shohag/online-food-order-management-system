import { useEffect, useState } from "react";

import { LOCAL_STORAGE_KEYS, SESSION_STATUS } from "../constants/Global";
import { ISession } from "../models/Auth";

export const useSession = () => {
	const [session, setSession] = useState<ISession>({
		session: null,
		status: SESSION_STATUS.LOADING,
	});

	useEffect(() => {
		setTimeout(() => {
			const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
			const email = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_EMAIL);

			if (token && email) {
				setSession({
					session: { email },
					status: SESSION_STATUS.AUTHENTICATED,
				});
			} else {
				setSession({
					session: null,
					status: SESSION_STATUS.UNAUTHENTICATED,
				});
			}
		}, 1000);
	}, []);

	return session;
};
