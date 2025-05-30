import { router } from "@inertiajs/react";
import { formatPhoneNumber } from "@/lib/utils";

export const HouseResidentTable = ({ house }) => {
    return (
        <div className="relative overflow-x-auto shadow-md rounded-2xl p-12 bg-gray-800 m-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                {house.name}
            </h1>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Room #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Resident Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Resident Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Room Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {house.rooms?.map((room) => {
                        if (room.residents.length === 0) {
                            return (
                                <tr
                                    key={room.id + "-empty"}
                                    onClick={() => {}}
                                    className="cursor-pointer odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {room.room_number}
                                    </td>
                                    <td className="px-6 py-4">—</td>
                                    <td className="px-6 py-4">—</td>
                                    <td className="px-6 py-4">
                                        $
                                        {parseFloat(room.weekly_price).toFixed(
                                            2
                                        )}
                                    </td>
                                </tr>
                            );
                        }

                        return room.residents.map((resident, index) => (
                            <tr
                                key={`${room.id}-${resident.id}`}
                                onClick={() =>
                                    router.visit(`/rooms/${room.id}`)
                                }
                                className="cursor-pointer odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {room.room_number}
                                    {String.fromCharCode(65 + index)}
                                </td>
                                <td className="px-6 py-4">{resident.name}</td>
                                <td className="px-6 py-4">
                                    {(() => {
                                        try {
                                            // Try parsing the phone_number if it's a string
                                            const parsedPhoneNumbers =
                                                JSON.parse(
                                                    resident.phone_number
                                                );

                                            // If it's an array of objects, we map and find the "Mobile" type
                                            const mobileNumber =
                                                parsedPhoneNumbers
                                                    .map((obj) =>
                                                        obj.type === "Mobile"
                                                            ? obj.value
                                                            : null
                                                    )
                                                    .filter(
                                                        (value) =>
                                                            value !== null
                                                    )[0];

                                            // Format the phone number if it's available
                                            if (mobileNumber) {
                                                return formatPhoneNumber(
                                                    mobileNumber
                                                );
                                            }
                                        } catch (error) {
                                            // If it's not a valid JSON string, we return the plain string
                                            return formatPhoneNumber(
                                                resident.phone_number
                                            ); // Plain string value like '123.123.1122'
                                        }
                                    })()}
                                </td>

                                <td className="px-6 py-4">
                                    ${parseFloat(room.weekly_price).toFixed(2)}
                                </td>
                            </tr>
                        ));
                    })}
                </tbody>
            </table>
        </div>
    );
};
