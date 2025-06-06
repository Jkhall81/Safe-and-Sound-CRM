import { usePage, Link } from "@inertiajs/react";
import { HouseDropDown } from "./HouseDropDown";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const { user } = usePage().props.auth;
    const { houses } = usePage().props;
    const { url } = usePage();

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img src="/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Safe & Sound
                    </span>
                </Link>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-dropdown"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                href="/"
                                className={cn(
                                    url === "/"
                                        ? "bg-blue-700 md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 block py-2 px-3 text-white rounded-sm md:bg-transparent  md:p-0 md:dark:bg-transparent"
                                        : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                )}
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    aria-current="page"
                                >
                                    Logout
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className={cn(
                                        url === "/login"
                                            ? "bg-blue-700 md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 block py-2 px-3 text-white rounded-sm md:bg-transparent  md:p-0 md:dark:bg-transparent"
                                            : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    )}
                                    aria-current="page"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                        {user && (
                            <>
                                <li>
                                    <Link
                                        href="#"
                                        className={cn(
                                            url.startsWith("/house/")
                                                ? "bg-blue-700 md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 block py-2 px-3 text-white rounded-sm md:bg-transparent  md:p-0 md:dark:bg-transparent"
                                                : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        )}
                                    >
                                        {user.role === "tech" || "admin" ? (
                                            <HouseDropDown
                                                triggerText="Houses"
                                                houses={houses}
                                            />
                                        ) : (
                                            "House"
                                        )}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
