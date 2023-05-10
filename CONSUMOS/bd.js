import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getDatabase, ref, set, onValue, child, get } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyCS33UYvaWxVGCGgiE8S_W7_7jB6VUpo6w",
    authDomain: "ecolog-dcad8.firebaseapp.com",
    databaseURL: "https://ecolog-dcad8-default-rtdb.firebaseio.com",
    projectId: "ecolog-dcad8",
    storageBucket: "ecolog-dcad8.appspot.com",
    messagingSenderId: "94600199034",
    appId: "1:94600199034:web:cc151763a1cdbb6c08f4c3",
    measurementId: "G-Z22R38FL39"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Initialize Firebase

export function guardar(Fecha, Energía, Gas, ACPM) {

    if (Fecha == "") {
        swal({ text: 'Debe tener Fecha!', icon: 'warning' });
        return;
    }
    if (Energía == "" || Gas == "" || ACPM == "") {
        swal({ text: "Todos los datos de medición son requieridos.", icon: 'warning' })
        return;
    }
    if (Energía <= 0 || Gas <= 0 || ACPM <= 0) {
        swal({ text: "Todos los datos de medición deben ser positivos.", icon: 'warning' })
        return;
    }

    set(ref(database, 'metricas/' + Fecha), {
        Energía: Energía,
        Gas: Gas,
        ACPM: ACPM
    });

    document.querySelector("#Fecha").value = "";
    document.querySelector("#Energía").value = "";
    document.querySelector("#Gas").value = "";
    document.querySelector("#ACPM").value = "";
    if (Energía == Energía || Gas == Gas || ACPM == ACPM) {
        swal({
            title: "Los datos fueron enviados!",
            text: 'Si los datos no fueron visualizados, refresque la página.',
            icon: 'success'
            }).then(function() {
            location.reload();
        })
        return;
    }

}

window.addEventListener("load", escribirFormulario);

function escribirFormulario() {
    crearCampo("Fecha", "date", "fecha", 'optf');
    crearCampo("Energía", "number", 'Introduzca datos de energía (kW):', "opt1");
    crearCampo("Gas", "number", 'Introduzca datos de gas (Kg):', "opt2");
    crearCampo("ACPM", "number", 'Introduzca datos de ACPM (Gl):', "opt3");

    const boton = document.createElement("input");
    boton.value = "Guardar";
    boton.type = "button";
    boton.className = 'enviar'
    boton.addEventListener("click", guardarRegistro)


    document.querySelector("#forms").appendChild(boton);

}


function crearCampo(nombre, tipo, hold, cssname) {
    const campo = document.createElement("input");
    campo.id = nombre;
    campo.type = tipo;
    campo.placeholder = hold;
    campo.className = cssname;

    document.querySelector("#forms").appendChild(campo);
}

function guardarRegistro() {
    nuevosDatos().then((snapshot) => {
        if (snapshot.exists()) {
            const misDatos = snapshot.val()
            console.log(misDatos)
            const años = Object.keys(misDatos)
            console.log(años)

            const ano = document.querySelector("#Fecha").value.split("-")[0]
            const fecha22 = años.find((fecha) => {
                return fecha.includes(ano)

            })
            if (fecha22 === undefined) {
                guardar(document.querySelector("#Fecha").value, document.querySelector("#Energía").value, document.querySelector("#Gas").value, document.querySelector("#ACPM").value);
            } else {
                const energia = parseInt(misDatos[fecha22].Energía) + parseInt(document.querySelector("#Energía").value)
                const gas = parseInt(misDatos[fecha22].Gas) + parseInt(document.querySelector("#Gas").value)
                const acpm = parseInt(misDatos[fecha22].ACPM) + parseInt(document.querySelector("#ACPM").value)
                console.log(energia, gas, acpm)
                guardar(fecha22, energia, gas, acpm);

            }

        }
    })
}

export function nuevosDatos() {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, 'metricas/'))
}