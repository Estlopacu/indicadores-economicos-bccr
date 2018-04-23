const indicadoresEconomicosBCCR = require('./index');

indicadoresEconomicosBCCR.get().then((data) => {
    console.log("Compra y Venta del día de hoy:");
    console.log(data);
});

indicadoresEconomicosBCCR.getByDate('20/04/2018', '20/04/2018').then((data) => {
    console.log("Compra y Venta por fecha:");
    console.log(data);
});