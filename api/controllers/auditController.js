const Audit = require("../models/audit");
const { generatePDF } = require("../utils/pdfGenerator");

exports.createAudit = async (req, res) => {
  try {
    const audit = new Audit(req.body);
    await audit.save();

    const pdfBuffer = await generatePDF(req.body);

    res.setHeader(
      "Content-disposition",
      'attachment; filename="auditoria_privacidad_gdpr.pdf"'
    );
    res.setHeader("Content-type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send({ error: "Error al crear la auditoría" });
  }
};
