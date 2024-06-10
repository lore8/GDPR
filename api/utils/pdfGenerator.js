const PDFDocument = require("pdfkit");

exports.generatePDF = (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.text("Auditoría de Privacidad GDPR", { align: "center", fontSize: 20 });
    doc.moveDown();
    doc.text(`Nombre de la Empresa: ${data.companyName}`);
    doc.text(`Cantidad de Empleados: ${data.employeeCount}`);
    doc.text(`Correo de Contacto: ${data.contactEmail}`);
    doc.text(`Consentimiento: ${data.consentCheck ? "Sí" : "No"}`);
    doc.moveDown();

    doc.text(
      `1. ¿Se informa a los interesados de forma clara y concisa sobre la recolección y tratamiento de sus datos personales? (Art. 13): ${data.section1Question1}`
    );
    // Repite esto para todas las preguntas

    doc.end();
  });
};
