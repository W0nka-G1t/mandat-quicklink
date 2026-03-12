import { useState } from "react";
import { API_URL, LINK_URL } from "./api";
import "./modal.css";

export default function QRCodeGenerator({ shortCode, parentElement }) {
  const [qrCode, setQrCode] = useState(null);
  const [open, setOpen] = useState(false);

  const generateQRCode = async () => {
    try {
      const response = await fetch(`${LINK_URL}/${shortCode}/qr`, {
        method: "POST"
      });

      const data = await response.json();

      if (data.success) {
        console.log("QR code generated:", data.qrCodeUrl);
        setQrCode(data.qrCode);

        if (!parentElement) {
          setOpen(true);
        }
      }
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  return (
    <>
      <button onClick={generateQRCode}>Generate QR Code</button>

      {/* If parentElement behaviour wanted */}
      {parentElement && qrCode && (
        <img src={qrCode} alt={`QR Code for ${shortCode}`} />
      )}

      {/* Modal */}
      {open && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <span className="close" onClick={() => setOpen(false)}>
              &times;
            </span>
            <h2>QR Code pour {shortCode}</h2>
            <img src={qrCode} alt={`QR Code for ${shortCode}`} />
          </div>
        </div>
      )}
    </>
  );
}