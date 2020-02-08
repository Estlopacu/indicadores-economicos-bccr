'use strict';

var axios = require('axios');
var querystring = require('querystring');
var DOMParser = require('xmldom').DOMParser;

module.exports.default = indicadoresEconomicosBCCR;
module.exports = indicadoresEconomicosBCCR;

function indicadoresEconomicosBCCR(email, token, fechaInicio, fechaFinal) {
    try {
        var todayDate = new Date();
        var BCCRurl = 'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos';
        var payload = {
            FechaInicio: fechaInicio ? fechaInicio : todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear(),
            FechaFinal: fechaFinal ? fechaFinal : todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear(),
            Nombre: 'N',
            SubNiveles: 'N',
            Indicador: 317,
            CorreoElectronico: email,
            Token: token,
        };
        var postCompra = axios.post(BCCRurl, querystring.stringify(payload));

        payload.Indicador = 318;

        var postVenta = axios.post(BCCRurl, querystring.stringify(payload));

        return axios.all([postCompra, postVenta]).then(axios.spread(function (compra, venta) {
            var compraNode = new DOMParser().parseFromString(compra.data, 'text/xml');
            var ventaNode = new DOMParser().parseFromString(venta.data, 'text/xml'); 

            return {
                'compra': Math.pow(parseFloat(compraNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2), 1),
                'venta': Math.pow(parseFloat(ventaNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2), 1)
            };
        }));

    } catch (error) {
        throw new Error(error);
    }

};