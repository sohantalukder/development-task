import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../CustomHooks/useAuth';
const Login = () => {
	const location = useLocation();
	const history = useHistory();
	const [showAlert, setShowAlert] = useState(true);
	const { loginUser, authError, isLoading } = useAuth();
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const onSubmit = (data) => {
		loginUser(data.user_email, data.user_password, location, history);
		reset();
	};
	return (
		<div>
			{isLoading ? (
				<div className="flex h-screen items-center justify-center">
					<svg className="spinner" viewBox="0 0 50 50">
						<circle
							className="path"
							cx="50"
							cy="50"
							r="40"
							fill="#38b000"
							strokeWidth="5"></circle>
					</svg>
				</div>
			) : (
				<div className="flex h-screen items-center justify-center">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold tracking-wide mb-12 text-center">
							go<span className="text-green">B</span>illing
						</h1>
						<div className=" w-full sm:w-[473px]  border border-nav shadow-sm">
							<div className="py-5 text-center border-b border-nav tracking-wider uppercase text-green text-xl font-semibold">
								Welcome Back!
							</div>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="px-6 py-8 space-y-5">
								<div className="space-y-5">
									<ul className=" space-y-5 mx-auto">
										<li className="flex flex-col items-start">
											<label
												htmlFor="email "
												className=" text-start after:content-['*'] after:ml-0.5 after:text-red mb-1 block">
												Email
											</label>
											<input
												type="email"
												className={
													errors.user_email
														? '!py-3 !px-4  w-full  lg:px-0 border bg-lightGray outline-none focus:outline-none  text-black transition-all  !border-red focus:border-red'
														: '!py-3 !px-4  w-full lg:px-0 border  bg-lightGray outline-none focus:outline-none focus:border-green text-black transition-all !border-nav '
												}
												placeholder="Email"
												name="user_email"
												{...register('user_email', {
													required: 'Email is Required.',
													pattern: {
														value:
															/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
														message: 'Email must be valid',
													},
												})}
												id="email"
											/>
											<p className="text-red pt-1 text-left text-sm">
												{errors.user_email?.message}
											</p>
										</li>
										<li className="flex flex-col items-start relative">
											<label
												htmlFor="Password "
												className=" text-start after:content-['*'] after:ml-0.5 after:text-red mb-1 block">
												Password
											</label>
											<input
												type={passwordShown ? 'text' : 'password'}
												placeholder="Password"
												id="Password"
												className={
													errors.user_password
														? '!py-3 !px-4  w-full lg:px-0 border border-mediumGray bg-lightGray outline-none focus:outline-none  text-black transition-all  !border-red focus:!border-red'
														: '!py-3 !px-4  w-full  lg:px-0 border border-mediumGray bg-lightGray outline-none focus:outline-none  text-black transition-all !border-mediumGray focus:!border-green'
												}
												{...register('user_password', {
													required: 'Password is Required...',
													pattern: {
														value: /^(?=.{6,16})/,
														message:
															'Password Must Contain At least 6 Characters',
													},
													maxLength: {
														value: 15,
														message:
															'Password must be at most 15 characters long.',
													},
												})}
												name="user_password"
											/>
											{!passwordShown ? (
												<BiHide
													className="absolute top-[43px] right-4 text-xl cursor-pointer"
													onClick={togglePassword}
												/>
											) : (
												<BiShowAlt
													className="absolute top-[43px] right-4 text-xl cursor-pointer"
													onClick={togglePassword}
												/>
											)}
											<p className="text-red pt-1 text-left text-sm">
												{errors.user_password?.message}
											</p>
										</li>
									</ul>
								</div>
								{authError ? (
									<div
										className={
											showAlert
												? 'py-2 px-4 flex justify-between border border-red text-red items-center'
												: 'hidden '
										}>
										<span>{authError.message}</span>
										<button
											className="text-2xl font-semibold"
											onClick={() => setShowAlert(false)}>
											x
										</button>
									</div>
								) : (
									<div></div>
								)}
								<button
									type="submit"
									className="bg-green text-white transition-all rounded-sm hover:bg-black px-6 w-full  lg:px-0 py-3">
									Log In
								</button>
							</form>
							<div className="py-5 text-center border-t border-nav    flex justify-between px-6">
								<Link
									to="register"
									className="font-semibold text-blue text-sm hover:underline ">
									Don't have an account yet?
								</Link>
								<Link
									to="/forgetPassword"
									className="text-gray-500    hover:underline  text-sm">
									Forget Password
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
