//variable global para guardar los datos
const resultadosAprendizaje = {};

function resultado() {
    var visual = 0, auditivo = 0, cinestesico = 0;
    var respuestas = [];
    var conteoA = 0, conteoB = 0, conteoC = 0;

    // Función auxiliar para asignar puntos y registrar respuestas
    function asignarPuntos(pregunta, visualInciso, auditivoInciso, cinestesicoInciso) {
        var radios = document.getElementsByName(pregunta);
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                respuestas.push({ pregunta: pregunta, respuesta: radios[i].value });

                // Contar las selecciones de cada inciso
                if (radios[i].value === 'A') {
                    conteoA++;
                } else if (radios[i].value === 'B') {
                    conteoB++;
                } else if (radios[i].value === 'C') {
                    conteoC++;
                }

                // Asignar puntos según la respuesta seleccionada y la tabla proporcionada
                if (radios[i].value === visualInciso) {
                    visual++;
                } else if (radios[i].value === auditivoInciso) {
                    auditivo++;
                } else if (radios[i].value === cinestesicoInciso) {
                    cinestesico++;
                }
                break;
            }
        }
    }

    // Asignar puntos según las respuestas y la tabla proporcionada
    asignarPuntos('pregunta1', 'B', 'A', 'C'); // 1a pregunta
    asignarPuntos('pregunta2', 'A', 'C', 'B'); // 2a pregunta
    asignarPuntos('pregunta3', 'B', 'A', 'C'); // 3a pregunta
    asignarPuntos('pregunta4', 'C', 'B', 'A'); // 4a pregunta
    asignarPuntos('pregunta5', 'C', 'B', 'A'); // 5a pregunta
    asignarPuntos('pregunta6', 'B', 'A', 'C'); // 6a pregunta
    asignarPuntos('pregunta7', 'A', 'B', 'C'); // 7a pregunta
    asignarPuntos('pregunta8', 'B', 'A', 'C'); // 8a pregunta
    asignarPuntos('pregunta9', 'A', 'C', 'B'); // 9a pregunta
    asignarPuntos('pregunta10', 'C', 'B', 'A'); // 10a pregunta
    asignarPuntos('pregunta11', 'B', 'A', 'C'); // 11a pregunta
    asignarPuntos('pregunta12', 'B', 'C', 'A'); // 12a pregunta
    asignarPuntos('pregunta13', 'C', 'A', 'B'); // 13a pregunta
    asignarPuntos('pregunta14', 'A', 'B', 'C'); // 14a pregunta
    asignarPuntos('pregunta15', 'B', 'A', 'C'); // 15a pregunta
    asignarPuntos('pregunta16', 'A', 'C', 'B'); // 16a pregunta
    asignarPuntos('pregunta17', 'C', 'B', 'A'); // 17a pregunta
    asignarPuntos('pregunta18', 'C', 'A', 'B'); // 18a pregunta
    asignarPuntos('pregunta19', 'A', 'B', 'C'); // 19a pregunta
    asignarPuntos('pregunta20', 'A', 'C', 'B'); // 20a pregunta
    asignarPuntos('pregunta21', 'B', 'C', 'A'); // 21a pregunta
    asignarPuntos('pregunta22', 'C', 'A', 'B'); // 22a pregunta
    asignarPuntos('pregunta23', 'A', 'B', 'C'); // 23a pregunta
    asignarPuntos('pregunta24', 'B', 'A', 'C'); // 24a pregunta
    asignarPuntos('pregunta25', 'A', 'B', 'C'); // 25a pregunta
    asignarPuntos('pregunta26', 'C', 'B', 'A'); // 26a pregunta
    asignarPuntos('pregunta27', 'B', 'A', 'C'); // 27a pregunta
    asignarPuntos('pregunta28', 'C', 'B', 'A'); // 28a pregunta
    asignarPuntos('pregunta29', 'B', 'C', 'A'); // 29a pregunta
    asignarPuntos('pregunta30', 'C', 'B', 'A'); // 30a pregunta
    asignarPuntos('pregunta31', 'B', 'A', 'C'); // 31a pregunta
    asignarPuntos('pregunta32', 'C', 'A', 'B'); // 32a pregunta
    asignarPuntos('pregunta33', 'A', 'C', 'B'); // 33a pregunta
    asignarPuntos('pregunta34', 'B', 'A', 'C'); // 34a pregunta
    asignarPuntos('pregunta35', 'B', 'C', 'A'); // 35a pregunta
    asignarPuntos('pregunta36', 'A', 'C', 'B'); // 36a pregunta
    asignarPuntos('pregunta37', 'A', 'B', 'C'); // 37a pregunta
    asignarPuntos('pregunta38', 'B', 'C', 'A'); // 38a pregunta
    asignarPuntos('pregunta39', 'B', 'C', 'A'); // 39a pregunta
    asignarPuntos('pregunta40', 'C', 'A', 'B'); // 40a pregunta

    // Determinar el estilo de aprendizaje predominante
    var estilo = '';
    if (visual > auditivo && visual > cinestesico) {
        estilo = 'Visual';
    } else if (auditivo > visual && auditivo > cinestesico) {
        estilo = 'Auditivo';
    } else if (cinestesico > visual && cinestesico > auditivo) {
        estilo = 'Cinestésico';
    } else {
        estilo = 'Mixto';
    }

    // Mostrar las respuestas y conteos en la consola
    console.log("Respuestas seleccionadas:", respuestas);
    console.log("Conteo de respuestas:");
    console.log("A: " + conteoA);
    console.log("B: " + conteoB);
    console.log("C: " + conteoC);
    console.log("Puntos visual: " + visual);
    console.log("Puntos auditivo: " + auditivo);
    console.log("Puntos cinestesico: " + cinestesico);

    //variable para almacenar los datos en localStorage
    resultadosAprendizaje.visual = visual;
    resultadosAprendizaje.auditivo = auditivo;
    resultadosAprendizaje.cinestesico = cinestesico;

    //Se guardan los datos y son accesibles desde cualquier lado
    localStorage.setItem("resultadosAprendizaje", JSON.stringify(resultadosAprendizaje));

    // Abrir otra página en una nueva pestaña
    window.open("graficas.html", "_blank");

    //alert("Tu estilo de aprendizaje es: " + estilo);
    //window.location = 'index.html';
}