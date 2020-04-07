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


// $.ajax({
//     url: "http://157.230.17.132:4005/sales",
//     method: 'GET',
//     success: function (data) {
//     },
//     error: function (error){
//         alert('errore');
//     }
// });






    //
    //
    //
    //
    // var ctx = document.getElementById('mychart-pie').getContext('2d');
    // var chart = new Chart(ctx, {
    //     type: 'pie',
    //     data: {
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         datasets: [{
    //             label: 'My First dataset',
    //             backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgb(255, 99, 132)',
    //             data: [0, 10, 5, 2, 20, 30, 45]
    //         }]
    //     }
    // });
