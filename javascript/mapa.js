var map;
var index = 9;
var bounds = new google.maps.LatLngBounds();
var markersArray = [];
var total = [];
var nombres = [] //almacena los nombres de las instalaciones
var localizacion = [];
var direccion = [];
var codigoPostal = [];
var telefono = [];
var instalaciones = [];
var gradas = [];
var horario = [];
var dire;
var geocoder = new google.maps.Geocoder();
var lati = 28.4631488;
var longi = -16.270222;
var origin1 = new google.maps.LatLng(28.277603, -16.625603);
var lugar = document.getElementById("lugar");
lugar.addEventListener("change", busqueda);
var btn_buscar = document.getElementById("btn_buscar");
btn_buscar.addEventListener("click", mostrar);

$("#btn_posact").mousedown(function(){
  if (navigator.geolocation) {
console.log("dentro if");
    	navigator.geolocation.getCurrentPosition(function(position){
	console.log("dentroo de lo del if");
	lati = position.coords.latitude;
	longi = position.coords.longitude;
	origin1 = new google.maps.LatLng(lati, longi);
	console.log("oriiigin" + origin1);
	google.maps.event.addDomListener(window, 'load', initialize(28.2803819,-16.4359493));
    });
  } else {
//	alert("petooo");
    $('#error_buscar').append("<p class='error_p'>La geolocalización no es soportada por este navegador<p>");
  }
});

function exito(position){
 //alert("dentro de exito");
  lati = position.coords.latitude;
  longi = position.coords.longitude;
  alert(lati + "," +longi);
  origin1 = new google.maps.LatLng(lati, longi);
alert("origiiin1" + origin1);
  google.maps.event.addDomListener(window, 'load', initialize(28.2803819,-16.4359493));
}

function fracaso(){
  $('#error_buscar').append("<p class='error_p'>No se pudo geolocalizar su posición<p>");
}

$("#tipo").change(function(){
	var tipo = document.getElementById("tipo").value;
	
	var boton2 = document.getElementById("btn_posact");
	boton2.addEventListener("click", calculateDistances);
	var boton = document.getElementById("btn_buscar");
	boton.addEventListener("click",calculateDistances);

	alert(tipo);

$.ajax({
           type: 'POST',
           dataType: 'json',
           data: {'tipo': tipo },
           url: 'php/buscar2.php',
           success: function (response) {
             if(response.success){
               alert("bien");
                for(var i in response.datos){
                        var nombre = response.datos[i].NOMBRE;
			nombres.push(nombre);
			var loc = response.datos[i].LOCALIZACION;
			localizacion.push(loc);
			var direc = response.datos[i].DIRECCION;
			direccion.push(direc);
			var cod = response.datos[i].CODIGO_POSTAL;
			codigoPostal.push(cod);
			var tele = response.datos[i].TELEFONO;
			telefono.push(tele);
			var instala = response.datos[i].INSTALACIONES;
			instalaciones.push(instala);
			var grad = response.datos[i].GRADAS;
			gradas.push(grad);
			var hora = response.datos[i].HORARIO;
			horario.push(hora);
                        var latitud = response.datos[i].LATITUD;
                        var longitud = response.datos[i].LONGITUD;
                        //var div = "<div>"+nombre+" "+latitud+" "+longitud+"</div>";
                        //$(div).appendTo("#resultado");
			var destinationB = new google.maps.LatLng(latitud, longitud);
			total.push(destinationB);
                }
       	     }
	     else {
               alert("mal");
             }
           }
});

function callback(response, status) {
var ordenacion=[];
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var outputDiv = document.getElementById('outputDiv');
    outputDiv.innerHTML = '';
    deleteOverlays();
  var ordenacion2=[];
    var titulo = outputDiv.appendChild(document.createElement('h4'));
	var contenido = document.createTextNode("Resultados");
    titulo.appendChild(contenido);
    for (var i = 0; i < origins.length; i++) {
      //create a new "row"
      var row=outputDiv.appendChild(document.createElement('div'));
      
      var results = response.rows[i].elements;
      //origin-marker
      addMarker(origins[i], false,row.appendChild(document.createElement('code2')));
      //a list for the destinations
      var list=row.appendChild(document.createElement('ul'));
      
        
      for(var k=0; k<results.length; k++){
        var x = (results[k].distance.text.replace(" km",""));
        x = parseFloat(x.replace(",","."));
        ordenacion[k]=x;   //ordenaaaaaaaa
      }
      
      ordenacion.sort(sortnumber);
      //alert(ordenacion.join(","));  
      
      for(var q=0; q<ordenacion.length; q++){
        var a=ordenacion[q].toString();
        a = a.replace(".",",");
        a= a.concat(" km");
        ordenacion[q]=a;
      }
      
      
      for(var w=0; w<index; w++){
        
      for (var j = 0; j < index; j++) {
        //ordenacion[j]=results[j].distance.text;   //ordenaaaaaaaa
        //ordenacion.sort();
        //results = ordenacion;
        if(ordenacion[w]==results[j].distance.text){
        
        var item = list.appendChild(document.createElement('li'));
	var item2 = item.appendChild(document.createElement('h4'));
	var item3 = item.appendChild(document.createElement('p'));
	var item4 = item.appendChild(document.createElement('p'));
	var item5 = item.appendChild(document.createElement('p'));
	var item6 = item.appendChild(document.createElement('p'));
	var item7 = item.appendChild(document.createElement('p'));
						
 
        //destination-marker
	item2.appendChild(document.createTextNode([
							nombres[j]
						 
						   ]));
        addMarker(destinations[j], true, item3.appendChild(document.createElement('code')));
							
        item4.appendChild(document.createTextNode([
                                                  results[j].distance.text,
						  ]));
	
        item5.appendChild(document.createTextNode([
                                                  results[j].duration.text,
						  ]));

        item6.appendChild(document.createTextNode([
                                                  direccion[j],
						  localizacion[j],
					 	  codigoPostal[j]
						  ]));

/*
                                                  ' tiempo ',
						   results[j].distance.text,
						  'localizacion: ',
						   localizacion[j],
						  'direccion: ',
						   direccion[j],
						  'codigo postal: ',
						   codigoPostal[j],
						  'telefono: ',
						   telefono[j],
						   'instalaciones: ',
						   instalaciones[j],
						   'gradas: ',
						   gradas[j],
						   'horario: ',
						   horario[j]
                                                  ].join(' ')));
  */                                                
        }
      }
      }
    }
  }
}

function calculateDistances() {

var borrar_div = document.getElementById("formulario");
borrar_div.parentNode.removeChild(borrar_div);
  alert("dentro de calculatedistances");
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: total,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
}


});
function mostrar(){

	alert("lati y longi"+ lati +","+longi);
//	var borrar_div = document.getElementById("formulario");
//	borrar_div.parentNode.removeChild(borrar_div);
	origin1 = new google.maps.LatLng(lati, longi);
	//alert("origiiin1"+origin1);
	google.maps.event.addDomListener(window, 'load', initialize(28.2803819,-16.4359493));

}

function busqueda(){ 
	dire = document.getElementById("lugar").value;
	dire = dire + " Tenerife";	
	geocoder.geocode({address: dire}, function(results, status){
	if (status == google.maps.GeocoderStatus.OK) {
	var myResult =results[0].geometry.location;
      	myResult=myResult.toString();
      
      	var split1 = myResult.split('(');
      	var split2 = split1[1].split(')');
      	var splits = split2[0].split(',');
	lati = splits[0];
	longi = splits[1];

        }

	else { // if status value is not equal to "google.maps.GeocoderStatus.OK"
    	// warning message
    	alert("The Geocode was not successful for the following reason: " + status);
  	}
	});	
}


//Calcula la posicion actual del usuario.

var destinationB = new google.maps.LatLng(28.4625658333, -16.2615531778);
//var destinationC = 'LOLO, Chachi';
var destinationD = new google.maps.LatLng(28.4601960556, -16.2539577278);
//var destinationE = 'Micasa, Swed';
var destinationF = new google.maps.LatLng(28.45921775, -16.2803861333);
var destinationIcon = 'http://www.google.com/mapfiles/dd-end.png';
var originIcon = 'http://www.google.com/mapfiles/dd-start.png';
function initialize(a, b) {
  var opts = {
    center: new google.maps.LatLng(a, b),
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
}

function sortnumber(a,b){
  return a-b;
  
}

function addMarker(location, isDestination,node) {
  var icon;
  if (isDestination) {
    icon = destinationIcon;
  } else {
    icon = originIcon;
  }
  geocoder.geocode({'address': location}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      bounds.extend(results[0].geometry.location);
      map.fitBounds(bounds);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: icon
      });
      markersArray.push(marker);
      node.appendChild(document.createTextNode("Acercar"));
      node.setAttribute('title',location);
      node.style.background=(isDestination)?'#2976E9':'green';
      google.maps.event.addDomListener(node,'click',function(){map.panTo(marker.getPosition())})
    } else {
      alert('Geocode was not successful for the following reason: '
        + status);
    }
  });
}
function deleteOverlays() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

google.maps.event.addDomListener(window, 'load', initialize(lati,longi));


