import { Footer } from "@/Components/Footer/Footer";
import { Navbar } from "@/Components/Navbar/Navbar";

export default function MainLayout({ children }) {
    return (
        <div class="dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className="">{children}</div>
            <Footer />
        </div>
    );
}
