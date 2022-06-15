import { FaRegHandRock, FaShippingFast } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { IoIosMenu, IoMdContact } from 'react-icons/io';
import {
	MdOutlineAddCircle,
	MdOutlineCancel,
	MdOutlineLocalOffer,
} from 'react-icons/md';
import { RiEditBoxLine } from 'react-icons/ri';
import { TbWorldUpload } from 'react-icons/tb';
import CartItem from '../../../Components/CartItem';
import useAuth from '../../../CustomHooks/useAuth';
import useCart from '../../../CustomHooks/useCart';
import useProducts from '../../../CustomHooks/useProducts';
import { removeFromDb } from '../../../utilities/fakedb';
const Shop = (props) => {
	const { user } = useAuth();
	const [products, setProducts] = useProducts();
	const { cart } = props;
	const [carts, setCarts] = useCart(products);
	let total = 0;
	let quantity = 0;
	for (const product of cart) {
		quantity = quantity + product.quantity;
		total = total + product.price * product.quantity;
	}
	const tax = parseFloat((total * 0.1).toFixed(2));
	const shipping = parseFloat((total * 0.01).toFixed(2));
	const discount = parseFloat((total * 0.05).toFixed(2));
	const grandTotal = total + shipping + tax - discount;
	// Remove Product
	const handleRemoveProduct = (product) => {
		// console.log(product);
		let text = 'Are you want to remove this product?';
		if (window.confirm(text) == true) {
			const rest = carts.filter((pd) => pd.id !== product.id);
			setCarts(rest);
			removeFromDb(product.id);
		} else {
			setCarts(product);
		}
	};

	return (
		<div className="">
			{/* Top Bar */}
			<div className="flex justify-between items-center">
				{/* Menu Button */}
				<div>
					<button onClick={() => props.setOpenSidebar(true)}>
						<IoIosMenu className="text-4xl" />
					</button>
				</div>

				{/* Other Link */}
				<div className="space-x-4 flex">
					<button className="space-x-2 py-1 px-2 bg-gray rounder-md text-blue md:flex items-center hidden">
						<RiEditBoxLine /> <span>Note</span>
					</button>
					<button className="space-x-2 py-1 px-2 bg-gray rounder-md text-blue md:flex items-center hidden">
						<FaShippingFast /> <span>Shipping</span>
					</button>
					<button className="space-x-2 py-1 px-2 bg-gray rounder-md text-blue md:flex items-center hidden">
						<TbWorldUpload /> <span>Hold Orders</span>
					</button>
					<button className="space-x-2 py-1 px-2 bg-gray rounder-md text-blue flex items-center">
						<MdOutlineAddCircle /> <span>New Item</span>
					</button>
				</div>
			</div>
			{/* Middle bar */}
			<div className="flex justify-between items-center px-4 py-2 bg-lightBlue text-blue mt-2">
				{/* Profile */}
				<div className="flex items-center space-x-2">
					<IoMdContact className="text-xl" />
					<span className="font-medium">{user.displayName}</span>
				</div>
				{/* Add New Customer */}
				<button>
					<MdOutlineAddCircle
						onClick={() => props.setShowModal(true)}
						title="Add New Customer"
						className="text-xl"
					/>
				</button>
			</div>
			<div className="py-2">
				{cart.map((shoppingItem) => (
					<CartItem
						key={shoppingItem.id}
						shoppingItem={shoppingItem}
						handleRemoveProduct={handleRemoveProduct}
					/>
				))}
				{/* <CartItem /> */}
			</div>
			{/* Total Item Bill */}
			<div className="float-right min-w-[250px] mt-12 mb-3">
				<p className="border-t border-b border-[#C9CED3] py-2.5 flex justify-between">
					<span className="text-darkGray">Sub Total</span>
					<span className="font-medium">${total}</span>
				</p>
				<p className="border-t border-b border-[#C9CED3] py-2.5 flex justify-between">
					<span className="text-darkGray">TAX</span>
					<span className="font-medium">${tax}</span>
				</p>
				<p className="border-t border-b border-[#C9CED3] py-2.5 flex justify-between">
					<span className="text-darkGray">Shipping</span>
					<span className="font-medium">${shipping}</span>
				</p>
				<p className="border-t border-b border-[#C9CED3] py-2.5 flex justify-between">
					<span className="text-blue font-semibold">Discount on Cart</span>
					<span className="font-medium">${discount}</span>
				</p>
			</div>
			<div className="bg-lightBlue rounded-md py-5 px-3 text-blue w-full  flex items-center justify-between">
				<p className="hidden sm:block">Products Count {quantity}</p>
				<h1 className="md:w-[250px] w-full text-2xl flex justify-between">
					<span>Total</span>
					<span>${grandTotal}</span>
					{props.children}
				</h1>
			</div>
			{/* All buttons */}
			<div className="flex justify-between my-2">
				{/* Cancel Button */}
				<button className="hidden lg:flex items-center text-lg md:text-2xl font-medium text-red rounded-md px-4 py-2   space-x-2 bg-[#FADEDD]">
					<MdOutlineCancel className="text-xl lg:text-3xl" />
					<span>Cancel</span>
				</button>
				<button className="hidden lg:flex  items-center text-lg md:text-2xl font-medium text-blue rounded-md px-4 py-2   space-x-2 bg-[#DEE1F3]">
					<FaRegHandRock className="text-xl lg:text-3xl" />
					<span>Hold</span>
				</button>
				<button className="flex items-center text-lg md:text-2xl font-medium text-blue rounded-md px-4 py-2  space-x-2 bg-[#DEE1F3]">
					<MdOutlineLocalOffer className="text-xl lg:text-3xl" />
					<span>Discount</span>
				</button>
				<button
					title="Pay Now"
					className="flex items-center text-lg md:text-2xl font-medium text-blue rounded-md px-4 py-2  space-x-2 bg-[#DEE1F3]"
					onClick={() => props.setTotalPayment(grandTotal)}
					onClick={() => props.setOpenPayments(false)}>
					<GiReceiveMoney className="text-xl lg:text-3xl" />
					<span>Pay Now</span>
				</button>
			</div>
		</div>
	);
};

export default Shop;
