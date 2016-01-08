<?php
$servername = "localhost";
$username = "alu4570";
$password = "7Nd1JO";
$dbname = "alu4570";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$nombre = $_POST['nombre'];
$localidad = $_POST['localidad'];
$direccion = $_POST['direccion'];
$cp = $_POST['cp'];
$tlfn = $_POST['tlfn'];
$instalaciones = $_POST['instalaciones'];
$gradas = $_POST['gradas'];
$horario = $_POST['horario'];
$lat = $_POST['latitud'];
$long = $_POST['longitud'];
$tipo = $_POST['tipo'];    
$sql = "INSERT INTO ".$tipo." (NOMBRE, LOCALIZACION, DIRECCION, CODIGO_POSTAL, TELEFONO, INSTALACIONES, GRADAS, HORARIO, LATITUD, LONGITUD) VALUES ('$nombre', '$localidad', '$direccion', '$cp', '$tlfn', '$instalaciones', '$gradas', '$horario', '$lat', '$long')";
    
if($conn->query($sql) === TRUE){
	echo "true";
}
else {
      echo $nombre;
}
?>
