import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";
// Menu items.

export function HouseSidebar({ house }) {
    if (!house) return null;
    const { url } = usePage();

    const items = [
        {
            title: "Intake Form",
            href: route("intake.show", house.slug),
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
            href: route("evac.show", house.slug),
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
                {items.map((item, index) => {
                    const isActive =
                        item.href !== "#" &&
                        url ===
                            new URL(item.href, window.location.origin).pathname;
                    return (
                        <Link
                            key={index}
                            className={cn(
                                "hover:text-blue-700",
                                isActive ? "text-blue-700" : ""
                            )}
                            href={item.href}
                        >
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
