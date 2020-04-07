
$.ajax({
    url: "http://157.230.17.132:4005/sales",
    method: 'GET',
    success: function (data) {
        var oggettoIntermedio = {
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

        for (var i = 0; i < data.length; i++) {
            var oggettoSingolo = data[i];
            var amount = oggettoSingolo.amount;
            var dataVendita = moment(oggettoSingolo.date, 'DD/MM/YYYY');
            var meseVendita = dataVendita.locale('it').format('MMMM');
            // if (oggettoIntermedio[meseVendita] === undefined) {
            //     oggettoIntermedio[meseVendita] = 0;
            // }
            oggettoIntermedio[meseVendita] += amount;
        }


        var asseMesi = [];
        var asseFatturato = [];

        for (var key in oggettoIntermedio) {
            asseMesi.push(key);
            asseFatturato.push(oggettoIntermedio[key]);
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






    var ctx = document.getElementById('mychart-pie').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        }
    });
