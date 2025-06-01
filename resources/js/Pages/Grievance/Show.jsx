import { usePage, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";
import { MyDatePicker } from "@/Components/UaTests/MyDatePicker";
import { TextArea } from "@/Components/Forms/TextArea";
import { FileUpload } from "@/Components/Forms/FileUpload";
import { Select } from "@/Components/Forms/Select";
import { MultiSelectInput } from "@/Components/Forms/MultiSelectInput";

export default function Show() {
    const { house } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        nature: "",
        title: "",
        email: [{ type: "Personal", value: "" }],
        date_of_incident: "",
        incident_type: "",
        incident_description: "",
        parties_involved: "",
        expectations: "",
    });

    const [dateOfIncidentError, setDateOfIncidentError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setDateOfIncidentError("");

        let formIsValid = true;

        if (!data.date_of_incident) {
            setDateOfIncidentError("Date of Birth is required.");
            formIsValid = false;
        }

        if (!formIsValid) {
            return;
        }

        post(route("grievance.store", house.slug), {
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
            <h1 className="text-4xl text-center mt-10">
                {house.name} Grievance Form
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 rounded-2xl bg-gray-950 p-10 pt-[100px] w-[896px] space-y-8 min-h-[80vh]"
            >
                {/* Nature */}
                <Select
                    id="nature"
                    label="Nature"
                    value={data.nature}
                    required
                    onChange={(e) => setData("nature", e.target.value)}
                    options={["Incident Report", "Resident Grievance"].map(
                        (item) => ({
                            value: item,
                            label: item,
                        })
                    )}
                    placeholder="Please select an option"
                />

                {/* Title */}
                <Select
                    id="title"
                    label="Title"
                    value={data.title}
                    required
                    onChange={(e) => setData("title", e.target.value)}
                    options={["Resident", "House Manager", "Management"].map(
                        (item) => ({
                            value: item,
                            label: item,
                        })
                    )}
                    placeholder="Please select an option"
                />

                {/* Email ** */}
                <MultiSelectInput
                    id="email"
                    required
                    label="Email"
                    value={data.email}
                    onChange={(updated) => setData("email", updated)}
                    selectOptions={["Personal", "Work"]}
                />

                {/* Date of Incident */}
                <div className="mb-5">
                    <label
                        htmlFor="date_of_incident"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Date of Incident
                    </label>
                    <MyDatePicker
                        className="w-[812px]"
                        value={data.date_of_incident}
                        onChange={(date) => setData("date_of_incident", date)}
                    />
                    {dateOfIncidentError && (
                        <p className="text-red-500 text-sm">
                            {dateOfIncidentError}
                        </p>
                    )}
                </div>

                {/* Incident Type */}
                <Select
                    id="incident_type"
                    label="Incident Type"
                    value={data.incident_type}
                    required
                    onChange={(e) => setData("incident_type", e.target.value)}
                    options={[
                        "Lost, Stolen or Damaged Property",
                        "Medical Emergency",
                        "Complaint Against Resident",
                        "Complaint Against House Manager",
                        "Other",
                    ].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Describe the Incident ** */}
                <TextArea
                    id="incident_description"
                    required
                    label="Describe the Incident"
                    value={data.incident_description}
                    onChange={(e) =>
                        setData("incident_description", e.target.value)
                    }
                />

                {/* Parties Involved or Witnesses ** */}
                <TextArea
                    id="parties_involved"
                    required
                    label="Parties Involved or Witnesses"
                    value={data.parties_involved}
                    onChange={(e) =>
                        setData("parties_involved", e.target.value)
                    }
                />

                {/* What are your expectations out of this review ** */}
                <TextArea
                    id="expectations"
                    required
                    label="What are your epxectations out of this review?"
                    value={data.expectations}
                    onChange={(e) => setData("expectations", e.target.value)}
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
