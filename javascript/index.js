var btnPostact, direccion, btnBuscar, geocoder, tipo;

//funcion que inicialia las variables y los EventListeners
function initialize() {
  btnPosact = document.getElementById('btn_posact');
  btnBuscar = document.getElementById('btn_buscar');
  geocoder =  new google.maps.Geocoder();
  //tipo = document.getElementById('tipo').value;
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
	       tipo = document.getElementById('tipo').value;
         $.ajax({
           type: 'POST',
	   dataType: 'json',
           data: {'tipo': tipo },
           url: 'php/buscar2.php',
           success: function (response) {
             if(response.success){
               alert("bien");
		var borrar_div = document.getElementById("inicio");
                borrar_div.parentNode.removeChild(borrar_div);
		$("#resultado").append("<a href='mapa.html'>Ver en mapa</a>");
		for(var i in response.datos){
			var nombre = response.datos[i].NOMBRE;
			var latitud = response.datos[i].LATITUD;
			var longitud = response.datos[i].LONGITUD;
			var div = "<div>"+nombre+" "+latitud+" "+longitud+"</div>";
			$(div).appendTo("#resultado");
		
		}
             }
             else {
               alert("mal");
             }
           }
         });
         return false;
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
  tipo = document.getElementById('tipo').value;
}

function fracaso(){
  $('#error_buscar').append("<p class='error_p'>No se pudo geolocalizar su posición<p>");
}
