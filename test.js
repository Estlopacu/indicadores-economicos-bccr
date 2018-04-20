const indicadoresEconomicosBCCR = require('./index');

indicadoresEconomicosBCCR.get().then( (data) => {
    console.log(data);
});

indicadoresEconomicosBCCR.getByDate('20/04/2018', '20/04/2018').then( (data) => {
    console.log(data);
});

