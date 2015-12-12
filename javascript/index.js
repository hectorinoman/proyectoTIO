var btnPostact, direccion, btnBuscar, geocoder;

//funcion que inicialia las variables y los EventListeners
function initialize() {
  btnPosact = document.getElementById('btn_posact');
  btnBuscar = document.getElementById('btn_buscar');
  geocoder =  new google.maps.Geocoder();

  //EventListeners
  btnBuscar.addEventListener("click", buscar);
  btnPosact.addEventListener("click", localizacion);
}

window.onload = initialize;

function buscar() {
  var direccion = document.getElementById('lugar').value;
  if(direccion == ""){
    $('#error_buscar').append("<p class='error_p'>El campo de dirección tiene que estar relleno<p>");
  }
  else {
    geocoder.geocode( { 'direccion': direccion }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        alert(latitude);
      }
    });
  }
}

function localizacion(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(exito, fracaso);
  } else {
    $('#error_buscar').append("<p class='error_p'>La geolocalización no es soportada por este navegador<p>");
  }
}

function exito(position){
  var latitud = position.coords.latitude;
  var longitud = position.coords.longitude;
}
function fracaso(){
  $('#error_buscar').append("<p class='error_p'>No se pudo geolocalizar su posición<p>");
}
