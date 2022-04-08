# Indicadores Economicos BCCR

> Obtenga el tipo de cambio del dólar del web service del Banco Central de Costa Rica.

## Instalación

    npm install indicadores-economicos-bccr

## Pre-requisitos

Para poder obtener el tipo de cambio debe estar suscrito a los servicios del Banco Centra de Costa Rica [Servicio web](https://www.bccr.fi.cr/seccion-indicadores-economicos/servicio-web)

Dado que ahora es requerido enviar el correo electrónico y el token asignado en cada request.

## Uso

Obtener el tipo de cambio del dólar del día actual:

```javascript
indicadoresEconomicosBCCR(EMAIL, TOKEN).then((TC) => {
  // {
  //   '2022-04-08T00:00:00-06:00': {
  //     compra: { fecha: '2022-04-08T00:00:00-06:00', valor: 654.24 },
  //     venta: { fecha: '2022-04-08T00:00:00-06:00', valor: 661.64 }
  //   }
  // }
});
```

Obtener el tipo de cambio del dólar de una fecha de inicio a una fecha final:

```javascript
// formate de la fecha: DD/MM/YYYY
indicadoresEconomicosBCCR(EMAIL, TOKEN, '20/04/2018', '24/04/2018').then(
  (TC) => {
    //    {
    //   '2018-04-20T00:00:00-06:00': {
    //     compra: { fecha: '2018-04-20T00:00:00-06:00', valor: 561.21 },
    //     venta: { fecha: '2018-04-20T00:00:00-06:00', valor: 566.82 }
    //   },
    //   '2018-04-21T00:00:00-06:00': {
    //     compra: { fecha: '2018-04-21T00:00:00-06:00', valor: 561.27 },
    //     venta: { fecha: '2018-04-21T00:00:00-06:00', valor: 567.64 }
    //   },
    //   '2018-04-22T00:00:00-06:00': {
    //     compra: { fecha: '2018-04-22T00:00:00-06:00', valor: 561.27 },
    //     venta: { fecha: '2018-04-22T00:00:00-06:00', valor: 567.64 }
    //   },
    //   '2018-04-23T00:00:00-06:00': {
    //     compra: { fecha: '2018-04-23T00:00:00-06:00', valor: 561.27 },
    //     venta: { fecha: '2018-04-23T00:00:00-06:00', valor: 567.64 }
    //   },
    //   '2018-04-24T00:00:00-06:00': {
    //     compra: { fecha: '2018-04-24T00:00:00-06:00', valor: 560.66 },
    //     venta: { fecha: '2018-04-24T00:00:00-06:00', valor: 567.56 }
    //   }
    // }
  }
);
```

## Meta

Luis Esteban López Acuña – [@estlopacu](https://twitter.com/estlopacu) – estlopacu@gmail.com

[https://github.com/estlopacu/indicadores-economicos-bccr](https://github.com/estlopacu/)
