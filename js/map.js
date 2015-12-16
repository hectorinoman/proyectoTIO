var mapDiv, button;

function initialize() {
mapDiv = document.getElementById('map');
button = document.getElementById('button');

button.addEventListener("click",my_location);
}

window.onload = initialize;

function my_location () {
    var lat = document.getElementById('lat').value;
    var lon = document.getElementById('lon').value;
    var location = new google.maps.LatLng(lat,lon);
    var options = {
    center: location,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var mapa = new google.maps.Map(mapDiv, options);
    var originIcon = 'http://valgelille.ee/uus/wp-content/uploads/lilled.png';
    var marker = new google.maps.Marker({
    position: location,
    map: mapa,
    title:"Esto es un marcador",
    icon:originIcon,
    animation: google.maps.Animation.DROP
    });
}


//41.652393,1.691895