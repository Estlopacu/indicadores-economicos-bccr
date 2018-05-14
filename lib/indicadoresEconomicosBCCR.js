'use strict';

var axios = require('axios');
var querystring = require('querystring');
var DOMParser = require('xmldom').DOMParser;

module.exports.default = indicadoresEconomicosBCCR;
module.exports = indicadoresEconomicosBCCR;

function indicadoresEconomicosBCCR(fechaInicio, fechaFinal) {
    try {
        var todayDate = new Date();
        var BCCRurl = 'http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos';
        var payload = {
            'tcFechaInicio': fechaInicio ? fechaInicio : todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear(),
            'tcFechaFinal': fechaFinal ? fechaFinal : todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear(),
            'tcNombre': 'N',
            'tnSubNiveles': 'N',
            'tcIndicador': 317
        };
        var postCompra = axios.post(BCCRurl, querystring.stringify(payload));

        payload.tcIndicador = 318;

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