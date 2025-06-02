import { Footer } from "@/Components/Footer/Footer";
import { Navbar } from "@/Components/Navbar/Navbar";
import { Toaster } from "sonner";
import { usePage } from "@inertiajs/react";

import { HouseSidebar } from "@/Components/Sidebar/HouseSidebar";

export default function HouseLayout({ children }) {
    const { house } = usePage().props;
    return (
        <div className="dark:bg-gray-900 min-h-screen w-screen max-w-screen overflow-x-hidden">
            <Navbar />
            <Toaster />
            <div className="flex">
                <HouseSidebar house={house} />
                <div className="w-full">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
