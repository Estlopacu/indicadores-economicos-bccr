'use strict';

const axios = require('axios');
const querystring = require('querystring');
const DOMParser = require('xmldom').DOMParser;

module.exports.default = indicadoresEconomicosBCCR;
module.exports = indicadoresEconomicosBCCR;

function indicadoresEconomicosBCCR(email, token, fechaInicio, fechaFinal) {
  try {
    const todayDate = new Date();
    const BCCRurl =
      'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos';
    const payload = {
      FechaInicio: fechaInicio
        ? fechaInicio
        : todayDate.getDate() +
          '/' +
          (todayDate.getMonth() + 1) +
          '/' +
          todayDate.getFullYear(),
      FechaFinal: fechaFinal
        ? fechaFinal
        : todayDate.getDate() +
          '/' +
          (todayDate.getMonth() + 1) +
          '/' +
          todayDate.getFullYear(),
      Nombre: 'N',
      SubNiveles: 'N',
      Indicador: 317,
      CorreoElectronico: email,
      Token: token,
    };
    const postCompra = axios.post(BCCRurl, querystring.stringify(payload));

    payload.Indicador = 318;

    const postVenta = axios.post(BCCRurl, querystring.stringify(payload));

    return axios.all([postCompra, postVenta]).then(
      axios.spread(function (compra, venta) {
        const compraNode = new DOMParser().parseFromString(
          compra.data,
          'text/xml'
        );
        const ventaNode = new DOMParser().parseFromString(
          venta.data,
          'text/xml'
        );

        const data = {};

        for (
          let i = 0;
          i < compraNode.getElementsByTagName('NUM_VALOR').length;
          i++
        ) {
          let compraValue =
            compraNode.getElementsByTagName('NUM_VALOR')[i].textContent;
          let ventaValue =
            ventaNode.getElementsByTagName('NUM_VALOR')[i].textContent;
          let compraDate =
            compraNode.getElementsByTagName('DES_FECHA')[i].textContent;
          let ventaDate =
            ventaNode.getElementsByTagName('DES_FECHA')[i].textContent;
          let compra = {
            fecha: compraDate,
            valor: Math.pow(parseFloat(compraValue).toFixed(2), 1),
          };
          let venta = {
            fecha: ventaDate,
            valor: Math.pow(parseFloat(ventaValue).toFixed(2), 1),
          };

          data[compraDate] = {
            compra,
            venta,
          };
        }

        return data;
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}
