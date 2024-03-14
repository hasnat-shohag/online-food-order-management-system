import { HidePasswordIcon, ShowPasswordIcon } from "./Icon";
import { useState } from "react";

interface InputFieldProps {
	type?: string;
	placeholder?: string;
	customInputClass?: string;
	id: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
	type,
	placeholder,
	customInputClass = "",
	id,
	name,
	value,
	onChange,
}: InputFieldProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const togglePasswordVisibility = (): void => {
		setIsPasswordVisible((prevState) => !prevState);
	};

	if (type === "password") {
		return (
			<div className="relative w-full">
				<input
					id={id}
					className={`rounded-lg w-full px-4 py-2.5 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue placeholder:text-base ${customInputClass}`}
					type={isPasswordVisible ? "text" : "password"}
					placeholder={placeholder}
					onChange={onChange}
					name={name}
					value={value}
				/>

				{/* Icon for toggling password visibility */}
				{isPasswordVisible ? (
					<ShowPasswordIcon
						className="absolute top-1/2 right-4 transform -translate-y-1/2"
						onClick={togglePasswordVisibility}
					/>
				) : (
					<HidePasswordIcon
						className="absolute top-1/2 right-4 transform -translate-y-1/2"
						onClick={togglePasswordVisibility}
					/>
				)}
			</div>
		);
	}

	return (
		<div className="w-full">
			<input
				id={id}
				className={`rounded-lg w-full px-4 py-2.5 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue placeholder:text-base ${customInputClass}`}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				name={name}
				value={value}
			/>
		</div>
	);
};

export default InputField;
