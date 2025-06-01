import { usePage, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";
import { MyDatePicker } from "@/Components/UaTests/MyDatePicker";
import { TextInput } from "@/Components/Forms/TextInput";
import { Select } from "@/Components/Forms/Select";

export default function Show() {
    const { house } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        doc_number: "",
        releasing_facility: "",
        case_manager: "",
        move_in_date: "",
    });

    const [moveInDateError, setMoveInDateError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setMoveInDateError("");

        let formIsValid = true;

        if (!data.move_in_date) {
            setMoveInDateError("Date of Birth is required.");
            formIsValid = false;
        }

        if (!formIsValid) {
            return;
        }

        post(route("geo-coc.store", house.slug), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Evacuation Drill Data uploaded successfully!");

                setTimeout(() => {
                    router.visit(route("house.show", house.slug));
                }, 2000);
            },
        });
    };

    return (
        <HouseLayout>
            <h1 className="text-4xl text-center mt-6">{house.name} GEO/COC</h1>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 mb-10 rounded-2xl bg-gray-950 p-10 pt-[100px] w-[896px] space-y-8 min-h-[80vh]"
            >
                {/* First Name */}
                <TextInput
                    id="first_name"
                    value={data.first_name}
                    required
                    onChange={(e) => setData("first_name", e.target.value)}
                    label="First Name"
                />

                {/* Last Name */}
                <TextInput
                    id="last_name"
                    value={data.last_name}
                    required
                    onChange={(e) => setData("last_name", e.target.value)}
                    label="Last Name"
                />

                {/* Participant's DOC# */}
                <TextInput
                    id="doc_number"
                    value={data.doc_number}
                    required
                    onChange={(e) => setData("doc_number", e.target.value)}
                    label="Participant's DOC#"
                />

                {/* Releasing Facility */}
                <Select
                    id="releasing_facility"
                    label="Releasing Facility"
                    value={data.releasing_facility}
                    required
                    onChange={(e) =>
                        setData("releasing_facility", e.target.value)
                    }
                    options={[
                        "Blackwater",
                        "Central Arizona",
                        "Florence West",
                        "Heritage Trail",
                        "Kingman",
                        "Lawrenceville",
                        "Lawton",
                        "Lea County",
                        "Moore Haven",
                        "New Castle",
                        "Phoenix West",
                        "Riverbend",
                        "South Bay",
                    ].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Post Release Case Manager */}
                <Select
                    id="case_manager"
                    label="Post Release Case Manager"
                    value={data.case_manager}
                    required
                    onChange={(e) => setData("case_manager", e.target.value)}
                    options={[
                        "Antonio Berrios",
                        "Amlak Foley",
                        "Darrel Gilford",
                        "Warren Jackson",
                        "Raul Lopez",
                        "Rashod Wiggins",
                    ].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Move In Date */}
                <div className="mb-5">
                    <label
                        htmlFor="move_in_date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Move In Date
                    </label>
                    <MyDatePicker
                        className="w-[812px]"
                        value={data.move_in_date}
                        onChange={(date) => setData("move_in_date", date)}
                    />
                    {moveInDateError && (
                        <p className="text-red-500 text-sm">
                            {moveInDateError}
                        </p>
                    )}
                </div>

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
