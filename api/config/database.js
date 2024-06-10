const mongoose = require("mongoose");
require("dotenv").config();
const Form = require("../models/form");

const connectDB = async () => {
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");

    // Verificar la existencia del formulario
    const formCount = await Form.countDocuments();
    if (formCount === 0) {
      // Crear un formulario predeterminado si no existe
      const defaultForm = {
        company: "",
        employees: 0,
        email: "",
        questions: [
          {
            section: "Transparencia y Consentimiento",
            question:
              "¿Se informa a los interesados de forma clara y concisa sobre la recolección y tratamiento de sus datos personales?",
            article: "Art. 13",
            type: "yesno",
          },
          {
            section: "Transparencia y Consentimiento",
            question:
              "¿Se obtiene el consentimiento libre, específico, informado e inequívoco del interesado antes de tratar sus datos personales?",
            article: "Art. 7",
            type: "yesno",
          },
          {
            section: "Transparencia y Consentimiento",
            question:
              "¿Se facilita a los interesados la posibilidad de retirar su consentimiento en cualquier momento de forma sencilla?",
            article: "Art. 7",
            type: "yesno",
          },
          {
            section: "Transparencia y Consentimiento",
            question:
              "¿Se informa a los interesados sobre el plazo de conservación de sus datos personales?",
            article: "Art. 13",
            type: "yesno",
          },
          {
            section: "Derechos de los Interesados",
            question:
              "¿Se permite a los interesados acceder a sus datos personales, rectificarlos, suprimirlos o limitar su tratamiento?",
            article: "Arts. 15, 16, 17 y 18",
            type: "yesno",
          },
          {
            section: "Derechos de los Interesados",
            question:
              "¿Se informa a los interesados sobre su derecho a la portabilidad de sus datos?",
            article: "Art. 20",
            type: "yesno",
          },
          {
            section: "Derechos de los Interesados",
            question:
              "¿Se atienden las solicitudes de los interesados en un plazo razonable y gratuito?",
            article: "Art. 12",
            type: "yesno",
          },
          {
            section: "Derechos de los Interesados",
            question:
              "¿Se informa a los interesados sobre la posibilidad de presentar una reclamación ante la autoridad de control?",
            article: "Art. 13",
            type: "yesno",
          },
          {
            section: "Seguridad de los Datos",
            question:
              "¿Se han implementado medidas técnicas y organizativas apropiadas para proteger los datos personales contra la pérdida, robo, acceso no autorizado, uso indebido o divulgación?",
            article: "Art. 32",
            type: "yesno",
          },
          {
            section: "Seguridad de los Datos",
            question:
              "¿Se realizan evaluaciones periódicas de la eficacia de las medidas de seguridad?",
            article: "Art. 32",
            type: "yesno",
          },
          {
            section: "Seguridad de los Datos",
            question:
              "¿Se notifican las violaciones de datos a las autoridades competentes en un plazo de 72 horas?",
            article: "Art. 33",
            type: "yesno",
          },
          {
            section: "Seguridad de los Datos",
            question:
              "¿Se cuenta con un plan de respuesta a incidentes de seguridad?",
            article: "Art. 32",
            type: "yesno",
          },
          {
            section: "Encargados del Tratamiento",
            question:
              "¿Se seleccionan cuidadosamente a los encargados del tratamiento y se les exige que cumplan con el RGPD?",
            article: "Art. 28",
            type: "yesno",
          },
          {
            section: "Encargados del Tratamiento",
            question:
              "¿Se formalizan por escrito los contratos con los encargados del tratamiento, especificando sus obligaciones?",
            article: "Art. 28",
            type: "yesno",
          },
          {
            section: "Encargados del Tratamiento",
            question:
              "¿Se realizan auditorías a los encargados del tratamiento para verificar que cumplen con el RGPD?",
            article: "Art. 28",
            type: "yesno",
          },
          {
            section: "Encargados del Tratamiento",
            question:
              "¿Se informa a los interesados sobre la transferencia de sus datos a terceros países?",
            article: "Art. 44",
            type: "yesno",
          },
        ],
      };

      await Form.create(defaultForm);
      console.log("Formulario predeterminado creado");
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
