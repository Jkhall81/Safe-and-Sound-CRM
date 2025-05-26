import { Link } from "@inertiajs/react";
// Menu items.

export function HouseSidebar({ house }) {
    const items = [
        {
            title: "Intake Form",
            href: "#",
        },
        {
            title: "UA Tests",
            href: route("ua.show", house.slug),
        },
        {
            title: "Program Fee Tracker",
            href: "#",
        },
        {
            title: "Evac Drill",
            href: "#",
        },
        {
            title: "Grievance Form",
            href: "#",
        },
        {
            title: "GEO/COC Form",
            href: "#",
        },
        {
            title: "Maintenance Form",
            href: "#",
        },
    ];
    return (
        <aside className="w-[200px] rounded-tr-3xl bg-gray-800 pt-[200px] px-4 flex justify-center">
            <div className="flex flex-col space-y-4">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        className="hover:text-blue-700"
                        href={item.href}
                    >
                        <span>{item.title}</span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
