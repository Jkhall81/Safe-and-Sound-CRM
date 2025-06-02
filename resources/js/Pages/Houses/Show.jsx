import HouseLayout from "@/Layouts/HouseLayout";
import { usePage } from "@inertiajs/react";
import { HouseResidentTable } from "@/Components/House/HouseResidentTable";

export default function Show() {
    const {
        house,
        totalRooms,
        totalWeeklyPriceAllRooms,
        totalActiveResidents,
        totalWeeklyPriceOccupiedRooms,
    } = usePage().props;
    console.log("house", house);
    console.log(totalRooms);

    return (
        <HouseLayout>
            <main className="min-h-screen">
                <h1 className="text-center text-3xl mt-10">{house.name}</h1>
                <div className="w-full h-[30vh] flex justify-between p-8">
                    {/* House Manager Info */}
                    <div className="bg-gray-800 h-full w-[42vw] rounded-2xl flex flex-col items-center justify-center">
                        <div>
                            <h3 className="text-3xl">House Manager Info</h3>
                            <div className="">
                                <p>
                                    {house.manager.first_name}{" "}
                                    {house.manager.last_name}
                                </p>
                                <p>{house.manager.phone_number}</p>
                                <p>{house.manager.email}</p>
                            </div>
                        </div>
                    </div>
                    {/* House Stats */}
                    <div className="bg-gray-800 h-full w-[42vw] rounded-2xl ml-6 flex flex-col items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-3xl mb-4">House Stats</h3>
                            <p className="text-lg">
                                <strong>Total Capacity:</strong> {totalRooms}
                            </p>
                            <p className="text-lg">
                                <strong>Total Weekly Potential Revenue:</strong>{" "}
                                ${totalWeeklyPriceAllRooms.toFixed(2)}
                            </p>
                            <p className="text-lg">
                                <strong>Active Residents:</strong>{" "}
                                {totalActiveResidents}
                            </p>
                            <p className="text-lg">
                                <strong>Revenue from Occupied Rooms:</strong> $
                                {totalWeeklyPriceOccupiedRooms.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
                <HouseResidentTable house={house} />
            </main>
        </HouseLayout>
    );
}
