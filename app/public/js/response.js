$(document).ready(function () {
  // Obtén los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);

  // Obtén el ID desde los parámetros
  const id = urlParams.get("id");

  if (id) {
    // Muestra el indicador de carga
    $("#loading").show();

    $.ajax({
      url: "http://localhost:3100/api/result/" + id,
      method: "GET",
      success: function (data) {
        // Oculta el indicador de carga
        $("#loading").hide();

        if (data.response) {
          $("#response").html(data.response);
          $("#download").show();
          $("#back").show();
        } else {
          $("#response").html(
            "<p>No se encontraron datos.</p><a href='index.html' class='btn btn-primary'>Volver al inicio</a>"
          );
        }
      },
      error: function () {
        // Oculta el indicador de carga
        $("#loading").hide();

        $("#response").html(
          "<p>Ocurrió un error al obtener los datos.</p><a href='index.html' class='btn btn-primary'>Volver al inicio</a>"
        );
      },
    });
  } else {
    $("#response").html(
      "<p>No se proporcionó un ID.</p><a href='index.html' class='btn btn-primary'>Volver al inicio</a>"
    );
  }

  $("#download").click(function () {
    let doc_name = "gdpr-" + new Date().getTime();
    let doc = new jsPDF();
    doc.fromHTML($("#response").html(), 15, 15, {
      width: 170,
    });
    doc.save(doc_name);
  });
  $("#back").click(function () {
    window.location.href = "index.html";
  });
});
