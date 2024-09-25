//creo una variable para agregar los datos a mis graficas
const resultados = JSON.parse(localStorage.getItem("resultadosAprendizaje"));

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