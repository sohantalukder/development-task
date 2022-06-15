import { AiOutlineCreditCard } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs';
import { GiReceiveMoney } from 'react-icons/gi';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { MdOutlineCancel } from 'react-icons/md';
import { NavLink, useRouteMatch } from 'react-router-dom';
import useCart from '../../../../CustomHooks/useCart';
import useProducts from '../../../../CustomHooks/useProducts';
const Payment = (props) => {
	const [products, setProducts] = useProducts();

	const [carts, setCarts] = useCart(products);
	let total = 0;
	let quantity = 0;
	for (const product of carts) {
		quantity = quantity + product.quantity;
		total = total + product.price * product.quantity;
	}
	const tax = parseFloat((total * 0.1).toFixed(2));
	const shipping = parseFloat((total * 0.01).toFixed(2));
	const discount = parseFloat((total * 0.05).toFixed(2));
	const grandTotal = total + shipping + tax - discount;
	let { path, url } = useRouteMatch();
	return (
		<div className="p-8">
			<div className="px-8 py-4 flex justify-between items-center border border-darkGray rounded-sm">
				<h2 className="md:text-2xl text-xl text-darkGray">Order Amount</h2>
				<h2 className="md:text-2xl text-xl text-darkGray font-semibold">
					$ {grandTotal}
				</h2>
			</div>
			<div className="w-full flex flex-col md:flex-row border border-darkGray mt-2 rounded-sm items-start">
				<div className="flex flex-col justify-center  flex-nowrap min-w-[200px] ">
					<NavLink
						to="cash"
						className="flex space-x-2 text-darkGray items-center px-8 py-2 hover:bg-lightBlue hover:!text-blue"
						activeClassName="bg-lightBlue !text-blue">
						<HiOutlineCurrencyDollar className="text-xl" />
						<span className="text-lg">Cash</span>
					</NavLink>
					<NavLink
						to="cash"
						className="flex space-x-2 text-darkGray items-center px-8 py-2 hover:bg-lightBlue hover:!text-blue">
						<BsCreditCard className="text-xl" />
						<span className="text-lg">Card</span>
					</NavLink>
					<NavLink
						to="cash"
						activeClassName="bg-lightBlue !text-blue"
						className="flex space-x-2 text-darkGray items-center px-8 py-2 hover:bg-lightBlue hover:!text-blue flex-nowrap">
						<BiUser className="text-xl" />
						<span className="text-lg">On Account</span>
					</NavLink>
					<NavLink
						to="cash"
						activeClassName="bg-lightBlue !text-blue"
						className="flex space-x-2 text-darkGray items-center px-8 py-2 hover:bg-lightBlue hover:!text-blue">
						<AiOutlineCreditCard className="text-xl" />
						<span className="text-lg">Checque</span>
					</NavLink>
				</div>
				<div className="px-6 py-4 w-full border-t md:border-l border-darkGray">
					<form action="" className="space-y-4">
						<input
							type="text"
							name=""
							id=""
							className="focus:outline-none border-b border-darkGray w-full  "
							placeholder="Card Name"
						/>
						<input
							type="number"
							name=""
							id=""
							className="focus:outline-none border-b border-darkGray w-full  "
							placeholder="Card Number"
						/>
						<input
							type="number"
							name=""
							id=""
							className="focus:outline-none border-b border-darkGray w-full  "
							placeholder="Card Expire Date"
						/>
						<input
							type="text"
							name=""
							id=""
							className="focus:outline-none border-b border-darkGray w-full  "
							placeholder="Card Secret"
						/>
					</form>
					<div className="flex space-x-4 mt-8">
						<button
							className="flex space-x-1 px-4 py-2 bg-[#FADEDD] text-red rounded-sm items-center"
							onClick={() => props.setOpenPayments(true)}>
							<MdOutlineCancel />
							<span>Cancel</span>
						</button>
						<button className="flex space-x-1 px-4 py-2 bg-blue text-white rounded-sm items-center">
							<GiReceiveMoney /> <span>Complete Payment</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
