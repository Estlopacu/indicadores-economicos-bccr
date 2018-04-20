const axios = require('axios');
const libxmljs = require('libxmljs');
const querystring = require('querystring');

const indicadoresEconomicosBCCR = {};

indicadoresEconomicosBCCR.get = async () => {
    try {
        const data = {
            'tcFechaInicio': '20/04/2018',
            'tcFechaFinal': '20/04/2018',
            'tcNombre': 'N',
            'tnSubNiveles': 'N'
        };

        const responseCompra = await axios.post('http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos', querystring.stringify({ ...data, 'tcIndicador': 317}));
        
        const responseVenta = await axios.post('http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos', querystring.stringify({ ...data, 'tcIndicador': 318}));
        
        const xmlCompra = libxmljs.parseXml(responseCompra.data);
        const xmlVenta = libxmljs.parseXml(responseVenta.data);
        
        return {
            'compra': Math.pow(xmlCompra.get('//NUM_VALOR').text(), 1),
            'venta': Math.pow(xmlVenta.get('//NUM_VALOR').text(), 1)
        };
    } catch(error) {
        throw new Error(error);
    }

}

indicadoresEconomicosBCCR.getByDate = async (fechaInicio, fechaFinal) => {
    try {
        const data = {
            'tcFechaInicio': fechaInicio,
            'tcFechaFinal': fechaFinal,
            'tcNombre': 'N',
            'tnSubNiveles': 'N'
        };

        const responseCompra = await axios.post('http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos', querystring.stringify({...data, 'tcIndicador': 317 }));
        const responseVenta = await axios.post('http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos', querystring.stringify({ ...data, 'tcIndicador': 318 }));
        
        const xmlCompra = libxmljs.parseXml(responseCompra.data);
        const xmlVenta = libxmljs.parseXml(responseVenta.data);
        
        return {
            'compra': Math.pow(xmlCompra.get('//NUM_VALOR').text(), 1),
            'venta': Math.pow(xmlVenta.get('//NUM_VALOR').text(), 1)
        };
    } catch(error) {
        throw new Error(error);
    }

}

module.exports = indicadoresEconomicosBCCR;
