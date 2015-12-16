var map;
var marker;

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(40.680898,-8.684059),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
google.maps.event.addDomListener(window, "load", initialize);

function searchAddress() {

  var addressInput = document.getElementById('address-input').value;

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({address: addressInput}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location; // reference LatLng value
      myResult=myResult.toString();
      
      var split1 = myResult.split('(');
      var split2 = split1[1].split(')');
      var splits = split2[0].split(',');

      document.getElementById('coordenadas').value=split2;
      document.getElementById('Latitud').value=splits[0];
      document.getElementById('Longitud').value=splits[1];

      createMarker(myResult); // call the function that adds the marker

      map.setCenter(myResult);

      map.setZoom(17);

    }else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

    // warning message
    alert("The Geocode was not successful for the following reason: " + status);

  }

  });
}


function searchAddress2() {

  var addressInput = document.getElementById('address-input2').value;

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({address: addressInput}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {

      var calle = results[0].address_components[1].long_name; // reference LatLng value
      var ciudad = results[0].address_components[2].long_name;
      var region = results[0].address_components[3].long_name;
      var comunidad = results[0].address_components[4].long_name;
      var pais = results[0].address_components[5].long_name;


      document.getElementById('call').value=calle;
      document.getElementById('ciu').value=ciudad;
      document.getElementById('reg').value=region;
      document.getElementById('com').value=comunidad;
      document.getElementById('pai').value=pais;

      createMarker(myResult); // call the function that adds the marker

      map.setCenter(myResult);

      map.setZoom(17);

    }else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

    // warning message
    alert("The Geocode was not successful for the following reason: " + status);

  }

  });
}
