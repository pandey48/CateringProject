import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePurchasePDF = (booking, summary) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("PANDEY CATERING", 14, 20);

  doc.setFontSize(12);
  doc.text(`Customer : ${booking.customerName}`, 14, 35);
  doc.text(`Phone : ${booking.phone}`, 14, 43);
  doc.text(`Event : ${booking.eventType}`, 14, 51);
  doc.text(`Persons : ${booking.persons}`, 14, 59);
  doc.text(`Date : ${new Date(booking.eventDate).toLocaleDateString()}`, 14, 67);

  const rows = summary.map((item) => [
    item.ingredient,
    item.quantity,
    item.unit,
  ]);

  autoTable(doc, {
    startY: 75,
    head: [["Ingredient", "Quantity", "Unit"]],
    body: rows,
  });

  doc.save(`Purchase-${booking.customerName}.pdf`);
};