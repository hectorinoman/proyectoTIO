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
		var longitud = $('#long').val();
		var tipo = $('#tipo').val();
		if((nombre=="")||(localidad=="")||(direccion=="")||(cp=="")||(latitud=="")||(longitud=="")){
                        //document.getElementById("msg1").innerHTML = "Es necesario poner un título";
                	$('#msg6').html('<span class="error_p">Es necesario rellenar los campos marcados con *</span>');
                }
		else{
		$.ajax({
			type: 'POST',
			url: 'php/insertar.php',
			data: {nombre: nombre, localidad: localidad, direccion: direccion, cp: cp, tlfn: tlfn, instalaciones: instalaciones, gradas: gradas, horario: horario, latitud: latitud, longitud: longitud, tipo: tipo},
			
			success: function(valor){
				if(valor == "true"){
					document.getElementById("msg6").innerHTML = "";
					$('#msg5').html('<span class="bien_p">Instalación insertada correctamente.</span>');
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
					document.getElementById("msg6").innerHTML = "";
					document.getElementById("msg5").innerHTML = "";
					$('#msg6').html('<span class="bien_p">Instalación no insertada. Ponga correctamente los datos.</span>');
				}	
			} 
		});
		}
		return false;
		});
	});

