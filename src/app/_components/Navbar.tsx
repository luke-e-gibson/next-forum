import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-indigo-500 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <span className="text-xl font-semibold tracking-tight">Forum</span>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/"
            className="mr-4 mt-4 block text-white hover:text-indigo-200 lg:mt-0 lg:inline-block"
          >
            Home
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <button className="mt-4 inline-block rounded border transition border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-indigo-500 lg:mt-0">
            Register
          </button>
          <button className="mt-4 inline-block rounded border transition border-white bg-white px-4 py-2 text-sm leading-none text-indigo-500 hover:border-white hover:bg-indigo-500 hover:text-white lg:mt-0">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
