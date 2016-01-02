var tipo = "FUTBOL";
var map;
var geocoder;
var bounds = new google.maps.LatLngBounds();
var markersArray = [];
var origin1 = new google.maps.LatLng(28.4631488, -16.270222);
var total = [];
//var origin2 = 'Greenwich, England';
//var destinationA = 'Stockholm, Sweden';
$('#btn_buscar').on('click', function(){
	var borrar_div = document.getElementById("formulario");
	borrar_div.parentNode.removeChild(borrar_div);
});
$.ajax({
           type: 'POST',
           dataType: 'json',
           data: {'tipo': tipo },
           url: 'php/buscar2.php',
           success: function (response) {
             if(response.success){
               alert("bien");
                for(var i in response.datos){
                        //var nombre = response.datos[i].NOMBRE;
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
var destinationB = new google.maps.LatLng(28.4625658333, -16.2615531778);
//var destinationC = 'LOLO, Chachi';
var destinationD = new google.maps.LatLng(28.4601960556, -16.2539577278);
//var destinationE = 'Micasa, Swed';
var destinationF = new google.maps.LatLng(28.45921775, -16.2803861333);
var destinationIcon = 'http://www.google.com/mapfiles/dd-end.png';
var originIcon = 'http://www.google.com/mapfiles/dd-start.png';
function initialize() {
  var opts = {
    center: new google.maps.LatLng(28.4631488, -16.270222),
    zoom: 13
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
  geocoder = new google.maps.Geocoder();
}
function calculateDistances() {
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

function sortnumber(a,b){
  return a-b;
  
}
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
    for (var i = 0; i < origins.length; i++) {
      //create a new "row"
      var row=outputDiv.appendChild(document.createElement('div'));
      
      var results = response.rows[i].elements;
      //origin-marker
      addMarker(origins[i], false,row.appendChild(document.createElement('code')));
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
      
      
      for(var w=0; w<results.length; w++){
        
      for (var j = 0; j < results.length; j++) {
        //ordenacion[j]=results[j].distance.text;   //ordenaaaaaaaa
        //ordenacion.sort();
        //results = ordenacion;
        if(ordenacion[w]==results[j].distance.text){
        
        var item=list.appendChild(document.createElement('li'));
        item.appendChild(document.createTextNode(' Destinos: '));
        //destination-marker
        addMarker(destinations[j], true,item.appendChild(document.createElement('code')));
        item.appendChild(document.createTextNode([': ',
                                                  results[j].distance.text,
                                                  ' in ',
                                                  results[j].duration.text
                                                  ].join('')));
                                                  
        }
        
        
      }
      }
    }
  }
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
      node.appendChild(document.createTextNode('('+marker.getPosition().toUrlValue()+')'));
      node.setAttribute('title',location);
      node.style.background=(isDestination)?'red':'green';
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
google.maps.event.addDomListener(window, 'load', initialize);
