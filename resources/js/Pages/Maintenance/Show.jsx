import { usePage, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";
import { MyDatePicker } from "@/Components/UaTests/MyDatePicker";
import { TextArea } from "@/Components/Forms/TextArea";
import { FileUpload } from "@/Components/Forms/FileUpload";
import { Select } from "@/Components/Forms/Select";

export default function Show() {
    const { house } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        biweekly_report: "",
        heating_and_cooling: "",
        heating_and_cooling_notes: "",
        electrical: "",
        electrical_notes: "",
        plumbing: "",
        plumbing_notes: "",
        bedrooms: "",
        bedroom_notes: "",
        common_areas: "",
        common_area_notes: "",
        exterior: "",
        exterior_notes: "",
        attachments: [],
    });

    const [biWeeklyReportError, setBiWeeklyReportError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setBiWeeklyReportError("");

        let formIsValid = true;

        if (!data.biweekly_report) {
            setBiWeeklyReportError("Bi-Weekly Report Date is required.");
            formIsValid = false;
        }

        if (!formIsValid) {
            return;
        }

        post(route("maintenance.store", house.slug), {
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
            <h1 className="text-4xl text-center mt-6">
                {house.name} Maintenance
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 mb-10 rounded-2xl bg-gray-950 p-10 pt-[100px] w-[896px] space-y-8 min-h-[80vh]"
            >
                {/* Bi Weekly Report Date */}
                <div className="mb-5">
                    <label
                        htmlFor="biweekly_report"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Bi Weekly Report Date
                    </label>
                    <MyDatePicker
                        className="w-[812px]"
                        value={data.biweekly_report}
                        onChange={(date) => setData("biweekly_report", date)}
                    />
                    {biWeeklyReportError && (
                        <p className="text-red-500 text-sm">
                            {biWeeklyReportError}
                        </p>
                    )}
                </div>

                {/* Heating and Cooling */}
                <Select
                    id="heating_and_cooling"
                    label="Heating & Cooling (Thermostat, Filters, Lock Boxes)"
                    value={data.heating_and_cooling}
                    required
                    onChange={(e) =>
                        setData("heating_and_cooling", e.target.value)
                    }
                    options={["Not Inspected", "Inspected"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Notes ** */}
                <TextArea
                    id="heating_and_cooling_notes"
                    required
                    label="Notes"
                    value={data.heating_and_cooling_notes}
                    onChange={(e) =>
                        setData("heating_and_cooling_notes", e.target.value)
                    }
                />

                {/* Electrical */}
                <Select
                    id="electrical"
                    label="Electrical (Outlets, Heavy Duty Applicances, Lights)"
                    value={data.electrical}
                    required
                    onChange={(e) => setData("electrical", e.target.value)}
                    options={["Not Inspected", "Inspected"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Notes ** */}
                <TextArea
                    id="electrical_notes"
                    required
                    label="Notes"
                    value={data.electrical_notes}
                    onChange={(e) =>
                        setData("electrical_notes", e.target.value)
                    }
                />

                {/* Plumbing */}
                <Select
                    id="plumbing"
                    label="Plumbing (Faucets, Leaks & Drips, Etc.)"
                    value={data.plumbing}
                    required
                    onChange={(e) => setData("plumbing", e.target.value)}
                    options={["Not Inspected", "Inspected"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Notes ** */}
                <TextArea
                    id="plumbing_notes"
                    required
                    label="Notes"
                    value={data.plumbing_notes}
                    onChange={(e) => setData("plumbing_notes", e.target.value)}
                />

                {/* Bedrooms */}
                <Select
                    id="bedrooms"
                    label="Bedrooms"
                    value={data.bedrooms}
                    required
                    onChange={(e) => setData("bedrooms", e.target.value)}
                    options={["Not Inspected", "Inspected"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Notes ** */}
                <TextArea
                    id="bedroom_notes"
                    required
                    label="Notes"
                    value={data.bedroom_notes}
                    onChange={(e) => setData("bedroom_notes", e.target.value)}
                />

                {/* Common Areas */}
                <Select
                    id="common_areas"
                    label="Common Areas"
                    value={data.common_areas}
                    required
                    onChange={(e) => setData("common_areas", e.target.value)}
                    options={["Not Inspected", "Inspected"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Notes ** */}
                <TextArea
                    id="common_area_notes"
                    required
                    label="Notes"
                    value={data.common_area_notes}
                    onChange={(e) =>
                        setData("common_area_notes", e.target.value)
                    }
                />

                {/* Exterior */}
                <Select
                    id="exterior"
                    label="Exterior"
                    value={data.exterior}
                    required
                    onChange={(e) => setData("exterior", e.target.value)}
                    options={["Not Inspected", "Inspected"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Notes ** */}
                <TextArea
                    id="exterior_notes"
                    required
                    label="Notes"
                    value={data.exterior_notes}
                    onChange={(e) => setData("exterior_notes", e.target.value)}
                />

                {/* File Upload */}
                <FileUpload
                    id="attachments"
                    label="Attachments"
                    multiple
                    onChange={(e) => setData("attachments", e.target.files)}
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
