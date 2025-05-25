import { usePage, useForm, router } from "@inertiajs/react";
import HouseLayout from "@/Layouts/HouseLayout";

export default function Show() {
    const { room, houseSlug } = usePage().props;
    const firstResident = room.residents?.[0];

    const { data, setData, post, processing, errors } = useForm({
        resident_name: firstResident?.name ?? "",
        resident_phone: firstResident?.phone_number ?? "",
        resident_email: firstResident?.email ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("room.resident.update", room.id), {
            onSuccess: () => {
                router.visit(route("house.show", houseSlug));
            },
        });
    };

    return (
        <HouseLayout>
            <form
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto min-h-[80vh]"
            >
                {/* Room Number - read-only */}
                <div className="mb-5">
                    <label
                        htmlFor="room_number"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Room Number
                    </label>
                    <input
                        type="text"
                        id="room_number"
                        value={room.room_number}
                        disabled
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white cursor-not-allowed"
                    />
                </div>

                {/* Resident Name */}
                <div className="mb-5">
                    <label
                        htmlFor="resident_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Resident Name
                    </label>
                    <input
                        type="text"
                        id="resident_name"
                        name="resident_name"
                        value={data.resident_name}
                        onChange={(e) =>
                            setData("resident_name", e.target.value)
                        }
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.resident_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.resident_name}
                        </p>
                    )}
                </div>

                {/* Resident Phone */}
                <div className="mb-5">
                    <label
                        htmlFor="resident_phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Resident Phone Number
                    </label>
                    <input
                        type="text"
                        id="resident_phone"
                        name="resident_phone"
                        value={data.resident_phone}
                        onChange={(e) =>
                            setData("resident_phone", e.target.value)
                        }
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.resident_phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.resident_phone}
                        </p>
                    )}
                </div>

                {/* Resident Email */}
                <div className="mb-5">
                    <label
                        htmlFor="resident_email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Resident Email
                    </label>
                    <input
                        type="email"
                        id="resident_email"
                        name="resident_email"
                        required
                        value={data.resident_email}
                        onChange={(e) =>
                            setData("resident_email", e.target.value)
                        }
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.resident_email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.resident_email}
                        </p>
                    )}
                </div>

                {/* Weekly Price - read-only */}
                <div className="mb-5">
                    <label
                        htmlFor="room_price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Weekly Price
                    </label>
                    <input
                        type="text"
                        id="room_price"
                        value={`$${parseFloat(room.weekly_price).toFixed(2)}`}
                        disabled
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                >
                    {processing ? "Updating..." : "Update Resident Info"}
                </button>
            </form>
        </HouseLayout>
    );
}
