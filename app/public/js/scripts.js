$(document).ready(function () {
  $.ajax({
    url: "http://localhost:3100/api/form",
    method: "GET",
    success: function (data) {
      if (data.questions && data.questions.length > 0) {
        let groupedQuestions = {};

        // Agrupar preguntas por sección
        data.questions.forEach(function (question) {
          if (!groupedQuestions[question.section]) {
            groupedQuestions[question.section] = [];
          }
          groupedQuestions[question.section].push(question);
        });

        // Crear el HTML agrupado por secciones
        var sectionId = 0;
        for (let section in groupedQuestions) {
          sectionId++;
          $("#questionsContainer").append(`
                      <div class="section">
                          <h4>${section}</h4>
                      </div>
                  `);

          groupedQuestions[section].forEach(function (question, index) {
            $("#questionsContainer .section:last-child").append(`
                          <div class="form-group">
                              <p>${question.question} (${question.article})</p>
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" id=${question._id} name=${question._id} value="Sí" required>
                                  <label class="form-check-label">Sí</label>
                              </div>
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" id=${question._id} name=${question._id} value="No">
                                  <label class="form-check-label">No</label>
                              </div>
                          </div>
                      `);
          });
        }
      }
    },
    error: function (error) {
      console.error("Error al cargar las preguntas", error);
    },
  });

  // Enviar el formulario
  $("#gdprForm").on("submit", function (e) {
    let questions = document.querySelectorAll(".form-check-input");

    for (let i = 0; i < questions.length; i++) {
      if (!$(questions[i]).val()) {
        alert(
          "Por favor, contesta todas las preguntas antes de enviar el formulario."
        );
        e.preventDefault();
        return;
      }
    }
    e.preventDefault();
    const formData = $(this).serializeArray();
    console.log(formData);
    const company = $("#company").val();
    const employees = $("#employees").val();
    const email = $("#email").val();
    // Obtén todos los elementos de entrada dentro de questionsContainer
    let inputs = $("#questionsContainer input:checked");

    // Crea un objeto para almacenar las respuestas
    let answers = [];

    // Itera sobre los elementos de entrada para obtener sus valores
    inputs.each(function () {
      let question = $(this).closest(".form-group").find("p").text();
      let section = $(this).closest(".section").find("h4").text();

      answers.push({ section, question, id: this.id, value: $(this).val() });
    });

    // Ahora, answers contiene las respuestas
    const data = {
      company,
      employees,
      email,
      questions: answers,
    };

    Swal.fire({
      title: "Cargando...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });

    $.ajax({
      url: "http://localhost:3100/api/questions",
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",

      success: function (response) {
        Swal.close();
        console.log("Formulario enviado correctamente", response);
        // Redirigir a la página de respuesta
        window.location.href = `response.html?id=${response.response}`;
        // Abrir el PDF generado en una nueva ventana
        //window.open(response.pdfUrl, "_blank");
        // Resetear el formulario
        //$("#gdprForm")[0].reset();
      },
      error: function (error) {
        Swal.close();

        console.error("Error al enviar el formulario", error);
      },
    });
  });
});
