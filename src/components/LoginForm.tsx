import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { LOCAL_STORAGE_KEYS } from "../constants/Global";
import { routes } from "../constants/Route";
import Button from "../elements/Button";
import InputField from "../elements/InputField";
import { ILoginRequest } from "../models/Auth";
import { setToStorage } from "../utils/token";
import { getBaseUrl } from "../hooks/BaseUrl";

const schema = yup.object().shape({
	username: yup.string().required(),
	password: yup.string().min(8).max(20).required(),
});

type FieldKeys = "username" | "password";

const LoginForm: FC = () => {
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginRequest>({
		resolver: yupResolver<ILoginRequest>(schema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<ILoginRequest> = async (
		payload: ILoginRequest
	) => {
		try {
			const url = getBaseUrl() + "/auth/jwt/create";
			const response = await axios.post(url, payload);
			// console.log(response?.data?.access);

			setToStorage(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response?.data?.access);
			setToStorage(LOCAL_STORAGE_KEYS.AUTH_EMAIL, response?.data?.email);
			navigate(routes.home.path);
		} catch (err) {
			console.log(err);
		}
	};

	const onClickSignUp = () => navigate(routes.signup.path);

	return (
		<div>
			<div className="py-8 2xl:py-12">
				{/* message top */}
				<div className="mr-16 2xl:mr-28">
					<p className="flex justify-end text-sm">
						Don't have an account?&nbsp;
						<span
							className=" text-[#5630FF] text-sm font-medium cursor-pointer"
							onClick={onClickSignUp}
						>
							Sign Up!
						</span>
					</p>
				</div>

				{/* headline */}
				<div className="mt-12 2xl:mt-16 flex flex-col justify-center items-center">
					<h2 className="text-4xl font-semibold">Welcome Back</h2>
					<h3 className="mt-2 text-lg">Login into your account</h3>
				</div>

				{/* Login Form */}
				<div className="flex flex-col justify-center items-center mt-6">
					<form
						className="flex flex-col gap-5 w-[388px]"
						onSubmit={handleSubmit(onSubmit)}
					>
						{[
							{ name: "username", key: "username", placeholder: "username" },
							{ name: "Password", key: "password", placeholder: "Password" },
						].map((field) => (
							<div key={field.key}>
								<Controller
									name={field.key as FieldKeys}
									control={control}
									render={({ field: { onChange, value } }) => (
										<InputField
											type={field.key === "password" ? "password" : "text"}
											value={value}
											onChange={onChange}
											id={field.key}
											name={field.name}
											placeholder={field.placeholder}
										/>
									)}
								/>
								{errors[field.key] && (
									<p className="text-red-500 text-sm">
										{errors[field.key]?.message}
									</p>
								)}
							</div>
						))}
						<Button
							buttonType="submit"
							customClass="flex justify-center item-center font-semibold text-base"
						>
							Log In
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
