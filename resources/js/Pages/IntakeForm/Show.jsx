import { usePage, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import HouseLayout from "@/Layouts/HouseLayout";
import { TextInput } from "@/Components/Forms/TextInput";
import { MyDatePicker } from "@/Components/UaTests/MyDatePicker";
import { MultiSelectInput } from "@/Components/Forms/MultiSelectInput";
import { Select } from "@/Components/Forms/Select";
import { TextArea } from "@/Components/Forms/TextArea";
import GenerateIntakeLinkbutton from "@/Components/Forms/GenerateIntakeLInkButton";

export default function Show() {
    const { house } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        full_name: "",
        dob: "",
        phones: [{ type: "Mobile", value: "" }],
        dl_number: "",
        last_address: "",
        email: [{ type: "Personal", value: "" }],
        sobriety_date: "",
        referred_by: "",
        drug_of_choice: "",
        car: "",
        car_make_and_model: "",
        license_plate_number: "",
        program_fee: "",
        covid_exposure: "",
        positive_covid_test: "",
        symptoms: "",
        covid_swear: "",
        current_meds: "",
        allergies: "",
        infections: "",
        criminal_record: "",
        criminal_record_details: "",
        mental_illness: "",
        mental_illness_details: "",
        emergency_contact_name: "",
        emergency_contact_phone: [{ type: "Mobile", value: "" }],
        emergency_contact_relationship: "",
        move_in_date: "",
    });

    const [dobError, setDobError] = useState("");
    const [sobrietyDateError, setSobrietyDateError] = useState("");
    const [moveInDateError, setMoveInDateError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setDobError("");
        setSobrietyDateError("");
        setMoveInDateError("");

        let formIsValid = true;

        if (!data.dob) {
            setDobError("Date of Birth is required.");
            formIsValid = false;
        }

        if (!data.sobriety_date) {
            setSobrietyDateError("Sobriety Date is required.");
            formIsValid = false;
        }

        if (!data.move_in_date) {
            setMoveInDateError("Move-In Date is required");
            formIsValid = false;
        }

        if (!formIsValid) {
            return;
        }

        post(route("intake.store", house.slug), {
            data,
            onSuccess: () => {
                toast.success("Intake form submitted successfully!");

                setTimeout(() => {
                    router.visit(route("house.show", house.slug));
                }, 2000);
            },
            onError: (errors) => {
                if (errors.error) {
                    toast.error(errors.error);
                }
            },
        });
    };

    return (
        <HouseLayout>
            <h1 className="text-center text-4xl mt-6">
                {house.name} Intake Form
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 mb-20 rounded-2xl bg-gray-950 p-10 pt-[100px] max-w-4xl space-y-8 min-h-[80vh]"
            >
                <GenerateIntakeLinkbutton houseId={house.id} />
                <h1>{house.name}</h1>

                {/* Resident Full Name ** */}
                <TextInput
                    id="full_name"
                    required
                    value={data.full_name}
                    onChange={(e) => setData("full_name", e.target.value)}
                    label="Resident Full Name"
                />

                {/* DOB ** */}
                <div className="mb-5">
                    <label
                        htmlFor="dob"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Date of Birth
                    </label>
                    <MyDatePicker
                        className="w-[812px]"
                        value={data.dob}
                        onChange={(date) => setData("dob", date)}
                    />
                    {dobError && (
                        <p className="text-red-500 text-sm">{dobError}</p>
                    )}
                </div>

                {/* Phone Number ** */}
                <MultiSelectInput
                    id="phones"
                    label="Phone Number"
                    required
                    value={data.phones}
                    onChange={(updated) => setData("phones", updated)}
                    selectOptions={["Mobile", "Home", "Work"]}
                />

                {/* Drivers License Number */}
                <TextInput
                    id="dl_number"
                    required
                    value={data.dl_number}
                    onChange={(e) => setData("dl_number", e.target.value)}
                    label="Drivers License Number"
                />

                {/* Last Known Address */}
                <TextInput
                    id="last_address"
                    required
                    value={data.last_address}
                    onChange={(e) => setData("last_address", e.target.value)}
                    label="Last Known Address"
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

                {/* Sobriety Date ** */}
                <div className="mb-5">
                    <label
                        htmlFor="sobriety_date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Sobriety Date
                    </label>
                    <MyDatePicker
                        className="w-[812px]"
                        value={data.sobriety_date}
                        onChange={(date) => setData("sobriety_date", date)}
                    />
                    {sobrietyDateError && (
                        <p className="text-red-500 text-sm">
                            {sobrietyDateError}
                        </p>
                    )}
                </div>

                {/* Referred ** By */}
                <Select
                    id="referred_by"
                    label="Referred By"
                    value={data.referred_by}
                    required
                    onChange={(e) => setData("referred_by", e.target.value)}
                    options={[
                        "Google/Web Search",
                        "Social Media",
                        "New Leaf",
                        "Treatment Center",
                        "Friend/Family",
                        "New Freedom",
                        "Reentry Program",
                        "Other",
                    ].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Drug of Choice ** */}
                <TextArea
                    id="drug_of_choice"
                    required
                    label="Drug of Choice"
                    value={data.drug_of_choice}
                    onChange={(e) => setData("drug_of_choice", e.target.value)}
                />

                {/* Car */}
                <Select
                    id="car"
                    label="Car"
                    required
                    value={data.car}
                    onChange={(e) => setData("car", e.target.value)}
                    options={["Yes", "No"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Car Make and Model */}
                <TextArea
                    id="car_make_and_model"
                    label="Car Make and Model"
                    value={data.car_make_and_model}
                    onChange={(e) =>
                        setData("car_make_and_model", e.target.value)
                    }
                />

                {/* License Plate # */}
                <TextInput
                    id="license_plate_number"
                    value={data.license_plate_number}
                    onChange={(e) =>
                        setData("license_plate_number", e.target.value)
                    }
                    label="License Plate Number"
                />

                {/* Program Fee */}
                <Select
                    id="program_fee"
                    label="Program Fee"
                    required
                    text="You will be committing to paying this amount weekly"
                    value={data.program_fee}
                    onChange={(e) => setData("program_fee", e.target.value)}
                    options={[
                        "175",
                        "200",
                        "225",
                        "250",
                        "275",
                        "300",
                        "375",
                    ].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Covid Exposure */}
                <Select
                    id="covid_exposure"
                    required
                    label=""
                    text="Have you been exposed to COVID-19 in the last two weeks?"
                    value={data.covid_exposure}
                    onChange={(e) => setData("covid_exposure", e.target.value)}
                    options={["Yes", "No"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Positive Covid Test */}
                <Select
                    id="positive_covid_test"
                    label=""
                    required
                    text="Have you tested positive for COVID in the last two weeks?"
                    value={data.positive_covid_test}
                    onChange={(e) =>
                        setData("positive_covid_test", e.target.value)
                    }
                    options={["Yes", "No"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Symptoms */}
                <Select
                    id="symptoms"
                    label=""
                    required
                    text="Do you have a fever, aches, pains, sore throat, cough?"
                    value={data.symptoms}
                    onChange={(e) => setData("symptoms", e.target.value)}
                    options={["Yes", "No"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Covid Swear */}
                <Select
                    id="covid_swear"
                    label=""
                    required
                    text="I swear to the best of my knowledge I do not have COVID-19."
                    value={data.covid_swear}
                    onChange={(e) => setData("covid_swear", e.target.value)}
                    options={[
                        "I acknowledge I do not have COVID-19.",
                        "I'm not willing to answer at this time.",
                    ].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Current Medications */}
                <TextArea
                    id="current_meds"
                    required
                    text="If none, type 'NA'"
                    label="Current Medications"
                    value={data.current_meds}
                    onChange={(e) => setData("current_meds", e.target.value)}
                />

                {/* Allergies */}
                <TextArea
                    id="allergies"
                    text="If none, type 'NA'"
                    required
                    label="Allergies"
                    value={data.allergies}
                    onChange={(e) => setData("allergies", e.target.value)}
                />

                {/* HEP-C, AIDS, Infections */}
                <Select
                    id="infections"
                    label="HEP-C, AIDS, Infections"
                    required
                    text=""
                    value={data.infections}
                    onChange={(e) => setData("infections", e.target.value)}
                    options={["Yes", "No"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Criminal Record */}
                <Select
                    id="criminal_record"
                    label="Criminal Record"
                    required
                    text=""
                    value={data.criminal_record}
                    onChange={(e) => setData("criminal_record", e.target.value)}
                    options={["Yes", "No"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Criminal Record Details */}
                <TextArea
                    id="criminal_record_details"
                    text="If you answered yes for criminal record, what were you convicted of?"
                    label=""
                    value={data.criminal_record_details}
                    onChange={(e) =>
                        setData("criminal_record_details", e.target.value)
                    }
                />

                {/* Mental Illness */}
                <Select
                    id="mental_illness"
                    required
                    label="Have you been diagnosed with any psychological disorders?"
                    text="(Schizophrenic, Bipolar, or any other)"
                    value={data.mental_illness}
                    onChange={(e) => setData("mental_illness", e.target.value)}
                    options={["Yes", "No"].map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    placeholder="Please select an option"
                />

                {/* Mental Illness Details */}
                <TextArea
                    id="mental_illness_details"
                    text="If yes, please explain"
                    label=""
                    value={data.mental_illness_details}
                    onChange={(e) =>
                        setData("mental_illness_details", e.target.value)
                    }
                />

                {/* Emergency Contact - Full Name */}
                <TextArea
                    id="emergency_contact_name"
                    required
                    text=""
                    label="Emergency Contact - Full Name"
                    value={data.emergency_contact_name}
                    onChange={(e) =>
                        setData("emergency_contact_name", e.target.value)
                    }
                />

                {/* Emergency Contact Phone Number */}
                <MultiSelectInput
                    id="emergency_contact_phone"
                    required
                    label="Emergency Contact Phone Number"
                    value={data.emergency_contact_phone}
                    onChange={(updated) =>
                        setData("emergency_contact_phone", updated)
                    }
                    selectOptions={["Mobile", "Home", "Work"]}
                />

                {/* Relationship with Emergency Contact */}
                <TextInput
                    id="emergency_contact_relationship"
                    value={data.emergency_contact_relationship}
                    onChange={(e) =>
                        setData(
                            "emergency_contact_relationship",
                            e.target.value
                        )
                    }
                    label="Relationship with Emergency Contact"
                />

                {/* Move in Date */}
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
