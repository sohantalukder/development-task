import { useState } from 'react';
import { AiFillMinusCircle } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { IoIosAddCircle } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useCart from '../CustomHooks/useCart';
import useProducts from '../CustomHooks/useProducts';
const CartItem = (props) => {
	const { id, name, quantity, price } = props.shoppingItem;
	const [products, setProducts] = useProducts();
	const [carts, setCarts] = useCart(products);
	let total = price * quantity;

	let [items, setItems] = useState(quantity);

	return (
		<div>
			<table className="table-auto w-full space-x-1 ">
				<thead></thead>
				<tbody>
					<tr>
						<td>
							<button>
								<BiEdit className="text-xl text-darkGray" />
							</button>
						</td>
						<td colSpan="5" className=" border border-[#C9CED3] p-2 w-full ">
							<table className="w-full table-auto">
								<tr>
									<td className="whitespace-nowrap text-left">
										<p>{name}</p>
									</td>
									<td className="whitespace-nowrap text-left">
										<p>${price}</p>
									</td>
									{/* Increasing product quantity */}
									<td className="whitespace-nowrap flex justify-center">
										{' '}
										<div className="flex items-center space-2 ">
											<button onClick={() => props.handleQuantityDecrease(id)}>
												<AiFillMinusCircle className="text-xl text-darkGray" />
											</button>
											<p className="px-2 text-darkGray">{quantity}</p>
											<button onClick={() => props.handleQuantityIncrease(id)}>
												<IoIosAddCircle className="text-xl text-darkGray" />
											</button>
										</div>
									</td>
									<td className="whitespace-nowrap text-right">
										{' '}
										<p>$ {total}</p>
									</td>
								</tr>
							</table>
						</td>
						<td>
							<button>
								<RiDeleteBin6Line
									className="text-xl text-red"
									onClick={() => props.handleRemoveProduct(props.shoppingItem)}
								/>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default CartItem;
