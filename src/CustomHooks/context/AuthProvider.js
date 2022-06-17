import { createContext } from 'react';
import useFirebase from '../useFirebase';

export const AuthContext = createContext(null);
export const AuthAdminContext = createContext(null);
const AuthProvider = ({ children }) => {
	const allContexts = useFirebase();
	// const adminContext = useAdmin();
	return (
		<div>
			<AuthContext.Provider value={allContexts}>
				{children}
			</AuthContext.Provider>
		</div>
	);
};

export default AuthProvider;
