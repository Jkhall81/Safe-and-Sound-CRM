import { usePage, useForm, router } from "@inertiajs/react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";

export default function Show() {
    const { room, houseSlug } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <HouseLayout>
            <form
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto min-h-[80vh]"
            >
                <h1>Intake Form</h1>
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                >
                    {processing ? "Updating..." : "Update Resident Info"}
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
