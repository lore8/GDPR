const Form = require("../models/form");

exports.getForm = async (req, res) => {
  try {
    const form = await Form.findOne();
    if (!form) {
      return res.status(404).json({ message: "Formulario no encontrado" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el formulario" });
  }
};
