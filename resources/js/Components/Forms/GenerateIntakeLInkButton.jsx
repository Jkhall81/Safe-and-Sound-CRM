import { useState } from "react";
import { ShareQRCode } from "./ShareQRCode";

import axios from "axios";

export default function GenerateIntakeLinkbutton({ houseId }) {
    const [generatedUrl, setGeneratedUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateLink = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`/api/intake-links`, {
                house_id: houseId,
            });

            const { token } = response.data;
            const url = `${window.location.origin}/intake/${token}`;
            setGeneratedUrl(url);
        } catch (err) {
            setError("Failed to generate link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={generateLink}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Public Intake Link"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {generatedUrl && (
                <div className="mt-4">
                    <label className="block text-lg font-medium text-gray-300">
                        Public Link
                    </label>
                    <input
                        type="text"
                        value={generatedUrl}
                        readOnly
                        className="w-full text-black px-3 py-2 border rounded text-sm"
                        onClick={(e) => e.target.select()}
                    />
                    <div className="flex items-center justify-center mt-8">
                        <ShareQRCode url={generatedUrl} />
                    </div>
                </div>
            )}
        </div>
    );
}
