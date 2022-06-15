const Product = (props) => {
	const { name, price, id, image } = props.product;
	return (
		<button
			title="Add To Cart"
			className="border border-darkGray rounded-sm"
			onClick={() => props.handleAddToCart(props.product)}>
			<img src={image} alt="" className="h-[150px] w-full" />
			<div>
				<h3 className="text-xl text-center font-semibold text-darkGray bg-[#F4F6F8] border-b py-2 border-[#F4F6F8]">
					$ {price}
				</h3>
				<h4 className="text-sm text-center font-medium py-2 " title={name}>
					{name.slice(0, 15)}..
				</h4>
			</div>
		</button>
	);
};

export default Product;
