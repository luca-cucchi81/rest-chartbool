// === GRAFICO LINEARE (FATTURATO MENSILE) ===

$.ajax({
    url: "http://157.230.17.132:4005/sales",
    method: 'GET',
    success: function (data) {
        var oggettoIntermedio = {    //popolo l'oggetto con i mesi già ordinati (nel json non lo sono) e attribuisco valore 0
            'gennaio': 0,
            'febbraio': 0,
            'marzo': 0,
            'aprile': 0,
            'maggio': 0,
            'aprile': 0,
            'maggio': 0,
            'giugno': 0,
            'luglio': 0,
            'agosto': 0,
            'settembre': 0,
            'ottobre': 0,
            'novembre': 0,
            'dicembre': 0
        };

        for (var i = 0; i < data.length; i++) {  // ciclo il json
            var oggettoSingolo = data[i];
            var amount = oggettoSingolo.amount;  // fatturato
            var dataVendita = moment(oggettoSingolo.date, 'DD/MM/YYYY');  // estrapolo data e sistemo il formato
            var meseVendita = dataVendita.locale('it').format('MMMM'); // estrapolo mese in formato locale
            oggettoIntermedio[meseVendita] += amount;   //  fatturati totali x mese
        }


        var asseMesi = [];   // creo array per l'asse X
        var asseFatturato = []; // creo array per l'asse Y

        for (var key in oggettoIntermedio) {  // ciclo nell'oggetto
            asseMesi.push(key); // pusho i mesi
            asseFatturato.push(oggettoIntermedio[key]); // pusho i fatturati totali x mese
        }

        var ctx = $('#mychart-line');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: asseMesi,
                datasets: [{
                    label: 'Fatturato Mensile',
                    backgroundColor: 'rgb(243, 171, 63, 0.6)',
                    borderColor: 'navy',
                    lineTension: 0,
                    data: asseFatturato
                }]
            }
        });

    },
    error: function (error){
        alert('errore');
    }
});

//  === GRAFICO A TORTA (FATTURATO PER VENDITORE) ===

$.ajax({
    url: "http://157.230.17.132:4005/sales",
    method: 'GET',
    success: function (data) {
        var oggettoIntermedio = {};

        for (var i = 0; i < data.length; i++) {  // ciclo il json
            var oggettoSingolo = data[i];
            var fatturato = oggettoSingolo.amount; //fatturato
            var venditore = oggettoSingolo.salesman; //nome venditore
            if (oggettoIntermedio[venditore] === undefined) {
                oggettoIntermedio[venditore] = 0
            }
            oggettoIntermedio[venditore] += fatturato;
        }

        var nomi = [];
        var vendite = [];
        var percentualeVendite =[]

        for (var key in oggettoIntermedio) {
            nomi.push(key);
            vendite.push(oggettoIntermedio[key]);
        }

        var totaleMensile = vendite.reduce(function(a, b){  //   calcolo fatturato totale mensile 'azienda'
        return a + b;
        }, 0);

        //estrapolo la percentuale vendite dei venditori
        for (var i = 0; i < vendite.length; i++) {
            var check = vendite[i]
            var perc = ((check / totaleMensile)* 100).toFixed(1); // fatturato totale mensile venditori / fatturato totale mensile 'azienda'
            percentualeVendite.push(perc) //pusho nell'array dedicato
        }


        var ctx = $('#mychart-pie');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: nomi,
                datasets: [{
                    label: 'Fatturato Mensile',
                    backgroundColor: ['rgb(0, 138, 208, 0.6)','rgb(227, 255, 102, 0.6)','rgb(255, 64, 0, 0.6)','rgb(0, 153, 0, 0.6)'],
                    borderColor: ['#fff'],
                    borderAlign: 'inner',
                    hoverBackgroundColor: ['rgb(0, 138, 208)','rgb(227, 255, 102)','rgb(255, 64, 0)','rgb(0, 153, 0)'],
                    data: percentualeVendite
                }]
            }
        });

    },
    error: function (error){
        alert('errore');
    }
});
