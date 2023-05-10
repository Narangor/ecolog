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
        Object.keys(misDatos).map((fecha) => {
            const penergia = (misDatos[fecha].Energía * 164.38 / 1000)
            energia.push(penergia)
            const pacpm = (misDatos[fecha].ACPM * 3.7854 * 2.79)
            acpm.push(pacpm)
            const pgas = (misDatos[fecha].Gas * 2.94)
            gas.push(pgas)
            hc.push(penergia + pacpm + pgas)

            fechas.push(fecha)
        })
        Chart.defaults.global.defaultFontColor = "#fff";
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: fechas,
                datasets: [{
                    label: 'EMISIONES DE GAS (KgCO\u2082e)',
                    data: gas,
                    backgroundColor: [
                        'rgb(70, 70, 255,0.8)',
                    ]
                }, {
                    label: 'EMISIONES DE ENERGÍA (KgCO\u2082e)',
                    data: energia,
                    backgroundColor: [
                        'rgb(245, 255, 65,0.8)',
                    ]
                }, {
                    label: 'EMISIONES DE ACPM (KgCO\u2082e)',
                    data: acpm,
                    backgroundColor: [
                        'rgb(153,51,255,0.8)',
                    ]
                }, {
                    label: 'HUELLA DE CARBONO (KgCO\u2082e)',
                    data: hc,
                    backgroundColor: [
                        'rgb(70, 255, 51,0.8)'
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


    } else {
        console.log("No hay datos disponibles");
    }
}).catch((error) => {
    console.error(error);
});