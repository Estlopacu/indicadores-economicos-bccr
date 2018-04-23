'use strict';

var axios = require('axios');
var libxmljs = require('libxmljs');
var querystring = require('querystring');

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
            var xmlCompra = libxmljs.parseXml(compra.data);
            var xmlVenta = libxmljs.parseXml(venta.data);

            return {
                'compra': Math.pow(xmlCompra.get('//NUM_VALOR').text(), 1),
                'venta': Math.pow(xmlVenta.get('//NUM_VALOR').text(), 1)
            };
        }));

    } catch (error) {
        throw new Error(error);
    }

};

indicadoresEconomicosBCCR().getByDate = function (fechaInicio, fechaFinal) {
    try {
        var payload = {
            'tcFechaInicio': fechaInicio,
            'tcFechaFinal': fechaFinal,
            'tcNombre': 'N',
            'tnSubNiveles': 'N',
            'tcIndicador': 317
        };

        var postCompra = axios.post('http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos', querystring.stringify(payload));

        payload.tcIndicador = 318;

        var postVenta = axios.post('http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos', querystring.stringify(payload));

        return axios.all([postCompra, postVenta]).then(axios.spread(function (compra, venta) {
            var xmlCompra = libxmljs.parseXml(compra.data);
            var xmlVenta = libxmljs.parseXml(venta.data);

            return {
                'compra': Math.pow(xmlCompra.get('//NUM_VALOR').text(), 1),
                'venta': Math.pow(xmlVenta.get('//NUM_VALOR').text(), 1)
            };
        }));

    } catch (error) {
        return Promise.reject(error);
    }

}