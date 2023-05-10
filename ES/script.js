import { nuevosDatos } from './bd.js';
nuevosDatos().then((snapshot) => {
    if (snapshot.exists()) {
        const misDatos = snapshot.val()
        console.log(misDatos)
        const hc = []
        const energia = []
        const acpm = []
        const gas = []
        const fechas = []
            // Object.keys(misDatos).map((fecha) => {
            //     const penergia = (misDatos[fecha].Energía)
            //     energia.push(penergia)
            //     const pacpm = (misDatos[fecha].ACPM)
            //     acpm.push(pacpm)
            //     const pgas = (misDatos[fecha].Gas)
            //     gas.push(pgas)
            //     hc.push(penergia + pacpm + pgas)
            //     fechas.push(fecha)
            // })
        Chart.defaults.global.defaultFontColor = "#fff";
        var ctx = document.getElementById("myChart1").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO"],
                datasets: [{
                    label: 'CONSUMO DE GAS (Kg)',
                    data: gas,
                    backgroundColor: [
                        'rgb(62, 36, 207, 0.6)',
                    ]
                }, {
                    label: 'CONSUMO DE ENERGÍA (kWh)',
                    data: energia,
                    backgroundColor: [
                        'rgb(245, 255, 65, 0.6)',
                    ]
                }, {
                    label: 'CONSUMO DE ACPM (Gl)',
                    data: acpm,
                    backgroundColor: [
                        'rgb(184, 58, 58, 0.6)',
                    ]
                }, ]
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


    } else {
        console.log("No hay datos disponibles");
    }
}).catch((error) => {
    console.error(error);
});