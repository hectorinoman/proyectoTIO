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
$conn->close();

//Conectando, seleccionando la base de datos
$link = mysql_connect($servername,$username,$password)
    or die('No se pudo conectar: ' . mysql_error());
mysql_select_db($dbname) or die('No se pudo seleccionar la base de datos');


$tipo = $_POST['tipo'];
$jsondata = array();

$query = "SELECT * FROM '$tipo' WHERE NOMBRE = 'Campo de Barranco Grande' ";
$result = mysql_query($query);
if(mysql_num_rows($result) > 0) {
  $jsondata["datos"] = array();
  $jsondata["success"] = true;
  while($row = mysql_fetch_assoc($result)){
    $jsondata["datos"][] = $row;
  }
}
else{
  $jsondata["success"] = false;}
}

header('Content.type: application/json; charset=utf-8');
echo json_encode($jsondata, JSON_FORCE_OBJECT);
?>
