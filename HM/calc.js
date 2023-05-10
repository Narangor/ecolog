var a, b, c, d, selec, valg, valx;
console.log(" 1.ACPM (Gl)\n", "2.Energía (KWh)\n", "3.Agua (m)\n", "4.Gas (Kg)\n");
selec = prompt("¿Qué quieres medir? (1, 2, 3, 4): ");

if (selec === "1") {
    a = Number.parseFloat(prompt("Volumen de ACPM: "));
    valg = Number.parseFloat(a * 3.78541);
    valx = Number.parseFloat(valg * 2.79);
    console.log(valx, "Kg de CO\u2082/Gl de ACPM al año");
}

if (selec === "2") {
    b = Number.parseFloat(prompt("Cantidad de kWh: "));
    valx = Number.parseFloat(b * 164.38);
    console.log(valx, "g de CO\u2082 al año ");
}

if (selec === "3") {
    c = Number.parseFloat(prompt("Volumen de agua: "));
    valx = Number.parseFloat(c * 164.38);
    console.log(valx, "g de CO\u2082 al año ");
}

if (selec === "4") {
    d = Number.parseFloat(prompt("Volumen de Gas: "));
    valx = Number.parseFloat(d * 2.94);
    console.log(valx, "Kg de CO\u2082/Kg de gas propano ");
}