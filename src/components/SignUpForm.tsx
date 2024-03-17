import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import Button from "../elements/Button";
import InputField from "../elements/InputField";
import { ISignupRequest } from "../models/Auth";
import { getBaseUrl } from "../hooks/BaseUrl";
import axios from "axios";

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email().required("Email is required"),
	password: yup
		.string()
		.min(8)
		.max(20)
		.test("lowercase", "must contain lowercase letter", (value) =>
			value ? /[a-z]/.test(value) : false
		)
		.test("uppercase", "must contain uppercase letter", (value) =>
			value ? /[A-Z]/.test(value) : false
		)
		.test("number", "must contain number", (value) =>
			value ? /\d/.test(value) : false
		)
		.test("special", "must contain special character", (value) =>
			value ? /[^\w\d\s:]/.test(value) : false
		)
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Password did not match")
		.required("Password did not match"),
});

type FieldKeys = "name" | "email" | "password" | "confirmPassword";

const SignUpForm: FC = () => {

	const {
		reset,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignupRequest>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<ISignupRequest> = async (payload) => {
		try {
			const url = getBaseUrl() + "signup";
			await axios.post(url, payload);

			toast.success("Registered successfully!");

			reset();
			// navigate(routes.login.path);
		} catch (error) {
			toast.error("Email is already taken. Please choose another email.");
			console.log(error);
		}
	};

	const onClickSignIn = () => {
		// navigate(routes.login.path);
	};

	return (
		<div className="py-8 2xl:py-12">
			{/* message top */}
			<div className="mr-16 2xl:mr-28">
				<p className="flex justify-end text-sm">
					Have an account?&nbsp;
					<span
						className="text-[#5630FF] text-sm font-medium cursor-pointer"
						onClick={onClickSignIn}
					>
						Sign in!
					</span>
				</p>
			</div>

			{/* headline */}
			<div className="mt-12 2xl:mt-16 flex flex-col justify-center items-center">
				<h2 className="text-2xl text-black font-semibold">
					Get Started With Contacts
				</h2>
				<h3 className="mt-2 text-[#7E7E7E] text-sm">Getting Started is easy</h3>
			</div>

			{/* Signup Form */}
			<div className="flex flex-col justify-center items-center mt-6">
				<form
					className="flex flex-col gap-5 w-[388px]"
					onSubmit={handleSubmit(onSubmit)}
				>
					{[
						{ name: "name", key: "name", placeholder: "Full Name" },
						{ name: "Email", key: "email", placeholder: "Email" },
						{
							name: "Password",
							key: "password",
							placeholder: "New password",
						},
						{
							name: "ConfirmPassword",
							key: "confirmPassword",
							placeholder: "Confirm Password",
						},
					].map((field) => (
						<div key={field.key}>
							<Controller
								name={field.key as FieldKeys}
								control={control}
								render={({ field: { onChange, value } }) => (
									<InputField
										type={
											field.key.toLocaleLowerCase().includes("password")
												? "password"
												: field.key == "email"
												? "email"
												: "text"
										}
										value={value}
										onChange={onChange}
										id={value}
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
						Create Account
					</Button>
				</form>
			</div>

			<div className="flex justify-center">
				<p className="text-zinc-600 text-sm font-normal mt-14">
					By continuing you indicate that you read and agreed to the Terms of
					Use
				</p>
			</div>
		</div>
	);
};

export default SignUpForm;
