import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from './useAuth';

const LoginMiddleWare = ({ children, ...rest }) => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center mt-100">
				<div className="spinner"></div>
			</div>
		);
	}
	return (
		<Route
			{...rest}
			render={({ location }) =>
				user?.email ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
						}}></Redirect>
				)
			}
		/>
	);
};

export default LoginMiddleWare;
