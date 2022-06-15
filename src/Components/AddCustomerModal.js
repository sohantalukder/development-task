import React from 'react';
import { IoIosAdd } from 'react-icons/io';
import { MdArrowBackIosNew, MdOutlineKeyboardArrowDown } from 'react-icons/md';
const AddCustomerModal = (props) => {
	return (
		<div className="w-full h-full">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !z-50">
				<div className="bg-white shadow-md px-8 py-4 w-[312px] md:w-[473px] ">
					<div className="flex items-center space-x-6">
						<button
							className="text-left"
							onClick={() => props.setShowModal(false)}>
							<MdArrowBackIosNew />
						</button>
						<p className="text-center">Add New Customer</p>
					</div>
					<form className="pt-8 w-full" action="">
						<ul className="space-y-4 w-full">
							<li className="w-full border-b border-nav">
								<input
									type="text"
									required
									placeholder="Name"
									className="focus:outline-none  w-full pb-1"
								/>
							</li>
							<li className="w-full border-b border-nav">
								<input
									type="email"
									required
									placeholder="Email"
									className="focus:outline-none  w-full pb-1"
								/>
							</li>
							<li className="w-full border-b border-nav">
								<input
									type="number"
									required
									placeholder="Phone"
									className="focus:outline-none  w-full pb-1"
								/>
							</li>
							<li className="w-full border-b border-nav flex justify-betweens items-center">
								<input
									type="text"
									required
									placeholder="Currency"
									className="focus:outline-none  w-full pb-1"
								/>
								<MdOutlineKeyboardArrowDown className="text-xl" />
							</li>
							<li className="w-full border-b border-nav">
								<input
									type="number"
									required
									placeholder="TAX ID"
									className="focus:outline-none  w-full pb-1"
								/>
							</li>
						</ul>
						<button className="pt-6 pb-8 space-x-2 text-blue flex items-center">
							<IoIosAdd className="text-xl" />
							<span>Add More Details</span>
						</button>
						<button
							type="submit"
							className="bg-blue text-white text-center rounded-sm mb-6 py-3 w-full ">
							Update
						</button>
					</form>
				</div>
			</div>
			<div
				className="bg-[#BCBFC2] w-full absolute top-0 left-0 h-full z-10 opacity-30"
				onClick={() => props.setShowModal(false)}></div>
		</div>
	);
};

export default AddCustomerModal;
