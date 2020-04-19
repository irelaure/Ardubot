
<?php


	// SESSION

		session_start();
  	ob_start();

	// CONNECTION

	   $iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);
		if(!$iden) 	die("ERROR en mysql_connect");

		mysql_query("SET NAMES 'utf8'");
		mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");

	// QUERY

		$id_user = $_SESSION['id'];
		$map = $_POST['map'];
		$mistakes = $_POST['mistakes'];

		$sentencia = "INSERT INTO MAPPROGRESS (id_user, type, mistakes) VALUES (".$id_user.",'".$map."',".$mistakes.");";

		$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die("Error: no se pudo realizar la consulta");

		echo 'Almacenado progreso con éxito';

	// FREE AND CLOSE

		mysql_close($iden); 
?>