import {
	createUserWithEmailAndPassword,
	getAuth,
	getIdToken,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import initializeFirebase from '../firebase.config/firebase.init';

initializeFirebase();
const useFirebase = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});
	const [authError, setAuthError] = useState('');
	const [success, setSuccess] = useState(false);
	const [token, setToken] = useState('');
	const auth = getAuth();

	const registerUser = (name, email, contact, password, history, location) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setAuthError('');
				setSuccess(true);
				//send name to firebase after creation
				const newUser = { email, displayName: name };
				setUser(newUser);

				//send name to firebase after creation
				updateProfile(auth.currentUser, {
					displayName: name,
				})
					.then(() => {})
					.catch((error) => {
						setAuthError(error.message);
					});

				const destination = location?.state?.from || '/';
				history.replace(destination);
			})
			.then((error) => {
				// const errorCode = error.code;
				setAuthError(error);
				setSuccess(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const loginUser = (email, password, location, history) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setAuthError('');
				setSuccess(true);
				const destination = location?.state?.from || '/';
				history.replace(destination);
			})
			.catch((error) => {
				setSuccess(false);
				setAuthError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// observer user state
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				getIdToken(user).then((idToken) => {
					setToken(idToken);
				});
				// ...
			} else {
				setUser({});
			}
			setIsLoading(false);
		});
		return () => unsubscribe;
	}, [auth]);

	const logout = () => {
		setIsLoading(true);
		signOut(auth)
			.then(() => {
				setSuccess(true);
			})
			.catch((error) => {
				setAuthError(error);
			})
			.finally(() => {
				setIsLoading(false);
				setSuccess(false);
			});
	};

	return {
		user,

		registerUser,
		loginUser,
		token,
		authError,
		isLoading,

		logout,

		success,
	};
};
export default useFirebase;
