import { HiX } from 'react-icons/hi';
import { MdLocationPin } from 'react-icons/md';
import {
	RiDashboardLine,
	RiMoneyDollarBoxLine,
	RiSettings5Line,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import useAuth from '../CustomHooks/useAuth';
const SideNavbar = (props) => {
	const { logout } = useAuth();
	const logOut = () => {
		logout();
	};
	return (
		<div className="w-full absolute left-0">
			<div
				className={` bg-dark-purple h-screen    duration-300 max-w-[80%] w-72 md:w-96 z-20 bg-white fixed`}>
				<div className="bg-[#EFEFEF] pt-8 px-6">
					<h1 className="text-black text-center font-bold text-2xl tracking-wide pb-6">
						go<span className="text-green ">B</span>illing
					</h1>
					<p>Location:</p>
					<h3 className="text-xl font-semibold  pb-4">
						Los Angeles, California
					</h3>
				</div>
				<ul className=" ">
					<li>
						<NavLink
							to="/dashboard"
							className="flex   rounded-md  px-6 cursor-pointer hover:bg-[#EEF0F9] text-blue text-lg text-semibold items-center gap-x-4 py-4 focus:bg-[#eef0f9]">
							<RiDashboardLine />
							<span className={` origin-left duration-200`}>Dashboard</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard"
							className="flex   rounded-md  px-6 cursor-pointer hover:bg-[#EEF0F9] text-blue text-lg text-semibold items-center gap-x-4 py-4 focus:bg-[#eef0f9]">
							<MdLocationPin />
							<span className={`origin-left duration-200`}>Locations</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard"
							className="flex   rounded-md  px-6 cursor-pointer hover:bg-[#EEF0F9] text-blue text-lg text-semibold items-center gap-x-4 py-4 focus:bg-[#eef0f9]">
							<RiMoneyDollarBoxLine />
							<span className={` origin-left duration-200`}>POS Invoice</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard"
							className="flex   rounded-md  px-6 cursor-pointer hover:bg-[#EEF0F9] text-blue text-lg text-semibold items-center gap-x-4 py-4 focus:bg-[#eef0f9]">
							<RiSettings5Line />
							<span className={` origin-left duration-200`}>Setting</span>
						</NavLink>
					</li>
				</ul>
				<div className="absolute bottom-6      w-full">
					<button
						className="py-2 border border-darkGray text-center rounded-md font-semibold   w-[85%] "
						onClick={logOut}>
						Logout
					</button>
				</div>
				<button
					className="absolute -right-12 top-4"
					onClick={() => props.setOpenSidebar(false)}>
					<HiX className="text-white text-3xl" />
				</button>
			</div>

			<div
				onClick={() => props.setOpenSidebar(false)}
				className="h-screen flex-1 p-7 bg-[#BCBFC2] opacity-80 w-full z-10 fixed left-0 bottom-0"></div>
		</div>
	);
};

export default SideNavbar;
