import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Forum</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:text-indigo-200">
                        Home
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0">
                        Register
                    </button>
                    <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-indigo-500 bg-white border-white hover:border-white hover:bg-indigo-500 hover:text-white mt-4 lg:mt-0">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );  
}