var btnPostact, direccion, btnBuscar, geocoder, tipo, x;

//funcion que inicialia las variables y los EventListeners
function initialize() {
  btnPosact = document.getElementById('btn_posact');
  btnBuscar = document.getElementById('btn_buscar');
  geocoder =  new google.maps.Geocoder();
  tipo = document.getElementById('tipo').value;
  //EventListeners
  btnBuscar.addEventListener("click", buscar);
  btnPosact.addEventListener("click", localizacion);
}

window.onload = initialize;

//Si la direccion esta vacía muestra un error, sino calcula la latitud y la longitud de la dirección introducida.
function buscar() {
  var direccion = document.getElementById('lugar').value;
  if(direccion == ""){
    $('#error_buscar').append("<p class='error_p'>El campo de dirección tiene que estar relleno<p>");
  }
  else {
    geocoder.geocode( { 'address': direccion }, function(results, status) {
      //Obtenemos la latitud y longitud de la dirección obtenida
      if (status == google.maps.GeocoderStatus.OK) {
        var latitud = results[0].geometry.location.lat();
        var longitud = results[0].geometry.location.lng();
        //Enviamos la latitud y la longitud al php
        $.post('bucar.php', { latitud: latitud, longitud: longitud, tipo: tipo });
        $.get("../php/bucar.php", function(data) {
          x = data;
          console.log(x);
        });
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

//Calcula la posicion actual del usuario.
function exito(position){
  var latitud = position.coords.latitude;
  var longitud = position.coords.longitude;
  //Enviamos la latitud y la longitud al php
  $.post('../php/bucar.php', { latitud: latitud, longitud: longitud, tipo: tipo });
  $.get("../php/bucar.php", function(data) {
      x = data;
      console.log(x);
  });
}

function fracaso(){
  $('#error_buscar').append("<p class='error_p'>No se pudo geolocalizar su posición<p>");
}
