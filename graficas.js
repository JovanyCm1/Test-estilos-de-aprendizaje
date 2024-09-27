//creo una variable para agregar los datos a mis graficas
document.addEventListener('DOMContentLoaded', (event) => {
    const resultados = JSON.parse(localStorage.getItem("resultadosAprendizaje"));

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