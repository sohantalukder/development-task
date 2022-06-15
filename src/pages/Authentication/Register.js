import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../CustomHooks/useAuth';
const Register = () => {
	const location = useLocation();
	const history = useHistory();
	const [showAlert, setShowAlert] = useState(true);
	const { registerUser, authError, isLoading } = useAuth();
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
		registerUser(
			data.user_name,
			data.user_email,
			data.user_contact,
			data.user_password,
			location,
			history
		);
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
								Welcome !
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
												Name
											</label>
											<input
												type="text"
												className={
													errors.user_name
														? '!py-3 !px-4  w-full  lg:px-0 border border-mediumGray bg-lightGray outline-none focus:outline-none  text-black transition-all  !border-red focus:border-red'
														: '!py-3 !px-4  w-full lg:px-0 border border-mediumGray bg-lightGray outline-none focus:outline-none focus:border-green text-black transition-all !border-mediumGray '
												}
												placeholder="Name"
												name="user_name"
												{...register('user_name', {
													required: 'Name is Required.',
												})}
												id="name"
											/>
											<p className="text-red pt-1 text-left text-sm">
												{errors.user_name?.message}
											</p>
										</li>
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
														? '!py-3 !px-4  w-full  lg:px-0 border border-mediumGray bg-lightGray outline-none focus:outline-none  text-black transition-all  !border-red focus:border-red'
														: '!py-3 !px-4  w-full lg:px-0 border border-mediumGray bg-lightGray outline-none focus:outline-none focus:border-green text-black transition-all !border-mediumGray '
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
										<li className="flex flex-col items-start">
											<label
												htmlFor="contact "
												className=" text-start after:content-['*'] after:ml-0.5 after:text-red mb-1 block">
												Contact Number
											</label>
											<input
												type="number"
												className={
													errors.user_contact
														? '!py-3 !px-4  w-full  lg:px-0 border border-mediumGray bg-lightGray outline-none focus:outline-none  text-black transition-all  !border-red focus:border-red'
														: '!py-3 !px-4  w-full lg:px-0 border border-mediumGray bg-lightGray outline-none focus:outline-none focus:border-green text-black transition-all !border-mediumGray '
												}
												placeholder="Contact Number"
												name="user_contact"
												{...register('user_contact', {
													required: 'Contact Number is Required.',
													pattern: {
														value: /^(([0-9]{11,11}))$/,
														message: 'Contact Number Must be 11 Digit',
													},
												})}
												id="contact"
											/>
											<p className="text-red pt-1 text-left text-sm">
												{errors.user_contact?.message}
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
									Register
								</button>
							</form>
							<div className="py-5 text-center border-t border-nav    flex justify-between px-6">
								<Link
									to="login"
									className="font-semibold text-blue text-sm hover:underline ">
									I have an account?
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Register;
