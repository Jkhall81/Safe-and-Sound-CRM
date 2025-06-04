import { Link, usePage } from "@inertiajs/react";
import { FaWpforms, FaMoneyCheckAlt, FaTools } from "react-icons/fa";
import { MdOutlineScience, MdOutlineReportProblem } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { GiFireExtinguisher } from "react-icons/gi";

import { cn } from "@/lib/utils";
// Menu items.

export function HouseSidebar({ house }) {
    if (!house) return null;
    const { url } = usePage();

    const items = [
        {
            title: "Intake Form",
            href: route("intake.show", house.slug),
            icon: FaWpforms,
        },
        {
            title: "UA Tests",
            href: route("ua.show", house.slug),
            icon: MdOutlineScience,
        },
        {
            title: "Program Fee Tracker",
            href: route("program-fee.show", house.slug),
            icon: FaMoneyCheckAlt,
        },
        {
            title: "Evac Drill",
            href: route("evac.show", house.slug),
            icon: GiFireExtinguisher,
        },
        {
            title: "Grievance Form",
            href: route("grievance.show", house.slug),
            icon: MdOutlineReportProblem,
        },
        {
            title: "GEO/COC Form",
            href: route("geo-coc.show", house.slug),
            icon: HiOutlineDocumentText,
        },
        {
            title: "Maintenance Form",
            href: route("maintenance.show", house.slug),
            icon: FaTools,
        },
    ];
    return (
        <aside className="min-w-[230px] mt-[106px] rounded-tr-3xl bg-gray-800 pt-[200px] px-4 flex justify-center">
            <div className="flex flex-col space-y-4">
                {items.map((item, index) => {
                    const isActive =
                        item.href !== "#" &&
                        url ===
                            new URL(item.href, window.location.origin).pathname;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={index}
                            className={cn(
                                "hover:text-blue-700 flex",
                                isActive ? "text-blue-700" : ""
                            )}
                            href={item.href}
                        >
                            <Icon className="mr-2 w-5 h-5" />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
