const indicadoresEconomicosBCCR = require('./index');

indicadoresEconomicosBCCR("indicadores.economicos.bccr@gmail.com", "R1EDAD0NMD",'20/04/2018', '20/04/2018').then((data) => {
    console.log("Compra y Venta por fecha:");
    console.log(data);
});