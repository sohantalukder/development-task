import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsUpcScan } from 'react-icons/bs';
import Product from '../../Components/Product';
const Products = (props) => {
	const products = props.products;
	const [category, setCategory] = useState(['']);
	const [search, setSearch] = useState('');
	const [categoryTerm, setCategoryTerm] = useState('');
	const newCategory = [...new Set(category)];

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
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
					<BsUpcScan className="text-darkGray text-2xl" />
				</form>
			</div>
			{/* Category */}
			<div className="flex space-x-4 items-center my-3 justify-between flex-wrap lg:flex-nowrap mx-3 gap-5">
				<button
					title="All Products"
					className="rounded-md border-2 border-blue text-blue px-2 py-1 font-semibold"
					onClick={(e) => {
						setCategoryTerm('');
					}}>
					All Products
				</button>
				{products ? (
					newCategory.slice(0, 5).map((item) => (
						<button
							title={item}
							onClick={(e) => {
								setCategoryTerm(item);
							}}
							className="rounded-md border-2 border-darkGray text-darkGray px-2 py-1 font-semibold">
							{item}
						</button>
					))
				) : (
					<button></button>
				)}
				<button className="space-y-1 flex-col hidden md:flex">
					<span className="p-0.5 bg-darkGray rounded-full"></span>
					<span className="p-0.5 bg-darkGray rounded-full"></span>
					<span className="p-0.5 bg-darkGray rounded-full"></span>
				</button>
			</div>
			<div className="my-3 grid grid-cols-2 md:grid-cols-5 lg:gris-cols-5 gap-6  px-4 xl:px-0">
				{products
					.filter((val) => {
						if (search == '') {
							if (categoryTerm == '') {
								return val;
							} else if (
								val.category.toLowerCase().includes(categoryTerm.toLowerCase())
							) {
								return val;
							}
						} else if (val.name.toLowerCase().includes(search.toLowerCase())) {
							if (categoryTerm == '') {
								return val;
							} else if (
								val.category.toLowerCase().includes(categoryTerm.toLowerCase())
							) {
								return val;
							}
						}
					})
					.map((product) => (
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
