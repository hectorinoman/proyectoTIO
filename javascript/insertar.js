$(document).ready(function(){
	$('#boton_publicar').click(function(){
		var form = $('form')[0];
		//var formData = new FormData(form);
		var nombre = $('#nombre').val();
		var localidad = $('#localidad').val();
		var direccion = $('#direccion').val();
		var cp = $('#cp').val();
 		var tlfn = $('#tlfn').val();
 		var instalaciones = $('#instalaciones').val();
 		var gradas = $('#gradas').val();
 		var horario = $('#horario').val();
		var latitud = $('#lat').val();
		var longitud = $('#lon').val();
		var tipo = $('#tipo').val();
		alert("tipoooo: " + tipo)
		$.ajax({
			type: 'POST',
			url: 'php/insertar.php',
			data: {nombre: nombre, localidad: localidad, direccion: direccion, cp: cp, tlfn: tlfn, instalaciones: instalaciones, gradas: gradas, horario: horario, latitud: latitud, longitud: longitud, tipo: tipo},
			
			success: function(valor){
				if(valor == "true"){

					alert("insertado");
					$('#msg5').html('<span class="bien_p">Instalación insertada correctamente</span>');
					$('#nombre').val('');
					$('#localidad').val('');
					$('#direccion').val('');
					$('#cp').val('');
					$('#tlfn').val('');
					$('#instalaciones').val('');
					$('#gradas').val('');
					$('#horario').val('');
					$('#lat').val('');
					$('#long').val('');
				}

				else {
					alert("no insertado");
				/*	document.getElementById("msg5").innerHTML = "Error al publicar el anuncio. Recuerda que la foto tiene que ser jpg y tener un tamaño máximo de 400K";
					document.getElementById("msg1").innerHTML = "";
					document.getElementById("msg2").innerHTML = "";
					document.getElementById("msg3").innerHTML = "";
					document.getElementById("msg4").innerHTML = "";*/
				}	
			} 
		});
		return false;
		});
	});

