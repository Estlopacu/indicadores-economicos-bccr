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
indicadoresEconomicosBCCR.get(EMAIL, TOKEN).then(tipoDeCambio => {
  // { compra: 500.00, venta: 500.00 }
});
```

Obtener el tipo de cambio del dólar de una fecha de inicio a una fecha final:

```javascript
indicadoresEconomicosBCCR(EMAIL, TOKEN, "01/01/2018", "02/01/2018").then(
  tipoDeCambio => {
    // { compra: 500.00, venta: 500.00 }
  }
);
```

## Meta

Luis Esteban López Acuña – [@estlopacu](https://twitter.com/estlopacu) – estlopacu@gmail.com

[https://github.com/estlopacu/indicadores-economicos-bccr](https://github.com/estlopacu/)
