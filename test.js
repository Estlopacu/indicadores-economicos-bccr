const indicadoresEconomicosBCCR = require('./index');

indicadoresEconomicosBCCR().then((data) => {
  console.log('Compra y Venta del día de hoy:');
  console.log(data);
});

indicadoresEconomicosBCCR('20/04/2018', '24/04/2018').then((data) => {
  console.log('Compra y Venta por fecha:');
  console.log(data);
});
