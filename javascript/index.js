var btnPostact, direccion, btnBuscar;
var x = document.getElementById("x");

function initialize() {
  var btnPosact = document.getElementById('btn_posact');
  var btnBuscar = document.getElementById('btn_buscar');

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
}

function localizacion(){
  if (navigator.geolocation) {
    console.log("hola2");
    navigator.geolocation.getCurrentPosition(exito, fracaso);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function bien(exito){
  var lon = objPosition.coords.longitude;
	var lat = objPosition.coords.latitude;
  console.log("bieen");
}
function fracaso(position){
  console.log("mal");
}
