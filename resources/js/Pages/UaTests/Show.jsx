import { usePage, useForm, router } from "@inertiajs/react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";
import { MyDatePicker } from "@/Components/UaTests/MyDatePicker";
import { Select } from "@/Components/Forms/Select";
import { TextArea } from "@/Components/Forms/TextArea";
import { FileUpload } from "@/Components/Forms/FileUpload";

export default function Show() {
    const { house } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        resident_id: "",
        test_date: "",
        result: "",
        notes: "",
        attachments: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("ua.store", house.slug), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("UA Test Information Submitted Successfully!");

                setTimeout(() => {
                    router.visit(route("house.show", house.slug));
                }, 2000);
            },
        });
    };

    return (
        <HouseLayout>
            <h1 className="text-center text-4xl mt-10">
                {house.name} UA Result Submission
            </h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mt-10 rounded-2xl bg-gray-950 p-10 mx-auto min-h-[80vh]"
            >
                {/* Resident Name */}
                <Select
                    id="resident_id"
                    label="Resident Name"
                    value={data.resident_id}
                    onChange={(e) => setData("resident_id", e.target.value)}
                    options={house.active_residents.map((resident) => ({
                        label: resident.name,
                        value: resident.id,
                    }))}
                    placeholder="Select a resident"
                />

                {/* Date Picker */}
                <div className="mb-5">
                    <label
                        htmlFor="resident_phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Test Date
                    </label>
                    <MyDatePicker
                        className="w-[368px]"
                        value={data.test_date}
                        onChange={(date) => setData("test_date", date)}
                    />
                </div>

                {/* Test Result */}
                <Select
                    id="result"
                    label="Test Results"
                    value={data.result}
                    onChange={(e) => setData("result", e.target.value)}
                    options={[
                        { label: "Pass", value: "pass" },
                        { label: "Fail", value: "fail" },
                    ]}
                    placeholder="Select result"
                />

                {/* Notes */}
                <TextArea
                    id="notes"
                    label="Notes"
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                />

                {/* File Upload */}
                <FileUpload
                    id="attachments"
                    label="Attach Files"
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
