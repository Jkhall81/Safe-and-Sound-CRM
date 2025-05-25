import { Footer } from "@/Components/Footer/Footer";
import { Navbar } from "@/Components/Navbar/Navbar";

import { HouseSidebar } from "@/Components/Sidebar/HouseSidebar";

export default function HouseLayout({ children }) {
    return (
        <div className="dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className="flex">
                <HouseSidebar />
                <div className="w-full">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
