import { useEffect, useState } from 'react';
import AddCustomerModal from '../../Components/AddCustomerModal';
import SideNavbar from '../../Components/SideNavbar';
import useProducts from '../../CustomHooks/useProducts';
import { addToDb, getStoredCart, removeFromDb } from '../../utilities/fakedb';
import Products from './Products';
import Payment from './ShopItems/Payment/Payment';
import Shop from './ShopItems/Shop';

const Dashboard = () => {
	const [showModal, setShowModal] = useState(false);
	const [openSidebar, setOpenSidebar] = useState(false);
	const [products, setProducts] = useProducts();
	const [cart, setCart] = useState([]);
	const [openPayments, setOpenPayments] = useState(true);
	const [totalPayment, setTotalPayment] = useState(0);

	// console.log(cart);
	useEffect(() => {
		const storedCart = getStoredCart();
		const savedCart = [];
		for (const id in storedCart) {
			const addedProduct = products.find((product) => product.id == id);
			if (addedProduct) {
				const quantity = storedCart[id];
				addedProduct.quantity = quantity;
				savedCart.push(addedProduct);
			}
		}

		setCart(savedCart);
	}, [products]);

	const handleAddToCart = (selectedProduct) => {
		// console.log(selectedProduct);
		let newCart = [];
		const exists = cart.find((product) => product.id === selectedProduct.id);
		if (!exists) {
			selectedProduct.quantity = 1;
			newCart = [...cart, selectedProduct];
		} else {
			const rest = cart.filter((product) => product.id !== selectedProduct.id);
			exists.quantity = exists.quantity + 1;
			newCart = [...rest, exists];
		}

		setCart(newCart);
		addToDb(selectedProduct.id);
	};
	// Remove Product
	const handleRemoveProduct = (product) => {
		// console.log(product);
		let text = 'Are you want to remove this product?';
		if (window.confirm(text) == true) {
			const rest = cart.filter((pd) => pd.id !== product.id);
			setCart(rest);
			removeFromDb(product.id);
		} else {
			setCart(product);
		}
	};
	const handleQuantityIncrease = (selectedProduct) => {
		let newCart = [];
		console.log(selectedProduct);
		const exists = cart.find((product) => product.id === selectedProduct);
		console.log(exists);
		// exists.quantity = exists.quantity;
		if (exists) {
			const rest = cart.filter((product) => product.id !== selectedProduct);
			console.log(rest);
			exists.quantity = exists.quantity + 1;
			newCart = [...rest, exists];
		}
		setCart(newCart);
		addToDb(selectedProduct);
	};
	const handleQuantityDecrease = (selectedProduct) => {
		let newDCart = [];
		// console.log(selectedProduct);
		const existsD = cart.find((product) => product.id === selectedProduct);
		// console.log(exists);
		// exists.quantity = exists.quantity;
		if (existsD) {
			if (existsD.quantity > 1) {
				const rest = cart.filter((product) => product.id !== selectedProduct);
				// console.log(rest);
				existsD.quantity = existsD.quantity - 1;
				newDCart = [...rest, existsD];
			} else {
				const rest = cart.filter((product) => product.id !== selectedProduct);
				// console.log(rest);
				existsD.quantity = 1;
				newDCart = [...rest, existsD];
			}
		}
		setCart(newDCart);
		addToDb(selectedProduct);
	};

	return (
		<div>
			{showModal ? (
				<AddCustomerModal className="w-full" setShowModal={setShowModal} />
			) : (
				<div></div>
			)}
			{openSidebar ? (
				<SideNavbar setOpenSidebar={setOpenSidebar} />
			) : (
				<div></div>
			)}
			<div className="flex w-full flex-col xl:flex-row py-2">
				<div className="px-4  w-full xl:w-1/2">
					<Shop
						cart={cart}
						setShowModal={setShowModal}
						setOpenSidebar={setOpenSidebar}
						setOpenPayments={setOpenPayments}
						setTotalPayment={setTotalPayment}
						handleRemoveProduct={handleRemoveProduct}
						handleQuantityIncrease={handleQuantityIncrease}
						handleQuantityDecrease={handleQuantityDecrease}
					/>
				</div>
				{/* Product Container & Payment Container */}
				{openPayments ? (
					<div className="w-full xl:w-1/2">
						<Products products={products} handleAddToCart={handleAddToCart} />
					</div>
				) : (
					<div className="w-full xl:w-1/2">
						<Payment
							totalPayment={totalPayment}
							setOpenPayments={setOpenPayments}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
