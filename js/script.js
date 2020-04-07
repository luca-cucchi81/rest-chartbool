// grafico lineare

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

        var ctx = document.getElementById('mychart-line').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: asseMesi,
                datasets: [{
                    label: 'Fatturato Mensile',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: asseFatturato
                }]
            }
        });

    },
    error: function (error){
        alert('errore');
    }
});

//  grafico a torta

$.ajax({
    url: "http://157.230.17.132:4005/sales",
    method: 'GET',
    success: function (data) {
        var oggettoIntermedio = {};

        for (var i = 0; i < data.length; i++) {  // ciclo il json
            var oggettoSingolo = data[i];
            var fatturato = oggettoSingolo.amount;
            var venditore = oggettoSingolo.salesman;
            if (oggettoIntermedio[venditore] === undefined) {
                oggettoIntermedio[venditore] = 0
            }
            oggettoIntermedio[venditore] += fatturato;
        }

        var nomi = [];
        var vendite = [];
        var percentualeVendite =[]
        console.log(percentualeVendite);

        for (var key in oggettoIntermedio) {
            nomi.push(key);
            vendite.push(oggettoIntermedio[key]);
        }

        var totaleMensile = vendite.reduce(function(a, b){  //  fuznione per calcolo fatturato totale mensile
        return a + b;
        }, 0);

        //estrapolo la percentuale vendite dei venditori
        for (var i = 0; i < vendite.length; i++) {
            var check = vendite[i]
            var perc = ((check / totaleMensile)* 100).toFixed(1);
            percentualeVendite.push(perc)
        }


        var ctx = document.getElementById('mychart-pie').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: nomi,
                datasets: [{
                    label: 'Fatturato Mensile',
                    backgroundColor: ['blue', 'coral', 'red', 'green'],
                    borderColor: ['blue', 'coral', 'red', 'green'],
                    data: percentualeVendite
                }]
            }
        });

    },
    error: function (error){
        alert('errore');
    }
});
