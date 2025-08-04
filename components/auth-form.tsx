
import { postUserData } from "@/helpers/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    
    const [authErrors, setAuthErrors] = useState<string[]>([]);

    const emailRef = useRef<HTMLInputElement>(null);
    const pswRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };
    
    const submitUserData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const enteredEmail = emailRef.current?.value || '';
        const enteredPsw = pswRef.current?.value || '';
        const enteredName = nameRef.current?.value || '';

        const enteredData = {
            Name: enteredName,
            Email: enteredEmail,
            Password: enteredPsw,
        };

        if (isLogin) {
            try {
                const loginResult = await signIn("credentials", {
                    redirect: false,
                    Email: enteredEmail,
                    Password: enteredPsw,
                });
                // Check if login was successful
                if (loginResult && !loginResult.error) {
                    router.replace("/");
                } else {
                    setAuthErrors([loginResult?.error || "Login failed!"]);
                }
				
            } catch (error: any) {
                console.error("Something went wrong during login", error);
                setAuthErrors(["An unexpected error occurred."]);
            }
        } else {
            try {
                const result = await postUserData(enteredData);
            
                if (result.error) {
                    setAuthErrors(result.error);
                } else {
                    router.replace("/");
                }
            } catch (error: any) {
                console.error("Something went wrong during signup", error);
                setAuthErrors(["An unexpected error occurred."]);
            }
        }
    };
    
    return (
        <section className="flex justify-center">
            <div className="max-w-md w-[500px] bg-white shadow-md rounded-lg overflow-hidden">
                <h1 className="text-center text-xl font-bold bg-blue-500 text-white py-4">
                    {isLogin ? "Login" : "Sign Up"}
                </h1>
                <form onSubmit={submitUserData} className="px-6 py-4">
                    {!isLogin && (
                        <div className="mb-[0.5rem]">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                ref={nameRef}
                                className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
                            />
                        </div>
                    )}
                    <div className="mb-[0.5rem]">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Your Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
                        />
                    </div>
                    <div className="mb-[0.5rem]">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Your Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            ref={pswRef}
                            className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
                        />
                    </div>

                    {authErrors.length > 0 && (
                        <div className="mb-4">
                            <ul className="list-disc list-inside text-red-500">
                                {authErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-[1.5rem] flex flex-col items-center gap-10">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {isLogin ? "Login" : "Create Account"}
                        </button>
                        <button
                            type="button"
                            onClick={switchAuthModeHandler}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
