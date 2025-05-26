import { usePage, useForm, router } from "@inertiajs/react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";
import { MyDatePicker } from "@/Components/UaTests/MyDatePicker";

export default function Show() {
    const { house } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        resident_id: "",
        test_date: "",
        result: "",
        notes: "",
    });
    console.log(house);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("room.resident.update", room.id), {
            onSuccess: () => {
                console.log("Toast is being triggered");
                toast.success("Resident Information Updated Successfully!");

                setTimeout(() => {
                    router.visit(route("house.show", houseSlug));
                }, 2000);
            },
        });
    };

    return (
        <HouseLayout>
            <form
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto min-h-[80vh]"
            >
                {/* Resident Name */}
                <div className="mb-5">
                    <label
                        htmlFor="resident_id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Resident Name
                    </label>
                    <select
                        type="text"
                        id="resident_id"
                        name="resident_id"
                        value={data.resident_id}
                        onChange={(e) => setData("resident_id", e.target.value)}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Select a resident</option>
                        {house.residents.map((resident, index) => (
                            <option
                                key={`${resident.id}-${index}`}
                                value={resident.id}
                            >
                                {resident.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Resident Phone */}
                <div className="mb-5">
                    <label
                        htmlFor="resident_phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Test Date
                    </label>
                    <MyDatePicker />
                </div>

                {/* Resident Email */}
                <div className="mb-5">
                    <label
                        htmlFor="resident_email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Test Results
                    </label>
                    <select
                        type="email"
                        id="resident_email"
                        name="resident_email"
                        required
                        value=""
                        onChange={(e) =>
                            setData("resident_email", e.target.value)
                        }
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option>Pass</option>
                        <option>Fail</option>
                    </select>
                </div>

                {/* Weekly Price - read-only */}
                <div className="mb-5">
                    <label
                        htmlFor="room_price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Notes
                    </label>
                    <textarea
                        type="text"
                        id="room_price"
                        value=""
                        rows="8"
                        disabled
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white cursor-not-allowed"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="text-white w-[176px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                >
                    {processing ? "Submitting..." : "Submit"}
                </button>
                <button
                    type="button"
                    onClick={() => router.visit(route("house.show", houseSlug))}
                    className="text-white w-[176px] ml-8 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:opacity-50"
                >
                    Go Back
                </button>
            </form>
        </HouseLayout>
    );
}
