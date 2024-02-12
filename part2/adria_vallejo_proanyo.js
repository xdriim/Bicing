var data = null;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(typeof(this.responseText));
        console.log(typeof (JSON.parse(this.responseText)));

        var bicis = [];
        JSON.parse(this.responseText).result.records.forEach(element => {

            switch (true) {
                case element.bikes<5:
                    setLeaftlet(element.streetName, element.streetNumber, element.latitude, element.longitude, 'verd')
                    break;
                case element.bikes<10:
                    setLeaftlet(element.streetName, element.streetNumber, element.latitude, element.longitude, 'vermell')
                    break;
                case element.bikes<20:
                    setLeaftlet(element.streetName, element.streetNumber, element.latitude, element.longitude, 'groc')
                    break;
                default:
                    setLeaftlet(element.streetName, element.streetNumber, element.latitude, element.longitude, 'blau')
                    break;
            }
        if(element.bikes > 10){
            var bici = [];
            //console.log(element.streetName);
            bici.push(element.streetName);
            bici.push(element.latitude);
            bici.push(element.longitude);
            bici.push(element.bikes); 

            bicis.push(bici)
        }
    });
    console.table(bicis);
    
    }
});

xhr.open("GET", "http://bicing.puigverd.org/data/api/action/datastore_search?resource_id=f59e276c-1a1e-4fa5-8c89-8a8a56e56b34");

xhr.send(data);

// Leaftlet
var map = L.map('map').setView([41.3879, 2.16992], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var marker = L.marker([41.3879, 2.16992]).addTo(map);

function setLeaftlet(streetName, streetNumber, latitude, longitude, color){
    switch (color) {
        case 'verd':
            var fillColor = '#008000';
            break;
        case 'vermell':
            var fillColor = '#FF0000';
            break;
        case 'groc':
            var fillColor = '#FFFF00';
            break;
        case 'blau':
            var fillColor = '#0000FF';
            break;
        default:
            var fillColor = '#333';
            break;
    }

    var circle = L.circle([latitude, longitude], {
        color: color,
        fillColor: fillColor,
        fillOpacity: 0.5,
        radius: 80
    }).addTo(map);
    circle.bindPopup(streetName+", "+streetNumber);
}

    marker.bindPopup("<b>Leaflet amb bicing de Barcelona!</b><br>Adrià Vallejo Proaño").openPopup();
    

    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }

    map.on('click', onMapClick);

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Has clicat a: " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);
