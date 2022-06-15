import { useEffect, useState } from 'react';
import AddCustomerModal from '../../Components/AddCustomerModal';
import SideNavbar from '../../Components/SideNavbar';
import useProducts from '../../CustomHooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
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
	console.log(cart);
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
			<div className="flex w-full flex-col lg:flex-row py-2">
				<div className="px-4  w-full lg:w-1/2">
					<Shop
						cart={cart}
						setShowModal={setShowModal}
						setOpenSidebar={setOpenSidebar}
						setOpenPayments={setOpenPayments}
						setTotalPayment={setTotalPayment}
					/>
				</div>
				{/* Product Container & Payment Container */}
				{openPayments ? (
					<div className="w-full lg:w-1/2">
						<Products products={products} handleAddToCart={handleAddToCart} />
					</div>
				) : (
					<div className="w-full lg:w-1/2">
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
