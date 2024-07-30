import { Link } from "@tanstack/react-router";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav className="bg-[#1C1C1C] fixed top-0 left-0 right-0 z-10 mb-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0">
              <img className="w-12 h-12" src="/logo.png" alt="Logo" />
            </div>

            <div className="flex-1 text-center">
              <h1 className="m-auto text-4xl font-extrabold tracking-tight text-white scroll-m-20 lg:text-5xl">
                <Link to="/">Help Desk</Link>
              </h1>
            </div>

            <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-[#eee] hover:text-black [&.active]:font-extrabold"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-[#eee] hover:text-black [&.active]:font-extrabold"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
