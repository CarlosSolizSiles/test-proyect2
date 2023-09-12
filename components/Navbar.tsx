import { IoMenuOutline } from "react-icons/io5";
import Search from "./Search";
import Notifications from "./Notifications";
import UserIcon from "./UserIcon";
import Link from "next/link";

const Navbar = () => {
    return (
        <header className="w-full h-14 bg-amber-500 fixed top-0 left-0 shadow-xl z-10 p-2 flex gap-2 text-white">
            <nav className="w-10 h-10">
                <input type="checkbox" id="draft" className="hidden" />
                <label
                    htmlFor="draft"
                    className="w-10 h-10 p-2 hover:bg-amber-400 transition ease-in-out duration-500 lg:hidden block"
                >
                    <IoMenuOutline className="w-full h-full"></IoMenuOutline>
                </label>
            </nav>
            <nav>
                <Link
                    href="/"
                    className="flex items-center h-10 font-bold text-lg"
                    replace={false}
                >
                    <h1>Book-Time SI</h1>
                </Link>
            </nav>
            <nav className="h-full mr-auto grid place-items-center flex-1">
                <div className="max-sm:ml-auto">
                    <Search />
                </div>
            </nav>
            <nav>
                <div className="flex gap-2 sm:ml-[60px]">
                    <Notifications />
                    <UserIcon />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
