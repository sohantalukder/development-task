import { useEffect, useState } from 'react';
import { getStoredCart } from '../utilities/fakedb';

const useCart = (products) => {
	const [cart, setCart] = useState([]);
	// console.log(cart);
	useEffect(() => {
		const storedCart = getStoredCart();
		// console.log(storedCart);
		const savedCart = [];
		for (const id in storedCart) {
			// console.log(id);
			let addedProduct = products.find((product) => product.id == id);
			console.log(addedProduct);
			if (addedProduct) {
				const quantity = storedCart[id];
				addedProduct.quantity = quantity;
				savedCart.push(addedProduct);
			}
		}
		setCart(savedCart);
	}, [products]);

	return [cart, setCart];
};

export default useCart;
