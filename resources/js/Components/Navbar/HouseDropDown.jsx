import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";

export function HouseDropDown({ triggerText, houses }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span>{triggerText}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    {houses.map((house, index) => (
                        <DropdownMenuItem key={index}>
                            <Link href={route("house.show", house.slug)}>
                                {house.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
