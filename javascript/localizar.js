var map, geocoder;
var destinationIcon = 'http://www.google.com/mapfiles/dd-end.png';
var icon = destinationIcon;
var lati = 28.4631488;
var longi = -16.270222;
var latitud;
var longitud;
var latlong = [];
function initialize(a, b) {
  var opts = {
    center: new google.maps.LatLng(a, b),
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
  geocoder = new google.maps.Geocoder();
}

$(document).ready(function(){
  $('#btn_buscar').on('click', function(){
   
   var nombre = document.getElementById('nombre').value;
   var tipo = document.getElementById('tipo').value;
   if((nombre == "")||(tipo == "")){
	$('#error_buscar').append("<p class='error_p'>Es necesario rellenar los campos <p>")
   }   
   else{
	var elem = document.getElementById('formulario');
   	elem.parentNode.removeChild(elem);
	   $.ajax({
	      type: 'POST',
	      dataType: 'json',
	      data: {'nombre': nombre, 'tipo': tipo},
	      url: 'php/localizar.php',
	      success: function(response){	
		if(response.success){
			for(var i in response.datos){
				
				var nombre = response.datos[i].NOMBRE;
				var loc = response.datos[i].LOCALIZACION;
				var direc = response.datos[i].DIRECCION;
				var cod = response.datos[i].CODIGO_POSTAL;
				var tele = response.datos[i].TELEFONO;
				if(tele == null){
					tele = "información no disponible";
				}
				var instala = response.datos[i].INSTALACIONES;
				if(instala == null){
                                        instala = "información no disponible";
                                }
				var grad = response.datos[i].GRADAS;
				if(grad == null){
                                        grad = "información no disponible";
                                }
				var hora = response.datos[i].HORARIO;
				if(hora == null){
                                        hora = "información no disponible";
                                }
           			latitud = parseFloat(response.datos[i].LATITUD);
				longitud = parseFloat(response.datos[i].LONGITUD);
				latlong = {lat: latitud, lng: longitud};
				
            			var div_bus = "<div><h3>"+ nombre+"</h3><p>Dirección: "+ direc + " "+loc+"</p><p> Código Postal: "+cod+"</p><p>Teléfono: "+tele+"</p><p>Instalaciones Extra: "+instala+"</p><p>Gradas: "+grad+"</p><p>Horario: "+hora+"</p><hr></div>";
				$(div_bus).appendTo("#outputDiv");
				
			}
			
			var marker = new google.maps.Marker({
    				position: latlong,
    				map: map,
				icon: icon
 			});
			map.setZoom(15);
			map.panTo(marker.position);
			//google.maps.event.addDomListener(window, 'load', initialize(lati, longi));

		
		}
	   
		else{
		        $('#outputDiv').append("<p> No se ha encontrado ninguna instalación que coincida con su busqueda</p>");
		}
	      }
	     })
	return false;
   }
  });
});
google.maps.event.addDomListener(window, 'load', initialize(lati, longi)); 
