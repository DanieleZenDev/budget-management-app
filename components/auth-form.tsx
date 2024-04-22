import { postUserData } from "@/helpers/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);

	const emailRef = useRef<HTMLInputElement>(null);
	const pswRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitUserData = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const enteredEmail = emailRef.current?.value;
		const enteredPsw = pswRef.current?.value;
		if (enteredEmail && enteredPsw) {
			const enteredData = {
				Email: enteredEmail,
				Password: enteredPsw,
			};
			console.log("ed", enteredData);
			if (isLogin) {
				const loginResult = await signIn("credentials", {
					redirect: false,
					Email: enteredEmail,
					Password: enteredPsw,
				});
				console.log("loginResult", loginResult);
				if (loginResult && !loginResult.error) {
					router.replace("/");
				}
			} else {
				try {
					const result = await postUserData(enteredData);
					console.log("result", result);
					router.replace("/");
				} catch (error) {
					console.error("something went wrong", error);
				}
			}
		}
	};

	return (
		<section className="flex justify-center">
			<div className="m-12 w-95 max-w-25rem rounded-lg bg-purple-900 shadow-md p-4 text-center w-96">
				<h1 className="text-center text-white">
					{isLogin ? "Login" : "Sign Up"}
				</h1>
				<form onSubmit={submitUserData}>
					<div className="mb-[0.5rem]">
						<label
							htmlFor="email"
							className="inline-block text-white font-bold mb-[0.5rem]"
						>
							Your Email
						</label>
						<input
							type="email"
							id="email"
							required
							ref={emailRef}
							className="bg-purple-100 text-purple-900 border border-white rounded-md w-full text-left px-1"
						/>
					</div>
					<div className="mb-[0.5rem]">
						<label
							htmlFor="password"
							className="inline-block text-white font-bold mb-[0.5rem]"
						>
							Your Password
						</label>
						<input
							type="password"
							id="password"
							required
							ref={pswRef}
							className="bg-purple-100 text-purple-900 border border-white rounded-md w-full text-left px-1"
						/>
					</div>
					<div className="mt-[1.5rem] flex flex-col items-center">
						<button className="cursor-pointer font-inherit text-white bg-purple-600 border border-purple-600 rounded-md px-10 py-2 hover:bg-purple-700 hover:border-purple-600">
							{isLogin ? "Login" : "Create Account"}
						</button>
						<button
							type="button"
							onClick={switchAuthModeHandler}
							className="cursor-pointer font-inherit text-white bg-purple-600 border border-purple-600 rounded-md px-10 py-2 hover:bg-purple-700 hover:border-purple-600 mt-[1.2rem] bg-transparent border-none p-[0.15rem 1.5rem]"
						>
							{isLogin ? "Create new account" : "Login with existing account"}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default AuthForm;
