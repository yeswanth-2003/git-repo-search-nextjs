"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportProfileButton({ targetId = "profile-export" }) {
  const handleExport = async () => {
    const el = document.getElementById(targetId);
    if (!el) return alert("Export area not found");

    // increase scale for better resolution
    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`github-profile-${Date.now()}.pdf`);
  };

  return (
    <button onClick={handleExport} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
      Export Profile as PDF
    </button>
  );
}
