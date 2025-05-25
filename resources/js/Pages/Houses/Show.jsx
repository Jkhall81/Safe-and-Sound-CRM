import HouseLayout from "@/Layouts/HouseLayout";
import { usePage } from "@inertiajs/react";
import { HouseResidentTable } from "@/Components/House/HouseResidentTable";

export default function Show() {
    const { house } = usePage().props;
    return (
        <HouseLayout>
            <main className="min-h-screen">
                <h1 className="text-center text-3xl mt-10">{house.name}</h1>
                <HouseResidentTable house={house} />
            </main>
        </HouseLayout>
    );
}
