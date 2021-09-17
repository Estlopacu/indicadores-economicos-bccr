'use strict';

const axios = require('axios');
const querystring = require('querystring');
const DOMParser = require('xmldom').DOMParser;
const validateDate = (date) => {
    const dateRegex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    return dateRegex.test(date)
}

const getFormattedTodayDate = () => {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`
}

const indicadoresEconomicosBCCR = (email, token, desde = getFormattedTodayDate(), hasta = getFormattedTodayDate(), indicadores = [317, 318], nombre = 'N', subNiveles = 'N') => {
    switch (true) {
        case !email:
            throw new Error('El email es requerido en la solicitud');
        case !token:
            throw new Error('El token es requerido en la solicitud');
        case !validateDate(desde):
        case !validateDate(hasta):
            throw new Error("Alguna de las fechas ingresadas no es una fecha válida o no cumple con el formato requerido: 'dd/mm/yyyy'");
        default:
            const url = 'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos';
            const axiosRequests = []
            indicadores.forEach(indicador => {
                axiosRequests.push(
                    axios.post(url,
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

            try {
                return axios.all([...axiosRequests]).then(axios.spread((compra, venta) => {
                    const compraNode = new DOMParser().parseFromString(compra.data, 'text/xml');
                    const ventaNode = new DOMParser().parseFromString(venta.data, 'text/xml');

                    return {
                        'compra': Math.pow(parseFloat(compraNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue), 1).toFixed(2),
                        'venta': Math.pow(parseFloat(ventaNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue), 1).toFixed(2)
                    };
                }));
            }
            catch (error) {
                throw new Error(error);
            }
    }
}

module.exports.default = indicadoresEconomicosBCCR;
module.exports = indicadoresEconomicosBCCR;