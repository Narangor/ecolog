import { nuevosDatos } from './bd.js';
nuevosDatos().then((snapshot) => {
    if (snapshot.exists()) {
        const misDatos = snapshot.val()
        console.log(misDatos)
        const fechas = []
        const energia = []
        const gas = []
        const acpm = []
        Object.keys(misDatos).map((fecha) => {
            acpm.push(misDatos[fecha].ACPM)
            energia.push(misDatos[fecha].Energía)
            gas.push(misDatos[fecha].Gas)
            fechas.push(fecha)
        })
        Chart.defaults.global.defaultFontColor = "#fff";
        var ctx = document.getElementById("myChart1").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: fechas,
                datasets: [{
                    label: 'CONSUMO DE ENERGÍA (kWh)',
                    data: energia,
                    backgroundColor: [
                        'rgb(245, 255, 65,0.8)',

                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        var ctx = document.getElementById("myChart2").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: fechas,
                datasets: [{
                    label: 'DATOS DE GAS (Kg)',
                    data: gas,
                    backgroundColor: [
                        'rgb(70, 70, 255,0.8)',
                    ]
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        var ctx = document.getElementById("myChart3").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: fechas,
                datasets: [{
                    label: 'ACPM (Gl)',
                    data: acpm,
                    backgroundColor: [
                        'rgb(153,51,255,0.8',
                    ]
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    } else {
        console.log("No hay datos disponibles");
    }
}).catch((error) => {
    console.error(error);
});