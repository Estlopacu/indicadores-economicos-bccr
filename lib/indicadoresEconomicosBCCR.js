'use strict';

var axios = require('axios');
var querystring = require('querystring');
var DOMParser = require('xmldom').DOMParser;

module.exports.default = indicadoresEconomicosBCCR;
module.exports = indicadoresEconomicosBCCR;

function indicadoresEconomicosBCCR(fechaInicio, fechaFinal) {
    try {
        var todayDate = new Date();
        
        var payload = {
            'tcFechaInicio': fechaInicio ? fechaInicio : todayDate.getDate() + "/" + todayDate.getMonth() + "/" + todayDate.getFullYear(),
            'tcFechaFinal': fechaFinal ? fechaFinal : todayDate.getDate() + "/" + todayDate.getMonth() + "/" + todayDate.getFullYear(),
            'tcNombre': 'N',
            'tnSubNiveles': 'N',
            'tcIndicador': 317
        };

        var postCompra = axios.post('http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos', querystring.stringify(payload));

        payload.tcIndicador = 318;

        var postVenta = axios.post('http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos', querystring.stringify(payload));

        return axios.all([postCompra, postVenta]).then(axios.spread(function (compra, venta) {
            var compraNode = new DOMParser().parseFromString(compra.data, 'text/xml');
            var ventaNode = new DOMParser().parseFromString(venta.data, 'text/xml'); //.getElementsByTagName('NUM_VALOR');

            return {
                'compra': Math.pow(parseFloat(compraNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2), 1),
                'venta': Math.pow(parseFloat(ventaNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2), 1)
            };
        }));

    } catch (error) {
        throw new Error(error);
    }

};