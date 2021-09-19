'use strict';

const axios = require('axios');
const querystring = require('querystring');
const DOMParser = require('xmldom').DOMParser;
const { getFormattedTodayDate, validateRequest, validateResponse} = require('./helpers')

const indicadoresEconomicosBCCR = (email, token, desde = getFormattedTodayDate(), hasta = getFormattedTodayDate(), indicadores = [317, 318], nombre = 'N', subNiveles = 'N') => {
    validateRequest(email, token, desde, hasta)
    try {
        const axiosRequests = []
        indicadores.forEach(indicador => {
            axiosRequests.push(
                axios.post('https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos',
                    querystring.stringify({
                        FechaInicio: desde,
                        FechaFinal: hasta,
                        Nombre: nombre,
                        SubNiveles: subNiveles,
                        Indicador: indicador,
                        CorreoElectronico: email,
                        Token: token
                    })
                )
            )
        })
        return axios.all([...axiosRequests]).then(axios.spread((compra, venta) => {
            const compraNode = new DOMParser().parseFromString(compra.data, 'text/xml');
            const ventaNode = new DOMParser().parseFromString(venta.data, 'text/xml');

            if (validateResponse(compraNode, ventaNode)){
                return {
                    'compra': Math.pow(parseFloat(compraNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue), 1).toFixed(2),
                    'venta': Math.pow(parseFloat(ventaNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue), 1).toFixed(2)
                };
            }
        }))
    } catch (e) {
        throw new Error(e)
    }
}

module.exports.default = indicadoresEconomicosBCCR;
module.exports = indicadoresEconomicosBCCR;
