//creo una variable para agregar los datos a mis graficas
const resultados = JSON.parse(localStorage.getItem("resultadosAprendizaje"));
document.addEventListener('DOMContentLoaded', (event) => {

    // Mostrar el estilo de aprendizaje en el HTML
    estilo = resultados.estilo;
    var estiloElemento = document.getElementById("estilo-aprendizaje");
    estiloElemento.textContent = "Tu estilo de aprendizaje es: " + estilo;

    const barData = {
        labels: ["Tipos de Aprendizaje"],
        datasets: [
            {
                label: "Visual",
                data: [resultados.visual],
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
            {
                label: "Auditivo",
                data: [resultados.auditivo],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Cinestésico",
                data: [resultados.cinestesico],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const barConfig = {
        type: "bar",
        data: barData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    const myBarChart = new Chart(
        document.getElementById("myBarChart"),
        barConfig
    );

    const radarData = {
        labels: ["Visual", "Auditivo", "Cinestésico"],
        datasets: [
            {
                label: "Estilos de Aprendizaje",
                data: [resultados.visual, resultados.auditivo, resultados.cinestesico],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    const radarConfig = {
        type: "radar",
        data: radarData,
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                },
            },
        },
    };

    const myRadarChart = new Chart(
        document.getElementById("myRadarChart"),
        radarConfig
    );

    Swal.fire({
        title: "¿Te gustaría recibir tus resultados? Escribe tu correo :)",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Enviar",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: (email) => {

            let email_validacion = email.toLowerCase();
            const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com)$/;

            if (!emailRegex.test(email_validacion)) {
                Swal.showValidationMessage('Correo incorrecto. Por favor, ingresa un correo válido.');
                return false;
            }
            return email;
        }
    }).then((result) => {
        if (result.isConfirmed) {

            emailjs.send("service_ko0544g", "template_xrmf688", {
                to_email: result.value,
                visual: resultados.visual,
                cin: resultados.cinestesico,
                auditivo: resultados.auditivo,
                preguntas: resultados.formulario
            }).then((response) => {
                Swal.fire({
                    title: "Correo enviado correctamente",
                    icon: "success"
                });
            }, (error) => {
                Swal.fire({
                    title: "Error al enviar el correo",
                    icon: "error"
                });
                console.error('Error:', error);
            });
        }
    });


});

function createPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Agregar texto inicial al PDF
    pdf.setFontSize(12);
    pdf.text("Estilo de aprendizaje:", 10, 10);
    pdf.text(estilo, 10, 20);

    pdf.setFontSize(12);
    pdf.text("Respuestas del formulario:", 10, 30);
    const preguntas = resultados.formulario || "No hay respuestas";
    let splitPreguntas = pdf.splitTextToSize(preguntas, 500);
    pdf.text(splitPreguntas, 10, 40);

    // Añadir una nueva página para los gráficos
    pdf.addPage();
    pdf.setFontSize(12);
    pdf.text("Gráficas con los resultados", 10, 10);

    setTimeout(() => {
        // Exportar el gráfico de barras como imagen
        const barCanvas = document.getElementById("myBarChart");
        const barImgData = barCanvas.toDataURL("image/png");

        // Añadir la imagen del gráfico de barras al PDF
        pdf.addImage(barImgData, "PNG", 10, 20, 190, 100);

        // Exportar el gráfico de radar como imagen
        const radarCanvas = document.getElementById("myRadarChart");
        const radarImgData = radarCanvas.toDataURL("image/png");

        // Añadir la imagen del gráfico de radar al PDF
        pdf.addImage(radarImgData, "PNG", 10, 140, 190, 100);

        // Guardar el PDF
        pdf.save('Resultados del test.pdf');
    }, 500);
}