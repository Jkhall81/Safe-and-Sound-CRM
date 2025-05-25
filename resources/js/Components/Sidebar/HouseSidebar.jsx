// Menu items.
const items = [
    {
        title: "Intake Form",
        url: "#",
    },
    {
        title: "UA Tests",
        url: "#",
    },
    {
        title: "Program Fee Tracker",
        url: "#",
    },
    {
        title: "Evac Drill",
        url: "#",
    },
    {
        title: "Grievance Form",
        url: "#",
    },
    {
        title: "GEO/COC Form",
        url: "#",
    },
    {
        title: "Maintenance Form",
        url: "#",
    },
];

export function HouseSidebar() {
    return (
        <aside className="w-[200px] rounded-tr-3xl bg-gray-800 pt-[200px] px-4 flex justify-center">
            <div className="flex flex-col space-y-4">
                {items.map((item, index) => (
                    <a key={index} href={item.url}>
                        <span>{item.title}</span>
                    </a>
                ))}
            </div>
        </aside>
    );
}
