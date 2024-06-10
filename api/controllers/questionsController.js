const { isValidObjectId } = require("mongoose");
const { response } = require("../app");
const FormResponse = require("../models/formResponse");
const openaiService = require("../services/openai");

exports.postQuestions = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!req.body.questions)
      return res.status(400).json({ error: "No se han enviado respuestas" });

    const company = req.body.company;
    const employees = req.body.employees;
    const email = req.body.email;
    const questions = req.body.questions;

    if (!company || !employees || !email || !questions)
      return res.status(400).json({ error: "Faltan datos obligatorios" });

    let prompt = `
    ¿Necesito un análisis detallado de las debilidades y recomendaciones basado en las respuestas de este formulario de autoevaluación GDPR. 
    Me gustaría recibir un informe detallado en html, debe contener un puntaje de 0 a 10 en base al analisis, el puntaje debe estar luego de los datos base. 
    Empresa: ${company}
    Número de empleados: ${employees}
    Correo electrónico: ${email}
    `;
    questions.forEach((question) => {
      prompt += `
      ${question.section} -  ${question.question} - ${question.value}
      `;
    });

    prompt += `El formato del informe debe ser el siguiente:
    <h2>Informe de autoevaluación GDPR</h2>
    <p>Empresa: ${company}</p>
    <p>Número de empleados: ${employees}</p>
    <p>Correo electrónico: ${email}</p>
    <h3>Puntaje: x.x</h3>
    <h3>Debilidades y recomendaciones:</h3>
    <h3>Resumen Preguntas:</h3>
    <h3>Preguntas y Respuestas:</h3>
    `;

    const completion = await openaiService.getCompliance(prompt);

    const newFormResponse = new FormResponse({
      company,
      employees,
      email,
      questions,
      prompt_tokens: completion.usage.prompt_tokens,
      completion_tokens: completion.usage.completion_tokens,
      total_tokens: completion.usage.total_tokens,
      completion: completion.choices[0].message.content,
      prompt,
    });

    const response = await newFormResponse.save();
    if (!response)
      return res.status(500).json({ error: "Error al crear las preguntas" });

    res.json({ response: response._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear las preguntas" });
  }
};

exports.getResult = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const id = req.params.id;
    if (!id || !isValidObjectId(id))
      return res.status(400).json({ error: "ID no válido" });
    const formResponses = await FormResponse.find(
      { _id: id },
      { completion: 1 }
    );
    if (!formResponses || formResponses.length === 0)
      return res.status(404).json({ error: "Resultado no encontrado" });
    res.json({ response: formResponses[0].completion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener resultado" });
  }
};
