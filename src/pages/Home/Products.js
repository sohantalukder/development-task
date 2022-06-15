import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsUpcScan } from 'react-icons/bs';
import Product from '../../Components/Product';
const Products = (props) => {
	const products = props.products;
	const [category, setCategory] = useState(['']);
	const [search, setSearch] = useState('');

	// console.log(products);
	useEffect(() => {
		const allCategories = [];
		// console.log(allCategories);
		products.map((product) => {
			if (!category.includes(product.category)) {
				// console.log(product.category);
				allCategories.push(product.category);
				setCategory(allCategories);
			}
		});
	}, [products]);

	const handleChange = (event) => {
		setSearch(event.target.value);
	};
	// Handle Search

	return (
		<div>
			{/* Search Bar */}
			<div className="shadow-md px-6 py-3 ">
				<form className="flex items-center justify-between space-x-3">
					<BiSearch className="text-darkGray text-2xl" />
					<input
						type="text"
						placeholder="Search Using Products Name"
						className="w-full focus:outline-none"
						onChange={handleChange}
					/>
					<BsUpcScan className="text-darkGray text-2xl" />
				</form>
			</div>
			{/* Category */}
			<div className="flex items-center justify-between my-3 ">
				<div className="flex space-x-4 items-center">
					<button
						title="All Products"
						className="rounded-md border-2 border-blue text-blue px-2 py-1 font-semibold">
						All Products
					</button>
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
						{products ? (
							category.slice(0, 5).map((item) => (
								<button
									title={item}
									className="rounded-md border-2 border-darkGray text-darkGray px-2 py-1 font-semibold">
									{item}
								</button>
							))
						) : (
							<button></button>
						)}
					</div>
					<button className="space-y-1 flex flex-col">
						<span className="p-1 bg-darkGray rounded-full"></span>
						<span className="p-1 bg-darkGray rounded-full"></span>
						<span className="p-1 bg-darkGray rounded-full"></span>
					</button>
				</div>
			</div>
			<div className="my-3 grid grid-cols-2 md:grid-cols-5 lg:gris-cols-5 gap-6">
				{products.map((product) => (
					<Product
						key={product.id}
						product={product}
						handleAddToCart={props.handleAddToCart}
					/>
				))}
			</div>
		</div>
	);
};

export default Products;
