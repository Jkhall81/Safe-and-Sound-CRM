import QRCode from "react-qr-code";

export const ShareQRCode = ({ url }) => {
    return (
        <div className="p-4 bg-white rounded shadow w-fit">
            <p className="mb-2 text-black text-center">
                Scan and share above url
            </p>
            <div
                className="flex justify-center items-center"
                style={{
                    padding: "0",
                    lineHeight: 0, // eliminates line-height padding
                }}
            >
                <QRCode
                    value={url}
                    size={256}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    style={{
                        display: "block", // removes inline SVG spacing
                    }}
                />
            </div>
        </div>
    );
};
