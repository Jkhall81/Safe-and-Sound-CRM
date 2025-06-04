import { usePage, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";
import { MyDatePicker } from "@/Components/UaTests/MyDatePicker";
import { TextArea } from "@/Components/Forms/TextArea";
import { TextInput } from "@/Components/Forms/TextInput";

export default function Show() {
    const { house } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        program_fee_date: "",
        program_fee_notes: "",
        amounts_collected: {},
    });

    const [programFeeDueError, setProgramFeeDueError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setProgramFeeDueError("");

        let formIsValid = true;

        if (!data.program_fee_date) {
            setProgramFeeDueError("Program Fee Date is required.");
            formIsValid = false;
        }

        if (!formIsValid) {
            return;
        }

        post(route("program-fee.store", house.slug), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Program Fee data uploaded successfully!");

                setTimeout(() => {
                    router.visit(route("house.show", house.slug));
                }, 2000);
            },
        });
    };

    const totalRooms = house.max_residents;

    const totalWeeklyPriceAllRooms = house.rooms.reduce((total, room) => {
        const price = parseFloat(room.weekly_price || 0);
        const capacity = room.capacity || 0;
        return total + price * capacity;
    }, 0);

    const totalActiveResidents = house.active_residents.length;

    const totalWeeklyPriceOccupiedRooms = house.active_residents.reduce(
        (total, resident) => {
            const roomPrice = parseFloat(resident.room?.weekly_price || 0);
            return total + roomPrice;
        },
        0
    );
    return (
        <HouseLayout>
            <h1 className="text-4xl text-center mt-6">
                {house.name} Program Fee Tracker
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 mb-10 rounded-2xl bg-gray-950 p-10 pt-[100px] w-[896px] space-y-8 min-h-[80vh]"
            >
                {/* Program Fee Date */}
                <div className="mb-5">
                    <label
                        htmlFor="program_fee_date"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                        Program Fee Due Date
                    </label>
                    <p className="text-sm mb-2">
                        Enter Program Fee Due Date (Friday due)
                    </p>
                    <MyDatePicker
                        className="w-[812px]"
                        value={data.program_fee_date}
                        onChange={(date) => setData("program_fee_date", date)}
                    />
                    {programFeeDueError && (
                        <p className="text-red-500 text-sm">
                            {programFeeDueError}
                        </p>
                    )}
                </div>

                {house.active_residents.map((resident, index) => {
                    return (
                        <div className="" key={`${resident.name}-${index}`}>
                            <div className="max-w-lg">
                                <div className="flex bg-gray-500 p-2">
                                    <span className="mr-2">Room Number:</span>
                                    <p>{resident.room_label}</p>
                                </div>
                                <div className="flex bg-gray-700 p-2">
                                    <span className="mr-5">Weekly Price:</span>
                                    <p>{resident.room.weekly_price}</p>
                                </div>
                                <div className="flex bg-gray-500 p-2 mb-2">
                                    <span className="mr-2">Resident Name:</span>
                                    <p className="text-neutral-900 font-semibold">
                                        {resident.name}
                                    </p>
                                </div>
                            </div>
                            <label className="p-2" htmlFor="">
                                Amount Collected
                            </label>
                            <TextInput
                                id={`amount=${resident.id}`}
                                type="number"
                                value={
                                    data.amounts_collected[resident.id] || ""
                                }
                                onChange={(e) =>
                                    setData("amounts_collected", {
                                        ...data.amounts_collected,
                                        [resident.id]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    );
                })}

                <div className="bg-gray-800 p-6 rounded-lg text-white space-y-2">
                    <p>
                        <span className="font-semibold">Total Rooms:</span>{" "}
                        {totalRooms}
                    </p>
                    <p>
                        <span className="font-semibold">
                            Total Weekly Price (All Rooms):
                        </span>{" "}
                        ${totalWeeklyPriceAllRooms.toFixed(2)}
                    </p>
                    <p>
                        <span className="font-semibold">Active Residents:</span>{" "}
                        {totalActiveResidents}
                    </p>
                    <p>
                        <span className="font-semibold">
                            Total Weekly Price (Occupied Rooms):
                        </span>{" "}
                        ${totalWeeklyPriceOccupiedRooms.toFixed(2)}
                    </p>
                </div>

                {/* Total Amount Collected */}
                <div className="bg-gray-900 p-6 rounded-lg text-white">
                    <p className="text-lg font-semibold mb-2">
                        Total Collected:
                    </p>
                    <p className="text-2xl">
                        $
                        {Object.values(data.amounts_collected)
                            .reduce((total, value) => {
                                const parsed = parseFloat(value);
                                return total + (isNaN(parsed) ? 0 : parsed);
                            }, 0)
                            .toFixed(2)}
                    </p>
                </div>

                {/* Notes ** */}
                <TextArea
                    id="program_fee_notes"
                    required
                    label="Notes"
                    value={data.program_fee_notes}
                    onChange={(e) =>
                        setData("program_fee_notes", e.target.value)
                    }
                />

                {/* Submit Button */}
                <div className="flex">
                    <button
                        type="submit"
                        disabled={processing}
                        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            router.visit(route("house.show", house.slug))
                        }
                        className="text-white w-full ml-8 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:opacity-50"
                    >
                        Go Back
                    </button>
                </div>
            </form>
        </HouseLayout>
    );
}
