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
    navigator.geolocation.getCurrentPosition(exito, fracaso);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function exito(position){
  var x = position.coords.latitude;
  console.log(x);
}
function fracaso(position){
  $('#error_buscar').append("<p class='error_p'>No se pudo geolocalizar su posición<p>");
}
