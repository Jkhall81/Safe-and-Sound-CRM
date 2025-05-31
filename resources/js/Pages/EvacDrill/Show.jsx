import { usePage, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";
import { MyDatePicker } from "@/Components/UaTests/MyDatePicker";
import { TextArea } from "@/Components/Forms/TextArea";
import { FileUpload } from "@/Components/Forms/FileUpload";
import { TextInput } from "@/Components/Forms/TextInput";
import { RadioButtons } from "@/Components/Forms/RadioButtons";
import { CheckBoxes } from "@/Components/Forms/CheckBoxes";

export default function Show() {
    const { house } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        drill_coordinator_name: "",
        drill_date: "",
        drill_time: "",
        time_to_complete: "",
        type_of_drill: "",
        drill_objectives: [],
        alarm_activation: "",
        staff_response: [],
        staff_response_comments: "",
        resident_response: [],
        resident_response_comments: "",
        mobility_assistance: "",
        designated_assembly_area: "",
        accurate_headcount: "",
        strengths_observed: [],
        strengths_observed_comments: "",
        opportunities_observed: [],
        opportunities_observed_comments: "",
        debriefing_conducted: "",
    });

    const [drillDateError, setDrillDateError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setDrillDateError("");

        let formIsValid = true;

        if (!data.drill_date) {
            setDrillDateError("Date of Birth is required.");
            formIsValid = false;
        }

        if (!formIsValid) {
            return;
        }

        post(route("evac.store", house.slug), {
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
                {house.name} Evacuation Drills
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 rounded-2xl bg-gray-950 p-10 pt-[100px] w-[896px] space-y-8 min-h-[80vh]"
            >
                {/* Drill Coordinator Name */}
                <TextInput
                    id="drill_coordinator_name"
                    value={data.drill_coordinator_name}
                    required
                    onChange={(e) =>
                        setData("drill_coordinator_name", e.target.value)
                    }
                    label="Drill Coordinator Name"
                />

                {/* Drill Coordinator Title */}
                <RadioButtons
                    id="drill_coordinator_title"
                    label="Drill Coordinator Title"
                    radioLabels={[
                        "Operations Manager",
                        "House Manager",
                        "Administrator",
                    ]}
                    required
                    value={data.drill_coordinator_title}
                    onChange={(e) =>
                        setData("drill_coordinator_title", e.target.value)
                    }
                />

                {/* Drill Date and Time */}
                <div className="mb-5">
                    <label
                        htmlFor="drill_date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Drill Date and Time
                    </label>
                    <div className="flex">
                        <MyDatePicker
                            className="w-[390px] mr-8"
                            value={data.drill_date}
                            onChange={(date) => setData("drill_date", date)}
                        />
                        <input
                            id="drill_time"
                            name="drill_time"
                            type="time"
                            required
                            value={data.drill_time}
                            onChange={(e) =>
                                setData("drill_time", e.target.value)
                            }
                            className="w-full shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    {drillDateError && (
                        <p className="text-red-500 text-sm">{drillDateError}</p>
                    )}
                </div>

                {/* Time to Complete */}
                <TextInput
                    id="time_to_complete"
                    value={data.time_to_complete}
                    required
                    onChange={(e) =>
                        setData("time_to_complete", e.target.value)
                    }
                    label="Time to Complete (Minutes)"
                />

                {/* Type of Drill */}
                <RadioButtons
                    id="type_of_drill"
                    label="Type of Drill"
                    radioLabels={["Fire", "Disaster", "Gas Leak"]}
                    required
                    value={data.type_of_drill}
                    onChange={(e) => setData("type_of_drill", e.target.value)}
                />

                {/* Drill Objectives */}
                <CheckBoxes
                    required
                    id="drill_objectives"
                    label="Drill Objectives"
                    checkLabels={[
                        "Test Efficiency of Evacuation Routes",
                        "Evaluate Staff",
                        "Resident Response During Evacuation",
                        "Review Communication Protocols",
                        "Inspect Alarm Systems",
                    ]}
                    values={data.drill_objectives}
                    onChange={(updated) => setData("drill_objectives", updated)}
                />

                {/* Alarm Activation */}
                <RadioButtons
                    id="alarm_activation"
                    label="Alarm Activation"
                    radioLabels={["Verbal Notification", "Smoke Detector"]}
                    required
                    value={data.alarm_activation}
                    onChange={(e) =>
                        setData("alarm_activation", e.target.value)
                    }
                />

                {/* Staff Response */}
                <CheckBoxes
                    required
                    id="staff_response"
                    label="Staff Response"
                    checkLabels={[
                        "Effective",
                        "Communicative",
                        "Ensured Resident Accountability",
                        "Guided Residents Towards Exits",
                        "Guided Residents Towards Assembly Points",
                        "Other - If selected please add notes in comment box",
                    ]}
                    values={data.staff_response}
                    onChange={(updated) => setData("staff_response", updated)}
                />

                {/* Staff Response - Comments */}
                <TextArea
                    required
                    id="staff_response_comments"
                    label="Staff Response - Comments"
                    value={data.staff_response_comments}
                    onChange={(e) =>
                        setData("staff_response_comments", e.target.value)
                    }
                />

                {/* Resident Response */}
                <CheckBoxes
                    required
                    id="resident_response"
                    label="Resident Response"
                    checkLabels={[
                        "Cooperative",
                        "Use Designated Routes",
                        "Assited Other Residents",
                        "Calm",
                        "Prompt",
                        "Other - If selected please add notes in the comment box",
                    ]}
                    values={data.resident_response}
                    onChange={(updated) =>
                        setData("resident_response", updated)
                    }
                />

                {/* Resident Response - Comments */}
                <TextArea
                    required
                    id="resident_response_comments"
                    label="Resident Response - Comments"
                    value={data.resident_response_comments}
                    onChange={(e) =>
                        setData("resident_response_comments", e.target.value)
                    }
                />

                {/* Mobility Assistance */}
                <RadioButtons
                    id="mobility_assistance"
                    label="Mobility Assistance"
                    radioLabels={["Yes", "No"]}
                    required
                    value={data.mobility_assistance}
                    onChange={(e) =>
                        setData("mobility_assistance", e.target.value)
                    }
                />

                {/* Designated Assembly Area */}
                <RadioButtons
                    id="designated_assembly_area"
                    label="Designated Assembly Area"
                    radioLabels={["Front Yard", "Back Yard"]}
                    required
                    value={data.designated_assembly_area}
                    onChange={(e) =>
                        setData("designated_assembly_area", e.target.value)
                    }
                />

                {/* Accurate Headcount */}
                <RadioButtons
                    id="accurate_headcount"
                    label="Accurate headcount"
                    radioLabels={["Yes", "No"]}
                    required
                    value={data.accurate_headcount}
                    onChange={(e) =>
                        setData("accurate_headcount", e.target.value)
                    }
                />

                {/* Strengths Observed */}
                <CheckBoxes
                    required
                    id="strengths_observed"
                    label="Strengths Observed"
                    checkLabels={[
                        "Participation",
                        "Followed Procedures",
                        "Promptness",
                        "Execution",
                        "Accuracy",
                        "Effectiness",
                        "Other - if selected please add notes in comment box",
                        "None - only use if not strengths were observed",
                    ]}
                    values={data.strengths_observed}
                    onChange={(updated) =>
                        setData("strengths_observed", updated)
                    }
                />

                {/* Strengths Observed - Comments */}
                <TextArea
                    required
                    id="strengths_observed_comments"
                    label="Strengths Observed - Comments"
                    value={data.strengths_observed_comments}
                    onChange={(e) =>
                        setData("strengths_observed_comments", e.target.value)
                    }
                />

                {/* Opportunities Observed */}
                <CheckBoxes
                    required
                    id="opportunities_observed"
                    label="Opportunities Observed"
                    checkLabels={[
                        "Lack of Participation",
                        "Failed Headcount",
                        "Poor Communication",
                        "Overall Effectiveness and Execution of the Drill",
                        "Other - if selected please add notes in comment box",
                        "None - only use if no opportunities were observed",
                    ]}
                    values={data.opportunities_observed}
                    onChange={(updated) =>
                        setData("opportunities_observed", updated)
                    }
                />

                {/* Opportunities Observed - Comments */}
                <TextArea
                    required
                    id="opportunities_observed_comments"
                    label="Opportunities Observed - Comments"
                    value={data.opportunities_observed_comments}
                    onChange={(e) =>
                        setData(
                            "opportunities_observed_comments",
                            e.target.value
                        )
                    }
                />

                {/* Debriefing Conducted */}
                <RadioButtons
                    id="debriefing_conducted"
                    label="Debriefing Conducted"
                    radioLabels={["Yes", "No"]}
                    required
                    value={data.debriefing_conducted}
                    onChange={(e) =>
                        setData("debriefing_conducted", e.target.value)
                    }
                />

                {/* Suggestions for improvement or Feedback */}
                <TextArea
                    required
                    text="Type 'NA' if there are no suggestions"
                    id="suggestions"
                    label="Suggestions for Improvement or Feedback"
                    value={data.suggestions}
                    onChange={(e) => setData("suggestions", e.target.value)}
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
